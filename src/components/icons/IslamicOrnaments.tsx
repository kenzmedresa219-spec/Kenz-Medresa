import React from "react";

// Hanging Ramadan Lantern (Fanous) SVG with authentic brass aesthetic
export const HangingLanterns: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`pointer-events-none select-none flex items-start space-x-6 ${className}`}>
      {/* Big Lantern */}
      <svg
        width="110"
        height="320"
        viewBox="0 0 110 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="40%" stopColor="#8c6d31" />
            <stop offset="70%" stopColor="#5c451c" />
            <stop offset="100%" stopColor="#b38f2a" />
          </linearGradient>
          <linearGradient id="glowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff8db" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#f7d070" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#e5a823" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="lanternHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Hanging Chain */}
        <line x1="55" y1="0" x2="55" y2="110" stroke="url(#brassGrad)" strokeWidth="2.5" strokeDasharray="3 3" />
        
        {/* Ring mount */}
        <circle cx="55" cy="115" r="7" stroke="url(#brassGrad)" strokeWidth="2.5" fill="none" />
        <rect x="52" y="122" width="6" height="8" fill="url(#brassGrad)" rx="2" />

        {/* Lantern Top Dome / Cap */}
        <path d="M30 145 C30 130, 80 130, 80 145 Z" fill="url(#brassGrad)" />
        <path d="M22 152 L88 152 L82 145 L28 145 Z" fill="url(#brassGrad)" />

        {/* Light Glow background */}
        <circle cx="55" cy="195" r="45" fill="url(#lanternHalo)" />

        {/* Glass Body with Warm Light */}
        <path d="M25 152 L35 220 L75 220 L85 152 Z" fill="url(#glowGrad)" />

        {/* Brass Cage Filigree */}
        <path d="M25 152 L35 220" stroke="url(#brassGrad)" strokeWidth="2" />
        <path d="M85 152 L75 220" stroke="url(#brassGrad)" strokeWidth="2" />
        <path d="M45 152 L48 220" stroke="url(#brassGrad)" strokeWidth="1.8" />
        <path d="M65 152 L62 220" stroke="url(#brassGrad)" strokeWidth="1.8" />
        
        {/* Glass Horizontal decorative bands */}
        <line x1="28" y1="175" x2="82" y2="175" stroke="url(#brassGrad)" strokeWidth="1.5" />
        <line x1="32" y1="198" x2="78" y2="198" stroke="url(#brassGrad)" strokeWidth="1.5" />

        {/* Inner Candle Flame */}
        <ellipse cx="55" cy="192" rx="4" ry="9" fill="#ffffff" />
        <ellipse cx="55" cy="192" rx="2" ry="6" fill="#fef08a" />

        {/* Bottom Base */}
        <path d="M32 220 L78 220 L70 232 L40 232 Z" fill="url(#brassGrad)" />
        <path d="M40 232 L70 232 L55 245 Z" fill="url(#brassGrad)" />
        {/* Drop finial */}
        <circle cx="55" cy="250" r="4" fill="url(#brassGrad)" />
      </svg>

      {/* Smaller Lantern behind */}
      <svg
        width="80"
        height="260"
        viewBox="0 0 110 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-90 drop-shadow-md -mt-8"
      >
        <line x1="55" y1="0" x2="55" y2="140" stroke="url(#brassGrad)" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="55" cy="145" r="6" stroke="url(#brassGrad)" strokeWidth="2" fill="none" />
        <path d="M30 170 C30 156, 80 156, 80 170 Z" fill="url(#brassGrad)" />
        <path d="M22 176 L88 176 L82 170 L28 170 Z" fill="url(#brassGrad)" />
        <circle cx="55" cy="215" r="40" fill="url(#lanternHalo)" />
        <path d="M25 176 L35 240 L75 240 L85 176 Z" fill="url(#glowGrad)" />
        <path d="M25 176 L35 240" stroke="url(#brassGrad)" strokeWidth="2" />
        <path d="M85 176 L75 240" stroke="url(#brassGrad)" strokeWidth="2" />
        <path d="M45 176 L48 240" stroke="url(#brassGrad)" strokeWidth="1.5" />
        <path d="M65 176 L62 240" stroke="url(#brassGrad)" strokeWidth="1.5" />
        <ellipse cx="55" cy="212" rx="3.5" ry="8" fill="#ffffff" />
        <path d="M32 240 L78 240 L70 252 L40 252 Z" fill="url(#brassGrad)" />
        <circle cx="55" cy="265" r="3.5" fill="url(#brassGrad)" />
      </svg>
    </div>
  );
};

// Subtle Mosque Silhouette for right background
export const MosqueSilhouette: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-[0.09]"
      >
        {/* Main Central Dome */}
        <path
          d="M200 400 L200 240 C200 150, 300 150, 300 240 L300 400 Z"
          fill="#5c432d"
        />
        {/* Crescent on Central Dome */}
        <path
          d="M250 140 C245 140, 241 144, 241 149 C241 154, 245 158, 250 158 C251.5 158, 253 157.5, 254 156.8 C250.5 156.2, 248 153.2, 248 149.5 C248 145.8, 250.5 142.8, 254 142.2 C253 140.5, 251.5 140, 250 140 Z"
          fill="#5c432d"
        />
        <line x1="250" y1="158" x2="250" y2="175" stroke="#5c432d" strokeWidth="2.5" />

        {/* Left Minaret */}
        <rect x="140" y="170" width="24" height="230" fill="#5c432d" />
        <path d="M136 170 L168 170 L152 110 Z" fill="#5c432d" />
        <circle cx="152" cy="105" r="3" fill="#5c432d" />

        {/* Right Tall Minaret */}
        <rect x="360" y="130" width="28" height="270" fill="#5c432d" />
        {/* Balconies */}
        <rect x="354" y="220" width="40" height="8" rx="2" fill="#5c432d" />
        <rect x="356" y="160" width="36" height="7" rx="2" fill="#5c432d" />
        {/* Pointed spire */}
        <path d="M358 130 L390 130 L374 60 Z" fill="#5c432d" />
        <circle cx="374" cy="55" r="4" fill="#5c432d" />
      </svg>
    </div>
  );
};

// Arabesque Geometric Pattern Background Watermark
export const IslamicBackgroundPattern: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none opacity-[0.05] ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="arabesquePattern" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* 8-pointed Islamic Star */}
            <g transform="translate(40, 40)" stroke="#3d2b1f" strokeWidth="1.2" fill="none">
              <rect x="-18" y="-18" width="36" height="36" />
              <rect x="-18" y="-18" width="36" height="36" transform="rotate(45)" />
              <circle cx="0" cy="0" r="10" />
              <line x1="-35" y1="0" x2="35" y2="0" strokeDasharray="3 3" />
              <line x1="0" y1="-35" x2="0" y2="35" strokeDasharray="3 3" />
            </g>
            <circle cx="0" cy="0" r="14" stroke="#3d2b1f" strokeWidth="1" fill="none" />
            <circle cx="80" cy="0" r="14" stroke="#3d2b1f" strokeWidth="1" fill="none" />
            <circle cx="0" cy="80" r="14" stroke="#3d2b1f" strokeWidth="1" fill="none" />
            <circle cx="80" cy="80" r="14" stroke="#3d2b1f" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arabesquePattern)" />
      </svg>
    </div>
  );
};

// Google Colored G Icon
export const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
};
