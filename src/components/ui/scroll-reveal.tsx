'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  variant?: 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'zoomIn';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export const ScrollReveal = ({
  children,
  width = '100%',
  variant = 'fadeUp',
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef(null);

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
    },
    zoomIn: {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1 },
    }
  };

  const selectedVariant = variant === 'fadeUp' ? variants.fadeUp : variants[variant];

  return (
    <motion.div
      ref={ref}
      variants={selectedVariant}
      initial="hidden"
      whileInView="visible" // Simpler than using useInView manually for animation triggering
      viewport={{ once: once, margin: "0px", amount: 0.05 }} // Trigger earlier (was -100px) to prevent stuck feeling
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      style={{ width }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
