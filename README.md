# AI Image Upscaler

A modern, visually impressive AI-powered image upscaler website built with **Next.js**, **Tailwind CSS**, and **Framer Motion**. Features a live animated background, glassmorphism UI, drag-and-drop uploads, and a before/after comparison slider.

## ✨ Features

- 🎨 **Live Animated Background** — Floating gradient blobs with smooth CSS animations
- 💎 **Glassmorphism UI** — Frosted glass cards, backdrop blur, subtle borders
- 🎬 **Framer Motion Animations** — Page load, hover effects, staggered reveals
- 📂 **Drag & Drop Upload** — With file validation (PNG, JPG, JPEG, WebP, ≤10 MB)
- 🔍 **Upscale Options** — Choose 2×, 4×, or 8× with Photo / Illustration / Anime styles
- ⚡ **Processing Animation** — Progress bar with animated status messages
- 🖼️ **Before/After Slider** — Draggable comparison of original vs. upscaled image
- 📥 **Download Button** — Save the upscaled result with one click
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- ♿ **Accessible** — ARIA labels and keyboard navigation throughout

## 🏗️ Project Structure

```
ai-image-upscaler/
├── app/
│   ├── layout.tsx          # Root layout with metadata + LiveBackground
│   ├── page.tsx            # Main page state machine (upload → options → processing → result)
│   └── globals.css         # Global styles, blob animations, glassmorphism utilities
├── components/
│   ├── LiveBackground.tsx  # Animated gradient blob background
│   ├── Navbar.tsx          # Glassmorphism sticky navigation bar
│   ├── Hero.tsx            # Hero section with animated headline & CTA
│   ├── UploadZone.tsx      # Drag & drop / click-to-upload zone
│   ├── UpscaleOptions.tsx  # Scale factor (2×/4×/8×) and style selection
│   ├── ProcessingView.tsx  # Animated loading/processing screen
│   ├── ComparisonSlider.tsx# Draggable before/after image comparison
│   ├── ResultView.tsx      # Result display with download and reset
│   └── Footer.tsx          # Minimal footer
├── lib/
│   └── upscale.ts          # Upscale logic — simulated (demo) + API-ready
├── public/                 # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sidcodes77sys/ai-image-upscaler.git
cd ai-image-upscaler

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🔌 Plugging in a Real AI Upscaling API

The upscale logic lives in `lib/upscale.ts`. To integrate a real AI backend (e.g., [Real-ESRGAN via Replicate](https://replicate.com/nightmareai/real-esrgan)):

1. Add your API key to `.env.local`:
   ```
   REPLICATE_API_TOKEN=your_token_here
   ```

2. Create a Next.js API route at `app/api/upscale/route.ts`:
   ```typescript
   import Replicate from 'replicate';
   import { NextRequest, NextResponse } from 'next/server';

   const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

   export async function POST(req: NextRequest) {
     const { imageDataUrl, scale } = await req.json();
     const output = await replicate.run('nightmareai/real-esrgan:...', {
       input: { image: imageDataUrl, scale },
     });
     return NextResponse.json({ url: output });
   }
   ```

3. Update `lib/upscale.ts` to call your API route instead of the simulation:
   ```typescript
   export async function upscaleImage(
     imageDataUrl: string,
     options: UpscaleOptions,
     onProgress: (progress: number) => void
   ): Promise<string> {
     onProgress(10);
     const res = await fetch('/api/upscale', {
       method: 'POST',
       body: JSON.stringify({ imageDataUrl, scale: options.scale }),
       headers: { 'Content-Type': 'application/json' },
     });
     onProgress(90);
     const data = await res.json();
     onProgress(100);
     return data.url;
   }
   ```

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org) | React framework (App Router) |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations and transitions |
| TypeScript | Type safety |

## 📄 License

MIT
