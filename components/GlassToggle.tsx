"use client";
import { useState, useEffect } from "react";

interface GlassToggleProps {
  onToggle: (isGlass: boolean) => void;
}

export default function GlassToggle({ onToggle }: GlassToggleProps) {
  const [glass, setGlass] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay so it doesn't flash on first load
    const t = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(t);
  }, []);

  const toggle = () => {
    const next = !glass;
    setGlass(next);
    onToggle(next);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&display=swap');

        .gt-wrap {
          position: fixed;
          bottom: 32px; right: 32px;
          z-index: 200;
          display: flex; flex-direction: column; align-items: flex-end; gap: 8px;
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          pointer-events: none;
        }
        .gt-wrap.mounted { opacity: 1; transform: translateY(0); pointer-events: all; }

        .gt-tooltip {
          font-family: 'DM Mono', monospace; font-size: 9px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(245,237,224,0.55);
          background: rgba(18,14,10,0.85); padding: 6px 12px;
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          opacity: 0; transform: translateX(6px);
          transition: opacity 0.2s, transform 0.2s;
          white-space: nowrap; pointer-events: none;
        }
        .gt-tooltip.show { opacity: 1; transform: translateX(0); }

        .gt-btn {
          width: 52px; height: 52px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: none;
          border-radius: 50%;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s;
          position: relative; overflow: hidden;
        }
        .gt-btn:hover { transform: scale(1.1); }
        .gt-btn:active { transform: scale(0.95); }

        /* OFF state */
        .gt-btn.off {
          background: rgba(18,14,10,0.7);
          border: 1px solid rgba(201,169,110,0.3);
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }
        .gt-btn.off:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.5);
        }

        /* ON state */
        .gt-btn.on {
          background: rgba(201,169,110,0.15);
          border: 1px solid rgba(201,169,110,0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 4px 24px rgba(201,169,110,0.25), 0 0 0 1px rgba(201,169,110,0.2);
        }
        .gt-btn.on:hover {
          box-shadow: 0 8px 32px rgba(201,169,110,0.35), 0 0 0 2px rgba(201,169,110,0.4);
        }

        /* Ring pulse when ON */
        .gt-ring {
          position: absolute; inset: -4px;
          border-radius: 50%;
          border: 1px solid rgba(201,169,110,0.25);
          animation: ring-pulse 2s ease-in-out infinite;
          opacity: 0;
          transition: opacity 0.4s;
        }
        .gt-btn.on .gt-ring { opacity: 1; }

        @keyframes ring-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0.1; }
        }

        .gt-icon {
          font-size: 18px; line-height: 1;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), filter 0.3s;
          filter: drop-shadow(0 0 0 transparent);
        }
        .gt-btn.on .gt-icon {
          transform: rotate(15deg);
          filter: drop-shadow(0 0 6px rgba(201,169,110,0.8));
        }

        /* Label below button */
        .gt-label {
          font-family: 'DM Mono', monospace; font-size: 8px;
          letter-spacing: 0.2em; text-transform: uppercase;
          text-align: center; transition: color 0.3s;
        }
        .gt-label.off { color: rgba(245,237,224,0.25); }
        .gt-label.on { color: #c9a96e; }

        @media (max-width: 640px) {
          .gt-wrap { bottom: 20px; right: 20px; }
        }
      `}</style>

      <div className={`gt-wrap ${mounted ? "mounted" : ""}`}>
        <div className={`gt-tooltip ${showTooltip ? "show" : ""}`}>
          {glass ? "Disable Glass" : "Enable Glassmorphism"}
        </div>

        <button
          className={`gt-btn ${glass ? "on" : "off"}`}
          onClick={toggle}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="Toggle glassmorphism"
        >
          <div className="gt-ring" />
          <span className="gt-icon">{glass ? "🔮" : "✦"}</span>
        </button>

        <div className={`gt-label ${glass ? "on" : "off"}`}>
          {glass ? "Glass ON" : "Glass OFF"}
        </div>
      </div>
    </>
  );
}