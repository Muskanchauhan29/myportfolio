"use client";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <>
      <style>{`
        .contact-root {
          background: #0a0805;
          padding: 8rem 3rem;
          position: relative;
          overflow: hidden;
        }

        .contact-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 55% 50% at 60% 40%, rgba(201,168,76,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 10% 80%, rgba(232,133,90,0.025) 0%, transparent 60%);
          pointer-events: none;
        }

        .contact-ghost {
          position: absolute;
          top: -2rem;
          right: -1rem;
          font-family: 'Playfair Display', serif;
          font-size: 22vw;
          font-weight: 900;
          color: rgba(245,234,216,0.016);
          line-height: 1;
          user-select: none;
          pointer-events: none;
          letter-spacing: -0.04em;
        }

        .contact-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: start;
        }

        @media (max-width: 768px) {
          .contact-inner { grid-template-columns: 1fr; gap: 3rem; }
          .contact-root { padding: 5rem 1.5rem; }
        }

        /* LEFT */
        .contact-left {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .contact-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .contact-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .contact-label::after {
          content: '';
          width: 40px;
          height: 1px;
          background: #c9a84c;
          opacity: 0.4;
        }

        .contact-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 900;
          color: #f5ead8;
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
        }

        .contact-heading em {
          font-style: italic;
          font-weight: 400;
          color: rgba(245,234,216,0.4);
        }

        .contact-desc {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          line-height: 1.9;
          color: rgba(245,234,216,0.45);
          margin-bottom: 3rem;
          max-width: 360px;
        }

        .contact-channels {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .contact-channel {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          group: true;
          text-decoration: none;
        }

        .contact-channel-icon {
          width: 44px;
          height: 44px;
          border: 1px solid rgba(245,234,216,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: rgba(245,234,216,0.4);
          transition: all 0.3s;
          flex-shrink: 0;
        }

        .contact-channel:hover .contact-channel-icon {
          border-color: rgba(201,168,76,0.4);
          color: #c9a84c;
          background: rgba(201,168,76,0.06);
        }

        .contact-channel-info {}

        .contact-channel-type {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(245,234,216,0.25);
          margin-bottom: 2px;
        }

        .contact-channel-value {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          color: rgba(245,234,216,0.6);
          transition: color 0.2s;
        }

        .contact-channel:hover .contact-channel-value {
          color: #c9a84c;
        }

        /* RIGHT - Form */
        .contact-right {
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.7s 0.15s ease, transform 0.7s 0.15s ease;
        }

        .contact-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .form-group {
          position: relative;
          margin-bottom: 0;
          border-bottom: 1px solid rgba(245,234,216,0.08);
          transition: border-color 0.3s;
        }

        .form-group.focused {
          border-color: rgba(201,168,76,0.45);
        }

        .form-group:first-child {
          border-top: 1px solid rgba(245,234,216,0.08);
        }

        .form-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(245,234,216,0.25);
          padding: 1.2rem 0 0;
          display: block;
          transition: color 0.3s;
        }

        .form-group.focused .form-label {
          color: #c9a84c;
        }

        .form-input, .form-textarea {
          font-family: 'DM Mono', monospace;
          font-size: 0.85rem;
          color: #f5ead8;
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          padding: 0.4rem 0 1.2rem;
          resize: none;
          caret-color: #c9a84c;
        }

        .form-input::placeholder, .form-textarea::placeholder {
          color: rgba(245,234,216,0.18);
        }

        .form-textarea { min-height: 100px; }

        .form-submit {
          margin-top: 2rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: #c9a84c;
          color: #0a0805;
          border: none;
          padding: 1.1rem 2.5rem;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          align-self: flex-start;
          position: relative;
          overflow: hidden;
        }

        .form-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.15);
          transform: translateX(-100%);
          transition: transform 0.3s;
        }

        .form-submit:hover::after { transform: translateX(0); }
        .form-submit:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(201,168,76,0.3); }

        .contact-success {
          text-align: center;
          padding: 4rem 2rem;
          animation: fadeUp 0.6s ease forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .contact-success-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          display: block;
          color: #c9a84c;
          filter: drop-shadow(0 0 20px rgba(201,168,76,0.5));
        }

        .contact-success-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 900;
          color: #f5ead8;
          margin-bottom: 0.75rem;
        }

        .contact-success-sub {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          color: rgba(245,234,216,0.35);
        }
      `}</style>

      <section className="contact-root" id="contact" ref={sectionRef}>
        <div className="contact-ghost">05</div>

        <div className="contact-inner">
          {/* LEFT */}
          <div className={`contact-left ${visible ? "visible" : ""}`}>
            <p className="contact-label">Get in Touch</p>
            <h2 className="contact-heading">
              Let's build
              <br />
              something <em>together.</em>
            </h2>
            <p className="contact-desc">
              Open to full-time Data Science & ML Engineering roles, research
              collaborations, and freelance projects. I respond within 24 hours.
            </p>

            <div className="contact-channels">
              <a href="mailto:muskchauhan296@gmail.com" className="contact-channel">
                <div className="contact-channel-icon">✉</div>
                <div className="contact-channel-info">
                  <div className="contact-channel-type">Email</div>
                  <div className="contact-channel-value">muskchauhan296@gmail.com</div>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/muskan-chauhan-615619280/" target="_blank" className="contact-channel">
                <div className="contact-channel-icon">in</div>
                <div className="contact-channel-info">
                  <div className="contact-channel-type">LinkedIn</div>
                  <div className="contact-channel-value">linkedin.com/in/muskan</div>
                </div>
              </a>
              <a href="https://github.com/Muskanchauhan29" target="_blank" className="contact-channel">
                <div className="contact-channel-icon">⌥</div>
                <div className="contact-channel-info">
                  <div className="contact-channel-type">GitHub</div>
                  <div className="contact-channel-value">github.com/Muskanchauhan29</div>
                </div>
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className={`contact-right ${visible ? "visible" : ""}`}>
            {sent ? (
              <div className="contact-success">
                <span className="contact-success-icon">◈</span>
                <div className="contact-success-title">Message sent.</div>
                <p className="contact-success-sub">I'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <div className="contact-form">
                <div className={`form-group ${focused === "name" ? "focused" : ""}`}>
                  <label className="form-label">Name</label>
                  <input
                    className="form-input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div className={`form-group ${focused === "email" ? "focused" : ""}`}>
                  <label className="form-label">Email</label>
                  <input
                    className="form-input"
                    placeholder="your@email.com"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div className={`form-group ${focused === "message" ? "focused" : ""}`}>
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Tell me about the opportunity or project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <button className="form-submit" onClick={handleSubmit}>
                  Send Message →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}