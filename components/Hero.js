"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { IMG, waLink } from "../lib/data";

export default function Hero() {
  const root = useRef(null);
  const mount = useRef(null);
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.3]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const [when, setWhen] = useState("13–19 Oct 2026");
  const [guests, setGuests] = useState("2");

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
    const N = 500;
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      vel[i] = 0.004 + Math.random() * 0.012;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);
    let mx = 0, my = 0, raf, t = 0;
    const onMove = (e) => { mx = (e.clientX / window.innerWidth - 0.5) * 2; my = (e.clientY / window.innerHeight - 0.5) * 2; };
    const onResize = () => { w = el.clientWidth; h = el.clientHeight; renderer.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix(); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    const loop = () => {
      t += 0.01;
      const p = geo.attributes.position.array;
      for (let i = 0; i < N; i++) {
        p[i * 3 + 1] -= vel[i];
        p[i * 3] += Math.sin(t + i) * 0.0012;
        if (p[i * 3 + 1] < -4.2) p[i * 3 + 1] = 4.2;
      }
      geo.attributes.position.needsUpdate = true;
      cam.position.x += (mx * 0.6 - cam.position.x) * 0.04;
      cam.position.y += (-my * 0.4 - cam.position.y) * 0.04;
      cam.lookAt(0, 0, 0);
      renderer.render(scene, cam);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      geo.dispose(); mat.dispose(); renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  const go = () => {
    window.location.href = waLink(`Hi Nomadifly! I want to travel to Bhutan.\nDates: ${when}\nGuests: ${guests}\nPlease share the plan and price.`);
  };

  return (
    <section id="top" ref={root} className="hero">
      <div className="hero-frame">
        <motion.img className="hero-img" src={IMG.hero} alt="Tiger's Nest monastery clinging to a cliff in Paro, Bhutan" style={{ y: imgY, scale: imgScale }} />
        <div className="hero-shade" />
        <motion.div className="hero-word" style={{ y: wordY, opacity: fade }}>BHUTAN</motion.div>
        <div ref={mount} className="hero-canvas" />

        <motion.div className="hero-card" style={{ opacity: fade }}>
          <img src={IMG.peaks} alt="" />
          <div><small>Paro Taktsang</small><b>3,120 m</b><span>Tiger's Nest · Day 5</span></div>
        </motion.div>

        <motion.div className="hero-copy" style={{ opacity: fade }}>
          <h1>Uncover the last<br />Himalayan kingdom.</h1>
          <p>Small groups. Permits handled. A Bhutanese co-founder who calls it home.</p>
        </motion.div>

        <motion.div className="hero-search" style={{ opacity: fade }}>
          <label><small>Where to</small><b>📍 Bhutan</b></label>
          <label><small>Date</small>
            <select value={when} onChange={(e) => setWhen(e.target.value)}>
              <option>13–19 Oct 2026</option><option>Custom dates</option><option>Nov–Dec 2026</option><option>Mar–May 2027</option>
            </select></label>
          <label><small>Guests</small>
            <select value={guests} onChange={(e) => setGuests(e.target.value)}>
              <option>1</option><option>2</option><option>3–5</option><option>6–10</option><option>10+</option>
            </select></label>
          <button onClick={go}>Enquire on WhatsApp</button>
        </motion.div>

        <a className="hero-offer" href="#tours"><i>Limited seats</i> Group departures from ₹39,900 — save ₹10,100 <span>→</span></a>
      </div>
    </section>
  );
}
