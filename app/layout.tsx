import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "700", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Certus",
  description: "Privacy-first prediction markets powered by verified real-world data. Create and participate in crypto and weather predictions with automated outcomes and transparent results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${grotesk.variable} font-sans antialiased relative`}
      >
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
