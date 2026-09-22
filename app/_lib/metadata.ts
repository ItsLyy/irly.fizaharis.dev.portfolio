/**
 * Types
 */
import type { Metadata } from "next";

const siteName = "Irly Fizaharis";
const siteTitle = "Irly Fizaharis — Full-Stack Developer & Software Engineer";
const siteDescription =
  "Portfolio of Irly Fizaharis — full-stack developer and software engineer based in Bandung, Indonesia. Specializing in high-performance web applications, scalable backend systems, and modern digital products that deliver business results.";
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
    "Full-Stack Developer",
    "Full-Stack Engineer",
    "Software Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Specialist",
    "Node.js Backend",
    "PostgreSQL & Drizzle",
    "Web Developer Indonesia",
    "Bandung Web Developer",
    "Digital Product Engineer",
    "SaaS Application Developer",
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
        alt: `${siteName} — Full-Stack Developer`,
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
