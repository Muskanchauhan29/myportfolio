"use client";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Mono:wght@300;400&display=swap');

        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 1.1rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          /* Always visible glass — stronger when scrolled */
          background: rgba(18, 14, 10, 0.55);
          backdrop-filter: blur(18px) saturate(1.4);
          -webkit-backdrop-filter: blur(18px) saturate(1.4);
          border-bottom: 1px solid rgba(196,168,130,0.12);
          transition: background 0.4s ease, padding 0.4s ease, border-color 0.4s ease;
        }
        .nav-root.scrolled {
          background: rgba(18, 14, 10, 0.82);
          border-bottom-color: rgba(196,168,130,0.22);
          padding: 0.8rem 3rem;
        }

        .nav-logo {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #f5ede0;
          text-decoration: none;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .nav-logo-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #C4A882;
          flex-shrink: 0;
        }

        .nav-links {
          display: flex;
          gap: 2.2rem;
          align-items: center;
        }

        .nav-link {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(245,237,224,0.55);
          border-bottom: 1px solid transparent;
          padding-bottom: 2px;
          transition: color 0.25s, border-color 0.25s;
        }
        .nav-link:hover, .nav-link.active {
          color: #f5ede0;
          border-bottom-color: #C4A882;
        }

        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          flex-direction: column;
          gap: 5px;
        }
        .ham-line {
          display: block;
          width: 22px; height: 1.5px;
          background: #f5ede0;
          transition: all 0.3s ease;
        }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 99;
          background: rgba(12, 9, 6, 0.96);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
        }
        .mobile-link {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2.2rem;
          color: #f5ede0;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: color 0.2s;
        }
        .mobile-link:hover { color: #C4A882; }

        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .nav-root { padding: 1rem 1.5rem !important; }
          .nav-root.scrolled { padding: 0.8rem 1.5rem !important; }
        }
      `}</style>

      <nav className={`nav-root ${scrolled ? "scrolled" : ""}`}>
        <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, "#hero")}>
          Muskan
          <span className="nav-logo-dot" />
        </a>

        <div className="nav-links">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link ${activeSection === sectionId ? "active" : ""}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="ham-line"
              style={{
                transform:
                  menuOpen && i === 0 ? "translateY(6.5px) rotate(45deg)"
                  : menuOpen && i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                  : menuOpen && i === 1 ? "scaleX(0)"
                  : "none",
              }}
            />
          ))}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-overlay">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}