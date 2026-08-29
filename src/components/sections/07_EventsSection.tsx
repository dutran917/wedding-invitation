"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { Camera, Sparkles, UtensilsCrossed, Music2, Heart } from "lucide-react";

interface EventsSectionProps {
  config: WeddingConfig;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ config }) => {
  const { events } = config;

  const getEventIcon = (iconName: string) => {
    switch (iconName) {
      case "camera":
        return <Camera className="w-4 h-4 text-gold-600" />;
      case "ring":
        return <Sparkles className="w-4 h-4 text-gold-600" />;
      case "dinner":
        return <UtensilsCrossed className="w-4 h-4 text-gold-600" />;
      case "party":
      case "music":
        return <Music2 className="w-4 h-4 text-gold-600" />;
      default:
        return <Heart className="w-4 h-4 text-gold-600" />;
    }
  };

  return (
    <section className="relative w-full py-12 px-4 sm:px-6 bg-[#FAF7F2] text-espresso-400 overflow-hidden">
      {/* Top Banner Photo Frame */}
      <div className="max-w-[380px] mx-auto text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-28 h-28 mx-auto rounded-full p-1 border-2 border-gold-400/60 shadow-md mb-4 bg-white"
        >
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="/image/wedding/nhan_cuoi.jpg"
              alt="Wedding Rings"
              fill
              className="object-cover"
              sizes="120px"
            />
          </div>
        </motion.div>

        <span className="font-script text-4xl sm:text-5xl text-gold-600 block">
          Timeline
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-espresso-500 font-light mt-1 tracking-wide">
          Chương Trình Hôn Lễ
        </h2>
      </div>

      {/* Events timeline cards */}
      <div className="max-w-[380px] mx-auto space-y-4 relative z-10">
        {events.map((evt, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="flex items-center gap-3.5 p-3.5 rounded-xs bg-white/90 border border-gold-300/40 shadow-xs hover:border-gold-500 transition-colors"
          >
            {/* Time Box */}
            <div className="w-16 text-center border-r border-gold-300/40 pr-3 flex-shrink-0">
              <span className="font-serif text-base font-semibold text-gold-700 tracking-wider block">
                {evt.time}
              </span>
            </div>

            {/* Icon */}
            <div className="w-8 h-8 rounded-full bg-cream-50 border border-gold-400/40 flex items-center justify-center flex-shrink-0 text-gold-600">
              {getEventIcon(evt.icon)}
            </div>

            {/* Title & Description */}
            <div className="flex-1">
              <h3 className="font-serif text-sm font-semibold text-espresso-500 tracking-wide uppercase">
                {evt.title}
              </h3>
              {evt.description && (
                <p className="font-sans text-[11px] text-espresso-300 font-normal mt-0.5 leading-snug">
                  {evt.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
