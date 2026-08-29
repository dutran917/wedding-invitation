"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { WeddingConfig, BankAccount } from "@/types/wedding";
import { BotanicalDivider } from "@/components/ui/BotanicalOrnament";
import { useToast } from "@/components/layout/Toast";
import { Copy, QrCode, X, CreditCard, Gift } from "lucide-react";

interface GiftSectionProps {
  config: WeddingConfig;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ config }) => {
  const { gift } = config;
  const { showToast } = useToast();
  const [selectedQR, setSelectedQR] = useState<BankAccount | null>(null);

  const copyToClipboard = (text: string, title: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`Đã sao chép số tài khoản: ${text}`, "success");
    } else {
      // Fallback
      showToast(`Đã lưu STK: ${text}`, "success");
    }
  };

  return (
    <section className="relative w-full py-16 px-5 sm:px-8 bg-ivory-50 text-espresso-400">
      <div className="text-center mb-10">
        <span className="font-sans text-[11px] sm:text-xs tracking-ultra text-gold-600 uppercase font-medium">
          GỬI QUÀ CHÚC PHÚC
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-500 font-normal mt-1 tracking-wide">
          {gift.title}
        </h2>
        <BotanicalDivider variant="minimal" />
        <p className="font-serif italic text-xs sm:text-sm text-espresso-300 max-w-xs mx-auto mt-2 leading-relaxed">
          {gift.description}
        </p>
      </div>

      <div className="max-w-sm mx-auto space-y-6">
        {gift.accounts.map((acc, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, delay: idx * 0.15 }}
            className="bg-cream-50/90 border border-gold-400/35 p-5 sm:p-6 shadow-paper rounded-sm relative"
          >
            <div className="absolute inset-1 border border-gold-400/20 pointer-events-none" />

            <div className="flex items-center justify-between border-b border-gold-300/30 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-gold-600" />
                <span className="font-sans text-xs tracking-widest text-gold-600 uppercase font-semibold">
                  {acc.title}
                </span>
              </div>
              {acc.qrCodeImage && (
                <button
                  onClick={() => setSelectedQR(acc)}
                  className="flex items-center gap-1 font-sans text-[10px] tracking-wider text-espresso-300 hover:text-gold-600 border border-gold-300/50 rounded-full px-2 py-0.5 transition-colors"
                >
                  <QrCode className="w-3 h-3 text-gold-600" />
                  <span>Mã QR</span>
                </button>
              )}
            </div>

            <div className="space-y-2 font-serif text-sm">
              <div className="flex justify-between items-center text-xs">
                <span className="text-espresso-300 font-sans tracking-wide">Ngân hàng:</span>
                <span className="font-medium text-espresso-500">{acc.bankName}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-espresso-300 font-sans tracking-wide">Chủ tài khoản:</span>
                <span className="font-medium text-espresso-500 uppercase tracking-wider">{acc.accountHolder}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gold-300/20">
                <span className="text-espresso-300 font-sans text-xs tracking-wide">Số tài khoản:</span>
                <span className="font-serif text-base font-semibold text-gold-600 tracking-wider">
                  {acc.accountNumber}
                </span>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(acc.accountNumber, acc.title)}
              className="mt-4 w-full py-2.5 px-4 rounded-xs bg-ivory-50 hover:bg-cream-100 text-espresso-500 font-sans text-xs tracking-widest uppercase font-medium border border-gold-400/40 shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Copy className="w-3.5 h-3.5 text-gold-600" />
              <span>Sao Chép Số Tài Khoản</span>
            </button>
          </motion.div>
        ))}
      </div>

      {/* QR Code Lightbox Modal */}
      <AnimatePresence>
        {selectedQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedQR(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xs w-full bg-ivory-50 border border-gold-400 p-6 rounded-sm shadow-2xl text-center"
            >
              <button
                onClick={() => setSelectedQR(null)}
                className="absolute top-3 right-3 p-1.5 text-espresso-300 hover:text-espresso-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h4 className="font-serif text-lg text-espresso-500 font-medium mb-1">
                {selectedQR.title}
              </h4>
              <p className="font-sans text-[11px] text-espresso-300 uppercase tracking-widest mb-4">
                {selectedQR.bankName} — {selectedQR.accountHolder}
              </p>

              {/* QR Image */}
              <div className="relative w-48 h-48 mx-auto bg-white p-2 rounded-xs border border-gold-300/40 shadow-inner">
                {selectedQR.qrCodeImage ? (
                  <img
                    src={selectedQR.qrCodeImage}
                    alt={`QR Code ${selectedQR.title}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                    QR Code
                  </div>
                )}
              </div>

              <p className="font-serif text-base font-semibold text-gold-600 tracking-wider mt-3">
                {selectedQR.accountNumber}
              </p>

              <button
                onClick={() => copyToClipboard(selectedQR.accountNumber, selectedQR.title)}
                className="mt-3 w-full py-2 bg-espresso-500 text-ivory-50 font-sans text-xs tracking-widest uppercase rounded-xs"
              >
                Sao Chép Số Tài Khoản
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
