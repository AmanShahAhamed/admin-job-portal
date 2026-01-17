import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppLayoutClient } from "@/components/layout-client";
import { ReactQueryProvider } from "../lib";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Job Portal",
  description:
    "Admin dashboard for managing jobs, employers, candidates, and platform activity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ReactQueryProvider>
          <AppLayoutClient>{children}</AppLayoutClient>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
