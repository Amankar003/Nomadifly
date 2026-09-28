"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { IMG, TOURS, DESTINATIONS, DAYS, REVIEWS, COMPARISON, INFO, FAQ, CONTACT, waLink, EXPERIENCES, SEASONS } from "../lib/data";
import MapVisualizer from "./MapVisualizer";

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);
const inr = (n) => "₹" + n.toLocaleString("en-IN");

export function Trust() {
  const items = [
    "Founder-led",
    "Bhutanese co-host",
    "Permits 100% handled",
    "Small groups (8–12 max)",
    "SDF Fee Transparency",
    "Real humans on WhatsApp",
    "Boutique Mountain Lodges",
  ];
  return (
    <div className="marquee">
      <div className="track">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i}>
            {t} <em>✦</em>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Destinations() {
  return (
    <section id="destinations" className="sec">
      <Reveal className="head">
        <h2>Places you'll actually stand in</h2>
        <p>Real Bhutan, from the cliffside monastery to the quiet river valleys.</p>
      </Reveal>

      {/* Horizontal Cards Rail */}
      <div className="rail">
        {DESTINATIONS.map((d, i) => (
          <Reveal key={d.name} delay={i * 0.06} className="dest">
            <img src={d.img} alt={d.name} loading="lazy" />
            <div className="dest-txt">
              <span className="dest-alt-chip">{d.altitude}</span>
              <h3>{d.name}</h3>
              <p>{d.note}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Interactive Route Map & Altitude Visualizer */}
      <Reveal delay={0.2} style={{ marginTop: "60px" }}>
        <MapVisualizer />
      </Reveal>
    </section>
  );
}

export function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["14%", "-14%"]);
  return (
    <section ref={ref} className="sec story">
      <div className="story-imgs">
        <motion.div className="s-a" style={{ y: y1 }}>
          <img src={IMG.dzong2} alt="Bhutanese dzong" loading="lazy" />
        </motion.div>
        <motion.div className="s-b" style={{ y: y2 }}>
          <img src={IMG.bridge2} alt="Prayer-flag bridge" loading="lazy" />
        </motion.div>
      </div>
      <Reveal className="story-txt">
        <span className="badge-pill">⛰️ Homeland Experience</span>
        <h2>The only country that measures happiness, not just GDP.</h2>
        <p>
          Bhutan opened to visitors only in the 1970s and still limits tourism on purpose. It is carbon-negative, its dzongs are living monasteries, and archery is the national sport.
        </p>
        <p>
          Nomadifly exists to show you Bhutan — the one Anushia grew up in — not just the version printed on generic brochures.
        </p>
        <div className="facts">
          <span>Gross National Happiness</span>
          <span>Carbon-negative</span>
          <span>No Visa for Indians</span>
          <span>Direct Co-founder Support</span>
        </div>
      </Reveal>
    </section>
  );
}

export function Tours({ onOpenQuiz }) {
  return (
    <section id="tours" className="sec dark">
      <Reveal className="head">
        <h2>Upcoming group departures</h2>
        <p>Small batches, hosted by someone who calls Bhutan home.</p>
      </Reveal>
      <div className="tour-grid">
        {TOURS.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.1} className="tour">
            <div className="tour-img">
              <img src={t.img} alt={t.title} loading="lazy" />
              <b>Save {inr(t.was - t.price)}</b>
              <span className="tour-spots-pill">{t.spots}</span>
            </div>
            <div className="tour-body">
              <small>{t.host} · {t.length}</small>
              <h3>{t.title}</h3>
              <p className="dates">📅 {t.dates}</p>
              <div className="tags">
                <span>Entry & Route Permits</span>
                <span>Stay + Breakfast</span>
                <span>Private Chauffeur</span>
                <span>Local Guide</span>
              </div>
              <div className="price">
                <strong>{inr(t.price)}</strong>
                <s>{inr(t.was)}</s>
                <em>per person · SDF fee extra</em>
              </div>
              <a
                className="pill-btn dark"
                href={waLink(`Hi Nomadifly! I want to book: ${t.title} (${t.dates}). Please share details.`)}
              >
                Book this trip <span>↗</span>
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="custom-banner-box">
        <div>
          <h3>Want private or custom dates for your family?</h3>
          <p>We tailor exact dates, hotel preferences, and pace for solo, couple, or private groups.</p>
        </div>
        <button className="pill-btn" style={{ background: "#F5A524" }} onClick={onOpenQuiz}>
          Build Custom Itinerary <span>✨</span>
        </button>
      </div>
    </section>
  );
}

export function Itinerary() {
  const [i, setI] = useState(0);
  const current = DAYS[i];

  return (
    <section id="itinerary" className="sec">
      <Reveal className="head">
        <h2>Your 7 days, day by day</h2>
        <p>Tap a day to view elevation, highlights, and authentic local experiences.</p>
      </Reveal>

      <div className="itin">
        <div className="days">
          {DAYS.map((d, k) => (
            <button key={k} className={k === i ? "on" : ""} onClick={() => setI(k)}>
              <div className="day-btn-head">
                <small>Day {k + 1}</small>
                <span className="day-alt-tag">{d.alt}</span>
              </div>
              <b>{d.t}</b>
              {k === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{d.d}</p>

                  <div className="day-meta-chips">
                    <span>🥾 Level: {d.level}</span>
                    <span>🌟 {d.highlight}</span>
                    <span>🍲 {d.food}</span>
                  </div>
                </motion.div>
              )}
            </button>
          ))}
        </div>

        <div className="itin-img">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              className="itin-img-wrapper"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={current.img} alt={current.t} />
              <div className="itin-img-overlay">
                <small>DAY {i + 1} HIGHLIGHT</small>
                <h4>{current.highlight}</h4>
                <span>Elevation: {current.alt}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section id="why-us" className="sec soft">
      <Reveal className="head">
        <h2>Why travel Bhutan with Nomadifly?</h2>
        <p>How a founder-led boutique host compares to standard travel operators.</p>
      </Reveal>

      <div className="comparison-table-wrapper">
        <table className="comp-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th className="highlight-col">🐉 Nomadifly</th>
              <th>Standard Tour Operators</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row, idx) => (
              <tr key={idx}>
                <td className="feat-cell">{row.feature}</td>
                <td className="us-cell">
                  <span className="check-icon">✓</span> {row.us}
                </td>
                <td className="standard-cell">{row.standard}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="sec">
      <Reveal className="head">
        <h2>Words from past travelers</h2>
        <p>Real stories from people who experienced Bhutan with us.</p>
      </Reveal>

      <div className="reviews-grid">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.id} delay={i * 0.1} className="review-card">
            <div className="review-stars">{"★".repeat(r.rating)}</div>
            <p className="review-text">"{r.text}"</p>
            <div className="review-author">
              <img src={r.avatar} alt={r.name} />
              <div>
                <b>{r.name}</b>
                <small>{r.location} · {r.date}</small>
                <span className="review-tour-tag">{r.tour}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Info() {
  return (
    <section className="sec soft">
      <Reveal className="head">
        <h2>Good to know, in plain words</h2>
        <p>The practical bits people ask before booking.</p>
      </Reveal>
      <div className="info">
        {INFO.map(([l, v, p], k) => (
          <Reveal key={l} delay={k * 0.05} className="info-c">
            <small>{l}</small>
            <h3>{v}</h3>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="sec" style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '120px 20px' }}>
      
      {/* Left Side: Single Founder Photo */}
      <div style={{ flex: '1 1 500px', position: 'relative', height: '600px' }}>
        <Reveal delay={0.1}>
          <motion.img 
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            src="/founder4.jpg" 
            alt="Founders at Tiger's Nest" 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.15)', border: '8px solid #fff' }}
          />
        </Reveal>
      </div>

      {/* Right Side: About Text */}
      <div style={{ flex: '1 1 400px' }}>
        <Reveal>
          <span className="badge-pill" style={{ marginBottom: '20px', display: 'inline-block' }}>👋 Meet the Hosts</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#0A1424', marginBottom: '30px', lineHeight: '1.1' }}>
            Two people.<br/>One homeland to share.
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: '1.8', marginBottom: '20px' }}>
            <b style={{ color: '#0A1424' }}>Anushia</b> grew up in Bhutan, lived abroad, and travelled widely — yet nothing ever compared to home.{" "}
            <b style={{ color: '#0A1424' }}>Deepanshu Sangwan</b> is a travel creator who has explored 60+ countries and rates Bhutan among the most special places on earth.
          </p>
          <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: '1.8' }}>
            Together they build journeys that feel like travelling with close friends, rather than following a rigid tourist schedule. They know the hidden trails, the best local food, and the true soul of the Himalayas.
          </p>
        </Reveal>
      </div>

    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="sec soft">
      <Reveal className="head">
        <h2>Before you book</h2>
      </Reveal>
      <div className="faq">
        {FAQ.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Enquire({ onOpenQuiz }) {
  const [f, setF] = useState({ name: "", phone: "", dates: "", note: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = (e) => {
    e.preventDefault();
    window.location.href = waLink(
      `Hi Nomadifly! I'm ${f.name}.\nPhone: ${f.phone}\nDates: ${f.dates}\nNote: ${f.note}`
    );
  };
  return (
    <section id="enquire" className="cta">
      <img src={IMG.peaks} alt="" />
      <div className="cta-shade" />
      <Reveal className="cta-in">
        <h2>Bhutan isn't going anywhere.<br />Your free week might.</h2>
        <p>Tell us your dates. We reply with a real plan — usually within a day.</p>
        <form onSubmit={send}>
          <input required placeholder="Your name" value={f.name} onChange={set("name")} />
          <input required placeholder="Phone / WhatsApp" value={f.phone} onChange={set("phone")} />
          <input placeholder="Preferred dates" value={f.dates} onChange={set("dates")} />
          <input placeholder="Anything special?" value={f.note} onChange={set("note")} />
          <button className="pill-btn" type="submit">
            Plan my trip <span>↗</span>
          </button>
        </form>

        <div style={{ marginTop: "24px" }}>
          <button className="quiz-link-btn" onClick={onOpenQuiz}>
            ✨ Prefer an interactive custom plan quiz? Click here
          </button>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div>
        <b>🐉 Nomadifly</b>
        <p>Travel Bhutan, your way.</p>
      </div>
      <div>
        <p>{CONTACT.email}</p>
        <p>Mon–Fri 9:30am–6:30pm · Sat 9:30am–1:30pm</p>
      </div>
      <p>© 2026 Nomadifly. All rights reserved.</p>
    </footer>
  );
}

export function CulturalExperiences() {
  return (
    <section id="experiences" className="sec soft" style={{ background: '#0A1424', padding: '100px 20px', color: '#fff' }}>
      <Reveal className="head">
        <span className="badge-pill" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>🎭 Deep Immersion</span>
        <h2 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Beyond the Sightseeing</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem' }}>A true journey isn't just about where you stand, but what you feel.</p>
      </Reveal>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '24px', 
        padding: '0 20px', 
        maxWidth: '1280px', 
        margin: '60px auto 0' 
      }}>
        {EXPERIENCES.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.1}>
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ 
                position: 'relative',
                borderRadius: '32px', 
                overflow: 'hidden', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                aspectRatio: '4/5',
                cursor: 'pointer'
              }}
            >
              <img src={e.img} alt={e.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: "transform 0.5s ease" }} />
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to top, rgba(10, 20, 36, 0.9) 0%, rgba(10, 20, 36, 0.4) 50%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '40px 30px'
              }}>
                <div style={{ 
                  width: '50px', height: '50px', background: 'rgba(255,255,255,0.15)', 
                  backdropFilter: 'blur(10px)', borderRadius: '50%', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  {e.icon}
                </div>
                <h3 style={{ margin: '0 0 12px', fontSize: '1.8rem', color: '#fff', fontFamily: 'var(--font-bricolage)' }}>{e.title}</h3>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: '1.6' }}>{e.desc}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}




export function MasonryGallery() {
  const photos = [IMG.gallery1, IMG.gallery2, IMG.gallery3, IMG.gallery4, IMG.gallery5, IMG.gallery6];
  return (
    <section id="gallery" className="sec" style={{ overflow: 'hidden', paddingBottom: '120px' }}>
      <Reveal className="head" style={{ marginBottom: '80px' }}>
        <span className="badge-pill">📸 Moments</span>
        <h2>The Vibe of the Trip</h2>
        <p>Hover over the photos to explore real memories from Bhutan.</p>
      </Reveal>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '450px', 
        position: 'relative',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {photos.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ 
              opacity: 1, 
              rotate: (i - 2.5) * 8, 
              x: (i - 2.5) * 70, // Spread them out horizontally
              y: Math.abs(i - 2.5) * 15 // Create a beautiful arch
            }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -50, 
              scale: 1.15, 
              zIndex: 50, 
              rotate: (i - 2.5) * 2, // Straighten up slightly on hover
              boxShadow: '0 30px 60px rgba(0,0,0,0.3)'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              position: 'absolute',
              width: '320px',
              height: '420px',
              borderRadius: '24px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
              overflow: 'hidden',
              zIndex: photos.length - Math.abs(i - 2.5), // Middle ones stay on top naturally
              transformOrigin: 'bottom center',
              border: '8px solid #fff' // Polaroid style border
            }}
          >
            <img src={src} alt="Travel Moment" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
