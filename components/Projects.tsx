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
    github: "#",
    category: "Natural Language Processing",
    featured: true,
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
    github: "#",
    category: "Machine Learning",
    featured: false,
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
    github: "#",
    category: "Generative AI",
    featured: false,
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
    github: "#",
    category: "Data Visualisation",
    featured: false,
  },
];

interface ProjectsProps {
  glass?: boolean;
}

export default function Projects({ glass = false }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Mono:wght@300;400;500&display=swap');

        .p2-section {
          background: #13100d;
          padding: 130px 0 140px;
          position: relative; overflow: hidden;
        }
        .p2-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 10% 80%, rgba(201,169,110,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 90% 20%, rgba(122,184,201,0.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .p2-eyebrow {
          position: absolute; top: 60px; left: 5%;
          font-family: 'Playfair Display', serif;
          font-size: clamp(80px, 14vw, 180px);
          font-weight: 700; color: transparent;
          -webkit-text-stroke: 1px rgba(245,237,224,0.04);
          line-height: 1; user-select: none; pointer-events: none;
        }
        .p2-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 48px;
          position: relative; z-index: 1;
        }

        /* Header */
        .p2-tag {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e;
          margin-bottom: 14px;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .p2-tag.vis { opacity: 1; transform: translateY(0); }

        .p2-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 72px; gap: 24px; flex-wrap: wrap;
        }
        .p2-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(40px, 5vw, 68px);
          font-weight: 400; color: #f5ede0; line-height: 1.05; margin: 0;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }
        .p2-title.vis { opacity: 1; transform: translateY(0); }
        .p2-title em { font-style: italic; color: #c9a96e; }

        .p2-count {
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: rgba(245,237,224,0.25); letter-spacing: 0.15em; text-transform: uppercase;
          opacity: 0; transition: opacity 0.7s ease 0.3s; padding-bottom: 6px;
        }
        .p2-count.vis { opacity: 1; }

        /* ---- FEATURED CARD ---- */
        .p2-featured {
          position: relative;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          padding: 56px 52px;
          margin-bottom: 2px;
          overflow: hidden;
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s,
                      background 0.35s, border-color 0.35s;
        }
        .p2-featured.vis { opacity: 1; transform: translateY(0); }
        .p2-featured:hover {
          background: rgba(255,255,255,0.035);
          border-color: rgba(255,255,255,0.13);
        }
        .p2-featured::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #c9a96e, transparent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .p2-featured:hover::before { transform: scaleX(1); }

        /* glass mode */
        .glass-on .p2-featured, .glass-on .p2-card {
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
        }
        .glass-on .p2-featured {
          background: rgba(255,255,255,0.04) !important;
          border-color: rgba(255,255,255,0.1) !important;
          box-shadow: 0 12px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .glass-on .p2-featured:hover {
          background: rgba(255,255,255,0.07) !important;
        }
        .glass-on .p2-card {
          background: rgba(255,255,255,0.03) !important;
          border-color: rgba(255,255,255,0.08) !important;
        }
        .glass-on .p2-card:hover {
          background: rgba(255,255,255,0.06) !important;
        }

        .p2-feat-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'DM Mono', monospace; font-size: 9px;
          letter-spacing: 0.25em; text-transform: uppercase; color: #c9a96e;
          border: 1px solid rgba(201,169,110,0.3); padding: 5px 12px;
          margin-bottom: 28px;
        }
        .p2-feat-badge::before { content: '★'; }

        .p2-feat-body {
          display: grid; grid-template-columns: 1fr 1fr; gap: 52px;
          align-items: start;
        }
        @media (max-width: 760px) { .p2-feat-body { grid-template-columns: 1fr; } }

        .p2-feat-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 400; color: #f5ede0; line-height: 1.1; margin: 0 0 8px;
        }
        .p2-feat-sub {
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(245,237,224,0.35); margin-bottom: 24px;
        }
        .p2-feat-desc {
          font-family: 'DM Mono', monospace; font-size: 12.5px;
          line-height: 1.9; color: rgba(245,237,224,0.5); margin-bottom: 28px;
        }
        .p2-feat-links {
          display: flex; gap: 14px; align-items: center;
        }
        .p2-link-primary {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none;
          color: #1C1713; background: #c9a96e;
          padding: 10px 22px; transition: background 0.25s, transform 0.2s;
        }
        .p2-link-primary:hover { background: #d4b88a; transform: translateY(-2px); }
        .p2-link-ghost {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none;
          color: rgba(245,237,224,0.45); border: 1px solid rgba(255,255,255,0.12);
          padding: 9px 22px; transition: all 0.25s;
        }
        .p2-link-ghost:hover { border-color: rgba(255,255,255,0.35); color: #f5ede0; }

        .p2-feat-right {
          display: flex; flex-direction: column; gap: 24px;
        }
        .p2-feat-metric {
          display: flex; flex-direction: column;
        }
        .p2-feat-mv {
          font-family: 'Playfair Display', serif; font-size: 72px;
          font-weight: 700; color: #c9a96e; line-height: 1;
        }
        .p2-feat-ml {
          font-family: 'DM Mono', monospace; font-size: 9px;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(245,237,224,0.3); margin-top: 4px;
        }
        .p2-feat-tags {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .p2-tag-pill {
          font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em;
          padding: 5px 12px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08); color: rgba(245,237,224,0.4);
          transition: all 0.25s;
        }
        .p2-featured:hover .p2-tag-pill { color: rgba(245,237,224,0.65); }

        /* ---- SMALL CARDS GRID ---- */
        .p2-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;
        }
        @media (max-width: 860px) { .p2-grid { grid-template-columns: 1fr; } }

        .p2-card {
          position: relative; background: rgba(255,255,255,0.018);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 40px 36px 32px; overflow: hidden; cursor: pointer;
          transition: border-color 0.35s, background 0.35s, transform 0.4s cubic-bezier(0.16,1,0.3,1);
          opacity: 0; transform: translateY(30px);
        }
        .p2-card.vis { opacity: 1; transform: translateY(0); }
        .p2-card:hover {
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.035);
          transform: translateY(-4px); z-index: 2;
        }

        .p2-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .p2-card:hover::before { transform: scaleX(1); }

        .p2-card-meta {
          display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
        }
        .p2-num { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.2em; color: rgba(245,237,224,0.2); }
        .p2-cat {
          font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.22em;
          text-transform: uppercase; padding: 4px 10px;
          border: 1px solid rgba(255,255,255,0.1); color: rgba(245,237,224,0.35);
          transition: all 0.3s;
        }
        .p2-card:hover .p2-cat { border-color: rgba(255,255,255,0.2); color: rgba(245,237,224,0.6); }

        .p2-card-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 400; color: #f5ede0; margin: 0 0 6px; }
        .p2-card-sub { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(245,237,224,0.3); margin-bottom: 18px; }
        .p2-card-sep { height: 1px; background: rgba(255,255,255,0.06); margin: 0 0 18px; transform: scaleX(0.3); transform-origin: left; transition: transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s; }
        .p2-card:hover .p2-card-sep { transform: scaleX(1); }
        .p2-card-desc { font-family: 'DM Mono', monospace; font-size: 12px; line-height: 1.85; color: rgba(245,237,224,0.42); margin-bottom: 22px; transition: color 0.3s; }
        .p2-card:hover .p2-card-desc { color: rgba(245,237,224,0.6); }
        .p2-card-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 24px; }

        .p2-card-footer { display: flex; justify-content: space-between; align-items: flex-end; }
        .p2-metric { display: flex; flex-direction: column; }
        .p2-mv { font-family: 'Playfair Display', serif; font-size: 38px; font-weight: 700; line-height: 1; margin-bottom: 4px; }
        .p2-ml { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(245,237,224,0.3); }

        .p2-arrow {
          width: 40px; height: 40px;
          border: 1px solid rgba(255,255,255,0.1); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: rgba(245,237,224,0.3); font-size: 14px; text-decoration: none;
          transition: all 0.3s;
        }
        .p2-card:hover .p2-arrow { border-color: rgba(255,255,255,0.5); color: #f5ede0; transform: translate(3px,-3px); }

        /* CTA */
        .p2-cta {
          display: flex; justify-content: center; margin-top: 64px;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.7s ease 0.8s, transform 0.7s ease 0.8s;
        }
        .p2-cta.vis { opacity: 1; transform: translateY(0); }
        .p2-cta-link {
          display: flex; align-items: center; gap: 12px;
          font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(245,237,224,0.35); text-decoration: none;
          padding-bottom: 4px; border-bottom: 1px solid rgba(245,237,224,0.15);
          transition: color 0.3s, border-color 0.3s;
        }
        .p2-cta-link:hover { color: #c9a96e; border-color: #c9a96e; }
        .p2-cta-link span { transition: transform 0.3s; }
        .p2-cta-link:hover span { transform: translateX(4px); }
      `}</style>

      <section
        ref={sectionRef}
        className={`p2-section${glass ? " glass-on" : ""}`}
        id="projects"
      >
        <div className="p2-eyebrow">04</div>
        <div className="p2-inner">
          {/* Header */}
          <div className="p2-header">
            <div>
              <div className={`p2-tag ${visible ? "vis" : ""}`}>Selected Work</div>
              <h2 className={`p2-title ${visible ? "vis" : ""}`}>
                Projects that<br /><em>move the needle</em>
              </h2>
            </div>
            <div className={`p2-count ${visible ? "vis" : ""}`}>
              {String(projects.length).padStart(2, "0")} Projects
            </div>
          </div>

          {/* Featured */}
          <div className={`p2-featured ${visible ? "vis" : ""}`}>
            <div className="p2-feat-badge">Featured Project</div>
            <div className="p2-feat-body">
              <div>
                <h3 className="p2-feat-title">{featured.title}</h3>
                <div className="p2-feat-sub">{featured.subtitle}</div>
                <p className="p2-feat-desc">{featured.description}</p>
                <div className="p2-feat-links">
                  <a href={featured.link} className="p2-link-primary">Live Demo ↗</a>
                  <a href={featured.github} className="p2-link-ghost">View Code</a>
                </div>
              </div>
              <div className="p2-feat-right">
                <div className="p2-feat-metric">
                  <span className="p2-feat-mv" style={{ color: featured.accent }}>{featured.metric}</span>
                  <span className="p2-feat-ml">{featured.metricLabel}</span>
                </div>
                <div className="p2-feat-tags">
                  {featured.tags.map((t) => (
                    <span key={t} className="p2-tag-pill">{t}</span>
                  ))}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,237,224,0.2)" }}>
                  {featured.category}
                </div>
              </div>
            </div>
          </div>

          {/* Rest of projects */}
          <div className="p2-grid">
            {rest.map((proj, i) => (
              <div
                key={proj.id}
                className={`p2-card ${visible ? "vis" : ""}`}
                style={{ transitionDelay: `${0.35 + i * 0.1}s` }}
              >
                <style>{`.p2-grid > div:nth-child(${i + 1})::before { background: linear-gradient(90deg, ${proj.accent}, transparent); }`}</style>

                <div className="p2-card-meta">
                  <span className="p2-num">{proj.id}</span>
                  <span className="p2-cat">{proj.category}</span>
                </div>

                <h3 className="p2-card-title">{proj.title}</h3>
                <div className="p2-card-sub">{proj.subtitle}</div>
                <div className="p2-card-sep" />
                <p className="p2-card-desc">{proj.description}</p>

                <div className="p2-card-tags">
                  {proj.tags.map((t) => (
                    <span key={t} className="p2-tag-pill">{t}</span>
                  ))}
                </div>

                <div className="p2-card-footer">
                  <div className="p2-metric">
                    <span className="p2-mv" style={{ color: proj.accent }}>{proj.metric}</span>
                    <span className="p2-ml">{proj.metricLabel}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <a href={proj.link} className="p2-arrow" title="Live Demo">↗</a>
                    <a href={proj.github} className="p2-arrow" title="GitHub" style={{ fontSize: 11, fontFamily: "DM Mono, monospace" }}>gh</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={`p2-cta ${visible ? "vis" : ""}`}>
            <a href="#" className="p2-cta-link">
              View all projects on GitHub <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}