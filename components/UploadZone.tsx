'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadZoneProps {
  onImageUpload: (file: File, preview: string) => void;
}

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const MAX_SIZE_MB = 10;

export default function UploadZone({ onImageUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      setError('');
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError('Please upload a PNG, JPG, JPEG, or WebP file.');
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`File size must be under ${MAX_SIZE_MB}MB.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onImageUpload(file, dataUrl);
      };
      reader.readAsDataURL(file);
    },
    [onImageUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative cursor-pointer rounded-3xl border-2 border-dashed transition-all duration-300 p-8
          flex flex-col items-center justify-center gap-4 min-h-[280px]
          ${isDragging
            ? 'border-purple-400 bg-purple-500/10 scale-[1.01]'
            : 'border-white/20 bg-white/5 hover:border-purple-400/50 hover:bg-white/10'
          }
        `}
      >
        {/* Animated upload icon */}
        <motion.div
          animate={isDragging ? { scale: 1.2, y: -5 } : { scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-16 h-16 rounded-full bg-purple-700/20 border border-purple-600/30 flex items-center justify-center"
        >
          <svg
            className="w-8 h-8 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d={isDragging
                ? 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
                : 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 12h18M3 6h18'
              }
            />
          </svg>
        </motion.div>

        <div className="text-center">
          <p className="text-lg font-semibold text-white/90">
            {isDragging ? 'Drop it here!' : 'Drag & drop your image'}
          </p>
          <p className="mt-1 text-sm text-white/50">
            or <span className="text-purple-400 underline">click to browse</span>
          </p>
          <p className="mt-2 text-xs text-white/30">
            PNG, JPG, JPEG, WebP · Max {MAX_SIZE_MB}MB
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-sm text-red-400 text-center"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
