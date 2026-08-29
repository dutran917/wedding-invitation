"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { WaxSeal } from "@/components/ui/WaxSeal";

interface ClosingSectionProps {
  config: WeddingConfig;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ config }) => {
  const { closing, groom, bride, weddingDate } = config;

  return (
    <section className="relative w-full min-h-[550px] overflow-hidden flex flex-col items-center justify-between text-center select-none bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={closing.image || "/image/wedding/T_T00699.JPG"}
          alt="Thank You - Couple Closing"
          fill
          className="object-cover object-[center_35%]"
          sizes="(max-width: 768px) 100vw, 440px"
        />
        {/* Soft luxury dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/65" />
      </div>

      {/* Top Wax seal / Monogram */}
      <div className="relative z-10 pt-10">
        <WaxSeal size={60} />
      </div>

      {/* Closing Content */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 px-6 my-auto max-w-sm"
      >
        <span className="font-sans text-[10px] sm:text-[11px] tracking-ultra text-gold-300 uppercase font-light drop-shadow-sm">
          FOREVER & ALWAYS
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl text-ivory-50 font-normal tracking-wide mt-2">
          {closing.thankYouText}
        </h2>

        <p className="font-serif italic text-sm text-ivory-200/90 leading-relaxed mt-3 max-w-xs mx-auto drop-shadow-sm">
          "{closing.message}"
        </p>

        {/* Couple Signatures */}
        <div className="mt-6 flex flex-col items-center">
          <p className="font-script text-4xl sm:text-5xl text-gold-300 drop-shadow-md">
            {groom.name} & {bride.name}
          </p>
          <div className="h-[1px] w-12 bg-gold-400/40 my-3" />
          <p className="font-serif text-xs tracking-widest text-ivory-200 uppercase">
            {weddingDate.split("-").reverse().join(" . ")}
          </p>
        </div>
      </motion.div>

      {/* Footer copyright / signature */}
      <div className="relative z-10 pb-8 text-center">
        <p className="font-sans text-[9px] tracking-widest text-ivory-300/60 uppercase">
          With endless love & gratitude
        </p>
      </div>
    </section>
  );
};
