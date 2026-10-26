"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, CheckCircle2, AlertCircle, Loader2, X, ArrowRight, RefreshCw } from "lucide-react";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
  onSuccess: (email: string) => void;
}

export const OtpModal: React.FC<OtpModalProps> = ({
  isOpen,
  onClose,
  initialEmail = "",
  onSuccess,
}) => {
  const [step, setStep] = useState<"enter-email" | "enter-code">("enter-email");
  const [email, setEmail] = useState(initialEmail);
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [devPreviewCode, setDevPreviewCode] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  // Countdown timer for resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  if (!isOpen) return null;

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    setDevPreviewCode(null);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "login" }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send OTP email.");
      }

      setStep("enter-code");
      setSuccessMsg(`We sent a 6-digit code to ${email}`);
      setTimer(60); // 60s cooldown
      if (data.previewCode) {
        setDevPreviewCode(data.previewCode);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error sending code";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    // Only accept numeric
    const cleanVal = value.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = cleanVal;
    setDigits(newDigits);

    // Auto move to next input
    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length > 0) {
      const newDigits = [...digits];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasted[i] || "";
      }
      setDigits(newDigits);
      const nextIndex = Math.min(pasted.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = digits.join("");
    if (code.length < 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid or expired code.");
      }

      setSuccessMsg("Verification successful! Logging you in...");
      setTimeout(() => {
        onSuccess(email);
        onClose();
      }, 1200);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Verification failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#fffdfa] rounded-3xl p-6 md:p-8 border border-[#e7d9c4] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8c745d] hover:text-[#3d2b1f] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#f4ecd9] text-[#3d2b1f] mb-3 border border-[#ded1be]">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#3d2b1f]">
            {step === "enter-email" ? "Login with OTP" : "Enter Verification Code"}
          </h3>
          <p className="text-xs text-[#7c6957] mt-1">
            {step === "enter-email"
              ? "We will send a 6-digit one-time password to your email."
              : `Code sent to ${email}`}
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Dev Mode Notification banner if simulated */}
        {devPreviewCode && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900">
            <div className="font-semibold flex items-center justify-between">
              <span>Preview OTP (Development):</span>
              <span className="font-mono text-sm font-bold tracking-widest bg-amber-200/70 px-2 py-0.5 rounded">
                {devPreviewCode}
              </span>
            </div>
            <p className="text-[11px] text-amber-700 mt-1">
              Add your Google App Password or Resend key to deliver to real inboxes.
            </p>
          </div>
        )}

        {step === "enter-email" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#5a4634] mb-1.5">
                Your Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#99836e]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-[#faf6ee] border border-[#d6c7b2] rounded-xl text-sm text-[#2e1d11] placeholder-[#a69482] focus:outline-none focus:ring-2 focus:ring-[#8c6d31] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#3d2b1f] to-[#251910] hover:from-[#4d3728] hover:to-[#2e1f14] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending Code...
                </>
              ) : (
                <>
                  Send OTP Code
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            {/* 6 Digit Inputs */}
            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  autoFocus={idx === 0}
                  className="w-11 h-13 text-center text-xl font-bold font-mono bg-[#faf6ee] border-2 border-[#d6c7b2] focus:border-[#8c6d31] focus:ring-2 focus:ring-[#8c6d31]/20 rounded-xl text-[#3d2b1f] focus:outline-none transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || digits.join("").length < 6}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#3d2b1f] to-[#251910] hover:from-[#4d3728] hover:to-[#2e1f14] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify & Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Resend & Change email controls */}
            <div className="flex items-center justify-between text-xs pt-1 text-[#7c6957]">
              <button
                type="button"
                onClick={() => setStep("enter-email")}
                className="hover:underline hover:text-[#3d2b1f]"
              >
                Change Email
              </button>

              <button
                type="button"
                onClick={() => handleSendOtp()}
                disabled={timer > 0 || loading}
                className="inline-flex items-center gap-1 font-semibold text-[#8c6d31] hover:text-[#5c451c] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
