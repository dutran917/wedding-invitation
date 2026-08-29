"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircleHeart } from "lucide-react";
import { getSavedWishes, GuestWish, WISH_ADDED_EVENT } from "@/lib/guestbook";

export const GuestbookSection: React.FC = () => {
  const [wishes, setWishes] = useState<GuestWish[]>([]);

  useEffect(() => {
    setWishes(getSavedWishes());
    const handleWishAdded = (event: Event) => {
      const wish = (event as CustomEvent<GuestWish>).detail;
      setWishes((current) => [wish, ...current.filter((item) => item.id !== wish.id)].slice(0, 6));
    };
    window.addEventListener(WISH_ADDED_EVENT, handleWishAdded);
    return () => window.removeEventListener(WISH_ADDED_EVENT, handleWishAdded);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#26201B] px-5 py-14 text-ivory-50 sm:px-8">
      <div className="absolute inset-0 opacity-[0.06] paper-texture" />
      <div className="relative mx-auto max-w-sm">
        <div className="text-center">
          <MessageCircleHeart className="mx-auto h-6 w-6 text-gold-300" />
          <p className="mt-3 font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-gold-300">
            Sổ lưu bút
          </p>
          <h2 className="mt-1 font-serif text-3xl">Lời chúc yêu thương</h2>
          <p className="mx-auto mt-2 max-w-xs font-serif text-sm italic leading-relaxed text-ivory-200/80">
            Mỗi lời chúc là một kỷ niệm đẹp mà chúng tôi luôn trân quý.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {wishes.length ? (
            wishes.map((wish, index) => (
              <motion.article
                key={wish.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="border border-gold-300/20 bg-white/[0.04] px-5 py-4 backdrop-blur-sm"
              >
                <p className="font-serif text-base italic leading-relaxed text-ivory-100">“{wish.message}”</p>
                <div className="mt-3 flex items-center gap-2 text-gold-300">
                  <Heart className="h-3 w-3 fill-current" />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-widest">{wish.name}</span>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="border border-dashed border-gold-300/25 px-5 py-8 text-center">
              <p className="font-serif text-base italic text-ivory-200/75">
                Lời chúc đầu tiên đang chờ bạn tại phần xác nhận tham dự.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
