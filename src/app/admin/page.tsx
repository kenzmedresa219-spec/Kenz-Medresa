"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { KanzLogo } from "@/components/icons/KanzLogo";
import {
  HangingLanterns,
  MosqueSilhouette,
  IslamicBackgroundPattern,
} from "@/components/icons/IslamicOrnaments";
import { LanguageSelector } from "@/components/auth/LanguageSelector";
import { OtpModal } from "@/components/auth/OtpModal";

export default function AdminLoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  // OTP Modal state for admin
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          password,
          role: "admin",
          adminKey,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Admin authorization failed.");
      }

      setStatusMsg({
        type: "success",
        text: "Access Granted. Welcome, Administrator.",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Access Denied";
      setStatusMsg({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative h-screen w-full bg-[#1b1510] text-[#f7eedf] overflow-hidden flex flex-col justify-between selection:bg-[#d4af37]/30">
      {/* Background Decorative Arabesque Pattern (Darker Tone) */}
      <IslamicBackgroundPattern className="opacity-[0.03] invert" />

      {/* Background Mosque Silhouette (Right Side) */}
      <MosqueSilhouette className="absolute right-0 bottom-0 w-[400px] md:w-[620px] h-[320px] md:h-[480px] opacity-[0.04] invert pointer-events-none" />

      {/* Hanging Golden Brass Lanterns (Top Right) */}
      <HangingLanterns className="absolute right-8 md:right-24 top-0 z-10 scale-90 md:scale-100 origin-top-right drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" />

      {/* Top Header */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between shrink-0">
        {/* Brand in Top Left */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#2e2319] border border-[#523e2b] flex items-center justify-center shadow-md group-hover:border-[#d4af37] transition-all">
            <span className="font-serif font-black text-lg text-[#d4af37]">ك</span>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2 leading-none">
              <span className="text-sm font-bold tracking-widest text-[#f5ebd9] uppercase">
                Kanz Admin
              </span>
              <span className="text-xs font-serif font-bold text-[#d4af37]">إدارة كنز</span>
            </div>
            <p className="text-[9px] text-[#a48e77] tracking-wider uppercase mt-0.5">
              Medresa Management Console
            </p>
          </div>
        </Link>

        {/* Top Right: Return to Student & Language Selector */}
        <div className="flex items-center gap-4 mr-20 md:mr-32">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] hover:text-[#f8e7b5] bg-[#291f16] hover:bg-[#382b1f] px-3 py-1.5 rounded-lg border border-[#5a4430] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Student Portal</span>
          </Link>
          <LanguageSelector />
        </div>
      </header>

      {/* Center Arched Admin Console Card */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 flex-1 flex items-center justify-center min-h-0">
        <div className="relative w-full max-w-[430px] my-auto">
          
          {/* Card Outer Container */}
          <div className="relative bg-[#261d15]/95 backdrop-blur-md rounded-t-[44px] rounded-b-[26px] border-2 border-[#54412f] shadow-[0_20px_50px_rgba(0,0,0,0.6)] px-7 py-7 md:px-9 md:py-8 transition-all">
            
            {/* Header / Logo */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#382b1f] border border-[#6b5239] flex items-center justify-center mb-2 shadow-inner">
                <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
              </div>
              <h1 className="text-xl font-bold tracking-wide text-[#f5ebd9]">
                Administrator Console
              </h1>
              <p className="text-xs text-[#a8937c] mt-0.5 font-medium">
                Authorized Personnel Only • لوحة تحكم الإدارة
              </p>
            </div>

            {/* Alerts */}
            {statusMsg && (
              <div
                className={`mb-4 p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                  statusMsg.type === "success"
                    ? "bg-emerald-950/70 border border-emerald-600/50 text-emerald-300"
                    : "bg-red-950/70 border border-red-600/50 text-red-300"
                }`}
              >
                {statusMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                )}
                <span>{statusMsg.text}</span>
              </div>
            )}

            {/* Admin Form */}
            <form onSubmit={handleAdminSubmit} className="space-y-3.5">
              {/* Admin Email or ID */}
              <div>
                <label className="block text-[11px] font-semibold text-[#c7b39b] mb-1">
                  Administrator Email / ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8f7962]" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="admin@kanz-medresa.org"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-[#1f1710] border border-[#4d3a29] rounded-xl text-xs md:text-sm text-[#f5ebd9] placeholder-[#7d6852] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>
              </div>

              {/* Admin Password */}
              <div>
                <label className="block text-[11px] font-semibold text-[#c7b39b] mb-1">
                  Master Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8f7962]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-10 pr-10 py-2.5 bg-[#1f1710] border border-[#4d3a29] rounded-xl text-xs md:text-sm text-[#f5ebd9] placeholder-[#7d6852] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8f7962] hover:text-[#d4af37] p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Security Key / OTP Code */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-[#c7b39b]">
                    Security Passcode (OTP)
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsOtpOpen(true)}
                    className="text-[10px] text-[#d4af37] hover:underline"
                  >
                    Request OTP via Email
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8f7962]" />
                  <input
                    type="text"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    placeholder="6-digit verification code"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#1f1710] border border-[#4d3a29] rounded-xl text-xs md:text-sm text-[#f5ebd9] placeholder-[#7d6852] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] font-mono tracking-wider transition-all"
                  />
                </div>
              </div>

              {/* Admin Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#d4af37] to-[#aa8322] hover:from-[#e5c049] hover:to-[#be9429] text-[#1b1510] font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <span>Enter Admin Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Back to Student Portal */}
            <div className="text-center mt-5 pt-3 border-t border-[#443324]">
              <Link
                href="/"
                className="text-xs text-[#a6927c] hover:text-[#f5ebd9] inline-flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Return to Student Login</span>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="relative z-20 w-full py-2.5 text-center text-[11px] text-[#786552] select-none shrink-0">
        <p>© {new Date().getFullYear()} Kanz Medresa. Secure Administrator Access.</p>
      </footer>

      {/* Real Email OTP Modal for Admin */}
      <OtpModal
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        initialEmail={identifier.includes("@") ? identifier : ""}
        onSuccess={(verifiedEmail) => {
          setAdminKey("VERIFIED");
          setStatusMsg({
            type: "success",
            text: `Admin identity verified with ${verifiedEmail}. You can now sign in.`,
          });
        }}
      />
    </main>
  );
}
