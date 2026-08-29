"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingConfig, GalleryItem } from "@/types/wedding";
import { BotanicalDivider } from "@/components/ui/BotanicalOrnament";
import { LightboxModal } from "@/components/ui/LightboxModal";
import { Maximize2 } from "lucide-react";

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
    <section className="relative w-full py-16 px-4 sm:px-6 bg-cream-50/80 text-espresso-400">
      <div className="text-center mb-10">
        <span className="font-sans text-[11px] sm:text-xs tracking-ultra text-gold-600 uppercase font-medium">
          ALBUM KỶ NIỆM
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-500 font-normal mt-1 tracking-wide">
          Moments of Love
        </h2>
        <BotanicalDivider variant="minimal" />
        <p className="font-serif italic text-xs sm:text-sm text-espresso-300 mt-2">
          Chạm vào ảnh để xem toàn màn hình
        </p>
      </div>

      {/* Editorial Magazine Layout */}
      <div className="max-w-md mx-auto space-y-6">
        {/* Photo 1: Large cinematic full frame */}
        {gallery[0] && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8 }}
            onClick={() => openLightbox(0)}
            className="group relative cursor-pointer overflow-hidden rounded-sm border border-gold-400/40 shadow-paper bg-cream-100"
          >
            <div className="relative w-full aspect-[3/4]">
              <Image
                src={gallery[0].src}
                alt={gallery[0].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 440px"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-3 rounded-full bg-white/30 backdrop-blur-md text-white">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
            {gallery[0].caption && (
              <div className="p-3 text-center bg-ivory-50/90 border-t border-gold-300/30">
                <p className="font-serif italic text-xs text-espresso-300">
                  {gallery[0].caption}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Photo 2 & 3: Staggered / Overlapping Editorial Pair */}
        {gallery[1] && gallery[2] && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7 }}
              onClick={() => openLightbox(1)}
              className="group relative cursor-pointer overflow-hidden rounded-sm border border-gold-400/35 shadow-paper bg-cream-100 mt-4"
            >
              <div className="relative w-full aspect-[4/5]">
                <Image
                  src={gallery[1].src}
                  alt={gallery[1].alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, 220px"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              onClick={() => openLightbox(2)}
              className="group relative cursor-pointer overflow-hidden rounded-sm border border-gold-400/35 shadow-paper bg-cream-100 -mt-2"
            >
              <div className="relative w-full aspect-[4/5]">
                <Image
                  src={gallery[2].src}
                  alt={gallery[2].alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, 220px"
                />
              </div>
            </motion.div>
          </div>
        )}

        {/* Photo 4: Landscape Cinematic */}
        {gallery[3] && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8 }}
            onClick={() => openLightbox(3)}
            className="group relative cursor-pointer overflow-hidden rounded-sm border border-gold-400/40 shadow-paper bg-cream-100"
          >
            <div className="relative w-full aspect-[16/11]">
              <Image
                src={gallery[3].src}
                alt={gallery[3].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 440px"
              />
            </div>
            {gallery[3].caption && (
              <div className="p-2.5 text-center bg-ivory-50/90 border-t border-gold-300/30">
                <p className="font-serif italic text-xs text-espresso-300">
                  {gallery[3].caption}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Photo 5 & 6: Polaroid Style Frames */}
        {gallery[4] && gallery[5] && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <motion.div
              initial={{ opacity: 0, rotate: -2 }}
              whileInView={{ opacity: 1, rotate: -1.5 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7 }}
              onClick={() => openLightbox(4)}
              className="cursor-pointer bg-ivory-50 p-2 pb-4 shadow-paper border border-gold-300/40 rounded-sm transform hover:rotate-0 transition-transform duration-300"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-xs bg-cream-100">
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
              whileInView={{ opacity: 1, rotate: 1.5 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              onClick={() => openLightbox(5)}
              className="cursor-pointer bg-ivory-50 p-2 pb-4 shadow-paper border border-gold-300/40 rounded-sm transform hover:rotate-0 transition-transform duration-300"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-xs bg-cream-100">
                <Image
                  src={gallery[5].src}
                  alt={gallery[5].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 200px"
                />
              </div>
              <p className="font-script text-base text-gold-600 text-center mt-2 truncate">
                My Sunshine
              </p>
            </motion.div>
          </div>
        )}

        {/* Additional Remaining Photos in Editorial Strip */}
        {gallery.length > 6 && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            {gallery.slice(6).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => openLightbox(6 + idx)}
                className="group relative cursor-pointer overflow-hidden rounded-sm border border-gold-400/35 shadow-paper bg-cream-100"
              >
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 220px"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
