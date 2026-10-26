import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otpStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { success: false, message: "Email and verification code are required." },
        { status: 400 }
      );
    }

    const verification = verifyOtp(email, code);

    if (!verification.success) {
      return NextResponse.json(
        { success: false, message: verification.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Successfully authenticated!",
      user: {
        email,
        role: "student",
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, message: errorMsg },
      { status: 500 }
    );
  }
}
