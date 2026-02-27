'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  const scrollToUpload = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/30 text-sm text-purple-300"
      >
        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
        AI-Powered Image Enhancement
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
      >
        Upscale Your Images{' '}
        <span className="gradient-text">with AI</span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-lg md:text-xl text-white/60 max-w-2xl mb-10"
      >
        Enhance your images with the power of AI. Get crisp, high-resolution
        results up to 8× the original size — in seconds.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={scrollToUpload}
        className="relative px-8 py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-2xl shadow-purple-500/30"
      >
        <span className="relative z-10">🚀 Try It Free</span>
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 blur-xl opacity-50 -z-10 animate-pulse" />
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-5"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
