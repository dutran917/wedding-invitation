"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { BotanicalDivider } from "@/components/ui/BotanicalOrnament";

interface CoupleSectionProps {
  config: WeddingConfig;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ config }) => {
  const { groom, bride } = config;

  return (
    <section className="relative w-full py-16 px-5 sm:px-8 bg-cream-50/60 text-espresso-400">
      <div className="text-center mb-12">
        <span className="font-sans text-[11px] sm:text-xs tracking-ultra text-gold-600 uppercase font-medium">
          CÔ DÂU & CHÚ RỂ
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-500 font-normal mt-1 tracking-wide">
          The Couple
        </h2>
        <BotanicalDivider variant="minimal" />
      </div>

      <div className="space-y-16 max-w-sm mx-auto">
        {/* Groom Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden border border-gold-400/40 shadow-paper bg-cream-100">
            <Image
              src={groom.image}
              alt={groom.fullName}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 90vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            
            {/* Overlay label */}
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <span className="font-sans text-[10px] tracking-ultra text-gold-300 uppercase font-semibold">
                {groom.role}
              </span>
              <h3 className="font-serif text-2xl text-ivory-50 font-normal tracking-wide">
                {groom.name}
              </h3>
            </div>
          </div>

          {groom.quote && (
            <div className="mt-3.5 px-2 text-center">
              <p className="font-serif italic text-sm text-espresso-300 leading-relaxed">
                "{groom.quote}"
              </p>
            </div>
          )}
        </motion.div>

        {/* Bride Portrait */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden border border-gold-400/40 shadow-paper bg-cream-100">
            <Image
              src={bride.image}
              alt={bride.fullName}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 90vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            
            {/* Overlay label */}
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <span className="font-sans text-[10px] tracking-ultra text-gold-300 uppercase font-semibold">
                {bride.role}
              </span>
              <h3 className="font-serif text-2xl text-ivory-50 font-normal tracking-wide">
                {bride.name}
              </h3>
            </div>
          </div>

          {bride.quote && (
            <div className="mt-3.5 px-2 text-center">
              <p className="font-serif italic text-sm text-espresso-300 leading-relaxed">
                "{bride.quote}"
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
