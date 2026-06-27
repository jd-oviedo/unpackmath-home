"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", email: "", school: "", challenge: "" });

  const handleSubmit = async () => {
    if (!form.name || !form.role || !form.email || !form.challenge) return;
    setLoading(true);
    try {
      await fetch("https://script.google.com/macros/s/AKfycbzpwg99prZVT1E3nebMgZkudikGblQVBJsO8Ey4IrOD40YhtdGfEsnm18KRxvLJJQLvuw/exec", {
        method: "POST",
        body: JSON.stringify(form),
      });
    } finally {
      setSubmitted(true);
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <p style={{ fontSize: "32px", marginBottom: "12px" }}>✓</p>
        <p style={{ fontSize: "18px", fontWeight: 700, color: "var(--ec-ink)", marginBottom: "8px" }}>You're on the list.</p>
        <p style={{ fontSize: "14px", color: "var(--ec-ink-muted)" }}>We'll reach out when early access opens.</p>
      </div>
    );
  }

  const ready = form.name && form.role && form.email && form.school && form.challenge;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div className="um-form-row" style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-ink-muted)" }}>Name *</label>
          <input required placeholder="Albert Diaz" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", color: "var(--ec-ink)", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-ink-muted)" }}>I am a... *</label>
          <select required value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", color: form.role ? "var(--ec-ink)" : "var(--ec-ink-muted)", fontFamily: "inherit", fontSize: "14px", outline: "none" }}>
            <option value="">Select role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            <option value="administrator">Administrator</option>
          </select>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-ink-muted)" }}>Email Address *</label>
        <input required placeholder="you@email.com" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", color: "var(--ec-ink)", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-ink-muted)" }}>School / District *</label>
        <input required placeholder="e.g. Summertime ISD" value={form.school} onChange={e => setForm({ ...form, school: e.target.value })} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", color: "var(--ec-ink)", fontFamily: "inherit", fontSize: "14px", outline: "none" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ec-ink-muted)" }}>What is the biggest challenge you're trying to solve right now? *</label>
        <textarea required placeholder="e.g. my students freeze up on test day even when they know the material..." value={form.challenge} onChange={e => setForm({ ...form, challenge: e.target.value })} rows={3} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--ec-line)", background: "var(--ec-surface2)", color: "var(--ec-ink)", fontFamily: "inherit", fontSize: "14px", outline: "none", resize: "vertical", lineHeight: 1.6 }} />
      </div>
      <button onClick={handleSubmit} disabled={loading || !ready} style={{ padding: "14px", background: ready ? "var(--ec-btn-bg)" : "var(--ec-line)", color: ready ? "var(--ec-btn-text)" : "var(--ec-ink-faint)", border: "none", borderRadius: "12px", fontFamily: "inherit", fontSize: "15px", fontWeight: 700, cursor: ready ? "pointer" : "not-allowed", transition: "all 0.18s", boxShadow: ready ? "var(--ec-shadow-btn)" : "none" }}>
        {loading ? "Joining..." : "Join the Waitlist"}
      </button>
      <p style={{ fontSize: "11px", color: "var(--ec-ink-faint)", textAlign: "center" }}>no spam · unsubscribe anytime</p>
    </div>
  );
}