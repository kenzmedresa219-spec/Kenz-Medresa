"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { KanzLogo } from "@/components/icons/KanzLogo";
import {
  HangingLanterns,
  MosqueSilhouette,
  IslamicBackgroundPattern,
  GoogleIcon,
} from "@/components/icons/IslamicOrnaments";
import { LanguageSelector } from "@/components/auth/LanguageSelector";
import { OtpModal } from "@/components/auth/OtpModal";

export default function StudentLoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password, role: "student", rememberMe }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to log in.");
      setStatusMsg({ type: "success", text: "Alhamdulillah! Welcome back to Kanz." });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setStatusMsg({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative h-screen w-full bg-[#faf5eb] text-[#2e1d11] overflow-hidden flex flex-col selection:bg-[#c8a97e]/30">
      {/* Arabesque Background Pattern */}
      <IslamicBackgroundPattern />

      {/* Mosque Silhouette — Right */}
      <MosqueSilhouette className="absolute right-0 bottom-0 w-[360px] md:w-[580px] h-[280px] md:h-[440px] pointer-events-none" />

      {/* Lanterns — Top Far Right (pushed to avoid Language selector overlap) */}
      <HangingLanterns className="absolute right-2 md:right-4 top-0 z-10 scale-75 md:scale-90 origin-top-right" />

      {/* ── Top Header ── */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between shrink-0">
        {/* Brand — Top Left */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#f2e6d1] border border-[#d8c8af] flex items-center justify-center shadow-sm group-hover:bg-[#ebdcbe] transition-colors">
            <span className="font-serif font-black text-lg text-[#3d2b1f]">ك</span>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-sm font-bold tracking-widest text-[#3d2b1f] uppercase">Kanz</span>
              <span className="text-xs font-serif font-bold text-[#8c6d31]">كنز</span>
            </div>
            <p className="text-[9px] text-[#7a6450] tracking-wider uppercase mt-0.5">
              Islamic Knowledge • A Better You
            </p>
          </div>
        </Link>

        {/* Language Selector — isolated top right, well away from lanterns */}
        <div className="absolute top-4 right-6 z-30">
          <LanguageSelector />
        </div>
      </header>

      {/* ── Main Content: Left Quote + Central Mihrab Card ── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 md:px-8 flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 -translate-y-3 md:-translate-y-6 min-h-0">

        {/* ── Left: Arabic Calligraphy Quote ── */}
        <div className="hidden lg:flex flex-col items-start max-w-xs text-left select-none pl-2">
          <div
            className="text-4xl xl:text-5xl font-black text-[#2e1d11] leading-snug"
            style={{ fontFamily: "'Scheherazade New', 'Amiri', 'Times New Roman', serif" }}
          >
            طلب العلم
          </div>
          <div
            className="text-4xl xl:text-5xl font-black text-[#2e1d11] leading-snug mt-1"
            style={{ fontFamily: "'Scheherazade New', 'Amiri', 'Times New Roman', serif" }}
          >
            فريضة على كل مسلم
          </div>

          <p className="text-sm text-[#6d5743] font-medium mt-4 leading-relaxed">
            Seeking knowledge is an obligation<br />for every Muslim.
          </p>

          {/* Decorative Gold Divider */}
          <div className="flex items-center gap-3 mt-5">
            <div className="w-8 h-px bg-[#c8a97e]" />
            <span className="text-[#c8a97e] text-sm">❖</span>
            <div className="w-8 h-px bg-[#c8a97e]" />
          </div>
        </div>

        {/* ── Center: Mihrab Arch Login Card ── */}
        <div className="relative w-full max-w-[420px]">

          {/* Outer double-border Mihrab arch shape (SVG clip path effect via pseudo border) */}
          <div
            className="relative bg-[#fffdf8] border-2 border-[#d6c4a6] px-7 py-7 md:px-8 md:py-8"
            style={{
              borderRadius: "52% 52% 28px 28px / 38px 38px 28px 28px",
              boxShadow:
                "0 0 0 5px #fffdf8, 0 0 0 7px #d6c4a6, 0 18px 45px rgba(50,35,20,0.10)",
            }}
          >
            {/* Kanz Logo (Book opens UPWARD, spine at bottom) */}
            <div className="flex flex-col items-center mb-5">
              <KanzLogo size="md" showSubtitle={true} />
            </div>

            {/* Status Alert */}
            {statusMsg && (
              <div
                className={`mb-3 p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                  statusMsg.type === "success"
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                {statusMsg.type === "success"
                  ? <CheckCircle2 className="w-4 h-4 shrink-0" />
                  : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span className="truncate">{statusMsg.text}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              {/* Email / Phone */}
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a8570]" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Email or Phone Number"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#faf6ee] border border-[#d6c7b2] rounded-xl text-sm text-[#2e1d11] placeholder-[#a69482] focus:outline-none focus:border-[#8c6d31] focus:ring-1 focus:ring-[#8c6d31] transition-all"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a8570]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-[#faf6ee] border border-[#d6c7b2] rounded-xl text-sm text-[#2e1d11] placeholder-[#a69482] focus:outline-none focus:border-[#8c6d31] focus:ring-1 focus:ring-[#8c6d31] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9a8570] hover:text-[#3d2b1f] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer text-[#5a4634]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded accent-[#3d2b1f]"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsOtpOpen(true)}
                  className="text-[#6d5641] hover:underline text-[11px]"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-[#3d2b1f] to-[#251910] hover:from-[#4d3728] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Logging in...</> : <><span>Login</span><ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#dfd2be]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#fffdf8] px-3 text-[#947f6a]">or</span>
              </div>
            </div>

            {/* OTP + Google */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setIsOtpOpen(true)}
                className="flex items-center justify-center gap-1.5 py-2 px-2 bg-[#faf6ee] hover:bg-[#f4ecd9] border border-[#d6c7b2] rounded-xl text-xs font-semibold text-[#3d2b1f] transition-all cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#6b5541] shrink-0" />
                <span className="truncate">Continue with OTP</span>
              </button>
              <button
                type="button"
                onClick={() => setStatusMsg({ type: "success", text: "Connecting to Google..." })}
                className="flex items-center justify-center gap-1.5 py-2 px-2 bg-[#faf6ee] hover:bg-[#f4ecd9] border border-[#d6c7b2] rounded-xl text-xs font-semibold text-[#3d2b1f] transition-all cursor-pointer"
              >
                <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Continue with Google</span>
              </button>
            </div>

            {/* Sign Up */}
            <div className="text-center mt-4 text-xs text-[#705c48]">
              Don&apos;t have an account?{" "}
              <a
                href="#signup"
                onClick={(e) => { e.preventDefault(); setIsOtpOpen(true); }}
                className="font-bold text-[#3d2b1f] hover:text-[#8c6d31] hover:underline ml-0.5"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 w-full py-4 text-center text-xs text-[#9c8975] select-none shrink-0">
        © {new Date().getFullYear()} Kanz Medresa. All rights reserved.
      </footer>

      {/* OTP Modal */}
      <OtpModal
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        initialEmail={identifier.includes("@") ? identifier : ""}
        onSuccess={(verifiedEmail) => {
          setStatusMsg({ type: "success", text: `Alhamdulillah! Verified via ${verifiedEmail}.` });
        }}
      />
    </main>
  );
}
