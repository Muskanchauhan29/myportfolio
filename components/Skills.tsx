"use client";
import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    label: "Languages",
    color: "#c9a96e",
    skills: [
      {
        name: "Python",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9 2C9.2 2 7.5 3.2 7.5 5v1.5h4.5v.5H5.5C3.6 7 2 8.8 2 11c0 2.3 1.4 4 3.5 4H6v-1.5c0-2 1.5-3.5 3.5-3.5h5c1.7 0 3-1.3 3-3V5c0-1.8-1.8-3-5.6-3zM9.5 4.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" fill="currentColor" opacity="0.95"/>
            <path d="M12.1 22c2.7 0 4.4-1.2 4.4-3v-1.5h-4.5v-.5h6.5c1.9 0 3.5-1.8 3.5-4 0-2.3-1.4-4-3.5-4H18v1.5c0 2-1.5 3.5-3.5 3.5h-5c-1.7 0-3 1.3-3 3V19c0 1.8 1.8 3 5.6 3zm2.4-2.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" fill="currentColor" opacity="0.6"/>
          </svg>
        ),
      },
      {
        name: "SQL",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="12" cy="5.5" rx="8" ry="2.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M4 5.5v4c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5v-4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M4 9.5v4c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5v-4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M4 13.5v4c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5v-4" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        ),
      },
      {
        name: "R",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="10" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 8h3a2 2 0 0 1 0 4H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10.5 12l4.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ),
      },
    ],
  },
  {
    label: "AI & Machine Learning",
    color: "#e07b6a",
    skills: [
      {
        name: "Machine Learning",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
            <circle cx="4.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <circle cx="19.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <circle cx="4.5" cy="16.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <circle cx="19.5" cy="16.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M6 8.5l4.5 2.5M13.5 13l3.5 2.5M6 15.5l4.5-2.5M13.5 11l3.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        name: "Deep Learning",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
            <circle cx="3.5" cy="7" r="1.3" fill="currentColor" opacity="0.6"/>
            <circle cx="3.5" cy="12" r="1.3" fill="currentColor" opacity="0.6"/>
            <circle cx="3.5" cy="17" r="1.3" fill="currentColor" opacity="0.6"/>
            <circle cx="10" cy="5" r="1.3" fill="currentColor"/>
            <circle cx="10" cy="10" r="1.3" fill="currentColor"/>
            <circle cx="10" cy="15" r="1.3" fill="currentColor"/>
            <circle cx="10" cy="20" r="1.3" fill="currentColor"/>
            <circle cx="17" cy="8" r="1.3" fill="currentColor" opacity="0.8"/>
            <circle cx="17" cy="16" r="1.3" fill="currentColor" opacity="0.8"/>
            <circle cx="22" cy="12" r="1.3" fill="currentColor" opacity="0.5"/>
            <path d="M4.8 7.3l3.9 2.4M4.8 12l3.9-1.7M4.8 12l3.9 2.7M4.8 16.8l3.9-1.5M11.3 5.2l4.4 2.5M11.3 10l4.4-.8M11.3 15l4.4.8M11.3 20l4.4-3.8M18.3 8.3l2.4 3.4M18.3 15.8l2.4-3.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        name: "NLP",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 10h12M4 14h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="18.5" cy="16.5" r="3" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M20.6 19l1.9 1.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ),
      },
    ],
  },
  {
    label: "Data & Analytics",
    color: "#7ab8c9",
    skills: [
      {
        name: "Data Visualization",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="14" width="4" height="7" rx="0.5" fill="currentColor" opacity="0.5"/>
            <rect x="10" y="9" width="4" height="12" rx="0.5" fill="currentColor" opacity="0.75"/>
            <rect x="17" y="4" width="4" height="17" rx="0.5" fill="currentColor"/>
            <path d="M3 21h18" stroke="currentColor" strokeWidth="1.2" opacity="0.3" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        name: "Statistical Analysis",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 16.5l4-5 3.5 2.5L14 8l3.5 4.5L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 20h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
          </svg>
        ),
      },
      {
        name: "Feature Engineering",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l2.6-2.6a6 6 0 0 1-7.8 7.8l-5.5 5.5a2.12 2.12 0 1 1-3-3l5.5-5.5a6 6 0 0 1 7.8-7.8l-2.6 2.6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
    ],
  },
];

const tools = [
  { name: "TensorFlow",  color: "#FF8C42",
    icon: <svg viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><path d="M2 8.14v5.31l8.22 4.75V13l-4.1-2.37 6.17-3.56V3L2 8.14zm20.78 0L14 3v4.07l6.17 3.56-4.1 2.37v5.2l8.22-4.75V8.14zM14 30l4.11-2.37v-9.5L14 20.5l-4.11-2.37v9.5L14 30z"/></svg> },
  { name: "PyTorch",     color: "#EE4C2C",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 0L4.95 7.05a9.9 9.9 0 000 13.9A9.9 9.9 0 0012 24a9.9 9.9 0 007.07-2.93 9.9 9.9 0 00.08-14.08l-1.71 1.71a7.4 7.4 0 01.06 10.13A7.4 7.4 0 015.4 9.06L12 2.46l1.34 1.34 2.66-2.66L12 0zm3.98 5.73a1.26 1.26 0 100 2.52 1.26 1.26 0 000-2.52z"/></svg> },
  { name: "Scikit-learn", color: "#F89939",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { name: "Pandas",      color: "#6C63FF",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M10 5h1.7v14H10V5zm2.3 0H14v14h-1.7V5zM7.5 9h1.7v6H7.5V9zm7.3 0H16.5v6h-1.7V9z"/></svg> },
  { name: "NumPy",       color: "#4DABCF",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M3 9l9-5 9 5v6l-9 5-9-5V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M3 9l9 5 9-5M12 14v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { name: "Matplotlib",  color: "#0B6FA4",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M7 16l3-4 2.5 2 3.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { name: "Tableau",     color: "#E97627",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M7 7v10M17 7v10M3 7h18M3 17h18" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.5"/></svg> },
  { name: "Power BI",    color: "#F2C811",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><rect x="3" y="13" width="4" height="8" rx="0.8" opacity="0.5"/><rect x="10" y="8" width="4" height="13" rx="0.8" opacity="0.8"/><rect x="17" y="3" width="4" height="18" rx="0.8"/></svg> },
  { name: "Jupyter",     color: "#F37626",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><ellipse cx="12" cy="12" rx="10" ry="5" stroke="currentColor" strokeWidth="1.4"/><ellipse cx="12" cy="12" rx="10" ry="5" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="5" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg> },
  { name: "Streamlit",   color: "#FF4B4B",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2l9.5 5.5-4.75 2.75L12 7.5l-4.75 2.75L2.5 7.5 12 2z"/><path d="M16.75 10.25L21.5 13l-9.5 5.5L2.5 13l4.75-2.75L12 13l4.75-2.75z" opacity="0.6"/></svg> },
  { name: "HuggingFace", color: "#FFD21E",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M8.5 14.5s1.5 2 3.5 2 3.5-2 3.5-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9.5" cy="10.5" r="1.2" fill="currentColor"/><circle cx="14.5" cy="10.5" r="1.2" fill="currentColor"/></svg> },
  { name: "FastAPI",     color: "#009688",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M13 7l-5 5.5h4l-1 4.5 5-5.5h-4l1-4.5z" fill="currentColor" opacity="0.85"/></svg> },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');

        .sk-section {
          background: #0e0b09;
          padding: 130px 0 120px;
          position: relative;
          overflow: hidden;
        }
        .sk-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 100% 0%, rgba(201,169,110,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 0% 100%, rgba(122,184,201,0.04) 0%, transparent 60%);
          pointer-events: none;
        }
        .sk-ghost {
          position: absolute; top: 40px; right: 5%;
          font-family: 'Playfair Display', serif;
          font-size: clamp(100px, 16vw, 200px);
          font-weight: 700; color: transparent;
          -webkit-text-stroke: 1px rgba(201,169,110,0.06);
          line-height: 1; user-select: none; pointer-events: none;
        }
        .sk-inner { max-width: 1200px; margin: 0 auto; padding: 0 48px; position: relative; z-index: 1; }

        /* Header */
        .sk-overline {
          font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.32em;
          text-transform: uppercase; color: #c9a96e; margin-bottom: 16px;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .sk-overline.vis { opacity: 1; transform: translateY(0); }
        .sk-h2 {
          font-family: 'Playfair Display', serif; font-size: clamp(40px, 5vw, 68px);
          font-weight: 400; color: #f5ede0; line-height: 1.05; margin: 0 0 72px;
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }
        .sk-h2.vis { opacity: 1; transform: translateY(0); }
        .sk-h2 em { font-style: italic; color: #c9a96e; }

        /* 3-col grid */
        .sk-cats {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 2px; margin-bottom: 80px;
        }
        @media (max-width: 860px) { .sk-cats { grid-template-columns: 1fr; } }

        .sk-cat {
          padding: 40px 36px 36px;
          background: rgba(255,255,255,0.018);
          border: 1px solid rgba(255,255,255,0.05);
          position: relative; overflow: hidden;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.55s ease, transform 0.55s ease, background 0.3s;
        }
        .sk-cat.vis { opacity: 1; transform: translateY(0); }
        .sk-cat:hover { background: rgba(255,255,255,0.03); }
        .sk-cat::after {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 2px;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .sk-cat:hover::after { transform: scaleX(1); }

        .sk-cat-label {
          font-family: 'DM Mono', monospace; font-size: 9px;
          letter-spacing: 0.3em; text-transform: uppercase;
          margin-bottom: 28px; display: flex; align-items: center; gap: 8px;
        }
        .sk-cat-label::before { content: ''; width: 16px; height: 1px; background: currentColor; }

        .sk-item {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: default; transition: padding-left 0.25s ease;
        }
        .sk-item:last-child { border-bottom: none; }
        .sk-item:hover { padding-left: 6px; }

        .sk-icon-box {
          width: 42px; height: 42px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          transition: background 0.25s, border-color 0.25s;
        }
        .sk-item:hover .sk-icon-box { background: rgba(255,255,255,0.06); }

        .sk-name {
          font-family: 'Playfair Display', serif; font-size: 17px;
          font-weight: 400; color: #f5ede0; font-style: italic; flex: 1;
        }

        .sk-arr {
          font-size: 13px; color: rgba(245,237,224,0.15);
          transition: color 0.25s, transform 0.25s;
        }
        .sk-item:hover .sk-arr { transform: translateX(4px); }

        /* Tools */
        .sk-tools-hdr {
          display: flex; align-items: center; gap: 24px; margin-bottom: 32px;
        }
        .sk-tools-lbl {
          font-family: 'DM Mono', monospace; font-size: 10px;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(245,237,224,0.25); white-space: nowrap;
        }
        .sk-tools-rule { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }

        .sk-tools-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(110px,1fr)); gap: 2px;
        }

        .sk-tool {
          display: flex; flex-direction: column; align-items: center;
          gap: 9px; padding: 20px 12px;
          border: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.015);
          cursor: default; transition: all 0.25s ease;
          opacity: 0; transform: translateY(12px);
        }
        .sk-tool.vis { opacity: 1; transform: translateY(0); }
        .sk-tool:hover {
          background: rgba(255,255,255,0.045);
          border-color: rgba(255,255,255,0.13);
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.35);
        }
        .sk-tool-ic { transition: transform 0.25s ease; }
        .sk-tool:hover .sk-tool-ic { transform: scale(1.18); }
        .sk-tool-nm {
          font-family: 'DM Mono', monospace; font-size: 9.5px;
          letter-spacing: 0.06em; text-align: center;
          color: rgba(245,237,224,0.3); transition: color 0.25s;
        }
        .sk-tool:hover .sk-tool-nm { color: rgba(245,237,224,0.7); }
      `}</style>

      <section ref={sectionRef} className="sk-section" id="skills">
        <div className="sk-ghost">03</div>
        <div className="sk-inner">
          <div className={`sk-overline ${visible ? "vis" : ""}`}>Skills &amp; Expertise</div>
          <h2 className={`sk-h2 ${visible ? "vis" : ""}`}>
            What I know &amp;<br /><em>how I use it</em>
          </h2>

          <div className="sk-cats">
            {skillCategories.map((cat, ci) => (
              <div
                key={cat.label}
                className={`sk-cat ${visible ? "vis" : ""}`}
                style={{ transitionDelay: `${0.15 + ci * 0.1}s` }}
              >
                <style>{`.sk-cats > div:nth-child(${ci + 1})::after { background: linear-gradient(90deg, ${cat.color}, transparent); }`}</style>
                <div className="sk-cat-label" style={{ color: cat.color }}>{cat.label}</div>
                {cat.skills.map((sk) => (
                  <div key={sk.name} className="sk-item">
                    <div className="sk-icon-box" style={{ color: cat.color, borderColor: `${cat.color}30` }}>
                      {sk.icon}
                    </div>
                    <span className="sk-name">{sk.name}</span>
                    <span className="sk-arr" style={{ color: `${cat.color}55` }}>→</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Tools */}
          <div>
            <div className="sk-tools-hdr">
              <span className="sk-tools-lbl">Tools &amp; Ecosystem</span>
              <div className="sk-tools-rule" />
            </div>
            <div className="sk-tools-grid">
              {tools.map((tool, i) => (
                <div
                  key={tool.name}
                  className={`sk-tool ${visible ? "vis" : ""}`}
                  style={{ transitionDelay: `${0.5 + i * 0.04}s` }}
                >
                  <div className="sk-tool-ic" style={{ color: tool.color }}>{tool.icon}</div>
                  <span className="sk-tool-nm">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}