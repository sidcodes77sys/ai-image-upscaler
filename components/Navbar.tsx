'use client';

import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'GitHub', href: 'https://github.com' },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full glass border-b border-purple-800/30"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold gradient-text">AI Upscaler</span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button className="hidden md:block px-4 py-2 rounded-xl text-sm font-medium bg-purple-700/30 hover:bg-purple-700/50 border border-purple-600/40 transition-all duration-200">
          Get Started
        </button>
      </div>
    </motion.header>
  );
}
