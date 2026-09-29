"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

/**
 * Cinematic page header — ThrillHikers-style depth occlusion.
 *
 * Layer stack (bottom → top):
 *   z0  Background image (full, slightly dimmed for sky contrast)
 *   z1  Giant editorial typography (bright, clearly visible against sky)
 *   z2  Foreground mountain layer (SAME image, CSS-masked to only reveal
 *       the bottom mountain area → covers bottom portions of the letters)
 *   z3  Dark bottom gradient (content readability)
 *   z4  Snow particle canvas (Three.js)
 *   z10 Content (title, subtitle, CTAs)
 *
 * The foreground mountain layer (z2) is the key: it makes the mountain
 * terrain appear IN FRONT of the letters while the sky area reveals
 * the text behind, just like ThrillHikers.
 */
export default function PageHeader({ title, subtitle, image, bgWord, children }) {
  const root = useRef(null);
  const mount = useRef(null);
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end start"] });

  // Both image layers share the SAME parallax so they stay perfectly aligned
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.05]);
  // Text moves FASTER on scroll → appears farther away (behind mountains)
  const textParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Dynamic font sizing based on word length
  const wordLen = bgWord ? bgWord.length : 5;
  const vwUnit = Math.max(13, 120 / wordLen);
  const dynamicFontSize = `clamp(4.5rem, ${vwUnit}vw, 26rem)`;

  // Foreground mask: reveals mountain terrain at the bottom, hides sky at top
  // Bottom 40% fully opaque → transition zone 40-62% → top 62%+ transparent
  const mountainMask = "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 38%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 62%)";

  /* ───── Three.js falling snow particles ───── */
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
      const canvas = document.createElement("canvas");
      canvas.width = 16; canvas.height = 16;
      const ctx = canvas.getContext("2d");
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
      const tex = new THREE.CanvasTexture(canvas);
      const mat = new THREE.PointsMaterial({ size, color: 0xffffff, map: tex, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      return { geo, vel, count, mat, tex };
    };

    const layers = [
      createLayer(120, 0.1, 0.005, 0.009, 0.5),
      createLayer(180, 0.05, 0.002, 0.005, 0.25),
    ];

    let mx = 0, my = 0, raf, t = 0;
    const onMove = (e) => { mx = (e.clientX / window.innerWidth - 0.5) * 2; my = (e.clientY / window.innerHeight - 0.5) * 2; };
    const onResize = () => { w = el.clientWidth; h = el.clientHeight; renderer.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix(); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    const loop = () => {
      t += 0.01;
      layers.forEach((layer, li) => {
        const p = layer.geo.attributes.position.array;
        for (let i = 0; i < layer.count; i++) {
          p[i * 3 + 1] -= layer.vel[i];
          p[i * 3] += Math.sin(t + i + li) * 0.001;
          if (p[i * 3 + 1] < -5) p[i * 3 + 1] = 5;
        }
        layer.geo.attributes.position.needsUpdate = true;
      });
      cam.position.x += (mx * 0.2 - cam.position.x) * 0.04;
      cam.position.y += (-my * 0.1 - cam.position.y) * 0.04;
      cam.lookAt(0, 0, 0);
      renderer.render(scene, cam);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      layers.forEach(l => { l.geo.dispose(); l.mat.dispose(); l.tex.dispose(); });
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section ref={root} style={{ padding: '14px', height: '80svh', minHeight: '650px', position: 'relative' }}>
      <div style={{ position: 'relative', height: '100%', borderRadius: 'var(--r)', overflow: 'hidden', background: '#0a1420' }}>
        
        {/* ── Z0: Background image (full, dimmed so text pops against sky) ── */}
        <motion.img 
          src={image} 
          alt={title} 
          style={{ 
            position: 'absolute', inset: 0, 
            width: '100%', height: '100%', 
            objectFit: 'cover', 
            y: imgY, 
            scale: imgScale, 
            willChange: 'transform',
            filter: 'brightness(0.65) saturate(0.9)',
            zIndex: 0,
          }} 
        />

        {/* ── Z0.5: Atmospheric sky overlay — enhances the sky area behind text ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(180deg, rgba(15,25,50,0.45) 0%, rgba(15,25,50,0.1) 30%, transparent 55%, rgba(10,14,20,0.25) 85%, rgba(10,14,20,0.6) 100%)',
        }} />

        {/* ── Z1: Giant cinematic typography — CLEARLY VISIBLE behind mountains ── */}
        {bgWord && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: 'clamp(100px, 15vh, 20vh)',
              zIndex: 1,
              pointerEvents: 'none',
              y: textParallaxY,
            }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: dynamicFontSize,
                fontFamily: 'var(--font-bricolage)',
                fontWeight: 800,
                color: 'rgba(255, 255, 255, 1)',
                letterSpacing: '-0.04em',
                lineHeight: 0.88,
                textShadow: '0 4px 40px rgba(0,0,0,0.4), 0 0 100px rgba(0,0,0,0.2)',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              {bgWord}
            </motion.span>
          </motion.div>
        )}

        {/* ── Z2: Foreground Mountain PNG Cutout ──
             This PNG has a white background and a dark mountain.
             Using mixBlendMode: 'multiply' turns the white background transparent,
             while the dark mountain pixels remain and overlap the giant text! */}
        <motion.img 
          src="/mountain_foreground.png"
          alt="Foreground Mountain"
          style={{
            position: 'absolute', 
            bottom: '-10%', 
            left: 0, 
            width: '100%', 
            height: '70%', 
            objectFit: 'cover',
            objectPosition: 'top',
            zIndex: 2,
            pointerEvents: 'none',
            mixBlendMode: 'multiply',
            opacity: 0.85,
            y: useTransform(scrollYProgress, [0, 1], ["0%", "5%"]),
          }}
        />

        {/* ── Z3: Dark bottom gradient for content readability ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3,
          background: 'linear-gradient(to top, rgba(12,14,18,0.98) 0%, rgba(12,14,18,0.7) 25%, rgba(12,14,18,0.15) 50%, transparent 70%)',
        }} />

        {/* ── Z4: Snow particle canvas ── */}
        <div ref={mount} style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }} />

        {/* ── Z10: Content — title, subtitle, CTAs ── */}
        <div style={{ 
          position: 'absolute', inset: 0, zIndex: 10, 
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', 
          padding: 'clamp(24px, 5vw, 60px)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '40px' }}>
            
            {/* Left: page info */}
            <motion.div style={{ color: '#fff', opacity: contentFade, flex: '1 1 500px' }}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}
              >
                <div style={{ width: '40px', height: '2px', background: 'var(--gold)' }} />
                <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold)' }}>Nomadifly</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontFamily: 'var(--font-bricolage)', letterSpacing: '-0.03em', marginBottom: '20px', fontWeight: 700, lineHeight: 1.05, maxWidth: '600px' }}
              >
                {title}
              </motion.h1>
              
              {subtitle && (
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '500px', lineHeight: 1.6 }}
                >
                  {subtitle}
                </motion.p>
              )}
            </motion.div>

            {/* Right: floating widget / children */}
            {children && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ flex: '0 0 auto', zIndex: 20 }}
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
