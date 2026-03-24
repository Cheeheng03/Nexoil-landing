"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { heroContent } from "@/data/content";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track from when section enters to when it's fully scrolled off
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Text parallax — slides left and fades as you scroll to next section
  const textX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const textX2 = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const textX3 = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Image parallax — moves down slower than scroll, stays visible
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Subtitle
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #d4f5ef 0%, #bfeee5 20%, #e8f9f5 50%, #f0ebe3 80%, #ece4d9 100%)",
      }}
    >
      {/* Oil image — right side, bottom-aligned, parallax up on scroll */}
      <motion.div
        style={{ y: imageY }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        className="absolute z-[5] right-0 sm:right-[5%] lg:right-[8%] bottom-0 pointer-events-none"
      >
        <div className="relative w-[160px] h-[40vh] sm:w-[280px] sm:h-[60vh] md:w-[400px] md:h-[75vh] lg:w-[500px] lg:h-[85vh]">
          <Image
            src="/images/hero-image.png"
            alt="Premium petroleum oil"
            fill
            priority
            sizes="(max-width: 640px) 200px, (max-width: 768px) 280px, (max-width: 1280px) 400px, 500px"
            className="object-contain object-bottom drop-shadow-2xl"
          />
        </div>
      </motion.div>

      {/* Text — all left-aligned, vertically centered, parallax on scroll */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 h-full flex items-center"
      >
        <div className="flex flex-col">
          {/* "Fueling" */}
          <motion.div
            style={{ x: textX1 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          >
            <h1 className="text-[clamp(2.5rem,8vw,10rem)] font-bold leading-[1] tracking-tighter text-black/90">
              The Engine 
            </h1>
          </motion.div>

          {/* "Your Business" */}
          <motion.div
            style={{ x: textX2 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          >
            <h1 className="text-[clamp(2.5rem,8vw,10rem)] font-bold leading-[1] tracking-tighter text-black/90">
              Behind
            </h1>
          </motion.div>

          {/* "Industries" */}
          <motion.div
            style={{ x: textX3 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="mt-4 md:mt-6"
          >
            <h1 className="text-[clamp(2.5rem,8vw,10rem)] font-bold leading-[1] tracking-tighter text-black/90">
              Industries
            </h1>
          </motion.div>
        </div>
      </motion.div>

      {/* Subtitle at bottom left */}
      <motion.div
        style={{ opacity: subtitleOpacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-4 sm:left-6 md:left-10 z-10 max-w-[200px] sm:max-w-[280px] md:max-w-sm"
      >
        <div className="flex items-start gap-3">
          <div className="w-px h-16 bg-black/20 flex-shrink-0 mt-1" />
          <p className="text-black/40 text-sm md:text-base leading-relaxed">
            {heroContent.subtitle}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
