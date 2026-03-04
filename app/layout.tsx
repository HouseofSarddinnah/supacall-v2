
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FaPhoneAlt, FaUserFriends, FaCommentDots, FaHistory, FaMoneyBillWave, FaCog, FaSignOutAlt, FaHome } from "react-icons/fa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SupaCall",
  description: "Secure video calling for the next generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#232a3d]`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </div>
      </body>
    </html>
  );
}
