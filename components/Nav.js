"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { waLink } from "../lib/data";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/places", label: "Places" },
  { href: "/itineraries", label: "Itineraries" },
];

export default function Nav({ onOpenQuiz }) {
  const [solid, setSolid] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const f = () => {
      setSolid(window.scrollY > 60);
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      if (totalH > 0) {
        setProgress((window.scrollY / totalH) * 100);
      }
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={"nav " + (solid || menuOpen ? "solid" : "")}>
      <div className="nav-brand">
        <a href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src="/logo.png" 
            alt="Nomadifly" 
            style={{ height: '36px', objectFit: 'contain' }} 
            onError={(e) => {
              // Fallback to text if the image isn't found
              e.target.style.display = 'none';
            }} 
          />
          <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Nomadifly</span>
        </a>
      </div>

      <div className="links">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>

      <div className="nav-actions">
        <a className="pill-btn" href={waLink("Hi Nomadifly! I'd like to plan a Bhutan trip.")}>
          Enquire <span>↗</span>
        </a>
        <button
          className={"nav-burger " + (menuOpen ? "on" : "")}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className="scroll-progress-line" style={{ width: `${progress}%` }} />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-links">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
            <div className="mobile-menu-actions">
              <button
                className="pill-btn dark"
                onClick={() => { closeMenu(); onOpenQuiz(); }}
              >
                Plan My Trip
              </button>
              <a
                className="pill-btn"
                style={{ background: "var(--gold)" }}
                href={waLink("Hi Nomadifly! I'd like to plan a Bhutan trip.")}
                onClick={closeMenu}
              >
                Enquire on WhatsApp <span>↗</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
