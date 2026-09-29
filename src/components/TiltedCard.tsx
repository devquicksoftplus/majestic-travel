'use client';

import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './TiltedCard.css';

interface TiltedCardProps {
  children?: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum rotation angle (default 6 degrees)
  scaleOnHover?: number; // Scale on hover (default 1.02)
  liftOnHover?: number; // Y translation lift on hover in px (default -6)
}

const springConfig = {
  damping: 25,
  stiffness: 180,
  mass: 0.5,
};

export default function TiltedCard({
  children,
  className = '',
  maxTilt = 6,
  scaleOnHover = 1.02,
  liftOnHover = -6,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation, scale, and lift
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);
  const translateY = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = ref.current;
      if (!container) return;

      // Disable on touch / mobile or reduced motion
      if (typeof window !== 'undefined') {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (window.innerWidth <= 768) return;
      }

      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate subtle tilt (clamped to maxTilt ~5-7 deg)
      const rX = ((clientY - centerY) / centerY) * -maxTilt;
      const rY = ((clientX - centerX) / centerX) * maxTilt;

      rotateX.set(rX);
      rotateY.set(rY);

      mouseX.set(clientX);
      mouseY.set(clientY);
    },
    [maxTilt, mouseX, mouseY, rotateX, rotateY]
  );

  const handleMouseEnter = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (window.innerWidth <= 768) return;
    }
    scale.set(scaleOnHover);
    translateY.set(liftOnHover);
  }, [liftOnHover, scale, scaleOnHover, translateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    translateY.set(0);
  }, [rotateX, rotateY, scale, translateY]);

  return (
    <div
      ref={ref}
      className={`tilted-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="tilted-card-inner"
        style={{
          rotateX,
          rotateY,
          scale,
          y: translateY,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
