/**
 * Node Modules
 */
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

/**
 * Custom Modules
 */
import ToasterProvider from "./_components/general/toaster-provider";
import WelcomeIntro from "./_components/general/welcome-intro";
import { defaultMetadata, siteConfig } from "./_lib/metadata";

/**
 * Types
 */
import type { Metadata, Viewport } from "next";

/**
 * Styles
 */
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#303446",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  ...defaultMetadata,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: siteConfig.name,
      description: defaultMetadata.description,
      url: siteConfig.url.origin,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url.origin}/projects?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteConfig.url.origin}/#profile`,
      url: siteConfig.url.origin,
      name: `${siteConfig.name} — Portfolio`,
      mainEntity: {
        "@id": `${siteConfig.url.origin}/#person`,
      },
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url.origin}/#person`,
      name: siteConfig.name,
      url: siteConfig.url.origin,
      image: siteConfig.image,
      jobTitle: "Front-end Developer & Software Engineer",
      description: defaultMetadata.description,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bandung",
        addressCountry: "ID",
      },
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Node.js",
        "PostgreSQL",
        "Drizzle ORM",
        "Supabase",
        "Web Performance",
        "Responsive Web Design",
      ],
      sameAs: [
        siteConfig.socials.github,
        siteConfig.socials.linkedin,
        siteConfig.socials.instagram,
        siteConfig.socials.twitter,
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.className} selection:bg-accent selection:text-ink antialiased`}
      >
        <a
          href="#main-content"
          className="focus:border-accent focus:bg-surface focus:text-accent sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-sm focus:border focus:px-4 focus:py-2 focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>
        <WelcomeIntro />
        {children}
        <ToasterProvider fontClassName={spaceGrotesk.className} />
      </body>
    </html>
  );
}
