// Full-page brand loading state — for route-level transitions only

import Image from 'next/image';

export default function BrandLoader() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Image src="./public/logo.svg" alt="Solace" width={120} height={40}
        className="animate-pulse" />
    </div>
  );
}
