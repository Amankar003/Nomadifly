"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { IMG, TOURS, DESTINATIONS, DAYS, INFO, FAQ, CONTACT, waLink } from "../lib/data";

const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
);
const inr = (n) => "₹" + n.toLocaleString("en-IN");

export function Trust() {
  const items = ["Founder-led", "Bhutanese co-host", "Permits handled", "Small groups only", "Custom itineraries", "Real humans on WhatsApp"];
  return (
    <div className="marquee"><div className="track">
      {[...items, ...items, ...items, ...items].map((t, i) => <span key={i}>{t} <em>✦</em></span>)}
    </div></div>
  );
}

export function Destinations() {
  return (
    <section id="destinations" className="sec">
      <Reveal className="head"><h2>Places you'll actually stand in</h2><p>Real Bhutan, from the cliffside monastery to the quiet river valleys.</p></Reveal>
      <div className="rail">
        {DESTINATIONS.map((d, i) => (
          <Reveal key={d.name} delay={i * 0.06} className="dest">
            <img src={d.img} alt={d.name} loading="lazy" />
            <div className="dest-txt"><h3>{d.name}</h3><p>{d.note}</p></div>
          </Reveal>
        ))}
      </div>
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
        <motion.div className="s-a" style={{ y: y1 }}><img src={IMG.dzong2} alt="Bhutanese dzong" loading="lazy" /></motion.div>
        <motion.div className="s-b" style={{ y: y2 }}><img src={IMG.bridge2} alt="Prayer-flag bridge" loading="lazy" /></motion.div>
      </div>
      <Reveal className="story-txt">
        <h2>The only country that measures happiness, not just GDP.</h2>
        <p>Bhutan opened to visitors only in the 1970s and still limits tourism on purpose. It is carbon-negative, its dzongs are living monasteries, and archery is the national sport.</p>
        <p>Nomadifly exists to show you that Bhutan — the one Anushia grew up in — not the version on every brochure.</p>
        <div className="facts"><span>Gross National Happiness</span><span>Carbon-negative</span><span>No visa for Indians</span></div>
      </Reveal>
    </section>
  );
}

export function Tours() {
  return (
    <section id="tours" className="sec dark">
      <Reveal className="head"><h2>Upcoming group tours</h2><p>Small batches, hosted by someone who knows Bhutan as home.</p></Reveal>
      <div className="tour-grid">
        {TOURS.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.1} className="tour">
            <div className="tour-img"><img src={t.img} alt={t.title} loading="lazy" /><b>Save {inr(t.was - t.price)}</b></div>
            <div className="tour-body">
              <small>{t.host} · {t.length}</small>
              <h3>{t.title}</h3>
              <p className="dates">{t.dates}</p>
              <div className="tags"><span>Permits handled</span><span>Stay + breakfast</span><span>Private transport</span><span>Local guide</span></div>
              <div className="price"><strong>{inr(t.price)}</strong><s>{inr(t.was)}</s><em>per person · SDF extra</em></div>
              <a className="pill-btn dark" href={waLink(`Hi Nomadifly! I want to book: ${t.title} (${t.dates}). Please share details.`)}>Book this trip <span>↗</span></a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Itinerary() {
  const [i, setI] = useState(0);
  return (
    <section id="itinerary" className="sec">
      <Reveal className="head"><h2>Your 7 days, day by day</h2><p>Tap a day. Exact order flexes with your dates and pace.</p></Reveal>
      <div className="itin">
        <div className="days">
          {DAYS.map((d, k) => (
            <button key={k} className={k === i ? "on" : ""} onClick={() => setI(k)}>
              <small>Day {k + 1}</small><b>{d.t}</b>
              {k === i && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>{d.d}</motion.p>}
            </button>
          ))}
        </div>
        <div className="itin-img">
          <AnimatePresence mode="wait">
            <motion.img key={i} src={DAYS[i].img} alt={DAYS[i].t} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function Info() {
  return (
    <section className="sec soft">
      <Reveal className="head"><h2>Good to know, in plain words</h2><p>The practical bits people ask before booking.</p></Reveal>
      <div className="info">
        {INFO.map(([l, v, p], k) => (
          <Reveal key={l} delay={k * 0.05} className="info-c"><small>{l}</small><h3>{v}</h3><p>{p}</p></Reveal>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="sec about">
      <Reveal className="about-img"><img src={IMG.green} alt="Bhutan hills" loading="lazy" /></Reveal>
      <Reveal className="about-txt">
        <h2>Two people. One homeland to share.</h2>
        <p><b>Anushia</b> grew up in Bhutan, lived abroad, and travelled widely — yet nothing ever compared to home. <b>Deepanshu Sangwan</b> is a travel creator who has explored 60+ countries and rates Bhutan among the most special.</p>
        <p>Together they build journeys that feel like travelling with close friends, not following a fixed schedule.</p>
      </Reveal>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="sec soft">
      <Reveal className="head"><h2>Before you book</h2></Reveal>
      <div className="faq">
        {FAQ.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}
      </div>
    </section>
  );
}

export function Enquire() {
  const [f, setF] = useState({ name: "", phone: "", dates: "", note: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = (e) => {
    e.preventDefault();
    window.location.href = waLink(`Hi Nomadifly! I'm ${f.name}.\nPhone: ${f.phone}\nDates: ${f.dates}\n${f.note}`);
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
          <button className="pill-btn" type="submit">Plan my trip <span>↗</span></button>
        </form>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div><b>🐉 Nomadifly</b><p>Travel Bhutan, your way.</p></div>
      <div><p>{CONTACT.email}</p><p>Mon–Fri 9:30am–6:30pm · Sat 9:30am–1:30pm</p></div>
      <p>© 2026 Nomadifly. All rights reserved.</p>
    </footer>
  );
}
