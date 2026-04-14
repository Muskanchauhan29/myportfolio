"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .footer-root {
          background: #060403;
          border-top: 1px solid rgba(245,234,216,0.06);
          padding: 4rem 3rem 3rem;
          position: relative;
          overflow: hidden;
        }

        .footer-root::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(201,168,76,0.4) 30%,
            rgba(201,168,76,0.4) 70%,
            transparent
          );
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: start;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .footer-nav { display: none; }
          .footer-root { padding: 3rem 1.5rem 2.5rem; }
        }

        /* Brand */
        .footer-brand {}

        .footer-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 900;
          color: #f5ead8;
          letter-spacing: -0.01em;
          margin-bottom: 0.5rem;
        }

        .footer-tagline {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245,234,216,0.25);
          margin-bottom: 1.5rem;
        }

        .footer-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(74,222,128,0.7);
          border: 1px solid rgba(74,222,128,0.2);
          padding: 0.3rem 0.75rem;
          border-radius: 2px;
        }

        .footer-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 6px #4ade80;
          animation: blink 2.5s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }

        /* Center nav */
        .footer-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
        }

        .footer-nav-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,234,216,0.18);
          margin-bottom: 0.5rem;
        }

        .footer-nav-link {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(245,234,216,0.35);
          cursor: pointer;
          transition: color 0.2s;
          text-align: center;
        }

        .footer-nav-link:hover {
          color: #c9a84c;
        }

        /* Right socials */
        .footer-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
        }

        .footer-social-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,234,216,0.18);
        }

        .footer-socials {
          display: flex;
          gap: 0.75rem;
        }

        .footer-social {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(245,234,216,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          color: rgba(245,234,216,0.35);
          cursor: pointer;
          transition: all 0.25s;
          text-decoration: none;
        }

        .footer-social:hover {
          border-color: rgba(201,168,76,0.4);
          color: #c9a84c;
          background: rgba(201,168,76,0.06);
          transform: translateY(-3px);
        }

        .footer-email {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          color: rgba(245,234,216,0.25);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-email:hover {
          color: #c9a84c;
        }

        /* Bottom */
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2.5rem;
          border-top: 1px solid rgba(245,234,216,0.05);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-copy {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          color: rgba(245,234,216,0.2);
        }

        .footer-copy em {
          color: rgba(201,168,76,0.5);
          font-style: normal;
        }

        .footer-made {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          color: rgba(245,234,216,0.15);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .footer-made span {
          color: #e8855a;
          font-size: 0.75rem;
        }

        .footer-back-top {
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245,234,216,0.2);
          cursor: pointer;
          background: none;
          border: 1px solid rgba(245,234,216,0.08);
          padding: 0.35rem 0.8rem;
          transition: all 0.25s;
        }

        .footer-back-top:hover {
          color: #c9a84c;
          border-color: rgba(201,168,76,0.3);
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-inner">
          <div className="footer-top">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-name">Muskan</div>
              <div className="footer-tagline">Data Scientist · ML Engineer</div>
              <div className="footer-status">
                <span className="footer-status-dot" />
                Available for opportunities
              </div>
            </div>

            {/* Nav */}
            <nav className="footer-nav">
              <span className="footer-nav-label">Navigation</span>
              {["about", "skills", "projects", "experience", "certifications", "contact"].map((l) => (
                <span key={l} className="footer-nav-link" onClick={() => scrollTo(l)}>
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </span>
              ))}
            </nav>

            {/* Socials */}
            <div className="footer-right">
              <span className="footer-social-label">Connect</span>
              <div className="footer-socials">
                <a href="https://github.com/Muskanchauhan29" target="_blank" className="footer-social">Git</a>
                <a href="https://www.linkedin.com/in/muskan-chauhan-615619280/" target="_blank" className="footer-social">in</a>
                <a href="https://x.com/muskchauhan296" target="_blank" className="footer-social">X</a>
              </div>
              <a href="mailto:muskchauhan296@gmail.com" className="footer-email">muskchauhan296@gmail.com</a>
            </div>
          </div>

          {/* Bottom */}
          <div className="footer-bottom">
            <p className="footer-copy">
              © {year} <em>Muskan</em>. All rights reserved.
            </p>
            <p className="footer-made">
              Built with <span>♥</span> in Next.js · Designed to impress
            </p>
            <button
              className="footer-back-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              ↑ Back to top
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}