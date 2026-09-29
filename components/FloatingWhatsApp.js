"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { waLink } from "../lib/data";

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);

  return (
    <div className="floating-wa-container">
      <AnimatePresence>
        {open && (
          <motion.div
            className="wa-popup"
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <div className="wa-popup-head">
              <div className="wa-avatar">🐉</div>
              <div>
                <b>Anushia & Deepanshu</b>
                <span><span className="online-dot" /> Co-founders Online</span>
              </div>
              <button onClick={() => setOpen(false)}>×</button>
            </div>
            <div className="wa-popup-body">
              <p>Tashi Delek! 🐉 Planning a trip to Bhutan? We can answer any questions about permits, SDF fees, or flight routes directly!</p>
              <div className="wa-quick-prompts">
                <a href={waLink("Hi Annu! What are the upcoming small group dates?")}>
                  💬 Upcoming group dates?
                </a>
                <a href={waLink("Hi! How do Indian entry permits work?")}>
                  📄 Permit & SDF guidance?
                </a>
                <a href={waLink("Hi Nomadifly! Can you build a custom family trip?")}>
                  ✨ Plan custom trip
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="wa-trigger-btn" onClick={() => setOpen(!open)}>
        <span className="wa-pulse" />
        💬 <span className="wa-txt">Chat with Us</span>
      </button>
    </div>
  );
}
