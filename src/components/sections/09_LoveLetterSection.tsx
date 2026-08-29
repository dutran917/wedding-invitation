"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { BotanicalDivider } from "@/components/ui/BotanicalOrnament";

interface LoveLetterSectionProps {
  config: WeddingConfig;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({ config }) => {
  const { loveQuote } = config;

  return (
    <section className="relative w-full py-20 px-6 sm:px-8 bg-[#2C2520] text-ivory-50 overflow-hidden select-none">
      {/* Background with blurred ambient couple photo */}
      <div className="absolute inset-0 opacity-25">
        <Image
          src={loveQuote.backgroundImage || "/image/wedding/T_T00859.JPG"}
          alt="Love letter backdrop"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 440px"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C2520]/80 via-[#2C2520]/90 to-[#2C2520]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-sm mx-auto text-center border border-gold-400/30 p-7 sm:p-9 bg-[#241F1A]/60 backdrop-blur-sm shadow-2xl rounded-sm"
      >
        <div className="absolute inset-1.5 border border-gold-400/20 pointer-events-none" />

        <span className="font-sans text-[10px] sm:text-[11px] tracking-ultra text-gold-300 uppercase font-light">
          MESSAGE OF LOVE
        </span>

        {/* Big Editorial Quote Title */}
        <h2 className="font-serif text-2xl sm:text-3xl text-ivory-100 font-light mt-3 leading-snug tracking-wider">
          ALL OF ME
          <br />
          <span className="font-script text-4xl sm:text-5xl text-gold-300 block my-1">
            Loves
          </span>
          ALL OF YOU
        </h2>

        <div className="my-5 flex items-center justify-center gap-3">
          <div className="h-[1px] w-10 bg-gold-400/40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold-400/80" />
          <div className="h-[1px] w-10 bg-gold-400/40" />
        </div>

        {/* Love Letter Content */}
        <p className="font-serif italic text-sm text-ivory-200/90 leading-relaxed font-light text-justify sm:text-center">
          {loveQuote.content}
        </p>

        {loveQuote.author && (
          <p className="font-script text-2xl sm:text-3xl text-gold-300 mt-6">
            — {loveQuote.author}
          </p>
        )}
      </motion.div>
    </section>
  );
};
