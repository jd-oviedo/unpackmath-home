"use client";

import { useState, type CSSProperties } from "react";
import { color, ink, inkMuted, type, space, radius, motion, mq } from "../../../lib/tokens";
import { SectionShell, SectionHeading } from "../ui";

/**
 * Section 11. Restyled into the mockup's boxed layout, with all five original
 * fields kept: the band is wide enough to hold them.
 *
 * The submit shape is load-bearing and deliberately unchanged: POST, a
 * JSON.stringify'd body, and NO headers. Setting a Content-Type header would
 * turn this into a preflighted cross-origin request, and the Google Apps Script
 * endpoint does not answer the OPTIONS preflight. script.google.com is also the
 * only origin allowed by connect-src in the CSP.
 */

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzpwg99prZVT1E3nebMgZkudikGblQVBJsO8Ey4IrOD40YhtdGfEsnm18KRxvLJJQLvuw/exec";

const ROLES = ["Student", "Teacher", "Parent", "Administrator"];

const fieldStyle: CSSProperties = {
  width: "100%",
  border: `1px solid ${ink(0.3)}`,
  borderRadius: 0,
  background: color.white,
  padding: "11px 12px",
  fontFamily: type.body.fontFamily,
  fontWeight: 300,
  fontSize: "14.5px",
  color: color.deepMidnight,
  outline: "none",
};

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: "block",
        fontFamily: type.body.fontFamily,
        fontWeight: 400,
        fontSize: "12px",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: ink(inkMuted),
        marginBottom: "7px",
      }}
    >
      {children}
    </label>
  );
}

export function WaitlistBand() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", email: "", school: "", challenge: "" });

  const ready = Boolean(form.name && form.role && form.email && form.challenge);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || loading) return;
    setLoading(true);
    try {
      await fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(form),
      });
    } finally {
      setSubmitted(true);
      setLoading(false);
    }
  }

  return (
    <SectionShell surface="cream" id="waitlist" paddingY="70px">
      <div
        className="um-waitlist"
        style={{ display: "grid", gridTemplateColumns: "1fr 520px", gap: "70px", alignItems: "center" }}
      >
        <div>
          <SectionHeading size="sm" style={{ fontSize: "28px", lineHeight: 1.25, marginBottom: space.md }}>
            Stay in the loop
          </SectionHeading>
          <p style={{ ...type.body, fontSize: "15.5px", color: ink(0.8), margin: 0, maxWidth: "420px" }}>
            Occasional updates on new item sets, dashboard features, and the family digest rollout.
          </p>
        </div>

        <div style={{ background: color.warmSand, border: `1px solid ${ink(0.2)}`, padding: "26px" }}>
          {submitted ? (
            <div style={{ padding: "24px 0" }}>
              <p style={{ ...type.body, fontSize: "17px", fontWeight: 400, color: color.deepMidnight, margin: `0 0 ${space.sm}` }}>
                You&apos;re on the list.
              </p>
              <p style={{ ...type.bodySm, color: ink(inkMuted), margin: 0 }}>
                We&apos;ll reach out when early access opens.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate={false}>
              <div className="um-wl-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: space.md, marginBottom: space.md }}>
                <div>
                  <Label htmlFor="wl-name">Name</Label>
                  <input
                    id="wl-name"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={fieldStyle}
                  />
                </div>
                <div>
                  <Label htmlFor="wl-role">Role</Label>
                  <select
                    id="wl-role"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    style={{ ...fieldStyle, color: form.role ? color.deepMidnight : ink(0.45) }}
                  >
                    <option value="">Select one</option>
                    {ROLES.map((role) => (
                      <option key={role} value={role.toLowerCase()}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: space.md }}>
                <Label htmlFor="wl-email">Email</Label>
                <input
                  id="wl-email"
                  required
                  type="email"
                  placeholder="you@school.edu"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={fieldStyle}
                />
              </div>

              <div style={{ marginBottom: space.md }}>
                <Label htmlFor="wl-school">School or district</Label>
                <input
                  id="wl-school"
                  placeholder="Optional"
                  value={form.school}
                  onChange={(e) => setForm({ ...form, school: e.target.value })}
                  style={fieldStyle}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <Label htmlFor="wl-challenge">What are you trying to solve right now?</Label>
                <textarea
                  id="wl-challenge"
                  required
                  rows={3}
                  placeholder="e.g. my students freeze up on test day even when they know the material"
                  value={form.challenge}
                  onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                  style={{ ...fieldStyle, resize: "vertical", lineHeight: 1.6 }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: space.md, flexWrap: "wrap" }}>
                <button
                  type="submit"
                  disabled={!ready || loading}
                  /*
                    This is a real submit element rather than the Button
                    component, so it borrows um-btn for the focus ring and picks
                    up the primary hover only while it is actually submittable.
                    Disabled, it deliberately has no hover, and its fill is a
                    plain value the hover variable cannot reach.
                  */
                  className={ready ? "um-btn um-btn--primary" : "um-btn"}
                  style={{
                    background: ready ? `var(--um-btn-bg, ${color.sunsetOrange})` : ink(0.12),
                    color: ready ? color.deepMidnight : ink(0.4),
                    transition: `background ${motion.fast}`,
                    border: "1px solid transparent",
                    borderRadius: radius.button,
                    fontFamily: type.nav.fontFamily,
                    fontSize: "15px",
                    fontWeight: 500,
                    padding: "13px 22px",
                    cursor: ready && !loading ? "pointer" : "not-allowed",
                  }}
                >
                  {loading ? "Signing up..." : "Sign up"}
                </button>
                <span style={{ ...type.bodyXs, fontSize: "12.5px", color: ink(inkMuted) }}>
                  <a className="um-link" href="/pricing" style={{ borderBottom: `1px solid ${ink(0.3)}` }}>
                    See pricing
                  </a>
                </span>
              </div>
            </form>
          )}
        </div>
      </div>

      <style href="um-waitlist" precedence="medium">{`
        .um-waitlist input:focus,
        .um-waitlist select:focus,
        .um-waitlist textarea:focus {
          border-color: ${color.sunsetOrange} !important;
        }
        ${mq.lg} {
          .um-waitlist { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        ${mq.sm} {
          .um-wl-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SectionShell>
  );
}
