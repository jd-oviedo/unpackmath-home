"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

/**
 * Fade-in on route change, so navigation does not snap.
 *
 * The wrapper is keyed on the pathname. A client-side navigation changes the
 * key, React remounts the subtree, and the mount restarts the `um-page-in`
 * keyframe declared in globals.css. Opacity only, per the flat system: no
 * scale, no shadow, no gradient.
 *
 * Deliberately no position shift. A transform here would offset every anchor in
 * the page, and a hash scroll target is computed while that transform is still
 * running, which left /#demo settling short by exactly the lift distance.
 *
 * The first render deliberately gets no animation class. On a cold load the page
 * is server-rendered HTML the browser can paint immediately, and starting it at
 * opacity 0 would hold the text back behind a 220ms fade for no benefit. So the
 * fade is opted into only once a navigation has actually happened.
 *
 * That flag is derived during render, using React's documented pattern for
 * adjusting state when a prop changes, rather than in an effect. The difference
 * matters: an effect cannot run before paint, so the new page would paint fully
 * opaque and only then drop to opacity 0 and fade, which reads as a flicker.
 * Updating during render means React re-renders before committing, so the div
 * is created with the class already on it and the very first frame is correct.
 *
 * A ref would be the obvious way to hold "has navigated", but reading a ref
 * during render is not allowed, so this is two pieces of state instead. Once
 * `hasNavigated` is true it stays true, so returning to the path the session
 * started on still fades.
 *
 * Deliberately not framer-motion or any other animation dependency: this is one
 * CSS keyframe on a keyed div, and pulling in a runtime for it would cost more
 * than the effect is worth on a marketing site.
 *
 * Deliberately not the View Transitions API either. Next 16.2.9 gates React's
 * <ViewTransition> behind `experimental.viewTransition`, and an experimental
 * flag does not belong on a production marketing site.
 *
 * `children` is a prop passed down from the server-rendered root layout, so
 * wrapping the tree here does not push any page into the client bundle. The
 * whole document still ships in the initial HTML, which is what keeps the
 * homepage's #demo hash scroll working: LiveDemo is present at first paint
 * rather than mounted later.
 *
 * usePathname() excludes the hash, so a same-page anchor like /#faq does not
 * remount anything and does not retrigger the fade. Only a real route change
 * does.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [renderedPath, setRenderedPath] = useState(pathname);
  const [hasNavigated, setHasNavigated] = useState(false);

  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setHasNavigated(true);
  }

  return (
    <div key={pathname} className={hasNavigated ? "um-page-in" : undefined}>
      {children}
    </div>
  );
}
