"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";

export default function CircularGallery({ 
  items = [], 
  textColor = "#ffffff", 
  borderRadius = 24,
  scrollSpeed = 2 
}) {
  const [progress, setProgress] = useState(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  
  // Duplicate items to ensure a continuous endless loop filling the screen
  const displayItems = [...items, ...items, ...items, ...items];
  const N = displayItems.length;

  useAnimationFrame((time, delta) => {
    if (!isDragging.current) {
      setProgress((prev) => (prev + (delta * 0.00003 * scrollSpeed)) % 1);
    }
  });

  const handleDragStart = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const diff = clientX - dragStartX.current;
    const windowWidth = window.innerWidth;
    
    setProgress((prev) => {
      let next = prev + (diff / windowWidth) * 0.5;
      // Handle negative wrapping manually
      while (next < 0) next += 1;
      return next % 1;
    });
    dragStartX.current = clientX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  return (
    <div 
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden',
        cursor: 'grab',
        backgroundColor: '#0A1424'
      }}
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '0' }}>
        {displayItems.map((item, i) => {
          // p goes from 0 to 1
          const p = (progress + (i / N)) % 1;
          
          // Map p to X screen coordinates (from far left to far right)
          // 200vw spread to ensure they disappear completely before wrapping
          const x = (p - 0.5) * 200; 
          
          // Parabolic C-Curve for Y axis
          const y = -80 + Math.pow(p - 0.5, 2) * 1600; 
          
          // Rotation curve
          const rot = (p - 0.5) * 60; 

          // Opacity fade at the extreme ends to hide popping
          let opacity = 1;
          if (p < 0.1) opacity = p / 0.1;
          if (p > 0.9) opacity = (1 - p) / 0.1;

          return (
            <motion.div 
              key={i} 
              style={{
                position: 'absolute',
                width: '300px',
                height: '420px',
                x: `calc(${x}vw - 50%)`,
                y: `calc(${y}px - 50%)`,
                rotate: rot,
                opacity: opacity,
                borderRadius: `${borderRadius}px`,
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                backgroundColor: '#111',
                zIndex: Math.round(100 - Math.abs(p - 0.5) * 100) // Center items on top
              }}
            >
              <img 
                src={item.src} 
                alt={item.caption || ""} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                padding: '24px', color: textColor
              }}>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.5 }}>"{item.caption}"</p>
                <p style={{ margin: '10px 0 0 0', fontSize: '0.85rem', color: 'var(--gold)' }}>@{item.user}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
