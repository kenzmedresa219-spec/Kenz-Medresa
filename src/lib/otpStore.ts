// In-memory OTP storage with TTL expiry (10 minutes)
interface OtpEntry {
  code: string;
  expiresAt: number;
  attempts: number;
}

const otpMap = new Map<string, OtpEntry>();

export function saveOtp(email: string, code: string): void {
  const normalized = email.toLowerCase().trim();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
  otpMap.set(normalized, { code, expiresAt, attempts: 0 });
}

export function verifyOtp(email: string, inputCode: string): { success: boolean; message: string } {
  const normalized = email.toLowerCase().trim();
  const entry = otpMap.get(normalized);

  if (!entry) {
    return { success: false, message: "No OTP found or code has expired. Please request a new one." };
  }

  if (Date.now() > entry.expiresAt) {
    otpMap.delete(normalized);
    return { success: false, message: "OTP has expired. Please request a new one." };
  }

  if (entry.attempts >= 5) {
    otpMap.delete(normalized);
    return { success: false, message: "Too many failed attempts. Please request a new OTP." };
  }

  if (entry.code.trim() !== inputCode.trim()) {
    entry.attempts += 1;
    return { success: false, message: `Invalid code. ${5 - entry.attempts} attempts remaining.` };
  }

  // Success
  otpMap.delete(normalized);
  return { success: true, message: "Verification successful!" };
}
