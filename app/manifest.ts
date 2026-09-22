import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Irly Fizaharis — Full-Stack Developer & Software Engineer",
    short_name: "Irly Fizaharis",
    description:
      "Portfolio of Irly Fizaharis — full-stack developer and software engineer in Bandung, Indonesia. Projects, skills, education, and experience.",
    start_url: "/",
    display: "standalone",
    background_color: "#303446",
    theme_color: "#303446",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
