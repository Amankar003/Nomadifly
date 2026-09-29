"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccordionGallery({
  items = [],
  defaultIndex = 0,
  expandRatio = 0.52, // Currently unused in flex approach, flex handles it perfectly
  trigger = 'hover',
  accentColor = '#ffffff',
  overlayColor = '#060010',
  textColor = '#ffffff',
  grayscale = false,
  showLabels = true,
  duration = 0.6,
  ease = [0.22, 1, 0.36, 1],
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  height = 460,
  gap = 10,
  radius = 16,
  orientation = 'horizontal'
}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div 
      style={{ 
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        gap: `${gap}px`,
        height: orientation === 'vertical' ? 'auto' : `${height}px`,
        minHeight: orientation === 'vertical' ? `${height}px` : 'auto',
        width: '100%',
        margin: '0 auto',
      }}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        
        return (
          <motion.div
            key={index}
            onMouseEnter={() => trigger === 'hover' && setActiveIndex(index)}
            onClick={() => trigger === 'click' && setActiveIndex(index)}
            initial={false}
            animate={{ 
              flex: isActive ? 3 : 1,
            }}
            transition={{ duration, ease }}
            style={{
              position: 'relative',
              borderRadius: `${radius}px`,
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.img
              src={item.image}
              alt={item.label}
              animate={{
                filter: grayscale && !isActive ? 'grayscale(100%)' : 'grayscale(0%)',
                scale: isActive ? 1.05 : 1,
              }}
              transition={{ duration, ease }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0
              }}
            />
            
            <motion.div 
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                background: isActive 
                  ? `linear-gradient(to top, ${overlayColor}ee 0%, transparent 50%)`
                  : `linear-gradient(to top, ${overlayColor}99 0%, transparent 100%)`
              }}
              animate={{ opacity: 1 }}
              transition={{ duration, ease }}
            />

            {showLabels && (
              <motion.div
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 20
                }}
                transition={{ duration: duration * 0.8, ease, delay: isActive ? 0.1 : 0 }}
                style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '30px',
                  zIndex: 2,
                  color: textColor,
                  whiteSpace: 'nowrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '2px', background: accentColor }} />
                  <h3 style={{ margin: 0, fontSize: '2rem', fontFamily: 'var(--font-bricolage)', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                    {item.label}
                  </h3>
                </div>
                {item.subtitle && (
                  <p style={{ margin: '8px 0 0 52px', fontSize: '1rem', opacity: 0.9 }}>
                    {item.subtitle}
                  </p>
                )}
              </motion.div>
            )}
            
            {/* Vertical title when collapsed */}
            {!isActive && showLabels && (
              <motion.div
                initial={false}
                animate={{ opacity: 1 }}
                style={{
                  position: 'absolute',
                  bottom: '30px',
                  zIndex: 2,
                  color: textColor,
                  writingMode: orientation === 'horizontal' ? 'vertical-rl' : 'horizontal-tb',
                  transform: orientation === 'horizontal' ? 'rotate(180deg)' : 'none',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-bricolage)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.label}
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
