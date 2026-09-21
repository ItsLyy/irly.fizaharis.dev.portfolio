import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Irly Fizaharis — Front-end Developer & Software Engineer",
    short_name: "Irly Fizaharis",
    description:
      "Portfolio of Irly Fizaharis — front-end web developer in Bandung, Indonesia. Projects, skills, education, and experience.",
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
