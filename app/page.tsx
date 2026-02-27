'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import UploadZone from '@/components/UploadZone';
import UpscaleOptions from '@/components/UpscaleOptions';
import ProcessingView from '@/components/ProcessingView';
import ResultView from '@/components/ResultView';
import Footer from '@/components/Footer';
import { upscaleImage } from '@/lib/upscale';

type AppState = 'upload' | 'options' | 'processing' | 'result';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [scale, setScale] = useState<2 | 4 | 8>(2);
  const [style, setStyle] = useState<'photo' | 'illustration' | 'anime'>('photo');
  const [progress, setProgress] = useState(0);
  const [upscaledUrl, setUpscaledUrl] = useState<string>('');

  const handleImageUpload = (file: File, preview: string) => {
    setUploadedFile(file);
    setPreviewUrl(preview);
    setAppState('options');
  };

  const handleStartUpscaling = async () => {
    setAppState('processing');
    setProgress(0);
    try {
      const result = await upscaleImage(previewUrl, { scale, style }, (p) => {
        setProgress(p);
      });
      setUpscaledUrl(result);
      setAppState('result');
    } catch (err) {
      console.error('Upscaling failed:', err);
      setAppState('upload');
    }
  };

  const handleReset = () => {
    setAppState('upload');
    setUploadedFile(null);
    setPreviewUrl('');
    setUpscaledUrl('');
    setProgress(0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Hero is always shown on upload state */}
        {appState === 'upload' && <Hero />}

        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
          {appState === 'upload' && (
            <div className="w-full max-w-2xl">
              <UploadZone onImageUpload={handleImageUpload} />
            </div>
          )}

          {appState === 'options' && (
            <div className="w-full max-w-2xl space-y-6">
              {/* Preview thumbnail */}
              {previewUrl && (
                <div className="glass rounded-2xl p-4 text-center">
                  <img
                    src={previewUrl}
                    alt="Uploaded preview"
                    className="max-h-48 mx-auto rounded-xl object-contain"
                  />
                  <p className="mt-2 text-sm text-white/60">
                    {uploadedFile?.name}
                  </p>
                </div>
              )}
              <UpscaleOptions
                scale={scale}
                onScaleChange={setScale}
                style={style}
                onStyleChange={setStyle}
              />
              <button
                onClick={handleStartUpscaling}
                className="w-full py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                ✨ Start Upscaling
              </button>
              <button
                onClick={handleReset}
                className="w-full py-2 text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                ← Upload a different image
              </button>
            </div>
          )}

          {appState === 'processing' && (
            <div className="w-full max-w-2xl">
              <ProcessingView progress={progress} />
            </div>
          )}

          {appState === 'result' && (
            <div className="w-full max-w-4xl">
              <ResultView
                original={previewUrl}
                upscaled={upscaledUrl}
                onReset={handleReset}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
