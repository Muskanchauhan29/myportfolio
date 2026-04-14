"use client";
import { useEffect, useRef, useState } from "react";

const certs = [
  {
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "Oct 2023",
    credId: "TF-2023-847263",
    color: "#FF6F00",
    icon: "◈",
    tags: ["Deep Learning", "Neural Networks", "Computer Vision"],
    verify: "#",
  },
  {
    title: "AWS Certified Machine Learning — Specialty",
    issuer: "Amazon Web Services",
    date: "Jul 2023",
    credId: "AWS-MLS-C01-982134",
    color: "#FF9900",
    icon: "⬡",
    tags: ["MLOps", "SageMaker", "Cloud Deployment"],
    verify: "#",
  },
  {
    title: "Professional Data Engineer",
    issuer: "Google Cloud",
    date: "Mar 2023",
    credId: "GCP-PDE-2023-47821",
    color: "#4285F4",
    icon: "◇",
    tags: ["BigQuery", "Dataflow", "Pub/Sub"],
    verify: "#",
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI / Coursera",
    date: "Nov 2022",
    credId: "DLAI-DLS-2022-6234",
    color: "#c9a84c",
    icon: "△",
    tags: ["CNNs", "RNNs", "Sequence Models"],
    verify: "#",
  },
  {
    title: "Microsoft Azure Data Scientist Associate",
    issuer: "Microsoft",
    date: "Aug 2022",
    credId: "AZ-DP100-2022-11724",
    color: "#00A4EF",
    icon: "⬢",
    tags: ["Azure ML", "MLflow", "AutoML"],
    verify: "#",
  },
  {
    title: "Tableau Desktop Specialist",
    issuer: "Salesforce / Tableau",
    date: "Jan 2022",
    credId: "TDS-2022-38214",
    color: "#E97627",
    icon: "▣",
    tags: ["Data Viz", "Dashboards", "Analytics"],
    verify: "#",
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .cert-root {
          background: #080604;
          padding: 8rem 3rem;
          position: relative;
          overflow: hidden;
        }

        .cert-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 50% 60% at 20% 70%, rgba(201,168,76,0.03) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 20%, rgba(90,168,232,0.025) 0%, transparent 60%);
          pointer-events: none;
        }

        .cert-ghost {
          position: absolute;
          bottom: -3rem;
          left: -1rem;
          font-family: 'Playfair Display', serif;
          font-size: 22vw;
          font-weight: 900;
          color: rgba(245,234,216,0.016);
          line-height: 1;
          user-select: none;
          pointer-events: none;
          letter-spacing: -0.04em;
        }

        .cert-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .cert-header {
          margin-bottom: 5rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .cert-header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cert-header-left {}

        .cert-label {
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

        .cert-label::after {
          content: '';
          width: 40px;
          height: 1px;
          background: #c9a84c;
          opacity: 0.4;
        }

        .cert-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 900;
          color: #f5ead8;
          line-height: 1.05;
          letter-spacing: -0.02em;
        }

        .cert-title em {
          font-style: italic;
          font-weight: 400;
          color: rgba(245,234,216,0.45);
        }

        .cert-count {
          font-family: 'Playfair Display', serif;
          font-size: 4rem;
          font-weight: 900;
          color: rgba(201,168,76,0.15);
          line-height: 1;
        }

        /* Grid */
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5px;
        }

        @media (max-width: 1024px) { .cert-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .cert-grid { grid-template-columns: 1fr; } }

        .cert-card {
          background: rgba(245,234,216,0.025);
          border: 1px solid rgba(245,234,216,0.06);
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.5s ease,
            transform 0.5s ease,
            background 0.3s,
            border-color 0.3s;
        }

        .cert-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--cert-color);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .cert-card:hover::before { opacity: 1; }

        .cert-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 60% at 50% -10%, var(--cert-color-faint) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s;
        }

        .cert-card:hover::after { opacity: 1; }

        .cert-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cert-card:hover {
          background: rgba(245,234,216,0.04);
          border-color: rgba(245,234,216,0.1);
          transform: translateY(-4px);
        }

        .cert-card-icon {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 0 12px var(--cert-color));
        }

        .cert-card-issuer {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(245,234,216,0.3);
          margin-bottom: 0.6rem;
          position: relative;
          z-index: 1;
        }

        .cert-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #f5ead8;
          line-height: 1.4;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .cert-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .cert-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--cert-color);
          border: 1px solid;
          border-color: var(--cert-color);
          opacity: 0.7;
          padding: 0.25rem 0.55rem;
          border-radius: 2px;
        }

        .cert-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }

        .cert-card-date {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          color: rgba(245,234,216,0.25);
        }

        .cert-verify-btn {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--cert-color);
          background: none;
          border: 1px solid;
          border-color: var(--cert-color);
          opacity: 0.6;
          padding: 0.3rem 0.7rem;
          cursor: pointer;
          transition: opacity 0.2s, background 0.2s;
          border-radius: 2px;
        }

        .cert-verify-btn:hover {
          opacity: 1;
          background: var(--cert-color);
          color: #0a0805;
        }
      `}</style>

      <section className="cert-root" id="certifications" ref={sectionRef}>
        <div className="cert-ghost">04</div>

        <div className="cert-inner">
          <div className={`cert-header ${visible ? "visible" : ""}`}>
            <div className="cert-header-left">
              <p className="cert-label">Credentials</p>
              <h2 className="cert-title">
                Certified <em>&</em>
                <br />validated.
              </h2>
            </div>
            <div className="cert-count">0{certs.length}</div>
          </div>

          <div className="cert-grid">
            {certs.map((c, i) => {
              const hex = c.color;
              const faint = hex + "18";
              return (
                <div
                  key={i}
                  className={`cert-card ${visible ? "visible" : ""}`}
                  style={{
                    transitionDelay: `${0.1 + i * 0.08}s`,
                    "--cert-color": hex,
                    "--cert-color-faint": faint,
                  } as React.CSSProperties}
                >
                  <div className="cert-card-icon" style={{ color: hex }}>{c.icon}</div>
                  <div className="cert-card-issuer">{c.issuer}</div>
                  <div className="cert-card-title">{c.title}</div>
                  <div className="cert-card-tags">
                    {c.tags.map((t) => (
                      <span key={t} className="cert-tag">{t}</span>
                    ))}
                  </div>
                  <div className="cert-card-footer">
                    <span className="cert-card-date">{c.date} · {c.credId}</span>
                    <button className="cert-verify-btn">Verify ↗</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}