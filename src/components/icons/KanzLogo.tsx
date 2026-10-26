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
      {/* Icon: Open Book with Crescent and Star */}
      <div className={`relative ${isLg ? "w-20 h-16" : isSm ? "w-12 h-10" : "w-16 h-12"} mb-1`}>
        <svg
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Crescent Moon & Star at top */}
          <g transform="translate(42, 2) scale(0.85)">
            <path
              d="M12 2C7 2 3 6.5 3 12C3 17.5 7.5 22 13 22C14.5 22 15.9 21.6 17.1 20.9C13.2 20.3 10.2 16.9 10.2 12.8C10.2 8.7 13.2 5.3 17.1 4.7C15.6 3 13.9 2 12 2Z"
              fill="#2e1d11"
            />
            {/* Star */}
            <polygon
              points="19,10 20.2,12.8 23.2,13.1 20.9,15.1 21.6,18 19,16.4 16.4,18 17.1,15.1 14.8,13.1 17.8,12.8"
              fill="#2e1d11"
            />
          </g>

          {/* Open Quran / Book with layered pages */}
          {/* Left Wing Pages */}
          <path
            d="M50 36 C42 30, 24 28, 6 34 C4.5 34.5, 4 36, 4 37.5 L4 64 C22 57, 40 59, 50 67 Z"
            fill="#3d2b1f"
            stroke="#2e1d11"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M8 38 C24 33, 40 34, 48 40 L48 64 C40 58, 24 57, 8 62 Z"
            fill="#f7ebd7"
            opacity="0.85"
          />
          {/* Left page line decorations */}
          <line x1="14" y1="44" x2="42" y2="39" stroke="#8c7355" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="14" y1="49" x2="42" y2="44" stroke="#8c7355" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="14" y1="54" x2="38" y2="50" stroke="#8c7355" strokeWidth="1.2" strokeLinecap="round" />

          {/* Right Wing Pages */}
          <path
            d="M50 36 C58 30, 76 28, 94 34 C95.5 34.5, 96 36, 96 37.5 L96 64 C78 57, 60 59, 50 67 Z"
            fill="#3d2b1f"
            stroke="#2e1d11"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M92 38 C76 33, 60 34, 52 40 L52 64 C60 58, 76 57, 92 62 Z"
            fill="#f7ebd7"
            opacity="0.85"
          />
          {/* Right page line decorations */}
          <line x1="86" y1="44" x2="58" y2="39" stroke="#8c7355" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="86" y1="49" x2="58" y2="44" stroke="#8c7355" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="86" y1="54" x2="62" y2="50" stroke="#8c7355" strokeWidth="1.2" strokeLinecap="round" />

          {/* Center Book Spine */}
          <path
            d="M48 37 C49.5 35, 50.5 35, 52 37 L52 68 C50.5 66.5, 49.5 66.5, 48 68 Z"
            fill="#24170d"
          />
          {/* Golden Bookmark Ribbon */}
          <path
            d="M50 67 Q47 73 50 78 Q53 73 50 67"
            stroke="#b8860b"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Arabic Calligraphy "كنز" */}
      <h1
        className={`font-serif font-black tracking-wide text-[#2e1d11] select-none ${
          isLg ? "text-4xl" : isSm ? "text-2xl" : "text-3xl"
        }`}
        style={{ fontFamily: "'Scheherazade New', 'Amiri', 'Traditional Arabic', serif" }}
      >
        كـنـز
      </h1>

      {/* Latin Title "Kanz" */}
      <h2
        className={`font-semibold tracking-[0.2em] text-[#3d2b1f] uppercase select-none ${
          isLg ? "text-lg" : isSm ? "text-xs" : "text-base"
        }`}
      >
        Kanz
      </h2>

      {/* Subtitle */}
      {showSubtitle && (
        <p className="text-[10px] md:text-[11px] tracking-wider text-[#79634e] uppercase font-medium mt-0.5 select-none">
          Islamic Knowledge • A Better You
        </p>
      )}
    </div>
  );
};
