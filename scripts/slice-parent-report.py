#!/usr/bin/env python3
"""
Slice the parent-report contact sheet into one image per panel.

Usage:
    python3 scripts/slice-parent-report.py [source] [outdir]

Defaults to public/images/parent-report.png -> public/images/parent-report-N.png

The panel count is DETECTED, never assumed. The sheet is going from three panels
to four and may change again, so the only thing this script relies on is that
every panel carries a dark header bar across its full width, separated by a
lighter gutter. It prints what it found, warns on uneven panels, and exits
rather than silently producing garbage.

Verified against the three-panel sheet: 3 panels, 345px each, 17px gutters,
which matches hand measurement exactly.

Requires Pillow only. No numpy.
"""

import sys
import os
from PIL import Image

# A pixel counts as "header" when its channels sum below this. The panel
# headers are Deep Midnight; every gutter and page background is far lighter.
DARK_SUM = 330

# Ignore runs narrower than this: they are rounded corners or stray marks, not
# a panel.
MIN_PANEL_W = 60

# Band of rows profiled to find the headers, as a fraction of image height.
# Starts BELOW the rounded top corner, so edge columns are dark for the whole
# band and each panel reports its true full width. Starting higher clips a few
# pixels off every corner.
BAND_TOP, BAND_BOTTOM = 0.05, 0.09

# A column belongs to a panel when it is dark across at least this share of the
# band. Single-row probing is not reliable: the light "WEEKLY REPORT" text
# punches holes in any one row and splits a panel into several false runs.
COLUMN_DARK_SHARE = 0.55


def find_panels(im):
    """Column runs belonging to panel headers, detected over a band of rows."""
    w, h = im.size
    px = im.load()
    y0, y1 = int(h * BAND_TOP), max(int(h * BAND_BOTTOM), int(h * BAND_TOP) + 4)
    rows = range(y0, min(y1, h))
    if not len(rows):
        return []

    dark_share = [
        sum(1 for y in rows if sum(px[x, y][:3]) < DARK_SUM) / len(rows) for x in range(w)
    ]

    runs = []
    start = None
    for x in range(w):
        inside = dark_share[x] >= COLUMN_DARK_SHARE
        if inside and start is None:
            start = x
        elif not inside and start is not None:
            runs.append((start, x - 1))
            start = None
    if start is not None:
        runs.append((start, w - 1))
    return [r for r in runs if r[1] - r[0] + 1 >= MIN_PANEL_W]


def vertical_bounds(im, x0, x1):
    """Topmost and bottommost rows carrying panel content within a column range."""
    w, h = im.size
    px = im.load()
    bg = px[0, 0][:3]

    def is_bg(c):
        return sum(abs(c[i] - bg[i]) for i in range(3)) < 24

    step = max(1, (x1 - x0) // 80)
    threshold = len(range(x0 + 6, x1 - 6, step)) * 0.7
    rows = [
        y
        for y in range(h)
        if sum(0 if is_bg(px[x, y][:3]) else 1 for x in range(x0 + 6, x1 - 6, step)) > threshold
    ]
    return (rows[0], rows[-1]) if rows else (0, h - 1)


def main():
    src = sys.argv[1] if len(sys.argv) > 1 else "public/images/parent-report.png"
    outdir = sys.argv[2] if len(sys.argv) > 2 else "public/images"

    im = Image.open(src).convert("RGB")
    w, h = im.size
    print(f"source: {src}  {w}x{h}  {os.path.getsize(src):,} bytes")

    runs = find_panels(im)
    if not runs:
        sys.exit("FAILED: no panel header bars detected. Check DARK_SUM against the export.")

    print(f"panels detected: {len(runs)}")

    widths = [b - a + 1 for a, b in runs]
    if max(widths) - min(widths) > max(widths) * 0.05:
        print(f"  WARNING: panel widths vary by more than 5%: {widths}")

    gutters = [runs[i + 1][0] - runs[i][1] - 1 for i in range(len(runs) - 1)]
    print(f"  widths: {widths}")
    print(f"  gutters: {gutters}")

    # One vertical window for every panel, so they stay in register.
    tops, bottoms = zip(*(vertical_bounds(im, a, b) for a, b in runs))
    top, bottom = min(tops), max(bottoms)
    print(f"  vertical window: {top}..{bottom}  (height {bottom - top + 1})")

    total = 0
    for i, (x0, x1) in enumerate(runs, 1):
        panel = im.crop((x0, top, x1 + 1, bottom + 1))
        out = os.path.join(outdir, f"parent-report-{i}.png")
        panel.save(out, "PNG", optimize=True)
        n = os.path.getsize(out)
        total += n
        print(f"  panel {i}: {panel.size[0]}x{panel.size[1]}  {n:,} bytes  -> {out}")

    print(f"combined: {total:,} bytes")

    # Flag stale outputs from a previous run with more panels.
    extra = len(runs) + 1
    while os.path.exists(os.path.join(outdir, f"parent-report-{extra}.png")):
        print(f"  NOTE: parent-report-{extra}.png is left over from an earlier slice. Delete it.")
        extra += 1


if __name__ == "__main__":
    main()
