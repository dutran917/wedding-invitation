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
