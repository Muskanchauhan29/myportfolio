"use client";
import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  r: number;
  speed: number;
  opacity: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const bubbles: Bubble[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = [
      "#E8DDD4", "#D4C5B9", "#C9B8A8",
      "#E2D5CA", "#D8CCBE", "#EDE5DC",
      "#F0E6DA", "#DACBBF",
    ];

    const createBubble = (): Bubble => ({
      x: Math.random() * (canvas?.width ?? window.innerWidth),
      y: (canvas?.height ?? window.innerHeight) + Math.random() * 300,
      r: Math.random() * 80 + 15,
      speed: Math.random() * 0.6 + 0.15,
      opacity: Math.random() * 0.28 + 0.04,
      color: colors[Math.floor(Math.random() * colors.length)],
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.018 + 0.004,
    });

    for (let i = 0; i < 35; i++) {
      const b = createBubble();
      b.y = Math.random() * (canvas?.height ?? window.innerHeight) * 1.5;
      bubbles.push(b);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((b) => {
        b.y -= b.speed;
        b.wobble += b.wobbleSpeed;
        const x = b.x + Math.sin(b.wobble) * 18;

        if (b.y + b.r < 0) {
          Object.assign(b, createBubble());
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.globalAlpha = b.opacity;
        ctx.fill();

        // subtle rim highlight
        ctx.beginPath();
        ctx.arc(x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = b.opacity * 0.5;
        ctx.fill();

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#F9F7F4" }}
    >
      {/* Bubble Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Label */}
        <p
          className="text-xs tracking-[0.35em] uppercase mb-6 font-light"
          style={{ color: "#9B8B7A", fontFamily: "'Outfit', sans-serif" }}
        >
          Data Science · B.Tech CSE · MDU
        </p>

        {/* Name */}
        <h1
          className="font-light leading-none mb-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(72px, 14vw, 140px)",
            color: "#2C2C2C",
            letterSpacing: "-0.02em",
          }}
        >
          Muskan
        </h1>

        {/* Decorative line */}
        <div
          className="w-16 h-px mx-auto mb-8"
          style={{ backgroundColor: "#C4B5A8" }}
        />

        {/* Tagline */}
        <p
          className="text-lg md:text-xl font-light leading-relaxed mb-12 max-w-md mx-auto"
          style={{ color: "#6B6B6B", fontFamily: "'Outfit', sans-serif" }}
        >
          Turning raw data into real insights
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
          <a
            href="#projects"
            className="group px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300"
            style={{
              backgroundColor: "#2C2C2C",
              color: "#F9F7F4",
              fontFamily: "'Outfit', sans-serif",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#9B8B7A")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#2C2C2C")
            }
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300"
            style={{
              border: "1px solid #2C2C2C",
              color: "#2C2C2C",
              fontFamily: "'Outfit', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2C2C2C";
              e.currentTarget.style.color = "#F9F7F4";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#2C2C2C";
            }}
          >
            Let&apos;s Connect
          </a>
        </div>

        {/* Social Links */}
        <div
          className="flex items-center justify-center gap-6 text-xs tracking-widest uppercase"
          style={{ color: "#9B8B7A", fontFamily: "'Outfit', sans-serif" }}
        >
          <a
            href="https://github.com/Muskanchauhan29"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            GitHub
          </a>
          <span style={{ color: "#D4C5B9" }}>·</span>
          <a
            href="https://www.linkedin.com/in/muskan-chauhan-615619280/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            LinkedIn
          </a>
          <span style={{ color: "#D4C5B9" }}>·</span>
          <a
            href="mailto:muskchauhan296@gmail.com"
            className="hover:opacity-60 transition-opacity"
          >
            Email
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "#C4B5A8", fontFamily: "'Outfit', sans-serif" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-14"
          style={{
            background:
              "linear-gradient(to bottom, #C4B5A8, transparent)",
          }}
        />
      </div>
    </section>
  );
}
