/**
 * Node Modules
 */
import { Space_Grotesk } from "next/font/google";

/**
 * Types
 */
import type { Metadata } from "next";

/**
 * Styles
 */
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LYY.DEV",
  description:
    "Portfolio website showcasing my projects, skills, and experience as a developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
