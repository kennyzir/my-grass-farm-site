import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const dynamic = "force-static";
export const alt = `${siteConfig.gameName} Wiki`;
export const size = {
  width: 1200,
  height: 630
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
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #101114 0%, #20232b 55%, #111113 100%)",
          color: "white",
          padding: 72
        }}
      >
        <div style={{ fontSize: 34, color: "#facc15", fontWeight: 800 }}>
          Codes, how to play, and updates
        </div>
        <div style={{ marginTop: 24, fontSize: 78, lineHeight: 1, fontWeight: 900 }}>
          {`${siteConfig.gameName} Wiki`}
        </div>
        <div style={{ marginTop: 28, maxWidth: 920, fontSize: 30, lineHeight: 1.35, color: "rgba(255,255,255,0.74)" }}>
          {siteConfig.description}
        </div>
      </div>
    ),
    size
  );
}
