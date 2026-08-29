"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { BotanicalDivider, SubtleFloralWatermark } from "@/components/ui/BotanicalOrnament";
import { WaxSeal } from "@/components/ui/WaxSeal";

interface InvitationSectionProps {
  config: WeddingConfig;
}

export const InvitationSection: React.FC<InvitationSectionProps> = ({ config }) => {
  const { groom, bride, invitationIntro, venue, weddingDate, lunarDate } = config;

  return (
    <section className="relative w-full py-16 px-5 sm:px-8 bg-ivory-50 text-espresso-400 overflow-hidden">
      <SubtleFloralWatermark />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative mx-auto bg-cream-50/90 border border-gold-400/35 p-7 sm:p-9 shadow-paper rounded-sm"
      >
        {/* Inner thin border for luxury stationary card feel */}
        <div className="absolute inset-1.5 border border-gold-400/20 pointer-events-none" />

        {/* Wax Seal at the top */}
        <div className="flex justify-center -mt-12 mb-3">
          <WaxSeal size={72} />
        </div>

        {/* Invitation Heading */}
        <div className="text-center mb-6">
          <span className="font-sans text-[11px] sm:text-xs tracking-ultra text-gold-600 uppercase font-medium">
            THƯ MỜI THÀNH HÔN
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-espresso-500 font-normal mt-2 tracking-wide">
            Trân Trọng Kính Mời
          </h2>
          <p className="font-serif italic text-espresso-200 text-sm mt-1 max-w-xs mx-auto leading-relaxed">
            {invitationIntro}
          </p>
        </div>

        <BotanicalDivider variant="minimal" />

        {/* Parents Information */}
        <div className="grid grid-cols-2 gap-4 text-center my-6 py-2 border-y border-gold-300/25">
          {/* Nhà Trai */}
          <div className="flex flex-col">
            <span className="font-sans text-[10px] tracking-widest text-gold-600 uppercase font-semibold">
              NHÀ TRAI
            </span>
            <p className="font-serif text-xs sm:text-sm text-espresso-400 font-medium mt-1">
              {groom.parents.father}
            </p>
            <p className="font-serif text-xs sm:text-sm text-espresso-400 font-medium">
              {groom.parents.mother}
            </p>
          </div>

          {/* Nhà Gái */}
          <div className="flex flex-col border-l border-gold-300/25 pl-4">
            <span className="font-sans text-[10px] tracking-widest text-gold-600 uppercase font-semibold">
              NHÀ GÁI
            </span>
            <p className="font-serif text-xs sm:text-sm text-espresso-400 font-medium mt-1">
              {bride.parents.father}
            </p>
            <p className="font-serif text-xs sm:text-sm text-espresso-400 font-medium">
              {bride.parents.mother}
            </p>
          </div>
        </div>

        {/* Couple Formal Names */}
        <div className="text-center my-6">
          <div className="space-y-1">
            <p className="font-sans text-[10px] tracking-widest text-gold-600 uppercase">
              CHÚ RỂ
            </p>
            <h3 className="font-script text-3xl sm:text-4xl text-espresso-500">
              {groom.fullName}
            </h3>
          </div>

          <div className="my-2 flex items-center justify-center">
            <span className="font-serif italic text-gold-500 text-xl font-light">&</span>
          </div>

          <div className="space-y-1">
            <p className="font-sans text-[10px] tracking-widest text-gold-600 uppercase">
              CÔ DÂU
            </p>
            <h3 className="font-script text-3xl sm:text-4xl text-espresso-500">
              {bride.fullName}
            </h3>
          </div>
        </div>

        <BotanicalDivider variant="floral" />

        {/* Venue Short Preview */}
        <div className="text-center mt-6">
          <p className="font-sans text-[10px] tracking-widest text-espresso-200 uppercase">
            HÔN LỄ ĐƯỢC TỔ CHỨC TẠI
          </p>
          <h4 className="font-serif text-base sm:text-lg text-espresso-500 font-medium mt-1">
            {venue.name}
          </h4>
          <p className="font-serif text-xs text-espresso-300 italic mt-0.5">
            {venue.address}
          </p>
          {lunarDate && (
            <p className="font-sans text-[11px] text-gold-600 mt-2 font-medium">
              ({lunarDate})
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
};
