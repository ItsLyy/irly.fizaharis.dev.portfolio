/**
 * Types
 */
import type { Metadata } from "next";

const siteName = "Irly Fizaharis";
const siteTitle = "Irly Fizaharis — Front-end Developer & Software Engineer";
const siteDescription =
  "Portfolio of Irly Fizaharis — front-end web developer based in Bandung, Indonesia. Specializing in high-performance web applications with React, Next.js, TypeScript, and modern frontend architecture.";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "https://irly.fizaharis.dev";

export const siteConfig = {
  name: siteName,
  title: siteTitle,
  description: siteDescription,
  url: new URL(siteUrl),
  image: `${siteUrl}/images/profile-headshot.jpeg`,
  socials: {
    github: "https://github.com/ItsLyy",
    linkedin: "https://www.linkedin.com/in/irly-fizaharis-aa8896298/",
    instagram: "https://www.instagram.com/irlydev/",
    twitter: "https://twitter.com/irlydev",
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "Irly Fizaharis",
    "Front-end Developer",
    "Frontend Engineer",
    "Full-Stack Developer",
    "Web Developer Indonesia",
    "React Developer",
    "Next.js Portfolio",
    "TypeScript Specialist",
    "Tailwind CSS",
    "Bandung Web Developer",
    "Software Engineer Portfolio",
    "Modern Web Applications",
    "Clean UI Design",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: siteConfig.image,
        width: 839,
        height: 839,
        alt: `${siteName} — Front-end Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@irlydev",
    images: [siteConfig.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "theme-color": "#303446",
    "color-scheme": "dark",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
