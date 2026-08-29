"use client";

import React from "react";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { BotanicalDivider } from "@/components/ui/BotanicalOrnament";
import { MapPin, Navigation, Calendar, Clock } from "lucide-react";

interface VenueSectionProps {
  config: WeddingConfig;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ config }) => {
  const { venue, weddingDate, weddingTime } = config;

  return (
    <section className="relative w-full py-16 px-5 sm:px-8 bg-ivory-50 text-espresso-400">
      <div className="text-center mb-10">
        <span className="font-sans text-[11px] sm:text-xs tracking-ultra text-gold-600 uppercase font-medium">
          ĐỊA ĐIỂM TỔ CHỨC
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-500 font-normal mt-1 tracking-wide">
          The Wedding Venue
        </h2>
        <BotanicalDivider variant="minimal" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto bg-cream-50/90 border border-gold-400/35 p-6 sm:p-7 shadow-paper rounded-sm text-center"
      >
        <div className="w-12 h-12 rounded-full bg-ivory-50 border border-gold-400/50 flex items-center justify-center mx-auto mb-4 text-gold-600 shadow-sm">
          <MapPin className="w-5 h-5" />
        </div>

        <h3 className="font-serif text-2xl text-espresso-500 font-medium tracking-wide">
          {venue.name}
        </h3>

        {venue.subVenue && (
          <p className="font-sans text-xs tracking-widest text-gold-600 uppercase font-semibold mt-1">
            {venue.subVenue}
          </p>
        )}

        <p className="font-serif text-sm text-espresso-300 italic mt-3 leading-relaxed">
          {venue.address}
        </p>

        {/* Date & Time info box */}
        <div className="grid grid-cols-2 gap-3 my-6 py-3 border-y border-gold-300/30 text-xs">
          <div className="flex items-center justify-center gap-1.5 text-espresso-400">
            <Calendar className="w-3.5 h-3.5 text-gold-600" />
            <span className="font-medium">{weddingDate.split("-").reverse().join("/")}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-espresso-400">
            <Clock className="w-3.5 h-3.5 text-gold-600" />
            <span className="font-medium">{weddingTime}</span>
          </div>
        </div>

        {/* Google Maps Button */}
        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xs bg-espresso-500 hover:bg-espresso-400 text-ivory-50 font-sans text-xs tracking-widest uppercase font-medium border border-gold-400/50 shadow-sm transition-all duration-300 hover:shadow-gold active:scale-[0.98]"
        >
          <Navigation className="w-4 h-4 text-gold-400" />
          <span>Xem Bản Đồ & Chỉ Đường</span>
        </a>
      </motion.div>
    </section>
  );
};
