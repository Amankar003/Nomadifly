"use client";
import { useEffect, useState } from "react";
import { waLink } from "../lib/data";
export default function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 60);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <nav className={"nav " + (solid ? "solid" : "")}>
      <a href="#top" className="logo">🐉 Nomadifly</a>
      <div className="links">
        <a href="#destinations">Places</a><a href="#tours">Tours</a><a href="#itinerary">Itinerary</a>
        <a href="#about">About</a><a href="#faq">FAQ</a>
      </div>
      <a className="pill-btn" href={waLink("Hi Nomadifly! I'd like to plan a Bhutan trip.")}>Enquire now <span>↗</span></a>
    </nav>
  );
}
