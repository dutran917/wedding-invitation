"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";

interface AlbumOfLoveSectionProps {
  config: WeddingConfig;
}

export const AlbumOfLoveSection: React.FC<AlbumOfLoveSectionProps> = ({ config }) => {
  const { groom, bride, loveQuote } = config;

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 bg-[#1F1A17] text-ivory-50 overflow-hidden select-none">
      {/* Background with vertical couple photo blur/ambient */}
      <div className="absolute inset-0 opacity-25">
        <Image
          src="/image/wedding/T_T00033.JPG"
          alt="Album backdrop"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 440px"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1A17]/80 via-[#1F1A17]/70 to-[#1F1A17]" />
      </div>

      <div className="relative z-10 max-w-[400px] mx-auto">
        {/* Title: Album OF LOVE */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-block relative">
            <span className="font-script text-5xl sm:text-6xl text-gold-300 block -mb-2">
              Album
            </span>
            <span className="font-serif text-sm tracking-ultra text-ivory-100 uppercase font-light pl-8">
              OF LOVE
            </span>
          </div>
        </motion.div>

        {/* Staggered Overlapping Passe-partout Frames */}
        <div className="relative h-[380px] sm:h-[420px] w-full mb-10">
          {/* Groom Frame (Left, higher) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute left-2 top-0 w-[52%] bg-white p-2 sm:p-2.5 shadow-2xl rounded-xs z-10 border border-gold-300/40"
          >
            <div className="relative w-full aspect-[3/4] bg-cream-100 overflow-hidden">
              <Image
                src={groom.image}
                alt={groom.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 50vw, 220px"
              />
            </div>
            {/* Label box */}
            <div className="pt-2 pb-1 text-center bg-white">
              <span className="font-serif italic text-[10px] text-espresso-200 block -mb-0.5">
                Chú rể
              </span>
              <span className="font-serif text-xs font-semibold text-espresso-500 uppercase tracking-wider">
                {groom.name}
              </span>
            </div>
          </motion.div>

          {/* Bride Frame (Right, lower, overlapping) */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute right-2 bottom-0 w-[52%] bg-white p-2 sm:p-2.5 shadow-2xl rounded-xs z-20 border border-gold-300/40"
          >
            <div className="relative w-full aspect-[3/4] bg-cream-100 overflow-hidden">
              <Image
                src={bride.image}
                alt={bride.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 50vw, 220px"
              />
            </div>
            {/* Label box */}
            <div className="pt-2 pb-1 text-center bg-white">
              <span className="font-serif italic text-[10px] text-espresso-200 block -mb-0.5">
                Cô dâu
              </span>
              <span className="font-serif text-xs font-semibold text-espresso-500 uppercase tracking-wider">
                {bride.name}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Romantic Editorial Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center px-4 pt-4 border-t border-gold-400/20"
        >
          <p className="font-serif italic text-xs sm:text-sm text-ivory-200/90 leading-relaxed font-light">
            "{loveQuote.content}"
          </p>
        </motion.div>
      </div>
    </section>
  );
};
