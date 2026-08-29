"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";

interface CinematicLoveBannerProps {
  config: WeddingConfig;
}

export const CinematicLoveBanner: React.FC<CinematicLoveBannerProps> = ({ config }) => {
  return (
    <section className="relative w-full h-[460px] sm:h-[520px] overflow-hidden flex items-end justify-start select-none">
      {/* Cinematic Full Bleed Couple Photo */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/image/wedding/T_T00859.JPG"
          alt="All of me loves all of you"
          fill
          className="object-cover object-[center_35%]"
          sizes="(max-width: 768px) 100vw, 440px"
        />
        {/* Editorial overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      </div>

      {/* Typography Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 p-6 sm:p-8 text-left w-full"
      >
        <span className="font-serif text-sm sm:text-base tracking-ultra text-ivory-100 uppercase font-light drop-shadow-md">
          ALL OF ME
        </span>

        {/* Large Script "Love" */}
        <h2 className="font-script text-6xl sm:text-7xl text-gold-300 drop-shadow-lg -my-3 sm:-my-4">
          Love
        </h2>

        <span className="font-serif text-sm sm:text-base tracking-ultra text-ivory-100 uppercase font-light drop-shadow-md block pl-14 sm:pl-16">
          ALL OF YOU
        </span>
      </motion.div>
    </section>
  );
};
