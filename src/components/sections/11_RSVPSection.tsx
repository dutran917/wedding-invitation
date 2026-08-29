"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { WeddingConfig } from "@/types/wedding";
import { BotanicalDivider } from "@/components/ui/BotanicalOrnament";
import { useToast } from "@/components/layout/Toast";
import confetti from "canvas-confetti";
import { CheckCircle2, HeartHandshake, Send } from "lucide-react";

interface RSVPSectionProps {
  config: WeddingConfig;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ config }) => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attending: "yes", // 'yes' | 'no'
    guestCount: "1",
    side: "both", // 'groom' | 'bride' | 'both'
    wishes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast("Vui lòng nhập họ và tên của bạn", "info");
      return;
    }

    setIsSubmitting(true);

    // Simulate RSVP submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      if (formData.attending === "yes") {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#C2A676", "#FAF7F2", "#8E7240", "#EAE2D3"],
        });
      }

      showToast("Cảm ơn bạn đã gửi phản hồi tham dự!", "success");
    }, 600);
  };

  return (
    <section className="relative w-full py-16 px-5 sm:px-8 bg-cream-50/70 text-espresso-400">
      <div className="text-center mb-10">
        <span className="font-sans text-[11px] sm:text-xs tracking-ultra text-gold-600 uppercase font-medium">
          XÁC NHẬN THAM DỰ
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-espresso-500 font-normal mt-1 tracking-wide">
          R.S.V.P
        </h2>
        <BotanicalDivider variant="minimal" />
        <p className="font-serif italic text-xs sm:text-sm text-espresso-300 max-w-xs mx-auto mt-2">
          Để chuẩn bị chu đáo nhất, xin vui lòng gửi phản hồi cho gia đình trước ngày cưới
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto bg-ivory-50 border border-gold-400/35 p-6 sm:p-8 shadow-paper rounded-sm"
      >
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-gold-400/20 text-gold-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-espresso-500">
              Gửi Phản Hồi Thành Công!
            </h3>
            <p className="font-serif italic text-sm text-espresso-300 leading-relaxed">
              Cảm ơn <strong>{formData.name}</strong> đã gửi lời phản hồi và chúc phúc. Sự hiện diện của bạn là niềm vinh hạnh to lớn cho chúng tôi!
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="font-sans text-xs tracking-widest text-gold-600 uppercase underline hover:text-gold-700 pt-2 block mx-auto"
            >
              Chỉnh sửa phản hồi
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block font-sans text-[11px] tracking-widest uppercase text-espresso-300 font-medium mb-1">
                Họ và Tên <span className="text-gold-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="VD: Nguyễn Văn A"
                required
                className="w-full bg-transparent border-b border-gold-400/50 focus:border-gold-600 py-2 text-sm text-espresso-500 placeholder-espresso-200 outline-none transition-colors font-serif"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block font-sans text-[11px] tracking-widest uppercase text-espresso-300 font-medium mb-1">
                Số Điện Thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="VD: 0912 345 678"
                className="w-full bg-transparent border-b border-gold-400/50 focus:border-gold-600 py-2 text-sm text-espresso-500 placeholder-espresso-200 outline-none transition-colors font-serif"
              />
            </div>

            {/* Guest side */}
            <div>
              <label className="block font-sans text-[11px] tracking-widest uppercase text-espresso-300 font-medium mb-1">
                Bạn là khách của ai?
              </label>
              <select
                name="side"
                value={formData.side}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gold-400/50 focus:border-gold-600 py-2 text-sm text-espresso-500 outline-none font-serif cursor-pointer"
              >
                <option value="both">Khách chung của hai bên</option>
                <option value="groom">Khách nhà Chú Rể ({config.groom.name})</option>
                <option value="bride">Khách nhà Cô Dâu ({config.bride.name})</option>
              </select>
            </div>

            {/* Will you attend? */}
            <div>
              <label className="block font-sans text-[11px] tracking-widest uppercase text-espresso-300 font-medium mb-2">
                Bạn sẽ tham dự chứ?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, attending: "yes" }))}
                  className={`py-2 px-3 text-xs tracking-wider rounded-xs border font-serif transition-all ${
                    formData.attending === "yes"
                      ? "bg-espresso-500 text-ivory-50 border-gold-500"
                      : "border-gold-400/40 text-espresso-400 hover:bg-cream-100"
                  }`}
                >
                  ✓ Chắc chắn tham dự
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, attending: "no" }))}
                  className={`py-2 px-3 text-xs tracking-wider rounded-xs border font-serif transition-all ${
                    formData.attending === "no"
                      ? "bg-espresso-500 text-ivory-50 border-gold-500"
                      : "border-gold-400/40 text-espresso-400 hover:bg-cream-100"
                  }`}
                >
                  Rất tiếc không thể
                </button>
              </div>
            </div>

            {/* Number of guests (if attending) */}
            {formData.attending === "yes" && (
              <div>
                <label className="block font-sans text-[11px] tracking-widest uppercase text-espresso-300 font-medium mb-1">
                  Số người tham dự
                </label>
                <select
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gold-400/50 focus:border-gold-600 py-2 text-sm text-espresso-500 outline-none font-serif cursor-pointer"
                >
                  <option value="1">1 người (Đi một mình)</option>
                  <option value="2">2 người (Đi cùng bạn/người thân)</option>
                  <option value="3">3 người</option>
                  <option value="4">4 người (Cả gia đình)</option>
                </select>
              </div>
            )}

            {/* Wishes */}
            <div>
              <label className="block font-sans text-[11px] tracking-widest uppercase text-espresso-300 font-medium mb-1">
                Lời Chúc Gửi Đến Cặp Đôi
              </label>
              <textarea
                name="wishes"
                value={formData.wishes}
                onChange={handleChange}
                rows={2}
                placeholder="Gửi lời chúc tốt đẹp nhất..."
                className="w-full bg-transparent border-b border-gold-400/50 focus:border-gold-600 py-2 text-sm text-espresso-500 placeholder-espresso-200 outline-none transition-colors font-serif resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-3.5 px-6 rounded-xs bg-espresso-500 hover:bg-espresso-400 text-ivory-50 font-sans text-xs tracking-widest uppercase font-semibold border border-gold-400/50 shadow-md transition-all duration-300 hover:shadow-gold disabled:opacity-50"
            >
              {isSubmitting ? "ĐANG GỬI..." : "XÁC NHẬN THAM DỰ"}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};
