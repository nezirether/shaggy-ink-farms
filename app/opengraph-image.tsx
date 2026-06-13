import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#B8B6AE",
          color: "#1C1C1A",
          fontFamily: "Georgia, serif",
          padding: 60,
        }}
      >
        <div
          style={{
            border: "8px solid #2C4A2E",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 48,
            background:
              "linear-gradient(135deg, rgba(198,147,63,0.28), rgba(215,212,204,1) 42%, rgba(44,74,46,0.18))",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Arial, sans-serif",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#8B2A2A",
            }}
          >
            <span>Northern California</span>
            <span>Heritage Poultry</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
          <div
            style={{
              display: "flex",
              fontSize: 94,
              lineHeight: 0.95,
              fontWeight: 700,
              maxWidth: 760,
            }}
            >
              {siteConfig.name}
            </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontFamily: "Arial, sans-serif",
              fontSize: 32,
                color: "#2C4A2E",
                maxWidth: 760,
              }}
            >
              Plymouth Barred Rock chickens, oak pasture, family homestead
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 18,
              fontFamily: "Arial, sans-serif",
              fontSize: 22,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            <span style={{ color: "#2C4A2E" }}>Journal</span>
            <span style={{ color: "#8B2A2A" }}>Family</span>
            <span style={{ color: "#C6933F" }}>YouTube</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
