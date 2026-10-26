import nodemailer from "nodemailer";
import { Resend } from "resend";

interface SendOtpEmailParams {
  to: string;
  otp: string;
  purpose?: "login" | "reset" | "verification";
}

export function generateEmailHtml(otp: string, purpose: string = "login"): string {
  const title =
    purpose === "reset"
      ? "Password Reset Code"
      : "Your Verification Code";

  return `
<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
  <meta charset="UTF-8">
  <title>Kanz Medresa - Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f4ec; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2e1e12;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8f4ec; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width: 520px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e7d8c0; box-shadow: 0 10px 30px rgba(61,43,31,0.08); overflow: hidden;">
          
          <!-- Header Banner with Islamic Arched Motif -->
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #3d2b1f 0%, #22160d 100%); padding: 35px 20px; color: #fbf8f2;">
              <div style="font-size: 32px; font-weight: bold; letter-spacing: 2px; color: #d4af37; margin-bottom: 4px;">كنز</div>
              <div style="font-size: 20px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;">KANZ</div>
              <div style="font-size: 11px; letter-spacing: 2px; color: #d6c3a5; margin-top: 4px;">ISLAMIC KNOWLEDGE • A BETTER YOU</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 35px 30px 25px 30px; text-align: center;">
              <p style="font-size: 13px; color: #8c7662; margin: 0 0 8px 0; font-style: italic;">
                "طلب العلم فريضة على كل مسلم"
              </p>
              <h2 style="color: #3d2b1f; font-size: 22px; margin: 0 0 12px 0; font-weight: 700;">
                ${title}
              </h2>
              <p style="font-size: 14px; line-height: 1.6; color: #614e3e; margin: 0 0 25px 0;">
                Use the following 6-digit one-time passcode (OTP) to complete your request. This code will expire in <strong>10 minutes</strong>.
              </p>

              <!-- OTP Code Display Box -->
              <div style="background: #fbf7ee; border: 2px dashed #c8a97e; border-radius: 12px; padding: 18px 25px; display: inline-block; margin: 0 auto 25px auto;">
                <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #3d2b1f;">
                  ${otp}
                </span>
              </div>

              <p style="font-size: 12px; color: #9c8a77; line-height: 1.5; margin: 0 0 10px 0;">
                If you did not request this code, you can safely ignore this email. Never share your verification code with anyone.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #faf5ed; border-top: 1px solid #ebdcc8; padding: 20px; text-align: center; font-size: 11px; color: #8e7c6b;">
              © ${new Date().getFullYear()} Kanz Medresa. All rights reserved.<br/>
              Seeking knowledge is an obligation for every Muslim.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function sendOtpEmail({
  to,
  otp,
  purpose = "login",
}: SendOtpEmailParams): Promise<{ success: boolean; message: string; provider?: string }> {
  const html = generateEmailHtml(otp, purpose);
  const subject =
    purpose === "reset"
      ? "Kanz - Password Reset Code"
      : `Kanz Verification Code: ${otp}`;

  // 1. Check if Resend API Key is provided
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey && resendApiKey.trim() !== "") {
    try {
      const resend = new Resend(resendApiKey);
      const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

      const data = await resend.emails.send({
        from: `Kanz Medresa <${fromEmail}>`,
        to: [to],
        subject,
        html,
      });

      if (data.error) {
        console.error("Resend API error:", data.error);
        throw new Error(data.error.message);
      }

      return {
        success: true,
        message: `OTP sent successfully to ${to} via Resend`,
        provider: "resend",
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.warn("Resend failed, falling back to SMTP if configured:", errorMsg);
    }
  }

  // 2. Check if SMTP (Gmail / Custom SMTP) is configured
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpUser && smtpPass && smtpUser.trim() !== "" && smtpPass.trim() !== "") {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Kanz Medresa" <${smtpUser}>`,
        to,
        subject,
        html,
      });

      return {
        success: true,
        message: `OTP sent successfully to ${to} via Gmail SMTP`,
        provider: "smtp",
      };
    } catch (smtpErr: unknown) {
      const errorMsg = smtpErr instanceof Error ? smtpErr.message : String(smtpErr);
      console.error("SMTP error:", errorMsg);
      throw new Error(`Failed to send email via SMTP: ${errorMsg}`);
    }
  }

  // 3. Fallback for development / testing when credentials are not yet entered
  console.log(`[DEV MODE] Simulated email sent to ${to}. Code: ${otp}`);
  return {
    success: true,
    message: `[Dev Mode] Verification code generated: ${otp}. (Configure SMTP_USER/SMTP_PASS or RESEND_API_KEY in .env.local to deliver to real inboxes)`,
    provider: "simulated",
  };
}
