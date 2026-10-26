import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password, role = "student", rememberMe = false } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide both Email/Phone and Password." },
        { status: 400 }
      );
    }

    // Basic password length check for demonstration
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    // Mock authentication success
    return NextResponse.json({
      success: true,
      message: `Welcome back! Logged in as ${role === "admin" ? "Administrator" : "Student"}.`,
      user: {
        identifier,
        role,
        rememberMe,
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
