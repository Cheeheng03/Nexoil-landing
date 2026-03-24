import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Nexoil Distribution Sdn Bhd — Malaysia's Leading Industrial Fuel Partner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const imgData = await readFile(join(process.cwd(), "public/images/hero-bg.jpg"));
  const base64 = imgData.toString("base64");
  const bgSrc = `data:image/jpeg;base64,${base64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background image */}
        <img
          src={bgSrc}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Accent line */}
          <div
            style={{
              width: 80,
              height: 4,
              backgroundColor: "#ffffff",
              borderRadius: 2,
              marginBottom: 40,
            }}
          />

          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              marginBottom: 24,
            }}
          >
            The Engine Behind
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              marginBottom: 40,
            }}
          >
            Industries
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.5,
              maxWidth: 700,
              marginBottom: 48,
            }}
          >
            Premium petroleum products, reliable logistics, and two decades of fuel distribution expertise.
          </div>

          {/* Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.5px",
              }}
            >
              Nexoil Distribution Sdn Bhd
            </div>
            <div
              style={{
                fontSize: 20,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              — nexoil.com.my
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
