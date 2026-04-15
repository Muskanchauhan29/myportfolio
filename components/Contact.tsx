"use client";
import { useRef, useState } from "react";

interface ContactProps {
  glass?: boolean;
}

type Status = "idle" | "loading" | "success" | "error";

export default function Contact({ glass = false }: ContactProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill in name, email and message.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrorMsg("Something went wrong. Please try again or email me directly.");
      setStatus("error");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        .ct-section {
          background: #0e0b09;
          padding: 130px 0 140px;
          position: relative; overflow: hidden;
        }
        .ct-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 50% 60% at 80% 30%, rgba(201,169,110,0.05) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 10% 80%, rgba(122,184,201,0.04) 0%, transparent 60%);
          pointer-events: none;
        }
        .ct-ghost {
          position: absolute; bottom: 20px; right: 4%;
          font-family: 'Playfair Display', serif;
          font-size: clamp(100px, 16vw, 200px);
          font-weight: 700; color: transparent;
          -webkit-text-stroke: 1px rgba(201,169,110,0.05);
          line-height: 1; user-select: none; pointer-events: none;
        }
        .ct-inner {
          max-width: 1100px; margin: 0 auto; padding: 0 48px;
          position: relative; z-index: 1;
        }

        .ct-overline {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.32em; text-transform: uppercase; color: #c9a96e;
          margin-bottom: 16px;
        }
        .ct-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(40px, 5vw, 68px);
          font-weight: 400; color: #f5ede0; line-height: 1.05; margin: 0 0 20px;
        }
        .ct-h2 em { font-style: italic; color: #c9a96e; }
        .ct-sub {
          font-family: 'DM Mono', monospace; font-size: 12px;
          color: rgba(245,237,224,0.4); line-height: 1.8; max-width: 480px;
          margin-bottom: 64px;
        }

        .ct-layout {
          display: grid; grid-template-columns: 1fr 1.4fr; gap: 72px; align-items: start;
        }
        @media (max-width: 860px) { .ct-layout { grid-template-columns: 1fr; gap: 52px; } }

        /* Left: info */
        .ct-info-title {
          font-family: 'Playfair Display', serif; font-size: 22px;
          font-weight: 400; color: #f5ede0; margin: 0 0 32px;
        }
        .ct-info-item {
          display: flex; align-items: flex-start; gap: 16px;
          padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .ct-info-item:last-child { border-bottom: none; }
        .ct-info-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(201,169,110,0.25); color: #c9a96e;
          background: rgba(201,169,110,0.05);
          transition: background 0.25s, border-color 0.25s;
        }
        .ct-info-item:hover .ct-info-icon {
          background: rgba(201,169,110,0.1);
          border-color: rgba(201,169,110,0.45);
        }
        .ct-info-label {
          font-family: 'DM Mono', monospace; font-size: 9px;
          letter-spacing: 0.25em; text-transform: uppercase; color: rgba(245,237,224,0.3);
          margin-bottom: 4px;
        }
        .ct-info-value {
          font-family: 'DM Mono', monospace; font-size: 12px;
          color: rgba(245,237,224,0.65); text-decoration: none; transition: color 0.2s;
        }
        a.ct-info-value:hover { color: #c9a96e; }

        /* Right: form */
        .ct-form-box {
          padding: 48px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          transition: background 0.3s;
        }

        /* Glass mode */
        .glass-on .ct-form-box {
          background: rgba(255,255,255,0.04) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-color: rgba(255,255,255,0.1) !important;
          box-shadow: 0 16px 56px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        @media (max-width: 640px) { .ct-row { grid-template-columns: 1fr; } }

        .ct-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .ct-field:last-of-type { margin-bottom: 0; }

        .ct-label {
          font-family: 'DM Mono', monospace; font-size: 9px;
          letter-spacing: 0.25em; text-transform: uppercase; color: rgba(245,237,224,0.35);
        }

        .ct-input, .ct-textarea {
          font-family: 'DM Mono', monospace; font-size: 12px;
          color: #f5ede0; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 12px 16px; outline: none;
          transition: border-color 0.25s, background 0.25s;
          width: 100%; box-sizing: border-box;
        }
        .ct-input::placeholder, .ct-textarea::placeholder { color: rgba(245,237,224,0.2); }
        .ct-input:focus, .ct-textarea:focus {
          border-color: rgba(201,169,110,0.5);
          background: rgba(255,255,255,0.05);
        }
        .ct-textarea { resize: vertical; min-height: 140px; }

        .ct-submit {
          width: 100%; margin-top: 24px;
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #1C1713; background: #c9a96e;
          border: none; padding: 15px 32px;
          cursor: pointer; transition: background 0.25s, transform 0.2s;
          position: relative; overflow: hidden;
        }
        .ct-submit:hover:not(:disabled) { background: #d4b88a; transform: translateY(-2px); }
        .ct-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .ct-msg {
          margin-top: 16px;
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.1em; padding: 12px 16px; text-align: center;
        }
        .ct-msg.success { background: rgba(152,201,163,0.1); color: #98c9a3; border: 1px solid rgba(152,201,163,0.25); }
        .ct-msg.error { background: rgba(224,123,106,0.1); color: #e07b6a; border: 1px solid rgba(224,123,106,0.25); }

        /* Loading spinner */
        .ct-spinner {
          width: 14px; height: 14px;
          border: 1.5px solid rgba(28,23,19,0.3);
          border-top-color: #1C1713;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block; vertical-align: middle; margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <section
        ref={sectionRef}
        className={`ct-section${glass ? " glass-on" : ""}`}
        id="contact"
      >
        <div className="ct-ghost">06</div>
        <div className="ct-inner">
          <div className="ct-overline">Get In Touch</div>
          <h2 className="ct-h2">
            Let's work<br /><em>together</em>
          </h2>
          <p className="ct-sub">
            Open to collaborations, research opportunities, and conversations
            about data, ML, and building things that matter.
          </p>

          <div className="ct-layout">
            {/* Info */}
            <div>
              <div className="ct-info-title">Contact Details</div>
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  label: "Email", value: "muskchauhan296@gmail.com", href: "mailto:muskchauhan296@gmail.com",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="8.5" cy="11.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
                      <path d="M14 8.5h2M14 11.5h2M14 14.5h1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      <path d="M8.5 14v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      <circle cx="8.5" cy="6.5" r="1" fill="currentColor"/>
                    </svg>
                  ),
                  label: "LinkedIn", value: "linkedin.com", href: "https://www.linkedin.com/in/muskan-chauhan-615619280/",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.254-.447-1.27.097-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.376.202 2.392.1 2.646.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                    </svg>
                  ),
                  label: "GitHub", value: "github.com", href: "https://www.linkedin.com/in/muskan-chauhan-615619280/",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 13 6 13s6-8.5 6-13c0-3.314-2.686-6-6-6z" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
                    </svg>
                  ),
                  label: "Location", value: "India · Open to Remote", href: null,
                },
              ].map((item) => (
                <div key={item.label} className="ct-info-item">
                  <div className="ct-info-icon">{item.icon}</div>
                  <div>
                    <div className="ct-info-label">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="ct-info-value">{item.value}</a>
                    ) : (
                      <span className="ct-info-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="ct-form-box">
              <div className="ct-row">
                <div className="ct-field">
                  <label className="ct-label">Your Name</label>
                  <input
                    className="ct-input"
                    name="name"
                    placeholder="Priya Sharma"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="ct-field">
                  <label className="ct-label">Email Address</label>
                  <input
                    className="ct-input"
                    name="email"
                    type="email"
                    placeholder="priya@company.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="ct-field">
                <label className="ct-label">Subject</label>
                <input
                  className="ct-input"
                  name="subject"
                  placeholder="Collaboration / Opportunity / Research"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="ct-field">
                <label className="ct-label">Message</label>
                <textarea
                  className="ct-textarea"
                  name="message"
                  placeholder="Tell me about the project, idea, or opportunity..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <button
                className="ct-submit"
                onClick={handleSubmit}
                disabled={status === "loading"}
              >
                {status === "loading" && <span className="ct-spinner" />}
                {status === "loading" ? "Sending..." : "Send Message →"}
              </button>

              {status === "success" && (
                <div className="ct-msg success">
                  ✓ Message sent! I'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="ct-msg error">
                  ✕ {errorMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}