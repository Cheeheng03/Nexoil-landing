import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nexoil Distribution Sdn Bhd — Malaysia's Leading Industrial Fuel Partner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          background: "linear-gradient(135deg, #0f1115 0%, #1a1d24 50%, #0f1115 100%)",
          fontFamily: "sans-serif",
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
            fontSize: 64,
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
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
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
            color: "rgba(255,255,255,0.5)",
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
              color: "rgba(255,255,255,0.3)",
            }}
          >
            — nexoil.com.my
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
