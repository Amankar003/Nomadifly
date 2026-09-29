"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { IMG } from "../lib/data";

export default function Hero() {
  const root = useRef(null);
  const mount = useRef(null);
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.04]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const [dayIndex, setDayIndex] = useState(0);
  const journeyDays = [
    { title: "Thimphu", day: "Day 01", alt: "2,320 m", img: IMG.town },
    { title: "Punakha Dzong", day: "Day 03", alt: "1,200 m", img: IMG.dzong },
    { title: "Paro Taktsang", day: "Day 05", alt: "3,120 m", img: IMG.peaks },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDayIndex(prev => (prev + 1) % journeyDays.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = mount.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = el.clientWidth, h = el.clientHeight;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    cam.position.z = 5;

    // Helper to create snow layers
    const createLayer = (count, size, speedMin, speedMax, opacity) => {
      const pos = new Float32Array(count * 3);
      const vel = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 14;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
        vel[i] = speedMin + Math.random() * (speedMax - speedMin);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      
      // Use Canvas texture for soft blurred snow
      const canvas = document.createElement("canvas");
      canvas.width = 16; canvas.height = 16;
      const ctx = canvas.getContext("2d");
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
      const tex = new THREE.CanvasTexture(canvas);

      const mat = new THREE.PointsMaterial({ 
        size, 
        color: 0xffffff, 
        map: tex, 
        transparent: true, 
        opacity, 
        depthWrite: false, 
        blending: THREE.AdditiveBlending 
      });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      return { geo, vel, count, mat, tex };
    };

    const layers = [
      createLayer(150, 0.12, 0.008, 0.015, 0.8), // Foreground: larger, faster
      createLayer(250, 0.07, 0.004, 0.008, 0.5), // Midground
      createLayer(350, 0.04, 0.002, 0.004, 0.3)  // Background: smaller, slower
    ];

    let mx = 0, my = 0, raf, t = 0;
    const onMove = (e) => { mx = (e.clientX / window.innerWidth - 0.5) * 2; my = (e.clientY / window.innerHeight - 0.5) * 2; };
    const onResize = () => { w = el.clientWidth; h = el.clientHeight; renderer.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix(); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    
    const loop = () => {
      t += 0.01;
      layers.forEach((layer, layerIdx) => {
        const p = layer.geo.attributes.position.array;
        for (let i = 0; i < layer.count; i++) {
          p[i * 3 + 1] -= layer.vel[i]; // move down
          p[i * 3] += Math.sin(t + i + layerIdx) * 0.001; // horizontal drift
          if (p[i * 3 + 1] < -5) p[i * 3 + 1] = 5;
        }
        layer.geo.attributes.position.needsUpdate = true;
      });
      
      cam.position.x += (mx * 0.3 - cam.position.x) * 0.04;
      cam.position.y += (-my * 0.2 - cam.position.y) * 0.04;
      cam.lookAt(0, 0, 0);
      renderer.render(scene, cam);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      layers.forEach(l => {
        l.geo.dispose();
        l.mat.dispose();
        l.tex.dispose();
      });
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section id="top" ref={root} className="hero">
      <div className="hero-frame">
        <motion.img className="hero-img" src={IMG.hero} alt="Tiger's Nest monastery clinging to a cliff in Paro, Bhutan" style={{ y: imgY, scale: imgScale }} />
        <div className="hero-shade" />
        <div ref={mount} className="hero-canvas" />

        <motion.div className="hero-card" style={{ opacity: fade, width: '280px', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={dayIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', gap: '14px', alignItems: 'center', width: '100%' }}
            >
              <img src={journeyDays[dayIndex].img} alt="" style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <small style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{journeyDays[dayIndex].day}</small>
                <b style={{ fontSize: '1.3rem', display: 'block', margin: '2px 0', fontFamily: 'var(--font-bricolage)' }}>{journeyDays[dayIndex].title}</b>
                <span style={{ color: 'var(--gold)' }}>{journeyDays[dayIndex].alt}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div className="hero-copy updated-hero-copy" style={{ opacity: fade }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Uncover the last<br />Himalayan kingdom.
          </h1>
          <p style={{ fontSize: '1.15rem', maxWidth: '500px', opacity: 0.9, marginBottom: '36px' }}>
            Small groups. Permits handled. A Bhutanese co-founder who calls it home.
          </p>
          <div style={{ display: 'flex', gap: 'clamp(10px, 2vw, 16px)', flexWrap: 'wrap' }}>
            <a href="/places" className="pill-btn" style={{ padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px)', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', whiteSpace: 'nowrap', flex: '1 1 auto', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
              Explore Bhutan <span>↗</span>
            </a>
            <a href="/itineraries" className="pill-btn dark" style={{ padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px)', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', whiteSpace: 'nowrap', flex: '1 1 auto', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
              View Itineraries
            </a>
          </div>
        </motion.div>

        <motion.div 
          className="scroll-indicator"
          style={{ opacity: fade, position: 'absolute', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', fontSize: '0.75rem', letterSpacing: '0.15em', fontWeight: 700 }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          SCROLL TO EXPLORE
          <span style={{ fontSize: '1rem', color: 'var(--gold)' }}>↓</span>
        </motion.div>

        <a className="hero-offer updated-offer" href="/itineraries" style={{ transition: '0.3s' }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '4px' }}>LIMITED DEPARTURES</div>
            <div style={{ fontSize: '0.9rem' }}>Bhutan from ₹39,900 <span style={{ opacity: 0.6 }}>— save ₹10,100</span></div>
          </div>
          <span style={{ background: '#fff', color: '#000', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', marginLeft: '20px', transition: 'transform 0.3s' }}>→</span>
        </a>

        <style>{`
          .updated-hero-copy {
            bottom: 160px;
            right: 40px; /* Don't stretch indefinitely on wide screens */
          }
          .updated-offer {
            bottom: 40px !important;
            right: 40px !important;
            left: auto !important;
            background: rgba(10, 20, 36, 0.6) !important;
            border: 1px solid rgba(255,255,255,0.15) !important;
            padding: 16px 24px !important;
            border-radius: 24px !important;
          }
          .scroll-indicator {
            bottom: 40px;
          }
          @media (max-width: 1000px) {
            .updated-hero-copy {
              bottom: 140px; /* Push it up to avoid banner */
              right: 24px;
            }
            .updated-offer {
              bottom: 20px !important;
              right: 20px !important;
              left: 20px !important;
              padding: 12px 20px !important;
            }
            .scroll-indicator {
              display: none !important; /* Hide scroll indicator on mobile to save space */
            }
          }
        `}</style>
      </div>
    </section>
  );
}
