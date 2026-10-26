"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  Smartphone,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
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
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  // OTP Modal state
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

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to log in.");
      }

      setStatusMsg({
        type: "success",
        text: "Alhamdulillah! Welcome back to Kanz Student Portal.",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setStatusMsg({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setStatusMsg({
      type: "success",
      text: "Connecting to Google authentication...",
    });
  };

  return (
    <main className="relative h-screen w-full bg-[#fbf6ec] text-[#2e1d11] overflow-hidden flex flex-col justify-between selection:bg-[#c8a97e]/30">
      {/* Background Decorative Arabesque Pattern */}
      <IslamicBackgroundPattern />

      {/* Background Mosque Silhouette (Right Side) */}
      <MosqueSilhouette className="absolute right-0 bottom-0 w-[380px] md:w-[600px] h-[300px] md:h-[460px] pointer-events-none" />

      {/* Hanging Golden Brass Lanterns (Top Right) */}
      <HangingLanterns className="absolute right-8 md:right-24 top-0 z-10 scale-90 md:scale-100 origin-top-right" />

      {/* Top Header */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between shrink-0">
        {/* Brand in Top Left */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#f2e6d1] border border-[#d8c8af] flex items-center justify-center shadow-2xs group-hover:bg-[#ebdcbe] transition-colors">
            <span className="font-serif font-black text-lg text-[#3d2b1f]">ك</span>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-sm font-bold tracking-widest text-[#3d2b1f] uppercase">
                Kanz
              </span>
              <span className="text-xs font-serif font-bold text-[#8c6d31]">كنز</span>
            </div>
            <p className="text-[9px] text-[#7a6450] tracking-wider uppercase mt-0.5">
              Islamic Knowledge • A Better You
            </p>
          </div>
        </Link>

        {/* Top Right: Language Selector & Discreet Admin Link */}
        <div className="flex items-center gap-4 mr-20 md:mr-32">
          <Link
            href="/admin"
            className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#8c6d31] hover:text-[#5a431c] bg-[#faf5ec] hover:bg-[#f2e7d3] px-2.5 py-1.5 rounded-lg border border-[#e2d5c1] transition-all"
            title="Administrator Portal"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </Link>
          <LanguageSelector />
        </div>
      </header>

      {/* Main Content Area: Left Quote + Center Arched Student Card */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 md:px-8 flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 min-h-0">
        
        {/* Left Side: Islamic Calligraphy Quote */}
        <div className="hidden lg:flex flex-col items-start max-w-sm text-left pl-2 select-none">
          <div className="space-y-1">
            <div className="text-3xl xl:text-4xl text-[#3d2b1f] font-serif font-black" style={{ fontFamily: "'Scheherazade New', 'Amiri', serif" }}>
              طلب العلم
            </div>
            <div className="text-3xl xl:text-4xl text-[#3d2b1f] font-serif font-black" style={{ fontFamily: "'Scheherazade New', 'Amiri', serif" }}>
              فريضة على كل مسلم
            </div>
          </div>

          <p className="text-sm xl:text-base text-[#6d5743] font-medium leading-relaxed mt-3.5">
            Seeking knowledge is an obligation for every Muslim.
          </p>

          {/* Golden Flourish Divider */}
          <div className="flex items-center gap-3 mt-5 text-[#bda073]">
            <div className="w-10 h-[1px] bg-[#d3bc97]" />
            <span className="text-base">❖</span>
            <div className="w-10 h-[1px] bg-[#d3bc97]" />
          </div>
        </div>

        {/* Center: The Iconic Arched Mihrab Student Card */}
        <div className="relative w-full max-w-[430px] my-auto">
          
          {/* Card Outer Container */}
          <div className="relative bg-[#fffdfa]/95 backdrop-blur-md rounded-t-[44px] rounded-b-[26px] border-2 border-[#e7d8c0] shadow-[0_12px_36px_rgba(61,43,31,0.08)] px-6 py-6 md:px-8 md:py-7 transition-all">
            
            {/* Islamic Mihrab Arched Top Profile */}
            <div className="flex flex-col items-center mb-3">
              <KanzLogo size="md" showSubtitle={false} />
            </div>

            {/* Student Portal Badge Banner */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3ebd9] border border-[#ded0bb] text-[#3d2b1f] text-xs font-semibold shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5 text-[#8c6d31]" />
                <span>Student Portal</span>
              </div>
            </div>

            {/* Alerts */}
            {statusMsg && (
              <div
                className={`mb-3 p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                  statusMsg.type === "success"
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                {statusMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span className="truncate">{statusMsg.text}</span>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              {/* Identifier Input */}
              <div>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a8570]" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Email or Phone Number"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-[#faf6ee] border border-[#d6c7b2] rounded-xl text-xs md:text-sm text-[#2e1d11] placeholder-[#a69482] focus:outline-none focus:border-[#8c6d31] focus:ring-1 focus:ring-[#8c6d31] transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a8570]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-[#faf6ee] border border-[#d6c7b2] rounded-xl text-xs md:text-sm text-[#2e1d11] placeholder-[#a69482] focus:outline-none focus:border-[#8c6d31] focus:ring-1 focus:ring-[#8c6d31] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9a8570] hover:text-[#3d2b1f] p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-1.5 cursor-pointer select-none text-[#5a4634]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-[#c5b59e] text-[#3d2b1f] focus:ring-[#8c6d31] accent-[#3d2b1f] cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => setIsOtpOpen(true)}
                  className="text-[#6d5641] hover:text-[#2e1d11] hover:underline transition-colors cursor-pointer text-[11px]"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-1.5 py-2.5 px-4 bg-gradient-to-r from-[#3d2b1f] to-[#251910] hover:from-[#4d3728] hover:to-[#2e1f14] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider "or" */}
            <div className="relative my-3.5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#dfd2be]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#fffdfa] px-3 text-[#947f6a]">or</span>
              </div>
            </div>

            {/* Social & Alternative Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Continue with OTP */}
              <button
                type="button"
                onClick={() => setIsOtpOpen(true)}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#faf6ee] hover:bg-[#f4ecd9] border border-[#d6c7b2] rounded-xl text-xs font-semibold text-[#3d2b1f] transition-all cursor-pointer shadow-2xs"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#6b5541] shrink-0" />
                <span className="truncate">Continue with OTP</span>
              </button>

              {/* Continue with Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#faf6ee] hover:bg-[#f4ecd9] border border-[#d6c7b2] rounded-xl text-xs font-semibold text-[#3d2b1f] transition-all cursor-pointer shadow-2xs"
              >
                <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Continue with Google</span>
              </button>
            </div>

            {/* Don't have an account? Sign Up */}
            <div className="text-center mt-3.5 text-xs text-[#705c48]">
              <span>Don&apos;t have an account? </span>
              <a
                href="#signup"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOtpOpen(true);
                }}
                className="font-bold text-[#3d2b1f] hover:text-[#8c6d31] hover:underline ml-1 transition-colors"
              >
                Sign Up
              </a>
            </div>

            {/* Discreet Admin Portal Link */}
            <div className="text-center mt-2.5 pt-2 border-t border-[#ebdcc7]/60">
              <Link
                href="/admin"
                className="text-[11px] text-[#8c745d] hover:text-[#3d2b1f] hover:underline inline-flex items-center gap-1 transition-colors"
              >
                <span>Medresa Administrator?</span>
                <span className="font-semibold text-[#8c6d31]">Admin Portal →</span>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="relative z-20 w-full py-2.5 text-center text-[11px] text-[#9c8975] select-none shrink-0">
        <p>© {new Date().getFullYear()} Kanz Medresa. All rights reserved.</p>
      </footer>

      {/* Real Email OTP Modal */}
      <OtpModal
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        initialEmail={identifier.includes("@") ? identifier : ""}
        onSuccess={(verifiedEmail) => {
          setStatusMsg({
            type: "success",
            text: `Alhamdulillah! Verified with email ${verifiedEmail}. Logged in successfully.`,
          });
        }}
      />
    </main>
  );
}
