import React from "react";
import Image from "next/image";

interface WaxSealProps {
  className?: string;
  size?: number;
}

export const WaxSeal: React.FC<WaxSealProps> = ({ className = "", size = 64 }) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="relative w-full h-full drop-shadow-md transition-transform hover:scale-105 duration-300">
        <Image
          src="/image/wedding/real_wax_seal_transparent.png"
          alt="Wax Seal"
          fill
          className="object-contain"
          sizes={`${size}px`}
        />
      </div>
    </div>
  );
};
