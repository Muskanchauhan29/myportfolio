"use client";
import { useEffect, useRef, useState } from "react";

// Floating node data for the right-side canvas animation
const NODE_COUNT = 18;
const SKILL_LABELS = ["Python", "ML", "SQL", "NLP", "Data", "AI", "Stats", "Viz", "R", "DL", "API", "ETL", "CV", "LLM", "EDA", "BERT", "XGB", "Pandas"];

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  label: string;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Init nodes
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;
    nodesRef.current = Array.from({ length: NODE_COUNT }, (_, i) => ({
      x: 80 + Math.random() * (W() - 160),
      y: 80 + Math.random() * (H() - 160),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 3 + Math.random() * 3,
      label: SKILL_LABELS[i % SKILL_LABELS.length],
      alpha: 0.4 + Math.random() * 0.5,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.012 + Math.random() * 0.018,
    }));

    const GOLD = "201,169,110";
    const BLUE = "122,184,201";
    const CORAL = "224,123,106";

    const draw = () => {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;

      // Update positions
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 40 || n.x > w - 40) n.vx *= -1;
        if (n.y < 40 || n.y > h - 40) n.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const opacity = (1 - dist / 140) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${GOLD},${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n, idx) => {
        const pulseFactor = 0.85 + 0.15 * Math.sin(n.pulse);
        const r = n.r * pulseFactor;
        const color = idx % 3 === 0 ? GOLD : idx % 3 === 1 ? BLUE : CORAL;

        // Outer glow ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},0.04)`;
        ctx.fill();

        // Mid ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},0.08)`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${n.alpha * pulseFactor})`;
        ctx.fill();

        // Label
        ctx.font = `500 10px 'DM Mono', monospace`;
        ctx.fillStyle = `rgba(${color},${n.alpha * 0.65})`;
        ctx.textAlign = "center";
        ctx.fillText(n.label, n.x, n.y - r * 2.8);
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,600&display=swap');

        .hero-section {
          min-height: 100vh;
          background: #0e0b09;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 860px) {
          .hero-section { grid-template-columns: 1fr; }
          .hero-right { display: none; }
        }

        /* Subtle grid overlay */
        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
        }

        /* Vertical divider */
        .hero-section::after {
          content: '';
          position: absolute;
          left: 50%; top: 10%; bottom: 10%;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(201,169,110,0.15) 30%, rgba(201,169,110,0.15) 70%, transparent);
          pointer-events: none;
        }

        @media (max-width: 860px) { .hero-section::after { display: none; } }

        /* ── LEFT SIDE ── */
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px 80px 80px;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 1100px) { .hero-left { padding: 80px 40px 80px 48px; } }

        /* Top line */
        .hero-availability {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 52px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .hero-availability.vis { opacity: 1; transform: translateY(0); }

        .hero-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #7ab8c9;
          animation: heroDotPulse 2s ease-in-out infinite;
        }
        @keyframes heroDotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(122,184,201,0.4); }
          50%       { box-shadow: 0 0 0 6px rgba(122,184,201,0); }
        }

        .hero-avail-text {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(245,237,224,0.35);
        }

        /* Name */
        .hero-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(52px, 6.5vw, 88px);
          font-weight: 700;
          color: #f5ede0;
          line-height: 1.0;
          margin: 0 0 4px;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.75s ease 0.1s, transform 0.75s ease 0.1s;
        }
        .hero-name.vis { opacity: 1; transform: translateY(0); }

        .hero-name-italic {
          font-style: italic;
          color: #c9a96e;
          display: block;
        }

        /* Role */
        .hero-role {
          font-family: 'DM Mono', monospace;
          font-size: clamp(11px, 1.1vw, 13px);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(245,237,224,0.4);
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s;
        }
        .hero-role.vis { opacity: 1; transform: translateY(0); }

        /* Tagline */
        .hero-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(18px, 1.8vw, 22px);
          font-style: italic;
          font-weight: 300;
          color: rgba(245,237,224,0.6);
          line-height: 1.7;
          max-width: 400px;
          margin-bottom: 52px;
          border-left: 1px solid rgba(201,169,110,0.3);
          padding-left: 20px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s;
        }
        .hero-tagline.vis { opacity: 1; transform: translateY(0); }

        /* Stat row */
        .hero-stats {
          display: flex;
          gap: 36px;
          margin-bottom: 52px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s;
        }
        .hero-stats.vis { opacity: 1; transform: translateY(0); }

        .hero-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hero-stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 30px;
          font-weight: 700;
          color: #c9a96e;
          line-height: 1;
        }

        .hero-stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(245,237,224,0.3);
        }

        .hero-stat-div {
          width: 1px;
          background: rgba(255,255,255,0.08);
          align-self: stretch;
          margin: 4px 0;
        }

        /* CTA row */
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 56px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s;
        }
        .hero-actions.vis { opacity: 1; transform: translateY(0); }

        .hero-btn-primary {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: #c9a96e;
          color: #0e0b09;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .hero-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #f5ede0;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .hero-btn-primary:hover::before { transform: translateX(0); }
        .hero-btn-primary span { position: relative; z-index: 1; }

        .hero-btn-ghost {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 24px;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(245,237,224,0.5);
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .hero-btn-ghost:hover {
          border-color: rgba(201,169,110,0.4);
          color: #c9a96e;
        }

        /* Social links */
        .hero-socials {
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s;
        }
        .hero-socials.vis { opacity: 1; transform: translateY(0); }

        .hero-social-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(245,237,224,0.2);
          margin-right: 10px;
        }

        .hero-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(245,237,224,0.35);
          text-decoration: none;
          font-size: 13px;
          transition: all 0.25s ease;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.05em;
        }
        .hero-social-link:hover {
          border-color: #c9a96e;
          color: #c9a96e;
          background: rgba(201,169,110,0.06);
        }

        /* ── RIGHT SIDE ── */
        .hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
        }

        .hero-canvas-wrap {
          position: absolute;
          inset: 0;
        }

        .hero-canvas {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Central label */
        .hero-center-label {
          position: relative;
          z-index: 2;
          text-align: center;
          pointer-events: none;
        }

        .hero-center-ring {
          width: 120px; height: 120px;
          border-radius: 50%;
          border: 1px solid rgba(201,169,110,0.2);
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: ringRotate 20s linear infinite;
        }

        @keyframes ringRotate {
          to { transform: rotate(360deg); }
        }

        .hero-center-ring::before {
          content: '';
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 1px solid rgba(201,169,110,0.1);
          animation: ringRotate 14s linear infinite reverse;
        }

        .hero-center-icon {
          font-size: 32px;
          animation: ringRotate 20s linear infinite reverse;
          line-height: 1;
        }

        .hero-center-text {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.5);
        }

        /* Scroll hint */
        .hero-scroll {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: scrollFadeIn 1s ease 1.5s forwards;
        }
        @keyframes scrollFadeIn { to { opacity: 1; } }

        .hero-scroll-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, rgba(201,169,110,0.5), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50%       { opacity: 0.9; transform: scaleY(1.1); }
        }

        .hero-scroll-text {
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(245,237,224,0.2);
        }
      `}</style>

      <section className="hero-section" id="hero">
        {/* ── LEFT ── */}
        <div className="hero-left">
          {/* Availability status */}
          <div className={`hero-availability ${loaded ? "vis" : ""}`}>
            <div className="hero-dot" />
            <span className="hero-avail-text">Open to opportunities</span>
          </div>

          {/* Name */}
          <h1 className={`hero-name ${loaded ? "vis" : ""}`}>
            Muskan
            <em className="hero-name-italic"></em>
          </h1>

          {/* Role */}
          <div className={`hero-role ${loaded ? "vis" : ""}`}>
            Data Scientist &nbsp;/&nbsp; ML Engineer
          </div>

          {/* Tagline */}
          <p className={`hero-tagline ${loaded ? "vis" : ""}`}>
            I turn raw, messy data into decisions that matter — through machine learning, storytelling, and relentless curiosity.
          </p>

          {/* Stats */}
          <div className={`hero-stats ${loaded ? "vis" : ""}`}>
            <div className="hero-stat">
              <span className="hero-stat-value">12+</span>
              <span className="hero-stat-label">Projects</span>
            </div>
            <div className="hero-stat-div" />
            <div className="hero-stat">
              <span className="hero-stat-value">3+</span>
              <span className="hero-stat-label">Years Exp.</span>
            </div>
            <div className="hero-stat-div" />
            <div className="hero-stat">
              <span className="hero-stat-value">8+</span>
              <span className="hero-stat-label">ML Models</span>
            </div>
          </div>

          {/* CTAs */}
          <div className={`hero-actions ${loaded ? "vis" : ""}`}>
            <a href="#projects" className="hero-btn-primary">
              <span>View My Work →</span>
            </a>
            <a href="/resume.pdf" className="hero-btn-ghost" target="_blank">
              Resume ↓
            </a>
          </div>

          {/* Socials */}
          <div className={`hero-socials ${loaded ? "vis" : ""}`}>
            <span className="hero-social-label">Find me</span>
            <a href="https://github.com/Muskanchauhan29" target="_blank" className="hero-social-link">Git</a>
            <a href="https://www.linkedin.com/in/muskan-chauhan-615619280/" target="_blank" className="hero-social-link">in</a>
            <a href="mailto:muskchauhan296@email.com" className="hero-social-link">mail</a>
          </div>
        </div>

        {/* ── RIGHT: Animated Data Constellation ── */}
        <div className="hero-right">
          <div className="hero-canvas-wrap">
            <canvas ref={canvasRef} className="hero-canvas" />
          </div>
          <div className="hero-center-label">
            <div className="hero-center-ring">
              <span className="hero-center-icon">⬡</span>
            </div>
            <div className="hero-center-text">Data Science</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-text">Scroll</span>
        </div>
      </section>
    </>
  );
}