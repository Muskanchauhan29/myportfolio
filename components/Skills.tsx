"use client";
import { useEffect, useRef, useState } from "react";

const FILTERS = ["All", "Languages", "AI & ML", "Data & Analytics", "Tools"];

const skillCategories = [
  {
    label: "Languages",
    filter: "Languages",
    color: "#c9a96e",
    skills: [
      { name: "Python", icon: "🐍", desc: "Primary language for ML & backend" },
      { name: "SQL", icon: "🗄️", desc: "Data querying & transformation" },
      { name: "R", icon: "📊", desc: "Statistical computing & analysis" },
    ],
  },
  {
    label: "AI & Machine Learning",
    filter: "AI & ML",
    color: "#e07b6a",
    skills: [
      { name: "Machine Learning", icon: "🤖", desc: "Supervised, unsupervised, ensemble" },
      { name: "Deep Learning", icon: "🧠", desc: "CNNs, RNNs, Transformers" },
      { name: "NLP", icon: "💬", desc: "BERT, GPT, text pipelines" },
    ],
  },
  {
    label: "Data & Analytics",
    filter: "Data & Analytics",
    color: "#7ab8c9",
    skills: [
      { name: "Data Visualization", icon: "📈", desc: "D3.js, Tableau, storytelling" },
      { name: "Statistical Analysis", icon: "📉", desc: "Hypothesis testing, regression" },
      { name: "Feature Engineering", icon: "⚙️", desc: "Dimensionality, selection, transforms" },
    ],
  },
];

const tools = [
  { name: "TensorFlow", color: "#FF8C42", tag: "Tools" },
  { name: "PyTorch", color: "#EE4C2C", tag: "Tools" },
  { name: "Scikit-learn", color: "#F89939", tag: "Tools" },
  { name: "Pandas", color: "#6C63FF", tag: "Tools" },
  { name: "NumPy", color: "#4DABCF", tag: "Tools" },
  { name: "Matplotlib", color: "#0B6FA4", tag: "Tools" },
  { name: "Tableau", color: "#E97627", tag: "Tools" },
  { name: "Power BI", color: "#F2C811", tag: "Tools" },
  { name: "Jupyter", color: "#F37626", tag: "Tools" },
  { name: "Streamlit", color: "#FF4B4B", tag: "Tools" },
  { name: "HuggingFace", color: "#FFD21E", tag: "Tools" },
  { name: "FastAPI", color: "#009688", tag: "Tools" },
];

interface SkillsProps {
  glass?: boolean;
}

export default function Skills({ glass = false }: SkillsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filteredCategories =
    activeFilter === "All" || activeFilter === "Tools"
      ? skillCategories
      : skillCategories.filter((c) => c.filter === activeFilter);

  const showTools = activeFilter === "All" || activeFilter === "Tools";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400;500&display=swap');

        .sk2-section {
          background: #0e0b09;
          padding: 130px 0 120px;
          position: relative;
          overflow: hidden;
        }
        .sk2-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 100% 0%, rgba(201,169,110,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 0% 100%, rgba(122,184,201,0.04) 0%, transparent 60%);
          pointer-events: none;
        }
        .sk2-ghost {
          position: absolute; top: 40px; right: 5%;
          font-family: 'Playfair Display', serif;
          font-size: clamp(100px, 16vw, 200px);
          font-weight: 700; color: transparent;
          -webkit-text-stroke: 1px rgba(201,169,110,0.06);
          line-height: 1; user-select: none; pointer-events: none;
        }
        .sk2-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 48px;
          position: relative; z-index: 1;
        }

        .sk2-overline {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.32em; text-transform: uppercase; color: #c9a96e;
          margin-bottom: 16px;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .sk2-overline.vis { opacity: 1; transform: translateY(0); }

        .sk2-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(40px, 5vw, 68px);
          font-weight: 400; color: #f5ede0; line-height: 1.05; margin: 0 0 48px;
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }
        .sk2-h2.vis { opacity: 1; transform: translateY(0); }
        .sk2-h2 em { font-style: italic; color: #c9a96e; }

        /* Filter tabs */
        .sk2-filters {
          display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 56px;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
        }
        .sk2-filters.vis { opacity: 1; transform: translateY(0); }

        .sk2-filter-btn {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 8px 18px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(245,237,224,0.35);
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative; overflow: hidden;
        }
        .sk2-filter-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(201,169,110,0.08);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s ease;
        }
        .sk2-filter-btn:hover::before { transform: scaleX(1); }
        .sk2-filter-btn:hover { color: rgba(245,237,224,0.7); border-color: rgba(255,255,255,0.2); }
        .sk2-filter-btn.active {
          background: rgba(201,169,110,0.12);
          border-color: #c9a96e;
          color: #c9a96e;
        }

        /* Category count badge */
        .sk2-filter-count {
          display: inline-flex; align-items: center; justify-content: center;
          width: 16px; height: 16px; border-radius: 50%;
          background: rgba(201,169,110,0.2);
          font-size: 8px; color: #c9a96e;
          margin-left: 6px;
        }

        /* Grid */
        .sk2-cats {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 2px; margin-bottom: 72px;
        }
        @media (max-width: 860px) { .sk2-cats { grid-template-columns: 1fr; } }

        .sk2-cat {
          padding: 40px 36px 36px;
          border: 1px solid rgba(255,255,255,0.05);
          position: relative; overflow: hidden;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.55s ease, transform 0.55s ease, background 0.3s, border-color 0.3s;
        }
        .sk2-cat.vis { opacity: 1; transform: translateY(0); }

        /* Normal mode */
        .sk2-cat { background: rgba(255,255,255,0.018); }
        .sk2-cat:hover { background: rgba(255,255,255,0.032); }

        /* Glass mode */
        .glass-on .sk2-cat {
          background: rgba(255,255,255,0.04) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.1) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .glass-on .sk2-cat:hover {
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(255,255,255,0.18) !important;
        }

        .sk2-cat::after {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .sk2-cat:hover::after { transform: scaleX(1); }

        .sk2-cat-label {
          font-family: 'DM Mono', monospace; font-size: 9px;
          letter-spacing: 0.3em; text-transform: uppercase;
          margin-bottom: 28px; display: flex; align-items: center; gap: 8px;
        }
        .sk2-cat-label::before { content: ''; width: 16px; height: 1px; background: currentColor; }

        .sk2-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: default; transition: padding-left 0.25s ease;
        }
        .sk2-item:last-child { border-bottom: none; }
        .sk2-item:hover { padding-left: 6px; }

        .sk2-icon-box {
          width: 44px; height: 44px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02); font-size: 18px;
          transition: background 0.25s, transform 0.25s;
        }
        .sk2-item:hover .sk2-icon-box {
          background: rgba(255,255,255,0.06);
          transform: scale(1.05);
        }

        .sk2-name {
          font-family: 'Playfair Display', serif; font-size: 17px;
          font-weight: 400; color: #f5ede0; font-style: italic; flex: 1;
          line-height: 1.2;
        }
        .sk2-desc {
          font-family: 'DM Mono', monospace; font-size: 10px;
          color: rgba(245,237,224,0.28); letter-spacing: 0.03em;
          margin-top: 3px;
        }

        /* Tools */
        .sk2-tools-hdr {
          display: flex; align-items: center; gap: 24px; margin-bottom: 32px;
        }
        .sk2-tools-lbl {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(245,237,224,0.25); white-space: nowrap;
        }
        .sk2-tools-rule { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }

        .sk2-tools-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(110px,1fr)); gap: 2px;
        }

        .sk2-tool {
          display: flex; flex-direction: column; align-items: center;
          gap: 9px; padding: 20px 12px;
          border: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.015);
          cursor: default; transition: all 0.25s ease;
          opacity: 0; transform: translateY(12px);
        }
        .sk2-tool.vis { opacity: 1; transform: translateY(0); }
        .sk2-tool:hover {
          background: rgba(255,255,255,0.045);
          border-color: rgba(255,255,255,0.13);
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.35);
        }

        /* Glass mode tools */
        .glass-on .sk2-tool {
          background: rgba(255,255,255,0.03) !important;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-color: rgba(255,255,255,0.08) !important;
        }
        .glass-on .sk2-tool:hover {
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(255,255,255,0.16) !important;
        }

        .sk2-tool-nm {
          font-family: 'DM Mono', monospace; font-size: 9.5px;
          letter-spacing: 0.06em; text-align: center;
          color: rgba(245,237,224,0.3); transition: color 0.25s;
        }
        .sk2-tool:hover .sk2-tool-nm { color: rgba(245,237,224,0.7); }
        .sk2-tool-dot {
          width: 8px; height: 8px; border-radius: 50%;
          transition: transform 0.25s;
        }
        .sk2-tool:hover .sk2-tool-dot { transform: scale(1.4); }
      `}</style>

      <section
        ref={sectionRef}
        className={`sk2-section${glass ? " glass-on" : ""}`}
        id="skills"
      >
        <div className="sk2-ghost">03</div>
        <div className="sk2-inner">
          <div className={`sk2-overline ${visible ? "vis" : ""}`}>Skills &amp; Expertise</div>
          <h2 className={`sk2-h2 ${visible ? "vis" : ""}`}>
            What I know &amp;<br /><em>how I use it</em>
          </h2>

          {/* Filter tabs */}
          <div className={`sk2-filters ${visible ? "vis" : ""}`}>
            {FILTERS.map((f) => {
              const count =
                f === "All"
                  ? skillCategories.reduce((a, c) => a + c.skills.length, 0) + tools.length
                  : f === "Tools"
                  ? tools.length
                  : skillCategories.find((c) => c.filter === f)?.skills.length ?? 0;
              return (
                <button
                  key={f}
                  className={`sk2-filter-btn ${activeFilter === f ? "active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                  <span className="sk2-filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Category cards */}
          {activeFilter !== "Tools" && (
            <div className="sk2-cats">
              {filteredCategories.map((cat, ci) => (
                <div
                  key={cat.label}
                  className={`sk2-cat ${visible ? "vis" : ""}`}
                  style={{ transitionDelay: `${0.15 + ci * 0.1}s` }}
                >
                  <style>{`.sk2-cats > div:nth-child(${ci + 1})::after { background: linear-gradient(90deg, ${cat.color}, transparent); }`}</style>
                  <div className="sk2-cat-label" style={{ color: cat.color }}>{cat.label}</div>
                  {cat.skills.map((sk) => (
                    <div key={sk.name} className="sk2-item">
                      <div className="sk2-icon-box" style={{ borderColor: `${cat.color}30` }}>
                        {sk.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="sk2-name">{sk.name}</div>
                        <div className="sk2-desc">{sk.desc}</div>
                      </div>
                      <span style={{ color: `${cat.color}55`, fontSize: 12 }}>→</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Tools */}
          {showTools && (
            <div>
              <div className="sk2-tools-hdr">
                <span className="sk2-tools-lbl">Tools &amp; Ecosystem</span>
                <div className="sk2-tools-rule" />
                <span className="sk2-tools-lbl">{tools.length} Tools</span>
              </div>
              <div className="sk2-tools-grid">
                {tools.map((tool, i) => (
                  <div
                    key={tool.name}
                    className={`sk2-tool ${visible ? "vis" : ""}`}
                    style={{ transitionDelay: `${0.5 + i * 0.04}s` }}
                  >
                    <div
                      className="sk2-tool-dot"
                      style={{ background: tool.color, boxShadow: `0 0 8px ${tool.color}60` }}
                    />
                    <span className="sk2-tool-nm">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}