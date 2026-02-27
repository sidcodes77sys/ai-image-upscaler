'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface ComparisonSliderProps {
  before: string;
  after: string;
}

export default function ComparisonSlider({ before, after }: ComparisonSliderProps) {
  const [sliderPos, setSliderPos] = useState(50); // percent
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updateSlider(e.clientX);
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return;
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  const handleMouseUp = () => { isDragging.current = false; };

  const handleTouchMove = (e: React.TouchEvent) => {
    updateSlider(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden select-none cursor-ew-resize"
      style={{ aspectRatio: '16/9' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* After (upscaled) - full width base */}
      <img
        src={after}
        alt="Upscaled"
        className="absolute inset-0 w-full h-full object-contain bg-black/30"
        draggable={false}
      />

      {/* Before (original) - clipped to slider position */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={before}
          alt="Original"
          className="absolute inset-0 w-full h-full object-contain bg-black/30"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Handle */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-purple-600 shadow-xl shadow-purple-900/50 flex items-center justify-center text-white text-sm font-bold select-none"
        >
          ⇔
        </motion.div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/50 text-xs text-white/80 backdrop-blur-sm">
        Original
      </div>
      <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-purple-600/60 text-xs text-white backdrop-blur-sm">
        Upscaled
      </div>
    </div>
  );
}
