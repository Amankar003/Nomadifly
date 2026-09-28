"use client";
import { useEffect, useState } from "react";
import { waLink } from "../lib/data";

export default function Nav({ onOpenQuiz }) {
  const [solid, setSolid] = useState(false);
  const [progress, setProgress] = useState(0);

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

  return (
    <nav className={"nav " + (solid ? "solid" : "")}>
      <div className="nav-brand">
        <a href="#top" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #F5A524 50%, #E33A24 50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(227, 58, 36, 0.3)',
            position: 'relative'
          }}>
            <span style={{ fontSize: '22px', filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))', transform: 'scaleX(-1)' }}>🐉</span>
          </div>
          <span style={{
            fontFamily: 'var(--font-bricolage)',
            fontSize: '26px',
            fontWeight: '800',
            background: 'linear-gradient(90deg, #F5A524 0%, #E33A24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-1px'
          }}>Nomadifly</span>
        </a>
        <span className="online-pill">
          <span className="online-dot" /> Annu Sia online
        </span>
      </div>

      <div className="links">
        <a href="#destinations">Places</a>
        <a href="#tours">Tours</a>
        <a href="#itinerary">Itinerary</a>
        <a href="#why-us">Why Us</a>
        <a href="#reviews">Reviews</a>
        <a href="#faq">FAQ</a>
      </div>

      <div className="nav-actions">
        <button className="nav-quiz-btn" onClick={onOpenQuiz}>
          ✨ Build Custom Plan
        </button>
        <a className="pill-btn" href={waLink("Hi Nomadifly! I'd like to plan a Bhutan trip.")}>
          Enquire <span>↗</span>
        </a>
      </div>

      <div className="scroll-progress-line" style={{ width: `${progress}%` }} />
    </nav>
  );
}
