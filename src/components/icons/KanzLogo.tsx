import React from "react";

interface KanzLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
}

export const KanzLogo: React.FC<KanzLogoProps> = ({
  className = "",
  size = "md",
  showSubtitle = true,
}) => {
  const isLg = size === "lg";
  const isSm = size === "sm";

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* Icon: Open Book with Crescent and Star — correct orientation (pages open upward) */}
      <div className={`relative ${isLg ? "w-20 h-20" : isSm ? "w-12 h-12" : "w-16 h-16"} mb-1`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* ── Open Quran / Book (pages fanning upward, spine at bottom center) ── */}

          {/* Left Wing Cover (dark brown outer frame) */}
          <path
            d="M50 62 C42 68, 20 66, 4 58 C3 57.5, 3 56, 3 55 L3 30 C20 38, 42 40, 50 34 Z"
            fill="#3d2b1f"
            stroke="#24150c"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Left Wing Page (cream/parchment inner page surface) */}
          <path
            d="M50 62 C42 68, 22 66, 6 58 L6 32 C22 40, 44 42, 50 36 Z"
            fill="#f5e8cc"
          />
          {/* Left page ruled lines */}
          <line x1="12" y1="52" x2="44" y2="56" stroke="#b09870" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="12" y1="46" x2="44" y2="50" stroke="#b09870" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="12" y1="40" x2="44" y2="44" stroke="#b09870" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="14" y1="34" x2="42" y2="38" stroke="#b09870" strokeWidth="0.9" strokeLinecap="round" />

          {/* Right Wing Cover (dark brown outer frame) */}
          <path
            d="M50 62 C58 68, 80 66, 96 58 C97 57.5, 97 56, 97 55 L97 30 C80 38, 58 40, 50 34 Z"
            fill="#3d2b1f"
            stroke="#24150c"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Right Wing Page (cream/parchment inner page surface) */}
          <path
            d="M50 62 C58 68, 78 66, 94 58 L94 32 C78 40, 56 42, 50 36 Z"
            fill="#f5e8cc"
          />
          {/* Right page ruled lines */}
          <line x1="88" y1="52" x2="56" y2="56" stroke="#b09870" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="88" y1="46" x2="56" y2="50" stroke="#b09870" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="88" y1="40" x2="56" y2="44" stroke="#b09870" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="86" y1="34" x2="58" y2="38" stroke="#b09870" strokeWidth="0.9" strokeLinecap="round" />

          {/* Center Spine (binding at bottom-center) */}
          <path
            d="M48 35 C49.2 33, 50.8 33, 52 35 L52 64 C50.8 62.5, 49.2 62.5, 48 64 Z"
            fill="#1d1208"
          />

          {/* Gold Bookmark ribbon hanging from spine bottom */}
          <path
            d="M50 65 Q47.5 71 50 76 Q52.5 71 50 65"
            fill="#c8a73e"
            stroke="#a88a2a"
            strokeWidth="0.8"
          />

          {/* ── Crescent Moon & Star floating above the open book ── */}
          {/* Crescent */}
          <path
            d="M52 18 C47.5 18, 44 21.8, 44 26.5 C44 31.2, 47.7 35, 52.5 35 C53.7 35, 54.8 34.7, 55.8 34.1 C52.5 33.6, 50 30.6, 50 27 C50 23.4, 52.5 20.4, 55.8 19.9 C54.6 18.7, 53.4 18, 52 18 Z"
            fill="#3d2b1f"
          />
          {/* 5-pointed Star beside crescent */}
          <polygon
            points="59,19 60,21.8 63,22 60.8,24 61.5,27 59,25.5 56.5,27 57.2,24 55,22 58,21.8"
            fill="#3d2b1f"
          />
        </svg>
      </div>

      {/* Arabic Calligraphy "كنز" */}
      <h1
        className={`font-serif font-black tracking-wide text-[#2e1d11] select-none leading-none ${
          isLg ? "text-4xl mt-1" : isSm ? "text-2xl" : "text-3xl mt-0.5"
        }`}
        style={{ fontFamily: "'Scheherazade New', 'Amiri', 'Traditional Arabic', Georgia, serif" }}
      >
        كـنـز
      </h1>

      {/* Latin Title "KANZ" */}
      <h2
        className={`font-bold tracking-[0.25em] text-[#3d2b1f] uppercase select-none leading-none ${
          isLg ? "text-lg mt-0.5" : isSm ? "text-[10px]" : "text-sm mt-0.5"
        }`}
      >
        KANZ
      </h2>

      {/* Subtitle */}
      {showSubtitle && (
        <p className="text-[10px] tracking-wider text-[#79634e] uppercase font-medium mt-0.5 select-none whitespace-nowrap">
          Islamic Knowledge • A Better You
        </p>
      )}
    </div>
  );
};
