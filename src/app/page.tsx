"use client";

import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
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

export default function LoginPage() {
  const [role, setRole] = useState<"student" | "admin">("student");
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
        body: JSON.stringify({ identifier, password, role, rememberMe }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to log in.");
      }

      setStatusMsg({
        type: "success",
        text: `Alhamdulillah! Logged in successfully as ${
          role === "student" ? "Student" : "Administrator"
        }.`,
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
    <main className="relative min-h-screen w-full bg-[#fbf6ec] text-[#2e1d11] overflow-x-hidden flex flex-col justify-between selection:bg-[#c8a97e]/30">
      {/* Background Decorative Arabesque Pattern */}
      <IslamicBackgroundPattern />

      {/* Background Mosque Silhouette (Right Side) */}
      <MosqueSilhouette className="absolute right-0 bottom-0 w-[420px] md:w-[680px] h-[340px] md:h-[500px]" />

      {/* Hanging Golden Brass Lanterns (Top Right) */}
      <HangingLanterns className="absolute right-10 md:right-28 top-0 z-10" />

      {/* Top Navigation Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Brand in Top Left (Desktop) */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f2e6d1] border border-[#d8c8af] flex items-center justify-center shadow-xs">
            <span className="font-serif font-black text-xl text-[#3d2b1f]">ك</span>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-widest text-[#3d2b1f] uppercase">
                Kanz
              </span>
              <span className="text-xs font-serif font-bold text-[#8c6d31]">كنز</span>
            </div>
            <p className="text-[10px] text-[#7a6450] tracking-wider uppercase">
              Islamic Knowledge • A Better You
            </p>
          </div>
        </div>

        {/* Language Selector in Top Right */}
        <div className="mr-24 md:mr-36">
          <LanguageSelector />
        </div>
      </header>

      {/* Main Content Area: Left Quote + Center Arched Card */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 md:px-8 py-4 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
        
        {/* Left Side: Islamic Calligraphy Quote */}
        <div className="hidden lg:flex flex-col items-start max-w-sm text-left pl-4 select-none">
          <div className="mb-2">
            <span className="text-4xl text-[#3d2b1f] font-serif font-black" style={{ fontFamily: "'Scheherazade New', 'Amiri', serif" }}>
              طلب العلم
            </span>
            <br />
            <span className="text-4xl text-[#3d2b1f] font-serif font-black" style={{ fontFamily: "'Scheherazade New', 'Amiri', serif" }}>
              فريضة على كل مسلم
            </span>
          </div>

          <p className="text-base text-[#6d5743] font-medium leading-relaxed mt-4">
            Seeking knowledge is an obligation for every Muslim.
          </p>

          {/* Golden Flourish Divider */}
          <div className="flex items-center gap-3 mt-6 text-[#bda073]">
            <div className="w-12 h-[1px] bg-[#d3bc97]" />
            <span className="text-lg">❖</span>
            <div className="w-12 h-[1px] bg-[#d3bc97]" />
          </div>
        </div>

        {/* Center: The Iconic Arched Mihrab Login Card */}
        <div className="relative w-full max-w-[440px]">
          
          {/* Card Outer Container */}
          <div className="relative bg-[#fffdfa]/95 backdrop-blur-md rounded-t-[50px] rounded-b-[28px] border-2 border-[#e7d8c0] shadow-[0_15px_40px_rgba(61,43,31,0.07)] px-7 py-8 md:px-9 md:py-9 transition-all">
            
            {/* Islamic Mihrab Arched Top Profile */}
            <div className="flex flex-col items-center mb-6">
              <KanzLogo size="md" showSubtitle={true} />
            </div>

            {/* Student vs Admin Switcher Tab */}
            <div className="grid grid-cols-2 p-1 bg-[#efe4d1]/70 rounded-2xl border border-[#ded1bd] mb-6">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                  role === "student"
                    ? "bg-[#3d2b1f] text-white shadow-sm"
                    : "text-[#5a4431] hover:text-[#2e1d11]"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                  role === "admin"
                    ? "bg-[#3d2b1f] text-white shadow-sm"
                    : "text-[#5a4431] hover:text-[#2e1d11]"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {/* Alerts */}
            {statusMsg && (
              <div
                className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
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
                <span>{statusMsg.text}</span>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                    className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-[#faf6ee] border border-[#d6c7b2] rounded-xl text-xs md:text-sm text-[#2e1d11] placeholder-[#a69482] focus:outline-none focus:border-[#8c6d31] focus:ring-1 focus:ring-[#8c6d31] transition-all"
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
                    className="w-full pl-10 pr-10 py-2.5 md:py-3 bg-[#faf6ee] border border-[#d6c7b2] rounded-xl text-xs md:text-sm text-[#2e1d11] placeholder-[#a69482] focus:outline-none focus:border-[#8c6d31] focus:ring-1 focus:ring-[#8c6d31] transition-all"
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
                <label className="flex items-center gap-2 cursor-pointer select-none text-[#5a4634]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#c5b59e] text-[#3d2b1f] focus:ring-[#8c6d31] accent-[#3d2b1f] cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => setIsOtpOpen(true)}
                  className="text-[#6d5641] hover:text-[#2e1d11] hover:underline transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#3d2b1f] to-[#251910] hover:from-[#4d3728] hover:to-[#2e1f14] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
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
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#dfd2be]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#fffdfa] px-3 text-[#947f6a]">or</span>
              </div>
            </div>

            {/* Social & Alternative Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {/* Continue with OTP */}
              <button
                type="button"
                onClick={() => setIsOtpOpen(true)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#faf6ee] hover:bg-[#f4ecd9] border border-[#d6c7b2] rounded-xl text-xs font-semibold text-[#3d2b1f] transition-all cursor-pointer shadow-2xs"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#6b5541]" />
                <span className="truncate">Continue with OTP</span>
              </button>

              {/* Continue with Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#faf6ee] hover:bg-[#f4ecd9] border border-[#d6c7b2] rounded-xl text-xs font-semibold text-[#3d2b1f] transition-all cursor-pointer shadow-2xs"
              >
                <GoogleIcon className="w-3.5 h-3.5" />
                <span className="truncate">Continue with Google</span>
              </button>
            </div>

            {/* Don't have an account? Sign Up */}
            <div className="text-center mt-6 text-xs text-[#705c48]">
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

          </div>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="relative z-20 w-full py-4 text-center text-xs text-[#9c8975] select-none">
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
