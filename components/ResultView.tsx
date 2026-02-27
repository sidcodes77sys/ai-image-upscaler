'use client';

import { motion } from 'framer-motion';
import ComparisonSlider from './ComparisonSlider';

interface ResultViewProps {
  original: string;
  upscaled: string;
  onReset: () => void;
}

export default function ResultView({ original, upscaled, onReset }: ResultViewProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = upscaled;
    link.download = 'upscaled-image.png';
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Your Image is Ready</h2>
        <p className="text-white/50 text-sm mt-1">
          Drag the slider to compare before and after
        </p>
      </div>

      {/* Comparison slider */}
      <div className="glass rounded-3xl p-4">
        <ComparisonSlider before={original} after={upscaled} />
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownload}
          className="flex-1 py-4 rounded-2xl font-semibold bg-purple-700 hover:bg-purple-600 transition-all duration-300 shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2"
        >
          Download Upscaled Image
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="flex-1 py-4 rounded-2xl font-semibold glass border border-purple-700/40 hover:bg-purple-700/20 transition-all duration-300 flex items-center justify-center gap-2"
        >
          Upscale Another Image
        </motion.button>
      </div>
    </motion.div>
  );
}
