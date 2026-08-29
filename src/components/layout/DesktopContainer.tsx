"use client";

import React from "react";
import Image from "next/image";

interface DesktopContainerProps {
  children: React.ReactNode;
}

export const DesktopContainer: React.FC<DesktopContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#181513] relative flex justify-center items-start selection:bg-gold-300 selection:text-espresso-500">
      {/* Ambient background for desktop widescreen */}
      <div className="fixed inset-0 hidden md:block overflow-hidden pointer-events-none opacity-20">
        <Image
          src="/image/wedding/T_T00859.JPG"
          alt="Ambient Wedding Background"
          fill
          className="object-cover blur-3xl scale-125"
          priority
        />
        <div className="absolute inset-0 bg-[#181513]/70" />
      </div>

      {/* Main Mobile-first Card Container */}
      <main className="relative w-full max-w-[440px] min-h-screen bg-ivory-50 shadow-2xl overflow-x-hidden border-x border-gold-400/20 md:my-0">
        {children}
      </main>
    </div>
  );
};
