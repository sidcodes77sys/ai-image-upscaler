'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-auto glass border-t border-white/10 py-6"
    >
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
        <div className="flex items-center gap-2">
          <span>✨</span>
          <span className="font-semibold gradient-text">AI Upscaler</span>
          <span>· {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-4">
          {['Privacy', 'Terms', 'GitHub'].map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-white/70 transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        <p>Built with Next.js &amp; ❤️</p>
      </div>
    </motion.footer>
  );
}
