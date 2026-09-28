"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DESTINATIONS, waLink } from "../lib/data";

export default function MapVisualizer() {
  const [active, setActive] = useState(null);
  const containerRef = useRef(null);

  const handleMapClick = (e) => {
    if (e.target.tagName.toLowerCase() === "svg" || e.target.tagName.toLowerCase() === "img") {
      setActive(null);
    }
  };

  // Mathematically translate the old coordinates into the new tightly cropped image's grid.
  // The original image was 1024x1024, scaled down to 900x900.
  // We physically cropped it to x=35, y=238, w=954, h=750 to tightly frame Bhutan and remove all white/empty space!
  const mapX = (cx) => {
    const x_1024 = cx * (1024 / 900);
    return ((x_1024 - 35) / 954) * 100;
  };
  
  const mapY = (cy) => {
    const y_1024 = (cy + 175) * (1024 / 900);
    return ((y_1024 - 238) / 750) * 100;
  };

  const routePath = DESTINATIONS.map((d, i) => `${i === 0 ? 'M' : 'L'} ${mapX(d.cx)} ${mapY(d.cy)}`).join(" ");

  return (
    <section style={{ 
      padding: "80px 20px", 
      background: "linear-gradient(to bottom, #faf9f6, #ffffff)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh" // Helps frame it perfectly
    }}>
      
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "60px",
        width: "100%",
        maxWidth: "1360px",
        alignItems: "center",
        justifyContent: "center"
      }}>
        
        {/* LEFT SIDE: TIGHT MAP CONTAINER */}
        <div style={{ flex: "1.5 1 600px", position: "relative" }}>
          <div 
            style={{ 
              position: "relative", 
              width: "100%",
              aspectRatio: "954 / 750", // Matches the tightly cropped image exactly! NO CSS CROPPING!
              borderRadius: "40px", 
              overflow: "hidden", 
              boxShadow: "0 30px 60px rgba(10, 20, 36, 0.12), 0 0 0 1px rgba(10, 20, 36, 0.05)",
              background: "#e9e5de"
            }}
            ref={containerRef}
            onClick={handleMapClick}
          >
            <img 
              src="/bhutan-tight.png" 
              alt="Topographic Map of Bhutan" 
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.05) saturate(1.1)" }} 
            />

            <svg 
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }}
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              <path 
                d={routePath} 
                fill="none" 
                stroke="#F5A524" 
                strokeWidth="0.25" 
                strokeDasharray="0.8 0.8"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
              />
            </svg>

            {DESTINATIONS.map((d) => (
              <div
                key={d.id}
                onClick={(e) => { e.stopPropagation(); setActive(d); }}
                style={{
                  position: "absolute",
                  left: `${mapX(d.cx)}%`,
                  top: `${mapY(d.cy)}%`, // Mathematically mapped to the tight crop
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                  zIndex: active?.id === d.id ? 20 : 5,
                }}
              >
                  {/* Pulsing Ring Animation */}
                  <motion.div
                    animate={active?.id === d.id ? { scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] } : { scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: active?.id === d.id ? "36px" : "28px", 
                      height: active?.id === d.id ? "36px" : "28px",
                      borderRadius: "50%",
                      border: "2px solid #8A1F3B",
                    }}
                  />
                  {/* The Solid Pin */}
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: active?.id === d.id ? "18px" : "14px",
                    height: active?.id === d.id ? "18px" : "14px",
                    background: active?.id === d.id ? "#F5A524" : "#8A1F3B",
                    border: "3px solid #fff",
                    borderRadius: "50%",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
                    transition: "all 0.3s ease"
                  }} />
                  
                  {/* The Text Label (Hidden if active because details are shown on right) */}
                  <AnimatePresence>
                    {active?.id !== d.id && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          position: "absolute",
                          top: "22px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          color: "#111a2b",
                          fontWeight: "800",
                          fontSize: "11px",
                          letterSpacing: "0.02em",
                          fontFamily: "var(--font-bricolage)",
                          background: "rgba(255, 255, 255, 0.85)",
                          backdropFilter: "blur(4px)",
                          padding: "3px 10px",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          whiteSpace: "nowrap",
                        }}>
                        {d.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: DYNAMIC CONTENT PANEL */}
        <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <AnimatePresence mode="wait">
            
            {!active ? (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{ maxWidth: "500px" }}
              >
                <span style={{
                  display: "inline-block",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontSize: "0.75rem",
                  fontWeight: "800",
                  color: "#c97b00",
                  background: "rgba(245, 165, 36, 0.15)",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  marginBottom: "20px"
                }}>
                  Interactive Expedition Trail
                </span>
                <h2 style={{ 
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)", 
                  margin: "0 0 20px 0", 
                  color: "#0A1424", 
                  lineHeight: "1.1",
                  fontFamily: "var(--font-bricolage)"
                }}>
                  The Nomadifly Route
                </h2>
                <p style={{ color: "#5d6675", fontSize: "1.15rem", lineHeight: "1.7", marginBottom: "30px" }}>
                  Follow the golden trail through the heart of the Himalayas. Tap on any destination marker on the map to explore the journey details, highlights, and elevations across the Kingdom of Bhutan.
                </p>
                
                {/* A subtle prompt to interact */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#8A1F3B", fontWeight: "700", fontSize: "0.95rem" }}>
                  <span style={{ display: "inline-flex", padding: "10px", background: "rgba(138, 31, 59, 0.1)", borderRadius: "50%" }}>
                    👆
                  </span>
                  Select a destination to begin
                </div>
              </motion.div>

            ) : (

              <motion.div 
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  background: "#fff",
                  borderRadius: "32px",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
                  overflow: "hidden",
                  width: "100%",
                  maxWidth: "480px"
                }}
              >
                <div style={{ position: "relative" }}>
                  <img 
                    src={active.img} 
                    alt={active.name} 
                    style={{ width: "100%", height: "240px", objectFit: "cover" }} 
                  />
                  <button 
                    onClick={() => setActive(null)}
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      width: "36px",
                      height: "36px",
                      background: "rgba(0,0,0,0.5)",
                      backdropFilter: "blur(8px)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      transition: "background 0.2s"
                    }}
                  >
                    ✕
                  </button>
                  <div style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(4px)",
                    color: "#8A1F3B",
                    padding: "6px 14px",
                    borderRadius: "999px",
                    fontSize: "0.8rem",
                    fontWeight: "800",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                  }}>
                    Elevation: {active.altitude}
                  </div>
                </div>
                
                <div style={{ padding: "30px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "#F5A524" }}>
                    <span>📍</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase" }}>Kingdom of Bhutan</span>
                  </div>
                  <h4 style={{ margin: "0 0 12px 0", fontSize: "1.8rem", color: "#0A1424", fontFamily: "var(--font-bricolage)", lineHeight: "1.1" }}>
                    {active.name}
                  </h4>
                  <p style={{ margin: "0 0 24px 0", fontSize: "1.05rem", color: "#475569", lineHeight: "1.6" }}>
                    {active.note}
                  </p>
                  
                  <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "20px" }}>
                    <a 
                      href={waLink(`Hi Nomadifly! Tell me more about exploring ${active.name}.`)}
                      className="pill-btn dark"
                      style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "1rem" }}
                    >
                      Plan a trip here <span style={{ marginLeft: "8px" }}>↗</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
