"use client";
import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = document.documentElement;
    const layer = document.createElement("div");
    layer.className = "glow-layer";
    document.body.appendChild(layer);

    let raf;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${e.clientX}px`);
        root.style.setProperty("--my", `${e.clientY}px`);
        layer.classList.add("active");
      });
    };
    const onLeave = () => layer.classList.remove("active");

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      layer.remove();
    };
  }, []);

  return null;
}
