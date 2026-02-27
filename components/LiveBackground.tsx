'use client';

export default function LiveBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Blob 1 - Purple */}
      <div className="animate-blob absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-purple-700/30 blur-[80px]" />
      {/* Blob 2 - Blue */}
      <div className="animate-blob animation-delay-2000 absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/25 blur-[90px]" />
      {/* Blob 3 - Pink */}
      <div className="animate-blob animation-delay-4000 absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-pink-600/20 blur-[100px]" />
      {/* Blob 4 - Cyan */}
      <div className="animate-blob absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[70px]" />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
