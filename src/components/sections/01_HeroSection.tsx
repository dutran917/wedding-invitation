"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { WeddingConfig } from "@/types/wedding";

interface HeroSectionProps {
  config: WeddingConfig;
  isRevealed?: boolean;
}

interface SpiralNameProps {
  text: string;
  isRevealed: boolean;
  delay: number;
}

const SpiralName: React.FC<SpiralNameProps> = ({ text, isRevealed, delay }) => {
  const reduceMotion = useReducedMotion();
  const characters = Array.from(text);

  return (
    <motion.h1
      aria-label={text}
      className="font-script text-6xl sm:text-7xl text-ivory-50 drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)] leading-[0.92] whitespace-nowrap [perspective:900px]"
    >
      {characters.map((character, index) => {
        const angle = (index / Math.max(characters.length, 1)) * Math.PI * 2 - Math.PI / 2;
        const radius = 115 + (index % 3) * 22;
        const startX = Math.round(Math.cos(angle) * radius);
        const startY = Math.round(Math.sin(angle) * 82 + (index % 2 === 0 ? -28 : 28));
        const rotation = (index % 2 === 0 ? -1 : 1) * (150 + index * 24);

        return (
          <motion.span
            key={`${character}-${index}`}
            aria-hidden="true"
            initial={false}
            animate={
              isRevealed || reduceMotion
                ? {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }
                : {
                    opacity: 0,
                    x: startX,
                    y: startY,
                    rotate: rotation,
                    rotateX: 75,
                    rotateY: index % 2 === 0 ? -55 : 55,
                    scale: 0.25,
                    filter: "blur(9px)",
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0.01 }
                : {
                    type: "spring",
                    stiffness: 76,
                    damping: 13,
                    mass: 0.72,
                    delay: delay + index * 0.085,
                  }
            }
            className="inline-block [transform-style:preserve-3d]"
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        );
      })}
    </motion.h1>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({ config, isRevealed = true }) => {
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

      {/* Middle calligraphy follows the original template, with a 3D spiral entrance. */}
      <div className="relative z-20 px-4 my-auto flex flex-col items-center w-full">
        {/* Calligraphy Intro */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.8, delay: 0.42 }}
          className="font-serif italic text-base sm:text-lg tracking-[0.16em] text-gold-200 drop-shadow-md mb-4"
        >
          The Wedding of
        </motion.span>

        <div className="relative flex w-full flex-col items-center">
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={
              isRevealed
                ? { opacity: [0, 0.55, 0], scale: [0.45, 1.05, 1.3], rotate: 210 }
                : { opacity: 0, scale: 0.45, rotate: 0 }
            }
            transition={{ duration: 1.8, delay: 0.52, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 -ml-36 -mt-[88px] h-44 w-72 rounded-[50%] border border-gold-300/35"
          />

          <SpiralName text={groom.name} isRevealed={isRevealed} delay={0.56} />

          <div className="relative -my-2 flex items-center justify-center">
            <motion.span
              initial={false}
              animate={
                isRevealed
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : { opacity: 0, scale: 0.2, rotate: -240 }
              }
              transition={{ type: "spring", stiffness: 90, damping: 12, delay: 1.1 }}
              className="font-script text-5xl sm:text-6xl text-gold-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] select-none z-10"
            >
              &
            </motion.span>
          </div>

          <SpiralName text={bride.name} isRevealed={isRevealed} delay={1.14} />
        </div>

        {/* Date Display Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, delay: 2.05 }}
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
        <span className="font-sans text-[10px] tracking-[0.28em] text-ivory-100/90 uppercase mb-1 drop-shadow-sm">
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
