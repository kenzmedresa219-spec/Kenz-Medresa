import { NextResponse } from "next/server";
import { saveOtp } from "@/lib/otpStore";
import { sendOtpEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, purpose = "login" } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Generate random secure 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in-memory
    saveOtp(email, otp);

    // Send real email via Resend or Gmail SMTP
    const result = await sendOtpEmail({
      to: email,
      otp,
      purpose,
    });

    return NextResponse.json({
      success: true,
      message: result.message,
      provider: result.provider,
      // Provide preview code in development if in simulated mode
      ...(result.provider === "simulated" ? { previewCode: otp } : {}),
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    console.error("send-otp error:", errorMsg);
    return NextResponse.json(
      { success: false, message: errorMsg },
      { status: 500 }
    );
  }
}
