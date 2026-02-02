/**
 * Node Modules
 */
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";

/**
 * Custom Modules
 */
import { defaultMetadata } from "./_lib/metadata";

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
  ...defaultMetadata,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Irly Fizaharis",
  description: defaultMetadata.description,
  url: defaultMetadata.metadataBase?.toString(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${spaceGrotesk.className} antialiased`}>
        {children}
        <Toaster
          richColors
          position="bottom-center"
          theme="dark"
          toastOptions={{
            className: `${spaceGrotesk.className}`,
          }}
        />
      </body>
    </html>
  );
}
