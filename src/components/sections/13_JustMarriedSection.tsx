"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { WaxSeal } from "@/components/ui/WaxSeal";

interface JustMarriedSectionProps {
  config: WeddingConfig;
}

export const JustMarriedSection: React.FC<JustMarriedSectionProps> = ({ config }) => {
  const { groom, bride, weddingDate } = config;

  return (
    <section className="relative w-full bg-[#FAF7F2] text-espresso-400 overflow-hidden select-none">
      {/* 1. Just Married Photo Banner */}
      <div className="relative w-full h-[480px] sm:h-[540px] overflow-hidden flex items-end justify-center">
        <Image
          src="/image/wedding/T_T00699.JPG"
          alt="Just Married"
          fill
          className="object-cover object-[center_30%]"
          sizes="(max-width: 768px) 100vw, 440px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Just MARRIED typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative z-10 text-center pb-8 px-4"
        >
          <span className="font-script text-5xl sm:text-6xl text-gold-300 drop-shadow-md block -mb-4">
            Just
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-ultra text-ivory-50 uppercase font-light drop-shadow-md">
            MARRIED
          </h2>
        </motion.div>
      </div>

      {/* 2. Parents' Stationery Card & Monogram Seal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 px-6 text-center max-w-[400px] mx-auto"
      >
        <div className="grid grid-cols-2 gap-4 text-xs font-serif border-y border-gold-300/35 py-6">
          {/* Nhà Trai */}
          <div className="space-y-1">
            <span className="font-sans text-[10px] tracking-widest text-gold-600 uppercase font-semibold block mb-1">
              NHÀ TRAI
            </span>
            <p className="text-espresso-400 font-medium">{groom.parents.father}</p>
            <p className="text-espresso-400 font-medium">{groom.parents.mother}</p>
          </div>

          {/* Nhà Gái */}
          <div className="space-y-1 border-l border-gold-300/35 pl-4">
            <span className="font-sans text-[10px] tracking-widest text-gold-600 uppercase font-semibold block mb-1">
              NHÀ GÁI
            </span>
            <p className="text-espresso-400 font-medium">{bride.parents.father}</p>
            <p className="text-espresso-400 font-medium">{bride.parents.mother}</p>
          </div>
        </div>

        {/* Monogram Seal */}
        <div className="mt-8 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full border-2 border-gold-500/80 flex items-center justify-center p-1 bg-cream-50 shadow-sm">
            <div className="w-full h-full rounded-full border border-gold-400/50 flex items-center justify-center">
              <span className="font-serif text-xs font-bold text-gold-700 tracking-wider">
                QD ♥ PL
              </span>
            </div>
          </div>
          <p className="font-serif italic text-xs text-espresso-300 mt-3">
            Thank you for being a part of our story
          </p>
          <span className="font-sans text-[9px] tracking-widest text-espresso-200 uppercase mt-1">
            28 . 11 . 2026
          </span>
        </div>
      </motion.div>
    </section>
  );
};
