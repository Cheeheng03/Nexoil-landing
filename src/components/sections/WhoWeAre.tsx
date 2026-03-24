"use client";

import { useEffect, useRef } from "react";

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let naturalLeft = 0;
    let naturalTop = 0;
    let naturalW = 0;
    let naturalH = 0;
    let rafId = 0;
    let lastExpandT = -1;

    const measure = () => {
      const prevTransform = video.style.transform;
      video.style.transform = "none";
      const r = video.getBoundingClientRect();
      naturalLeft = r.left;
      naturalTop = r.top + window.scrollY - section.offsetTop;
      naturalW = r.width;
      naturalH = r.height;
      video.style.transform = prevTransform;
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrolled / scrollable, 0), 1);
      const expandT = Math.min(progress / 0.4, 1);

      // Skip if nothing changed
      if (Math.abs(expandT - lastExpandT) < 0.001) return;
      lastExpandT = expandT;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const scaleX = vw / naturalW;
      const scaleY = vh / naturalH;
      const scale = Math.max(scaleX, scaleY);

      // Reset transform briefly to measure live position
      video.style.transform = "none";
      const liveRect = video.getBoundingClientRect();
      const liveCX = liveRect.left + liveRect.width / 2;
      const liveCY = liveRect.top + liveRect.height / 2;
      const viewportCenterX = vw / 2;
      const viewportCenterY = vh / 2;

      const tx = (viewportCenterX - liveCX) * expandT;
      const ty = (viewportCenterY - liveCY) * expandT;
      const currentScale = 1 + (scale - 1) * expandT;
      const currentRadius = 16 * (1 - expandT);

      video.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${currentScale})`;
      video.style.borderRadius = `${currentRadius}px`;
      video.style.zIndex = expandT > 0.5 ? "1" : "10";

      const textEl = section.querySelector("[data-text]") as HTMLElement;
      if (textEl) {
        textEl.style.opacity = `${Math.max(1 - expandT * 2, 0)}`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const onResize = () => {
      lastExpandT = -1;
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <section
        id="about"
        ref={sectionRef}
        className="relative bg-white"
        style={{ height: "200vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-full flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full">
              {/* Left: text */}
              <div data-text className="flex flex-col gap-4 md:gap-5">
                <p className="text-[13px] font-medium uppercase tracking-widest text-[#000000]">
                  Who We Are
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-black">
                  Built for Reliability, Backed by Experience
                </h2>
                <p className="text-black/50 text-sm md:text-base leading-relaxed">
                  For over two decades, we&apos;ve been the fuel partner that Malaysia&apos;s industries count on. From procurement to last-mile delivery, every step of our process is designed around one thing: keeping your operations running.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mt-2">
                  <div className="flex flex-col gap-1 border-l-2 border-[#000000]/30 pl-4">
                    <span className="text-sm font-semibold text-black">Trusted Since 2000</span>
                    <span className="text-xs text-black/40">Petroleum Distribution</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {["Lab-Tested Products", "Industry Expertise", "Optimized Logistics"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="8" fill="#000000" />
                          <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm font-medium text-black/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#services"
                  className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#000000] text-white text-sm font-semibold hover:bg-[#333333] transition-colors w-fit"
                >
                  READ MORE
                </a>
              </div>

              {/* Right: video */}
              <div
                ref={videoRef}
                className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10]"
                style={{
                  borderRadius: "16px",
                  willChange: "transform",
                  backgroundColor: "#0a0a0a",
                  backfaceVisibility: "hidden",
                }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/hero-video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
