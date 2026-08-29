"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { BotanicalDivider } from "@/components/ui/BotanicalOrnament";
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
    <section className="relative w-full py-16 px-5 sm:px-8 bg-ivory-50 text-espresso-400">
      <div className="text-center mb-12">
        <span className="font-sans text-[11px] sm:text-xs tracking-ultra text-gold-600 uppercase font-medium">
          LỊCH TRÌNH
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-500 font-normal mt-1 tracking-wide">
          The Wedding Day
        </h2>
        <BotanicalDivider variant="minimal" />
      </div>

      {/* Events timeline list */}
      <div className="max-w-sm mx-auto space-y-6">
        {events.map((evt, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            className="flex items-start gap-4 p-4 rounded-sm bg-cream-50/70 border border-gold-300/35 shadow-sm hover:border-gold-400 transition-colors"
          >
            {/* Icon box */}
            <div className="w-10 h-10 rounded-full bg-ivory-50 border border-gold-400/50 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
              {getEventIcon(evt.icon)}
            </div>

            {/* Event info */}
            <div className="flex-1">
              <span className="font-serif text-base text-gold-600 font-semibold tracking-wider">
                {evt.time}
              </span>
              <h3 className="font-serif text-base text-espresso-500 font-medium tracking-wide">
                {evt.title}
              </h3>
              {evt.description && (
                <p className="font-sans text-xs text-espresso-300 font-light mt-0.5 leading-relaxed">
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
