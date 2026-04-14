"use client";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: "01",
    title: "Sentiment Pulse",
    subtitle: "Real-time Social Intelligence",
    description:
      "Built an end-to-end NLP pipeline that ingests 50k+ tweets daily, applies fine-tuned BERT for multi-class sentiment classification, and surfaces live brand perception dashboards with 94% accuracy.",
    tags: ["NLP", "BERT", "Python", "Streamlit", "Twitter API"],
    metric: "94%",
    metricLabel: "Accuracy",
    accent: "#c9a96e",
    link: "#",
    category: "Natural Language Processing",
  },
  {
    id: "02",
    title: "ChurnGuard",
    subtitle: "Predictive Customer Retention",
    description:
      "Engineered a customer churn prediction system using XGBoost + SHAP explainability, deployed as a FastAPI microservice. Reduced churn by identifying at-risk customers 30 days in advance.",
    tags: ["XGBoost", "SHAP", "FastAPI", "SQL", "Scikit-learn"],
    metric: "30d",
    metricLabel: "Early Warning",
    accent: "#7ab8c9",
    link: "#",
    category: "Machine Learning",
  },
  {
    id: "03",
    title: "VisualQuery",
    subtitle: "Natural Language → SQL Engine",
    description:
      "Developed a Text-to-SQL tool using GPT-4 with custom prompt engineering and schema-injection, enabling analysts to query databases using plain English. Reduced query time by 70%.",
    tags: ["LLM", "GPT-4", "SQL", "LangChain", "Pandas"],
    metric: "70%",
    metricLabel: "Time Saved",
    accent: "#e07b6a",
    link: "#",
    category: "Generative AI",
  },
  {
    id: "04",
    title: "EcoLens",
    subtitle: "Climate Data Visualisation",
    description:
      "Designed an interactive climate storytelling dashboard using D3.js + Tableau, visualising 60 years of NOAA data. Featured in university research symposium.",
    tags: ["D3.js", "Tableau", "Python", "NOAA API", "Data Viz"],
    metric: "60yr",
    metricLabel: "Data Range",
    accent: "#98c9a3",
    link: "#",
    category: "Data Visualisation",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,600&display=swap');

        .proj-section {
          background: #13100d;
          padding: 130px 0 140px;
          position: relative;
          overflow: hidden;
        }

        .proj-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 10% 80%, rgba(201,169,110,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 90% 20%, rgba(122,184,201,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .proj-eyebrow {
          position: absolute;
          top: 60px;
          left: 5%;
          font-family: 'Playfair Display', serif;
          font-size: clamp(80px, 14vw, 180px);
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 1px rgba(245,237,224,0.04);
          line-height: 1;
          user-select: none;
          pointer-events: none;
        }

        .proj-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
        }

        /* Header row */
        .proj-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 80px;
          gap: 24px;
          flex-wrap: wrap;
        }

        .proj-header-left {}

        .proj-tag {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 14px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .proj-tag.vis { opacity: 1; transform: translateY(0); }

        .proj-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(40px, 5vw, 68px);
          font-weight: 400;
          color: #f5ede0;
          line-height: 1.05;
          margin: 0;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }
        .proj-title.vis { opacity: 1; transform: translateY(0); }
        .proj-title em {
          font-style: italic;
          color: #c9a96e;
        }

        .proj-count {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(245,237,224,0.25);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0;
          transition: opacity 0.7s ease 0.3s;
          padding-bottom: 6px;
        }
        .proj-count.vis { opacity: 1; }

        /* Cards grid - 2 col */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
        }

        @media (max-width: 860px) {
          .proj-grid { grid-template-columns: 1fr; }
        }

        .proj-card {
          position: relative;
          background: rgba(255,255,255,0.018);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 44px 40px 36px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.35s ease, background 0.35s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
          opacity: 0;
          transform: translateY(30px);
        }
        .proj-card.vis {
          opacity: 1;
          transform: translateY(0);
        }
        .proj-card:hover {
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.035);
          transform: translateY(-4px);
          z-index: 2;
        }

        /* Accent line top */
        .proj-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .proj-card:hover::before { transform: scaleX(1); }

        /* Number + category row */
        .proj-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .proj-num {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(245,237,224,0.2);
        }

        .proj-category {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 5px 12px;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(245,237,224,0.35);
          transition: border-color 0.3s ease, color 0.3s ease;
        }
        .proj-card:hover .proj-category {
          border-color: rgba(255,255,255,0.2);
          color: rgba(245,237,224,0.6);
        }

        /* Title block */
        .proj-card-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 2.8vw, 34px);
          font-weight: 400;
          color: #f5ede0;
          line-height: 1.15;
          margin: 0 0 6px;
          transition: color 0.3s ease;
        }

        .proj-card-subtitle {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: rgba(245,237,224,0.35);
          margin-bottom: 22px;
          text-transform: uppercase;
        }

        /* Separator */
        .proj-card-sep {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 0 0 22px;
          transform: scaleX(0.3);
          transform-origin: left;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s;
        }
        .proj-card:hover .proj-card-sep { transform: scaleX(1); }

        .proj-card-desc {
          font-family: 'DM Mono', monospace;
          font-size: 12.5px;
          line-height: 1.9;
          color: rgba(245,237,224,0.45);
          margin-bottom: 28px;
          transition: color 0.3s ease;
        }
        .proj-card:hover .proj-card-desc { color: rgba(245,237,224,0.6); }

        /* Tags */
        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 32px;
        }

        .proj-tag-pill {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          padding: 5px 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(245,237,224,0.4);
          transition: all 0.25s ease;
        }
        .proj-card:hover .proj-tag-pill {
          background: rgba(255,255,255,0.07);
          color: rgba(245,237,224,0.6);
        }

        /* Footer: metric + arrow */
        .proj-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .proj-metric {
          display: flex;
          flex-direction: column;
        }

        .proj-metric-value {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 4px;
        }

        .proj-metric-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(245,237,224,0.3);
        }

        .proj-arrow {
          width: 44px; height: 44px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: rgba(245,237,224,0.3);
          font-size: 16px;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .proj-card:hover .proj-arrow {
          border-color: rgba(255,255,255,0.5);
          color: #f5ede0;
          transform: translate(3px, -3px);
        }

        /* Bottom CTA */
        .proj-cta {
          display: flex;
          justify-content: center;
          margin-top: 64px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.8s, transform 0.7s ease 0.8s;
        }
        .proj-cta.vis { opacity: 1; transform: translateY(0); }

        .proj-cta-link {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245,237,224,0.35);
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 1px solid rgba(245,237,224,0.15);
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .proj-cta-link:hover {
          color: #c9a96e;
          border-color: #c9a96e;
        }
        .proj-cta-link span { transition: transform 0.3s ease; }
        .proj-cta-link:hover span { transform: translateX(4px); }
      `}</style>

      <section ref={sectionRef} className="proj-section" id="projects">
        <div className="proj-eyebrow">04</div>

        <div className="proj-inner">
          {/* Header */}
          <div className="proj-header">
            <div className="proj-header-left">
              <div className={`proj-tag ${visible ? "vis" : ""}`}>Selected Work</div>
              <h2 className={`proj-title ${visible ? "vis" : ""}`}>
                Projects that<br /><em>move the needle</em>
              </h2>
            </div>
            <div className={`proj-count ${visible ? "vis" : ""}`}>
              {String(projects.length).padStart(2, "0")} Projects
            </div>
          </div>

          {/* Cards */}
          <div className="proj-grid">
            {projects.map((proj, i) => (
              <div
                key={proj.id}
                className={`proj-card ${visible ? "vis" : ""}`}
                style={{
                  transitionDelay: `${0.15 + i * 0.1}s`,
                  "--accent": proj.accent,
                } as React.CSSProperties}
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Accent top line via inline style override */}
                <style>{`
                  .proj-card:nth-child(${i + 1})::before {
                    background: linear-gradient(90deg, ${proj.accent}, transparent);
                  }
                `}</style>

                <div className="proj-card-meta">
                  <span className="proj-num">{proj.id}</span>
                  <span className="proj-category">{proj.category}</span>
                </div>

                <h3 className="proj-card-title">{proj.title}</h3>
                <div className="proj-card-subtitle">{proj.subtitle}</div>
                <div className="proj-card-sep" />
                <p className="proj-card-desc">{proj.description}</p>

                <div className="proj-tags">
                  {proj.tags.map((t) => (
                    <span key={t} className="proj-tag-pill">{t}</span>
                  ))}
                </div>

                <div className="proj-card-footer">
                  <div className="proj-metric">
                    <span className="proj-metric-value" style={{ color: proj.accent }}>
                      {proj.metric}
                    </span>
                    <span className="proj-metric-label">{proj.metricLabel}</span>
                  </div>
                  <a href={proj.link} className="proj-arrow" aria-label="View project">↗</a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={`proj-cta ${visible ? "vis" : ""}`}>
            <a href="#" className="proj-cta-link">
              View all projects on GitHub <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}