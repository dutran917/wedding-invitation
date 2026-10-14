import React from "react";

interface BotanicalDividerProps {
  className?: string;
  variant?: "floral" | "classic" | "minimal" | "ring";
}

export const BotanicalDivider: React.FC<BotanicalDividerProps> = ({
  className = "",
  variant = "floral",
}) => {
  if (variant === "minimal") {
    return (
      <div className={`flex items-center justify-center gap-3 my-4 opacity-70 ${className}`}>
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400" />
        <div className="w-1.5 h-1.5 rotate-45 border border-gold-500 bg-gold-200" />
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400" />
      </div>
    );
  }

  if (variant === "classic") {
    return (
      <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
        <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-gold-400/50 to-gold-500" />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-gold-500 w-5 h-5 opacity-80"
          strokeWidth="1.2"
        >
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
        <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent via-gold-400/50 to-gold-500" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-2 my-5 ${className}`}>
      <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-gold-400/60" />
      <svg
        width="36"
        height="18"
        viewBox="0 0 36 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold-500 opacity-80"
      >
        <path
          d="M18 9C14 4 8 2 2 4C5 8 10 11 18 9ZM18 9C22 4 28 2 34 4C31 8 26 11 18 9Z"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="9" r="1.5" fill="currentColor" />
      </svg>
      <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-gold-400/60" />
    </div>
  );
};

export const SubtleFloralWatermark: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden opacity-[0.035] select-none ${className}`}
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 400 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M200 100 C150 150 120 280 200 350 C280 280 250 150 200 100"
          stroke="#5B5147"
          strokeWidth="2"
        />
        <path
          d="M200 350 C130 420 100 580 200 680 C300 580 270 420 200 350"
          stroke="#5B5147"
          strokeWidth="2"
        />
        <circle cx="200" cy="350" r="12" stroke="#5B5147" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

export const WeddingCornerLineArt: React.FC<{
  className?: string;
  tone?: "gold" | "light";
}> = ({ className = "", tone = "gold" }) => (
  <div
    aria-hidden="true"
    style={{
      WebkitMaskImage:
        "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
      maskImage:
        "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
    }}
    className={`pointer-events-none absolute inset-0 z-0 overflow-hidden select-none ${className}`}
  >
    <img
      src="/image/wedding/optimized/luxury-chrysanthemum.webp"
      alt=""
      width="900"
      height="963"
      loading="lazy"
      decoding="async"
      className={`absolute -right-12 top-5 h-[280px] w-auto object-contain ${
        tone === "light" ? "opacity-[0.17] brightness-125" : "opacity-[0.13]"
      }`}
    />
    <img
      src="/image/wedding/optimized/luxury-chrysanthemum.webp"
      alt=""
      width="900"
      height="963"
      loading="lazy"
      decoding="async"
      className={`absolute bottom-5 -left-12 h-[255px] w-auto -scale-x-100 object-contain ${
        tone === "light" ? "opacity-[0.14] brightness-125" : "opacity-[0.1]"
      }`}
    />
  </div>
);

export const DoveBotanicalDivider: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div aria-hidden="true" className={`relative mx-auto h-28 w-full max-w-[390px] text-gold-700 ${className}`}>
      <svg viewBox="0 0 390 112" fill="none" className="h-full w-full opacity-35">
        <path d="M18 88C64 75 100 77 145 91C164 97 180 98 195 94" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M372 88C326 75 290 77 245 91C226 97 210 98 195 94" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M31 84C46 63 60 54 80 48C72 63 59 74 40 82" stroke="currentColor" strokeWidth="1" />
        <path d="M55 76C62 55 76 41 96 32C91 53 78 68 60 77" stroke="currentColor" strokeWidth="1" />
        <path d="M359 84C344 63 330 54 310 48C318 63 331 74 350 82" stroke="currentColor" strokeWidth="1" />
        <path d="M335 76C328 55 314 41 294 32C299 53 312 68 330 77" stroke="currentColor" strokeWidth="1" />

        <path d="M112 52C127 34 145 28 163 35C150 38 141 44 136 54C149 48 161 49 174 56C156 62 139 61 125 55C119 57 115 56 112 52Z" stroke="currentColor" strokeWidth="1.15" strokeLinejoin="round" />
        <path d="M278 52C263 34 245 28 227 35C240 38 249 44 254 54C241 48 229 49 216 56C234 62 251 61 265 55C271 57 275 56 278 52Z" stroke="currentColor" strokeWidth="1.15" strokeLinejoin="round" />
        <path d="M195 62C188 54 176 58 178 68C180 77 195 84 195 84C195 84 210 77 212 68C214 58 202 54 195 62Z" stroke="currentColor" strokeWidth="1.15" />
        <circle cx="195" cy="94" r="2" fill="currentColor" />
      </svg>
    </div>
  );
};
