"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { MapPin, Navigation, Calendar, Clock } from "lucide-react";
import { downloadWeddingCalendar } from "@/lib/calendar";

interface VenueSectionProps {
  config: WeddingConfig;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ config }) => {
  const { venue, weddingDate, weddingTime } = config;

  return (
    <section className="relative w-full py-12 px-4 sm:px-6 bg-[#F4EFE6] text-espresso-400">
      <div className="text-center mb-8 max-w-[380px] mx-auto">
        <span className="font-sans text-[10px] tracking-ultra text-gold-600 uppercase font-semibold">
          ĐỊA ĐIỂM TỔ CHỨC
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-500 font-normal mt-1 tracking-wide">
          The Wedding Venue
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8 }}
        className="max-w-[380px] mx-auto bg-white/95 border border-gold-400/40 p-4 sm:p-5 shadow-paper rounded-xs text-center"
      >
        {/* Venue Photo Frame */}
        <div className="relative w-full aspect-[16/10] rounded-xs overflow-hidden mb-4 shadow-sm group">
          <Image
            src="/image/wedding/T_T00446.JPG"
            alt={venue.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 380px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
          <div className="absolute bottom-2.5 left-3 right-3 text-left">
            <span className="font-sans text-[10px] tracking-widest text-gold-200 uppercase font-semibold">
              TRUNG TÂM TIỆC CƯỚI & SỰ KIỆN
            </span>
            <h4 className="font-serif text-base sm:text-lg text-white font-medium">
              {venue.name}
            </h4>
          </div>
        </div>

        <p className="font-serif text-xs sm:text-sm text-espresso-300 italic mb-4 leading-relaxed">
          {venue.address}
        </p>

        {/* Date & Time info box */}
        <div className="grid grid-cols-2 gap-2 my-4 py-2.5 border-y border-gold-300/30 text-xs">
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
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xs bg-espresso-500 hover:bg-espresso-400 text-ivory-50 font-sans text-xs tracking-widest uppercase font-semibold border border-gold-400/50 shadow-sm transition-all duration-300 hover:shadow-gold active:scale-[0.98]"
        >
          <Navigation className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
          <span>Mở Bản Đồ Chỉ Đường</span>
        </a>
        <button
          type="button"
          onClick={() => downloadWeddingCalendar(config)}
          className="mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-xs border border-gold-500/50 bg-ivory-50 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-espresso-500 transition-all duration-300 hover:bg-cream-100 active:scale-[0.98]"
        >
          <Calendar className="h-3.5 w-3.5 text-gold-600" />
          <span>Lưu ngày cưới vào lịch</span>
        </button>
      </motion.div>
    </section>
  );
};
