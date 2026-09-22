import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Irly Fizaharis — Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#303446",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 70px",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
      }}
    >
      {/* Subtle grid line decoration */}
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          right: 24,
          bottom: 24,
          border: "1px solid #454d68",
          borderRadius: 8,
          pointerEvents: "none",
        }}
      />

      {/* Top Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              background: "rgba(202, 158, 230, 0.15)",
              border: "1px solid rgba(202, 158, 230, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ca9ee6",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            IF
          </div>
          <span
            style={{
              color: "#a5adce",
              fontSize: 16,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            [BUILD. REFINE. SHIP.]
          </span>
        </div>

        <div
          style={{
            color: "#ca9ee6",
            fontSize: 16,
            background: "#353b4f",
            padding: "6px 14px",
            borderRadius: 4,
            border: "1px solid #454d68",
          }}
        >
          PORTFOLIO V1
        </div>
      </div>

      {/* Main Title & Bio */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            color: "#a5adce",
            fontSize: 24,
            fontWeight: 400,
          }}
        >
          Hi, I&apos;m
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#ca9ee6",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Irly Fizaharis
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: "#c6d0f5",
          }}
        >
          Full-Stack Developer & Software Engineer
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#a5adce",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Modern software, thoughtfully built. Full-stack web architecture,
          accessible interfaces, and reliable engineering.
        </div>
      </div>

      {/* Bottom tags & site URL */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          {["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  background: "#2a2f40",
                  border: "1px solid #454d68",
                  color: "#ca9ee6",
                  padding: "6px 14px",
                  borderRadius: 4,
                  fontSize: 15,
                }}
              >
                {tag}
              </div>
            ),
          )}
        </div>

        <div
          style={{
            color: "#737994",
            fontSize: 18,
          }}
        >
          irly.fizaharis.dev
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
