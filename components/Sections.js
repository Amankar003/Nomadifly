"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { IMG, TOURS, DESTINATIONS, DAYS, REVIEWS, COMPARISON, INFO, FAQ, CONTACT, waLink, EXPERIENCES, SEASONS } from "../lib/data";
import MapVisualizer from "./MapVisualizer";
import AccordionGallery from "./AccordionGallery";
import CircularGallery from "./CircularGallery";
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

export function HomeDestinations() {
  const accordionItems = DESTINATIONS.map(d => ({
    image: d.img,
    label: d.name,
    subtitle: d.note,
    link: '#'
  }));

  return (
    <section id="destinations" className="sec" style={{ padding: '120px 20px', maxWidth: '1300px', margin: '0 auto' }}>
      <Reveal className="head" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span className="badge-pill" style={{ margin: '0 auto 24px' }}>📍 Map of Wonders</span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#0A1424', marginBottom: '20px' }}>Places you'll actually stand in</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', color: '#475569' }}>Real Bhutan, from the cliffside monastery to the quiet river valleys.</p>
      </Reveal>

      <Reveal delay={0.2} style={{ height: '600px' }}>
        <AccordionGallery
          items={accordionItems}
          defaultIndex={0}
          expandRatio={0.52}
          trigger="hover"
          accentColor="var(--gold)"
          overlayColor="#060010"
          textColor="#ffffff"
          grayscale
          showLabels
          duration={0.6}
          ease={[0.22, 1, 0.36, 1]}
          parallax={0.5}
          tilt={8}
          stagger={0.06}
          height={600}
          gap={10}
          radius={24}
          orientation="horizontal"
        />
      </Reveal>

      {/* Interactive Route Map & Altitude Visualizer */}
      <Reveal delay={0.2} style={{ marginTop: "100px" }}>
        <MapVisualizer />
      </Reveal>
    </section>
  );
}

export function PlacesDestinations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDest = DESTINATIONS[activeIndex];

  return (
    <section id="destinations-places" className="sec" style={{ padding: '40px 0', maxWidth: '100vw', margin: '0 auto', overflow: 'hidden' }}>
      <Reveal className="head" style={{ textAlign: 'center', marginBottom: '40px', padding: '0 20px' }}>
        <span className="badge-pill" style={{ margin: '0 auto 24px' }}>📍 Map of Wonders</span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#0A1424', marginBottom: '20px' }}>Places you'll actually stand in</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', color: '#475569' }}>The true essence of Bhutan, curated for your journey.</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div style={{ position: 'relative', width: '100%', height: '85vh', minHeight: '700px', maxHeight: '950px', backgroundColor: '#0A1424' }}>
          
          <AnimatePresence mode="wait">
            <motion.img 
              key={activeDest.name}
              src={activeDest.img}
              alt={activeDest.name}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.85, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </AnimatePresence>

          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10, 20, 36, 0.95) 0%, rgba(10, 20, 36, 0.4) 40%, rgba(10, 20, 36, 0.1) 100%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: 'clamp(20px, 5vw, 60px)'
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDest.name + "-text"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ maxWidth: '800px', marginBottom: '40px' }}
              >
                <div style={{ 
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.2)', 
                  backdropFilter: 'blur(8px)', 
                  padding: '6px 16px', 
                  borderRadius: '100px',
                  color: '#fff', 
                  fontSize: '0.9rem', 
                  fontWeight: 700, 
                  marginBottom: '20px',
                  letterSpacing: '0.05em'
                }}>
                  🏔️ Elevation: {activeDest.altitude}
                </div>
                <h3 style={{ color: '#fff', fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: 'var(--font-bricolage)', margin: '0 0 16px 0', lineHeight: 1.05 }}>
                  {activeDest.name}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', lineHeight: 1.6 }}>
                  {activeDest.note}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Tabs */}
            <div className="hero-tabs-container" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }}>
              {DESTINATIONS.map((d, i) => (
                <button
                  key={d.name}
                  onClick={() => setActiveIndex(i)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '100px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: activeIndex === i ? '#fff' : 'rgba(255,255,255,0.1)',
                    color: activeIndex === i ? '#0A1424' : '#fff',
                    backdropFilter: 'blur(10px)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <div style={{ padding: '0 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <Reveal delay={0.2} style={{ marginTop: "60px" }}>
          <MapVisualizer />
        </Reveal>
      </div>

      <style>{`
        .hero-tabs-container::-webkit-scrollbar {
          display: none;
        }
        .hero-tabs-container {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hero-tabs-container button:hover {
          background: rgba(255,255,255,0.2);
        }
      `}</style>
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
              <div className="tags" style={{ display: 'flex', gap: '8px', color: 'var(--muted)', fontSize: '0.85rem', flexWrap: 'wrap', marginBottom: '24px' }}>
                <span>Permits</span>
                <span>•</span>
                <span>Stay + Breakfast</span>
                <span>•</span>
                <span>Chauffeur</span>
                <span>•</span>
                <span>Guide</span>
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
        <button className="pill-btn" style={{ background: "var(--gold)", border: 'none' }} onClick={onOpenQuiz}>
          Plan My Trip <span>↗</span>
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
      
      <div className="about-photo-wrap" style={{ flex: '1 1 500px', position: 'relative', aspectRatio: '4/5' }}>
        <Reveal delay={0.1}>
          <motion.img 
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            src="/founder4.jpg" 
            alt="Founders at Tiger's Nest" 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
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
            Design a Custom Itinerary ↗
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
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <img 
            src="/logo.png" 
            alt="Nomadifly" 
            style={{ height: '40px', objectFit: 'contain' }} 
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'inline';
            }} 
          />
          <span style={{ display: 'none', fontSize: '1.2rem', fontWeight: 700 }}>Nomadifly</span>
        </div>
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
              className="exp-card"
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
              <img src={e.img} alt={e.title} loading="lazy" className="exp-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: "transform 0.6s cubic-bezier(.22,1,.36,1)" }} />
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
  const photos = [
    { src: IMG.gallery1, user: "sarah.travels", likes: "1,342", caption: "Standing at the edge of the world. Bhutan is surreal. ✨ #TigerNest" },
    { src: IMG.gallery2, user: "john_explores", likes: "890", caption: "Peace and tranquility in every corner. Can't believe this place is real. 🇧🇹" },
    { src: IMG.gallery3, user: "nomad_life", likes: "2,512", caption: "The hike was tough but the views were completely worth it! 🏔️" },
    { src: IMG.gallery4, user: "wanderlust_annie", likes: "1,204", caption: "Archery with the locals today. Bulls eye! 🏹🎯" },
    { src: IMG.gallery5, user: "david_photography", likes: "3,673", caption: "Morning views from our boutique lodge. Unbelievable." },
    { src: IMG.gallery6, user: "the.travel.couple", likes: "2,150", caption: "Happiness is a place, and we found it. 🐉" }
  ];

  return (
    <section id="gallery" className="sec" style={{ overflow: 'hidden', paddingBottom: '120px' }}>
      <Reveal className="head" style={{ marginBottom: '60px' }}>
        <span className="badge-pill">📸 The Vibe of the Trip</span>
        <h2>Real Memories</h2>
        <p>Glimpses of Bhutan through the eyes of our travellers.</p>
      </Reveal>

      <div className="insta-carousel-container" style={{ overflow: 'hidden', width: '100%', position: 'relative', paddingBottom: '40px' }}>
        <div className="insta-track">
          {[...photos, ...photos].map((p, i) => {
            // Render normal Instagram Card
            return (
              <div key={i} className="insta-card" style={{ flex: '0 0 280px' }}>
                <div 
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    color: '#000',
                    transition: 'transform 0.3s'
                  }}
                >
                  {/* Instagram Style Header */}
                  <div style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      width: '36px', height: '36px', borderRadius: '50%', 
                      background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center' 
                    }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #fff', background: '#ccc', overflow: 'hidden' }}>
                        <img src={p.src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <b style={{ fontSize: '0.85rem', display: 'block' }}>{p.user}</b>
                      <span style={{ fontSize: '0.7rem', color: '#666' }}>Bhutan</span>
                    </div>
                  </div>
                  
                  {/* Square Photo */}
                  <div style={{ width: '100%', aspectRatio: '1/1', background: '#eee' }}>
                    <img src={p.src} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Travel Memory" />
                  </div>
                  
                  {/* Instagram Style Footer */}
                  <div style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', gap: '14px', marginBottom: '10px', fontSize: '1.25rem' }}>
                      <span style={{ cursor: 'pointer', color: '#ed4956' }}>❤️</span>
                      <span style={{ cursor: 'pointer' }}>💬</span>
                      <span style={{ cursor: 'pointer' }}>✈️</span>
                    </div>
                    <div style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px' }}>{p.likes} likes</div>
                    <div style={{ fontSize: '0.85rem', lineHeight: '1.4', color: '#333' }}>
                      <b>{p.user}</b> {p.caption}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); } /* Shift by exactly half the track including gap */
        }
        .insta-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: scrollMarquee 45s linear infinite;
        }
        .insta-track:hover {
          animation-play-state: paused;
        }
        .insta-card {
          transition: transform 0.3s;
        }
        .insta-card:hover {
          transform: translateY(-8px);
        }
      `}</style>

      {/* Next is your time CTA below the carousel */}
      <Reveal delay={0.2} className="cta-wrapper">
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', padding: '0 20px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0A1424 0%, #1A2E4C 100%)',
            borderRadius: '24px',
            padding: 'clamp(30px, 8vw, 50px) clamp(20px, 5vw, 60px)',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            maxWidth: '900px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h3 style={{ fontSize: 'clamp(2rem, 6vw, 2.8rem)', fontFamily: 'var(--font-bricolage)', marginBottom: '16px', color: '#fff' }}>Next is your time</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 'clamp(24px, 6vw, 40px)', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>Your Bhutan story is waiting to be written.</p>
            <a href="#enquire" className="pill-btn" style={{ background: 'var(--gold)', color: 'var(--navy)', margin: 0, padding: 'clamp(12px, 3vw, 16px) clamp(24px, 6vw, 42px)', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', fontWeight: 700, whiteSpace: 'nowrap' }}>
              Plan My Trip <span>↗</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
