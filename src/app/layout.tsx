import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kanz (كنز) - Islamic Knowledge • A Better You",
  description:
    "Seeking knowledge is an obligation for every Muslim. Kanz Islamic education platform for students and teachers.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-[#fbf6ec]">
        {children}
      </body>
    </html>
  );
}
