"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

export const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "am", label: "Amharic", native: "አማርኛ" },
];

export const LanguageSelector: React.FC<{
  currentLang?: string;
  onLanguageChange?: (code: string) => void;
}> = ({ currentLang = "en", onLanguageChange }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(currentLang);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    setSelected(code);
    setOpen(false);
    if (onLanguageChange) {
      onLanguageChange(code);
    }
  };

  const activeLang = languages.find((l) => l.code === selected) || languages[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4a3525] bg-[#faf5ec]/90 hover:bg-[#f3ebd9] border border-[#d8c8b2] rounded-lg shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#8c6d31] cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 text-[#7a6450]" />
        <span>{activeLang.label}</span>
        <ChevronDown className="w-3 h-3 text-[#7a6450] ml-0.5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-36 bg-[#fffdf9] rounded-xl shadow-lg border border-[#e2d4c0] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-[#3d2b1f] hover:bg-[#f6efe2] transition-colors text-left"
            >
              <div>
                <span className="font-medium">{lang.label}</span>
                <span className="text-[10px] text-[#8c745d] ml-1.5">({lang.native})</span>
              </div>
              {selected === lang.code && <Check className="w-3.5 h-3.5 text-[#8c6d31]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
