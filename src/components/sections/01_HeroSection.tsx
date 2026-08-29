"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { WeddingConfig } from "@/types/wedding";

interface HeroSectionProps {
  config: WeddingConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  const { groom, bride, weddingDate, saveTheDateText } = config;

  // Format date: e.g. "08 . 12 . 2026"
  const formattedDate = weddingDate
    ? weddingDate.split("-").reverse().join(" . ")
    : "08 . 12 . 2026";

  return (
    <section className="relative w-full h-[100svh] min-h-[620px] max-h-[920px] overflow-hidden flex flex-col items-center justify-between text-center select-none">
      {/* Background Image with subtle cinematic zoom */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src={config.gallery[0]?.src || "/image/wedding/T_T00859.JPG"}
          alt="Save the Date - Wedding Couple"
          fill
          priority
          className="object-cover object-[center_28%]"
          sizes="(max-width: 768px) 100vw, 440px"
        />
        {/* Soft luxury editorial overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/75" />
      </motion.div>

      {/* Top Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 pt-10 sm:pt-14 px-6 flex flex-col items-center"
      >
        <span className="font-sans text-[11px] sm:text-xs tracking-ultra text-ivory-100/90 uppercase font-light drop-shadow-sm border-b border-gold-300/40 pb-1">
          {saveTheDateText}
        </span>
      </motion.div>

      {/* Middle Typography / Couple Names */}
      <div className="relative z-10 px-6 my-auto flex flex-col items-center w-full">
        {/* Calligraphy Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <h1 className="font-script text-5xl sm:text-6xl text-ivory-50 drop-shadow-md leading-tight">
            {groom.name}
          </h1>
          <span className="font-serif italic text-2xl sm:text-3xl text-gold-300/90 -my-1">
            &
          </span>
          <h1 className="font-script text-5xl sm:text-6xl text-ivory-50 drop-shadow-md leading-tight">
            {bride.name}
          </h1>
        </motion.div>

        {/* Date Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 flex items-center justify-center gap-3"
        >
          <div className="h-[1px] w-8 bg-gold-300/60" />
          <p className="font-serif text-lg sm:text-xl tracking-widest text-ivory-100 font-light drop-shadow-sm">
            {formattedDate}
          </p>
          <div className="h-[1px] w-8 bg-gold-300/60" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="relative z-10 pb-8 flex flex-col items-center"
      >
        <span className="font-sans text-[10px] tracking-widest text-ivory-200/70 uppercase mb-1">
          Kéo xuống để mở thiệp
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-gold-300/80" />
        </motion.div>
      </motion.div>
    </section>
  );
};
