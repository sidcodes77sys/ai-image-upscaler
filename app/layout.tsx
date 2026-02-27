import type { Metadata } from "next";
import "./globals.css";
import LiveBackground from "@/components/LiveBackground";

export const metadata: Metadata = {
  title: "AI Image Upscaler – Enhance Your Images with AI",
  description:
    "Upscale and enhance your images using AI. Support for 2x, 4x, and 8x upscaling with photo, illustration, and anime modes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <div className="relative min-h-screen">
          <LiveBackground />
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
