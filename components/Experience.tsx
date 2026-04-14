"use client";
import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    company: "DataVision Analytics",
    role: "Data Scientist",
    period: "2023 — Present",
    location: "Remote",
    type: "Full-Time",
    color: "#c9a84c",
    summary:
      "Leading ML pipeline development for real-time customer churn prediction across 2M+ user base.",
    highlights: [
      "Built XGBoost ensemble model achieving 94% precision in churn detection, reducing customer loss by 31%",
      "Architected automated ETL pipeline processing 40GB/day using Apache Airflow + Spark",
      "Led A/B testing framework that increased revenue per user by 18% over two quarters",
      "Mentored 3 junior analysts on model interpretability and SHAP-based feature analysis",
    ],
    stack: ["Python", "XGBoost", "Apache Spark", "Airflow", "PostgreSQL", "Tableau"],
  },
  {
    company: "Nexus AI Labs",
    role: "ML Research Intern",
    period: "2022 — 2023",
    location: "Bangalore, IN",
    type: "Internship",
    color: "#e8855a",
    summary:
      "Researched NLP architectures for low-resource Indic language understanding tasks.",
    highlights: [
      "Fine-tuned mBERT and IndicBERT for sentiment analysis on Hindi-English code-mixed data",
      "Achieved SOTA F1-score of 0.87 on benchmark dataset, published at internal symposium",
      "Developed data augmentation pipeline using back-translation for low-resource settings",
      "Contributed to open-source library for Indic NLP preprocessing (680+ GitHub stars)",
    ],
    stack: ["Python", "HuggingFace", "PyTorch", "BERT", "FastAPI", "Wandb"],
  },
  {
    company: "FinSight Technologies",
    role: "Data Analyst",
    period: "2021 — 2022",
    location: "Mumbai, IN",
    type: "Full-Time",
    color: "#5aa8e8",
    summary:
      "Built dashboards and predictive models for equity research and portfolio risk management.",
    highlights: [
      "Designed real-time risk scoring dashboard for 15-analyst team using Tableau + Python",
      "Built time-series forecasting model (ARIMA + LSTM hybrid) for commodity price prediction",
      "Automated 14 manual reporting workflows, saving ~120 analyst-hours monthly",
      "Developed Monte Carlo simulation engine for portfolio stress-testing",
    ],
    stack: ["Python", "Pandas", "Tableau", "SQL", "Sklearn", "Excel VBA"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

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
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@1,300&display=swap');

        .exp-root {
          background: #0a0805;
          padding: 8rem 3rem;
          position: relative;
          overflow: hidden;
        }

        .exp-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 80% 30%, rgba(201,168,76,0.035) 0%, transparent 70%);
          pointer-events: none;
        }

        .exp-ghost {
          position: absolute;
          top: -2rem;
          right: -1rem;
          font-family: 'Playfair Display', serif;
          font-size: 22vw;
          font-weight: 900;
          color: rgba(245,234,216,0.018);
          line-height: 1;
          user-select: none;
          pointer-events: none;
          letter-spacing: -0.04em;
        }

        .exp-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .exp-header {
          margin-bottom: 5rem;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .exp-header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .exp-label {
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

        .exp-label::after {
          content: '';
          flex: 1;
          max-width: 60px;
          height: 1px;
          background: #c9a84c;
          opacity: 0.4;
        }

        .exp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 900;
          color: #f5ead8;
          line-height: 1.05;
          letter-spacing: -0.02em;
        }

        .exp-title em {
          font-style: italic;
          font-weight: 400;
          color: rgba(245,234,216,0.45);
        }

        /* Timeline layout */
        .exp-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 0;
        }

        /* Left - nav tabs */
        .exp-tabs {
          border-right: 1px solid rgba(245,234,216,0.08);
          padding-right: 2rem;
        }

        .exp-tab {
          padding: 1.5rem 0;
          cursor: pointer;
          border-bottom: 1px solid rgba(245,234,216,0.05);
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.5s ease, transform 0.5s ease, background 0.25s;
          position: relative;
        }

        .exp-tab::before {
          content: '';
          position: absolute;
          right: -2rem;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 2px;
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
        }

        .exp-tab.active::before {
          width: 2rem;
        }

        .exp-tab.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .exp-tab-company {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(245,234,216,0.4);
          margin-bottom: 4px;
          transition: color 0.25s;
        }

        .exp-tab.active .exp-tab-company {
          color: #c9a84c;
        }

        .exp-tab-role {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          color: rgba(245,234,216,0.55);
          transition: color 0.25s;
        }

        .exp-tab.active .exp-tab-role {
          color: #f5ead8;
        }

        .exp-tab-period {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          color: rgba(245,234,216,0.25);
          margin-top: 4px;
          transition: color 0.25s;
        }

        .exp-tab.active .exp-tab-period {
          color: rgba(245,234,216,0.45);
        }

        /* Right - content panel */
        .exp-panel {
          padding-left: 3.5rem;
        }

        .exp-card {
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .exp-card.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .exp-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .exp-card-company {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 900;
          color: #f5ead8;
          letter-spacing: -0.01em;
          line-height: 1;
        }

        .exp-card-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          align-items: flex-start;
        }

        .exp-badge {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.3rem 0.7rem;
          border-radius: 2px;
          border: 1px solid;
        }

        .exp-badge-type {
          border-color: rgba(201,168,76,0.35);
          color: #c9a84c;
          background: rgba(201,168,76,0.06);
        }

        .exp-badge-loc {
          border-color: rgba(245,234,216,0.12);
          color: rgba(245,234,216,0.4);
        }

        .exp-card-role-line {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245,234,216,0.35);
          margin-bottom: 1.5rem;
        }

        .exp-accent-line {
          width: 40px;
          height: 2px;
          margin-bottom: 1.5rem;
          transition: background 0.3s;
        }

        .exp-summary {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.2rem;
          font-weight: 300;
          color: rgba(245,234,216,0.65);
          line-height: 1.6;
          margin-bottom: 2rem;
          border-left: 2px solid;
          padding-left: 1rem;
        }

        .exp-highlights {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .exp-highlight {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          line-height: 1.7;
          color: rgba(245,234,216,0.55);
          padding-left: 1.5rem;
          position: relative;
        }

        .exp-highlight::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #c9a84c;
          opacity: 0.7;
        }

        .exp-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .exp-stack-chip {
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(245,234,216,0.4);
          border: 1px solid rgba(245,234,216,0.1);
          padding: 0.3rem 0.65rem;
          border-radius: 2px;
          transition: all 0.2s;
        }

        .exp-stack-chip:hover {
          border-color: rgba(201,168,76,0.4);
          color: #c9a84c;
          background: rgba(201,168,76,0.05);
        }

        @media (max-width: 768px) {
          .exp-layout { grid-template-columns: 1fr; }
          .exp-tabs { border-right: none; border-bottom: 1px solid rgba(245,234,216,0.08); padding-right: 0; padding-bottom: 1rem; margin-bottom: 2rem; display: flex; gap: 0; overflow-x: auto; }
          .exp-tab { border-bottom: none; border-right: 1px solid rgba(245,234,216,0.05); padding: 1rem 1.5rem; white-space: nowrap; }
          .exp-tab::before { display: none; }
          .exp-panel { padding-left: 0; }
        }
      `}</style>

      <section className="exp-root" id="experience" ref={sectionRef}>
        <div className="exp-ghost">03</div>

        <div className="exp-inner">
          <div className={`exp-header ${visible ? "visible" : ""}`}>
            <p className="exp-label">Career</p>
            <h2 className="exp-title">
              Where I've <em>worked &</em>
              <br />what I've built.
            </h2>
          </div>

          <div className="exp-layout">
            {/* Tabs */}
            <div className="exp-tabs">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className={`exp-tab ${visible ? "visible" : ""} ${activeIdx === i ? "active" : ""}`}
                  style={{
                    transitionDelay: `${0.15 + i * 0.1}s`,
                    "--tab-color": exp.color,
                  } as React.CSSProperties}
                  onClick={() => setActiveIdx(i)}
                >
                  <div className="exp-tab-company">{exp.company}</div>
                  <div className="exp-tab-role">{exp.role}</div>
                  <div className="exp-tab-period">{exp.period}</div>
                </div>
              ))}
            </div>

            {/* Panel */}
            <div className="exp-panel">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className={`exp-card ${activeIdx === i && visible ? "visible" : ""}`}
                  style={{ display: activeIdx === i ? "block" : "none" }}
                >
                  <div className="exp-card-top">
                    <div>
                      <div className="exp-card-company">{exp.company}</div>
                      <div className="exp-card-role-line">{exp.role} · {exp.period}</div>
                    </div>
                    <div className="exp-card-badges">
                      <span className="exp-badge exp-badge-type">{exp.type}</span>
                      <span className="exp-badge exp-badge-loc">{exp.location}</span>
                    </div>
                  </div>

                  <div className="exp-accent-line" style={{ background: exp.color }} />

                  <p
                    className="exp-summary"
                    style={{ borderColor: exp.color + "60" }}
                  >
                    {exp.summary}
                  </p>

                  <ul className="exp-highlights">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="exp-highlight">{h}</li>
                    ))}
                  </ul>

                  <div className="exp-stack">
                    {exp.stack.map((s) => (
                      <span key={s} className="exp-stack-chip">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}