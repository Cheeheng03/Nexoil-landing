"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { industriesContent } from "@/data/content";

const industries = [
  {
    title: "Automotive Industry",
    description:
      "High-grade Euro5 diesel and performance lubricants that keep fleets and workshops running at peak efficiency.",
  },
  {
    title: "Manufacturing & Industrial",
    description:
      "Bulk fuel and industrial oils delivered on schedule to keep production lines moving without interruption.",
  },
  {
    title: "Retail & Service Stations",
    description:
      "Reliable wholesale supply of petrol, diesel, and lubricants for stations that need consistent stock and quality.",
  },
];

export default function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section id="industries" ref={sectionRef} className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Header */}
      <motion.div style={{ y: headerY }} className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16 md:mb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[13px] font-medium uppercase tracking-widest text-black/40 mb-4"
        >
          {industriesContent.sectionLabel}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          viewport={{ once: true }}
          className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-black"
        >
          Powering Multiple Industries
        </motion.h2>
      </motion.div>

      {/* Video shape + content card */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="relative">
          {/* Angled video shape */}
          <motion.div style={{ y: videoY }} className="relative w-full md:w-[75%]">
          <motion.div
            style={{ clipPath: "polygon(4% 20%, 90% 0%, 80% 100%, 5% 90%)" }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] md:aspect-[16/10]"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/services.mp4" type="video/mp4" />
            </video>
          </motion.div>
          </motion.div>

          {/* Floating content card — overlaps the video */}
          <motion.div style={{ y: cardY }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            viewport={{ once: true }}
            className="relative md:absolute md:right-0 md:bottom-8 lg:bottom-12 mt-[-40px] md:mt-0 md:w-[50%] lg:w-[45%]
              bg-white/90 backdrop-blur-xl rounded-2xl p-8 md:p-10
              shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]
              border border-black/[0.04]"
          >
            <div className="flex flex-col gap-6">
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-[#2ABFAB]/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2ABFAB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold leading-tight text-black">
                Powering the industries that power Malaysia.
              </h3>

              <div className="flex flex-col gap-4">
                {industries.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2ABFAB] mt-2 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-black">{item.title}</span>
                      <p className="text-black/40 text-[13px] leading-relaxed mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <a
                href="#contact"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#2ABFAB] hover:text-[#24a999] transition-colors w-fit group"
              >
                Learn more
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </div>
          </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
