import { BlurTextEffect } from '@/components/ui/blur-text-effect';

export default function BlurTextPreview() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full select-none bg-navy">
      <BlurTextEffect className="font-semibold text-white text-2xl sm:text-4xl max-w-xl text-center px-6">
        Your trusted moving partner for local, long-distance, and commercial relocations.
      </BlurTextEffect>
    </div>
  );
}
