'use client';

import { motion } from 'framer-motion';

interface UpscaleOptionsProps {
  scale: 2 | 4 | 8;
  onScaleChange: (scale: 2 | 4 | 8) => void;
  style: 'photo' | 'illustration' | 'anime';
  onStyleChange: (style: 'photo' | 'illustration' | 'anime') => void;
}

const SCALES: { value: 2 | 4 | 8; label: string; desc: string }[] = [
  { value: 2, label: '2×', desc: 'Fast' },
  { value: 4, label: '4×', desc: 'Recommended' },
  { value: 8, label: '8×', desc: 'Maximum' },
];

const STYLES: { value: 'photo' | 'illustration' | 'anime'; label: string }[] = [
  { value: 'photo', label: 'Photo' },
  { value: 'illustration', label: 'Illustration' },
  { value: 'anime', label: 'Anime' },
];

export default function UpscaleOptions({
  scale,
  onScaleChange,
  style,
  onStyleChange,
}: UpscaleOptionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-6 space-y-6"
    >
      {/* Scale selection */}
      <div>
        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
          Upscale Factor
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {SCALES.map((s) => (
            <button
              key={s.value}
              onClick={() => onScaleChange(s.value)}
              className={`relative py-4 rounded-2xl border text-center transition-all duration-300 overflow-hidden ${
                scale === s.value
                  ? 'border-purple-500 bg-purple-500/20 text-white'
                  : 'border-white/10 bg-white/5 text-white/60 hover:border-purple-500/40 hover:bg-purple-500/10'
              }`}
            >
              {scale === s.value && (
                <motion.div
                  layoutId="scale-active"
                  className="absolute inset-0 bg-purple-500/20 rounded-2xl"
                />
              )}
              <div className="relative z-10">
                <div className="text-2xl font-bold">{s.label}</div>
                <div className="text-xs mt-1 text-white/50">{s.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Style selection */}
      <div>
        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
          Image Style
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {STYLES.map((s) => (
            <button
              key={s.value}
              onClick={() => onStyleChange(s.value)}
              className={`relative py-4 rounded-2xl border text-center transition-all duration-300 overflow-hidden ${
                style === s.value
                  ? 'border-purple-500 bg-purple-500/20 text-white'
                  : 'border-white/10 bg-white/5 text-white/60 hover:border-purple-500/40 hover:bg-purple-500/10'
              }`}
            >
              {style === s.value && (
                <motion.div
                  layoutId="style-active"
                  className="absolute inset-0 bg-purple-500/20 rounded-2xl"
                />
              )}
              <div className="relative z-10">
                <div className="text-sm font-medium">{s.label}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
