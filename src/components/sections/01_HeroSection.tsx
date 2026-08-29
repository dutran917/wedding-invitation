"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { WeddingConfig } from "@/types/wedding";

interface HeroSectionProps {
  config: WeddingConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  const { groom, bride, weddingDate, saveTheDateText } = config;

  const formattedDate = weddingDate
    ? weddingDate.split("-").reverse().join(" . ")
    : "28 . 11 . 2026";

  return (
    <section className="relative w-full h-[100svh] min-h-[660px] max-h-[960px] overflow-hidden flex flex-col items-center justify-between text-center select-none">
      {/* Background Image with subtle cinematic slow zoom */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/image/wedding/T_T00859.JPG"
          alt="Save the Date - Wedding Couple"
          fill
          priority
          className="object-cover object-[center_26%]"
          sizes="(max-width: 768px) 100vw, 440px"
        />
        {/* Soft luxury multi-tier vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/85" />
      </motion.div>

      {/* Floating subtle ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <motion.div
          animate={{ y: [-10, -50], opacity: [0, 0.6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-gold-300 blur-[1px]"
        />
        <motion.div
          animate={{ y: [-15, -60], opacity: [0, 0.5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-gold-200 blur-[1px]"
        />
      </div>

      {/* Top Header Tag: SAVE THE DATE */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-20 pt-10 sm:pt-14 px-6 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-black/30 backdrop-blur-md border border-gold-400/40">
          <Sparkles className="w-3 h-3 text-gold-300 animate-pulse" />
          <span className="font-sans text-[11px] sm:text-xs tracking-ultra text-ivory-100 uppercase font-light drop-shadow-sm">
            {saveTheDateText}
          </span>
          <Sparkles className="w-3 h-3 text-gold-300 animate-pulse" />
        </div>
      </motion.div>

      {/* Middle Dramatic Typography: Bold Artistic Interplay */}
      <div className="relative z-20 px-4 my-auto flex flex-col items-center w-full">
        {/* Calligraphy Intro */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-script text-3xl sm:text-4xl text-gold-300 drop-shadow-md mb-1"
        >
          The Wedding of
        </motion.span>

        {/* Big Bold Artistic Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center w-full"
        >
          {/* Groom: High-Fashion Serif Bold */}
          <div className="relative">
            <h1 className="font-serif text-5xl sm:text-6xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-ivory-100 to-gold-200 drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] uppercase">
              {groom.name}
            </h1>
          </div>

          {/* Flourish Ampersand */}
          <div className="relative -my-3 sm:-my-4 flex items-center justify-center">
            <motion.span
              animate={{ rotate: [0, 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="font-script text-6xl sm:text-7xl text-gold-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] select-none z-10"
            >
              &
            </motion.span>
          </div>

          {/* Bride: High-Fashion Serif Italic / Bold Contrast */}
          <div className="relative">
            <h1 className="font-serif italic text-5xl sm:text-6xl font-normal tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-ivory-100 to-gold-200 drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] uppercase">
              {bride.name}
            </h1>
          </div>
        </motion.div>

        {/* Date Display Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-6 flex items-center justify-center gap-3 bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-gold-400/40 shadow-lg"
        >
          <div className="h-[1px] w-6 bg-gold-400/70" />
          <p className="font-serif text-base sm:text-lg tracking-widest text-ivory-100 font-light drop-shadow-sm">
            {formattedDate}
          </p>
          <div className="h-[1px] w-6 bg-gold-400/70" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="relative z-20 pb-8 flex flex-col items-center cursor-pointer"
      >
        <span className="font-sans text-[9px] tracking-ultra text-ivory-200/80 uppercase mb-1 drop-shadow-sm">
          Chạm hoặc kéo xuống để mở thiệp
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-gold-300 drop-shadow-sm" />
        </motion.div>
      </motion.div>
    </section>
  );
};
