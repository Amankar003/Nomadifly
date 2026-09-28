"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { waLink } from "../lib/data";

export default function TripQuizModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    vibe: "Cultural & Heritage",
    group: "Couple / 2 Travelers",
    days: "6-7 Days",
    month: "Oct - Dec 2026",
    pace: "Balanced & Relaxed",
  });

  if (!isOpen) return null;

  const update = (key, val) => {
    setAnswers({ ...answers, [key]: val });
  };

  const submit = () => {
    const msg = `Hi Nomadifly! I completed the Bhutan Custom Plan Quiz:\n• Vibe: ${answers.vibe}\n• Group: ${answers.group}\n• Duration: ${answers.days}\n• Preferred Month: ${answers.month}\n• Travel Pace: ${answers.pace}\n\nPlease share a custom itinerary!`;
    window.location.href = waLink(msg);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div
          className="quiz-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <button className="modal-close" onClick={onClose}>×</button>

          <div className="quiz-progress">
            <div className="quiz-bar" style={{ width: `${(step / 3) * 100}%` }} />
          </div>

          {step === 1 && (
            <div className="quiz-step">
              <span className="badge-pill">Step 1 of 3</span>
              <h3>What kind of Bhutan experience are you dreaming of?</h3>
              <div className="quiz-options">
                {["Cultural & Heritage Monasteries", "Trekking & High Himalaya Passes", "Romantic & Wellness Getaway", "Photography & Wildlife Valleys"].map((v) => (
                  <button
                    key={v}
                    className={`quiz-opt ${answers.vibe === v ? "on" : ""}`}
                    onClick={() => update("vibe", v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="quiz-step">
              <span className="badge-pill">Step 2 of 3</span>
              <h3>Who is traveling and how long will your stay be?</h3>
              <div className="quiz-grid">
                <div>
                  <label>Travelers</label>
                  {["Solo Traveler", "Couple / 2 Travelers", "Family with Kids", "Friends Group (4+)"].map((g) => (
                    <button
                      key={g}
                      className={`quiz-opt ${answers.group === g ? "on" : ""}`}
                      onClick={() => update("group", g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <div>
                  <label>Ideal Duration</label>
                  {["4-5 Days (Express)", "6-7 Days (Classic)", "8-10 Days (Deep Exploration)"].map((d) => (
                    <button
                      key={d}
                      className={`quiz-opt ${answers.days === d ? "on" : ""}`}
                      onClick={() => update("days", d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="quiz-step">
              <span className="badge-pill">Step 3 of 3</span>
              <h3>Select your preferred travel timing & pace</h3>
              <div className="quiz-grid">
                <div>
                  <label>Preferred Travel Window</label>
                  {["Oct - Dec 2026", "Mar - May 2027", "Custom Dates"].map((m) => (
                    <button
                      key={m}
                      className={`quiz-opt ${answers.month === m ? "on" : ""}`}
                      onClick={() => update("month", m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <div>
                  <label>Pace</label>
                  {["Relaxed & Slow", "Balanced & Relaxed", "Active & Adventure"].map((p) => (
                    <button
                      key={p}
                      className={`quiz-opt ${answers.pace === p ? "on" : ""}`}
                      onClick={() => update("pace", p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="quiz-footer">
            {step > 1 && (
              <button className="quiz-btn-sec" onClick={() => setStep(step - 1)}>
                ← Back
              </button>
            )}
            {step < 3 ? (
              <button className="pill-btn dark" style={{ marginLeft: "auto" }} onClick={() => setStep(step + 1)}>
                Next Step <span>→</span>
              </button>
            ) : (
              <button className="pill-btn" style={{ marginLeft: "auto", background: "#F5A524" }} onClick={submit}>
                Get Custom Itinerary <span>↗</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
