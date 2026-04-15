"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TRAITS = [
  { label: "Data-Driven Thinker", icon: "◈" },
  { label: "ML Enthusiast", icon: "◉" },
  { label: "Visual Storyteller", icon: "◇" },
  { label: "Problem Solver", icon: "◎" },
];

const STATS = [
  { value: "4th", label: "Year" },
  { value: "8+", label: "Tools" },
  { value: "MDU", label: "University" },
  { value: "2026", label: "Graduating" },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: "#1A1612",
        color: "#F5F0EA",
        padding: "8rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glows — CSS only, no JS, zero perf cost */}
      <div style={{
        position: "absolute", top: "-10%", right: "-5%",
        width: "50vw", height: "50vw",
        background: "radial-gradient(circle, rgba(196,168,130,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", left: "-5%",
        width: "40vw", height: "40vw",
        background: "radial-gradient(circle, rgba(196,168,130,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Section label */}
        <div style={{
          display: "flex", alignItems: "center", gap: "1rem",
          marginBottom: "5rem",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
          willChange: "opacity, transform",
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: "0.65rem",
            letterSpacing: "0.3em", color: "#C4A882", textTransform: "uppercase",
          }}>
            01 — About Me
          </span>
          <div style={{
            flex: 1, height: "1px",
            background: "linear-gradient(to right, rgba(196,168,130,0.4), transparent)",
          }} />
        </div>

        {/* Main grid */}
        <div className="about-main-grid">

          {/* LEFT — Image */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-40px)",
            transition: "opacity 0.85s ease 0.1s, transform 0.85s ease 0.1s",
            willChange: "opacity, transform",
            position: "relative",
          }}>
            {/* Offset decorative border */}
            <div style={{
              position: "absolute", inset: 0,
              border: "1px solid rgba(196,168,130,0.2)",
              transform: "translate(14px, 14px)",
              pointerEvents: "none", zIndex: 0,
            }} />

            {/* Image frame */}
            <div style={{
              position: "relative", zIndex: 1,
              aspectRatio: "3/4", overflow: "hidden",
              background: "rgba(196,168,130,0.08)",
            }}>
              <Image
                src="/muskan.jpg"
                alt="Muskan Chauhan — Data Scientist"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                priority
              />
              {/* Bottom gradient */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "50%",
                background: "linear-gradient(to top, rgba(26,22,18,0.9), transparent)",
                pointerEvents: "none",
              }} />
              {/* Name tag */}
              <div style={{ position: "absolute", bottom: "1.6rem", left: "1.6rem", right: "1.6rem" }}>
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.55rem", fontWeight: 700, color: "#F5F0EA",
                  lineHeight: 1.1, marginBottom: "0.3rem",
                }}>
                  Muskan Chauhan
                </p>
                <p style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "0.58rem",
                  letterSpacing: "0.22em", color: "#C4A882", textTransform: "uppercase",
                }}>
                  Data Science · B.Tech CSE
                </p>
              </div>
            </div>

            {/* Stats strip */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              border: "1px solid rgba(196,168,130,0.15)", borderTop: "none",
              position: "relative", zIndex: 1,
            }}>
              {STATS.map((s, i) => (
                <div key={i} style={{
                  padding: "1rem 0.5rem", textAlign: "center",
                  borderRight: i < STATS.length - 1 ? "1px solid rgba(196,168,130,0.15)" : "none",
                }}>
                  <div style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.2rem", fontWeight: 700, color: "#F5F0EA", lineHeight: 1,
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "0.5rem",
                    letterSpacing: "0.1em", color: "rgba(245,240,234,0.38)",
                    textTransform: "uppercase", marginTop: "0.3rem",
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Content */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(40px)",
            transition: "opacity 0.85s ease 0.22s, transform 0.85s ease 0.22s",
            willChange: "opacity, transform",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
              fontWeight: 700, lineHeight: 1.12,
              marginBottom: "1.8rem", color: "#F5F0EA",
            }}>
              Crafting stories<br />
              from{" "}
              <span style={{ fontStyle: "italic", color: "#C4A882", position: "relative", display: "inline-block" }}>
                raw data
                <svg style={{
                  position: "absolute", bottom: "-6px", left: 0,
                  width: "100%", height: "6px", overflow: "visible",
                }} viewBox="0 0 100 6" preserveAspectRatio="none">
                  <path d="M0,5 Q25,0 50,5 Q75,10 100,5"
                    stroke="#C4A882" strokeWidth="1.2" fill="none" opacity="0.5" />
                </svg>
              </span>
            </h2>

            <p style={{
              fontFamily: "'Lora', Georgia, serif", fontSize: "1rem",
              lineHeight: 1.9, color: "rgba(245,240,234,0.68)", marginBottom: "1.2rem",
            }}>
              I'm a final-year B.Tech CSE student specialising in Data Science at
              Maharshi Dayanand University, Rohtak. My world revolves around finding patterns,
              building models, and transforming complex data into clear, actionable insights.
            </p>
            <p style={{
              fontFamily: "'Lora', Georgia, serif", fontSize: "1rem",
              lineHeight: 1.9, color: "rgba(245,240,234,0.68)", marginBottom: "2.4rem",
            }}>
              My internship at{" "}
              <span style={{ color: "#C4A882", fontStyle: "italic" }}>Webs Jyoti</span>
              {" "}gave me a designer's eye — because insights are only powerful
              when communicated beautifully.
            </p>

            {/* Trait pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", marginBottom: "2.6rem" }}>
              {TRAITS.map((t) => (
                <span key={t.label} style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "0.6rem",
                  letterSpacing: "0.13em", textTransform: "uppercase",
                  padding: "0.5rem 1rem",
                  border: "1px solid rgba(196,168,130,0.32)",
                  color: "#C4A882",
                  display: "flex", alignItems: "center", gap: "0.45rem",
                }}>
                  <span style={{ fontSize: "0.75rem" }}>{t.icon}</span>
                  {t.label}
                </span>
              ))}
            </div>

            {/* Currently exploring */}
            <div style={{
              padding: "1.4rem 1.6rem",
              borderLeft: "2px solid #C4A882",
              background: "rgba(196,168,130,0.05)",
            }}>
              <p style={{
                fontFamily: "'DM Mono', monospace", fontSize: "0.57rem",
                letterSpacing: "0.25em", color: "#C4A882",
                textTransform: "uppercase", marginBottom: "0.55rem",
              }}>
                Currently Exploring
              </p>
              <p style={{
                fontFamily: "'Lora', Georgia, serif", fontSize: "0.93rem",
                fontStyle: "italic", color: "rgba(245,240,234,0.6)", lineHeight: 1.75,
              }}>
                LLMs, AI-powered apps with Claude & OpenAI, and making data science
                accessible to everyone — one visualisation at a time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-main-grid {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 960px) {
          .about-main-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}