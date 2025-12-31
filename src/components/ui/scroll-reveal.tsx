'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  variant?: 'fadeUrl' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'zoomIn';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export const ScrollReveal = ({
  children,
  width = '100%',
  variant = 'fadeUrl',
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef(null);

  const variants = {
    fadeUrl: {
      hidden: { opacity: 0, y: 75 },
      visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -75 },
      visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
      hidden: { opacity: 0, x: 75 },
      visible: { opacity: 1, x: 0 },
    },
    zoomIn: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    }
  };

  const selectedVariant = variant === 'fadeUrl' ? variants.fadeUrl : variants[variant];

  return (
    <motion.div
      ref={ref}
      variants={selectedVariant}
      initial="hidden"
      whileInView="visible" // Simpler than using useInView manually for animation triggering
      viewport={{ once: once, margin: "-100px" }} // Trigger when 100px into view
      transition={{ duration, delay, ease: "easeOut" }}
      style={{ width }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
