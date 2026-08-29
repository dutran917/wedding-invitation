"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { LightboxModal } from "@/components/ui/LightboxModal";
import { Maximize2, Heart } from "lucide-react";

interface GallerySectionProps {
  config: WeddingConfig;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ config }) => {
  const { gallery } = config;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <section className="relative w-full py-16 px-4 bg-[#FAF7F2] text-espresso-400">
      {/* Title */}
      <div className="text-center mb-8">
        <span className="font-sans text-[10px] tracking-ultra text-gold-600 uppercase font-semibold">
          ALBUM KỶ NIỆM
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-500 font-normal mt-1 tracking-wide">
          Moments of Love
        </h2>
        <div className="flex items-center justify-center gap-2 mt-3 opacity-60">
          <div className="h-[1px] w-8 bg-gold-400" />
          <Heart className="w-3 h-3 text-gold-600 fill-gold-500" />
          <div className="h-[1px] w-8 bg-gold-400" />
        </div>
      </div>

      <div className="max-w-[420px] mx-auto space-y-6">
        {/* Photo 1: Large Editorial Frame */}
        {gallery[0] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onClick={() => openLightbox(0)}
            className="group relative cursor-pointer overflow-hidden rounded-xs border border-gold-300/50 shadow-paper bg-white p-1.5"
          >
            <div className="relative w-full aspect-[4/5] bg-cream-100 overflow-hidden">
              <Image
                src={gallery[0].src}
                alt={gallery[0].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 420px"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-2.5 rounded-full bg-white/40 backdrop-blur-md text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
            {gallery[0].caption && (
              <p className="font-serif italic text-xs text-espresso-300 text-center py-2">
                "{gallery[0].caption}"
              </p>
            )}
          </motion.div>
        )}

        {/* Photo 2 & 3: Staggered Pair in Passe-partout Frames */}
        {gallery[1] && gallery[2] && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              onClick={() => openLightbox(1)}
              className="group cursor-pointer bg-white p-1.5 shadow-paper border border-gold-300/40 rounded-xs"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-cream-100">
                <Image
                  src={gallery[1].src}
                  alt={gallery[1].alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 200px"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              onClick={() => openLightbox(2)}
              className="group cursor-pointer bg-white p-1.5 shadow-paper border border-gold-300/40 rounded-xs"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-cream-100">
                <Image
                  src={gallery[2].src}
                  alt={gallery[2].alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 200px"
                />
              </div>
            </motion.div>
          </div>
        )}

        {/* Photo 4: Full-width Cinematic Landscape */}
        {gallery[3] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onClick={() => openLightbox(3)}
            className="group cursor-pointer bg-white p-1.5 shadow-paper border border-gold-300/40 rounded-xs"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-cream-100">
              <Image
                src={gallery[3].src}
                alt={gallery[3].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>
          </motion.div>
        )}

        {/* Photo 5 & 6: Polaroid Frames */}
        {gallery[4] && gallery[5] && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <motion.div
              initial={{ opacity: 0, rotate: -2 }}
              whileInView={{ opacity: 1, rotate: -1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              onClick={() => openLightbox(4)}
              className="cursor-pointer bg-white p-2 pb-3 shadow-paper border border-gold-300/40 rounded-xs transform hover:rotate-0 transition-transform duration-300"
            >
              <div className="relative w-full aspect-square overflow-hidden bg-cream-100">
                <Image
                  src={gallery[4].src}
                  alt={gallery[4].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 200px"
                />
              </div>
              <p className="font-script text-base text-gold-600 text-center mt-2 truncate">
                Forever
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: 2 }}
              whileInView={{ opacity: 1, rotate: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              onClick={() => openLightbox(5)}
              className="cursor-pointer bg-white p-2 pb-3 shadow-paper border border-gold-300/40 rounded-xs transform hover:rotate-0 transition-transform duration-300"
            >
              <div className="relative w-full aspect-square overflow-hidden bg-cream-100">
                <Image
                  src={gallery[5].src}
                  alt={gallery[5].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 200px"
                />
              </div>
              <p className="font-script text-base text-gold-600 text-center mt-2 truncate">
                Sunshine
              </p>
            </motion.div>
          </div>
        )}

        {/* Horizontal Mini Thumbnail Strip (Like Reference!) */}
        <div className="pt-4 border-t border-gold-300/30">
          <p className="font-sans text-[9px] tracking-widest uppercase text-espresso-300 text-center mb-2.5 font-medium">
            Bấm vào ảnh thu nhỏ để xem toàn bộ
          </p>
          <div className="grid grid-cols-6 gap-1.5">
            {gallery.slice(0, 6).map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="relative aspect-square cursor-pointer rounded-2xs overflow-hidden border border-gold-300/50 hover:border-gold-600 hover:scale-105 transition-all"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="60px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentIndex={selectedPhotoIndex}
        items={gallery}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};
