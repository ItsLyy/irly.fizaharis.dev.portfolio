const siteName = "Irly Fizaharis";
const siteTitle = "Irly Fizaharis | Front-end Developer Portfolio";
const siteDescription =
  "Portfolio of Irly Fizaharis — Front-end web developer. Projects, skills, education, and experience. Based in Bandung, Indonesia.";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "https://irly.fizaharis.dev";

export const defaultMetadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Irly Fizaharis",
    "front-end developer",
    "web developer",
    "React",
    "Next.js",
    "portfolio",
    "Bandung",
    "Indonesia",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};
