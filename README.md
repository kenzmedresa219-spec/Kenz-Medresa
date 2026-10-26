# Kanz (كنز) Medresa - Islamic Knowledge Platform

> **"طلب العلم فريضة على كل مسلم"**  
> *"Seeking knowledge is an obligation for every Muslim."*

A modern, culturally authentic Islamic learning and medresa management platform. Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and integrated with a **real transactional email engine** for one-time passcodes (OTP) and student/admin authentication.

---

## ✨ Features

- 🕌 **Authentic Islamic Aesthetic**:
  - Arched Mihrab/Dome card styling
  - Traditional Arabic calligraphy ("كنز" and "طلب العلم فريضة على كل مسلم")
  - Hanging golden Ramadan lanterns (Fanous) with ambient warm glows
  - Subtle background Arabesque geometric lattice watermark
  - Mosque minarets silhouette
- 👥 **Dual Role Authentication**:
  - Instant toggle between **Student** and **Admin** portals
- ✉️ **Real Email OTP Verification**:
  - Delivers 6-digit one-time verification passcodes straight to users' real email inboxes
  - Styled with luxury Islamic branded HTML email templates
  - Supports **Resend API** and **Gmail SMTP**
  - Includes built-in countdown resend timer and 10-minute code expiry
- 🌐 **Multilingual Ready**:
  - Language switcher supporting English, Arabic (العربية), and Amharic (አማርኛ)
- 🔒 **Security**:
  - Strict input validation, credential protection, and brute-force protection

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/kenzmedresa219-spec/Kenz-Medresa.git
cd Kenz-Medresa
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Email Service (`.env.local`)
Create a `.env.local` file by copying `.env.example`:

#### Option A: Gmail SMTP (Free)
1. Turn on 2-Step Verification on your Google Account: [myaccount.google.com/security](https://myaccount.google.com/security)
2. Search **"App passwords"**, generate one for "Kanz Medresa".
3. Add to `.env.local`:
```env
SMTP_USER=your_email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
```

#### Option B: Resend (Fast & Modern)
1. Sign up at [resend.com](https://resend.com) and copy your API key.
2. Add to `.env.local`:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── login/route.ts       # Authentication endpoint
│   │   │       ├── send-otp/route.ts    # Generates and emails real OTP
│   │   │       └── verify-otp/route.ts  # Validates 6-digit passcode
│   │   ├── globals.css                  # Custom styling & Islamic themes
│   │   ├── layout.tsx                   # Root metadata & layout
│   │   └── page.tsx                     # Main Kanz Islamic Login Page
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LanguageSelector.tsx     # English / Arabic / Amharic switcher
│   │   │   └── OtpModal.tsx             # Interactive 6-digit OTP verification modal
│   │   └── icons/
│   │       ├── IslamicOrnaments.tsx     # Fanous lanterns, mosque, arabesque SVGs
│   │       └── KanzLogo.tsx             # Scalable Kanz emblem
│   └── lib/
│       ├── email.ts                     # Nodemailer SMTP & Resend email engine
│       └── otpStore.ts                  # In-memory OTP cache & expiry logic
├── .env.example                         # Environment configuration template
├── package.json
└── tsconfig.json
```

---

## 📜 License
Developed with dedication for the Ummah.
