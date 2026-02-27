'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ProcessingViewProps {
  progress: number;
}

const STATUS_MESSAGES = [
  'Analyzing image structure...',
  'Applying AI enhancement...',
  'Upscaling resolution...',
  'Sharpening details...',
  'Finalizing output...',
];

export default function ProcessingView({ progress }: ProcessingViewProps) {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const idx = Math.min(
      Math.floor((progress / 100) * STATUS_MESSAGES.length),
      STATUS_MESSAGES.length - 1
    );
    setStatusIndex(idx);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-3xl p-10 flex flex-col items-center gap-8 text-center"
    >
      {/* Spinner */}
      <div className="relative w-24 h-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-blue-500"
        />
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-2xl">
          ✨
        </div>
      </div>

      {/* Status text */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Processing Your Image</h2>
        <motion.p
          key={statusIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/60 text-sm"
        >
          {STATUS_MESSAGES[statusIndex]}
        </motion.p>
      </div>

      {/* Progress bar */}
      <div className="w-full space-y-2">
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          />
        </div>
        <p className="text-sm text-white/40 text-right">{progress}%</p>
      </div>
    </motion.div>
  );
}
