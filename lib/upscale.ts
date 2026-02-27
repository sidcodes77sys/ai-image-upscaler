export interface UpscaleOptions {
  scale: 2 | 4 | 8;
  style: 'photo' | 'illustration' | 'anime';
}

/**
 * Simulated upscale function – returns the same image with a progress delay.
 * In a real implementation, this would call an AI upscaling API.
 */
export async function upscaleImage(
  imageDataUrl: string,
  options: UpscaleOptions,
  onProgress: (progress: number) => void
): Promise<string> {
  // Simulate AI processing with progress updates
  for (let i = 0; i <= 100; i += 10) {
    await new Promise<void>((resolve) => setTimeout(resolve, 200));
    onProgress(i);
  }
  // Return the original image as "upscaled" in demo mode
  return imageDataUrl;
}
