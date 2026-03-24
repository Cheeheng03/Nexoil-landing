"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { heroContent } from "@/data/content";

const typewriterWords = ["Industries", "Automotive", "Manufacturing", "Logistics", "Energy"];

function TypewriterText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = typewriterWords[wordIndex];

    if (!isDeleting) {
      // Typing
      const next = currentWord.slice(0, displayed.length + 1);
      setDisplayed(next);
      if (next === currentWord) {
        // Pause then start deleting
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      // Deleting
      const next = currentWord.slice(0, displayed.length - 1);
      setDisplayed(next);
      if (next === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % typewriterWords.length);
        return;
      }
    }
  }, [displayed, isDeleting, wordIndex]);

  useEffect(() => {
    const speed = isDeleting ? 50 : 100;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] md:w-[5px] h-[0.85em] bg-[#ffffff] ml-1 align-baseline translate-y-[0.05em]"
      />
    </span>
  );
}

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

  // BG image parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Subtitle
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background image with overlay */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Grid lines overlay */}
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
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
            <h1 className="text-[clamp(2.5rem,8vw,10rem)] font-bold leading-[1] tracking-tighter text-white">
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
            <h1 className="text-[clamp(2.5rem,8vw,10rem)] font-bold leading-[1] tracking-tighter text-white">
              Behind
            </h1>
          </motion.div>

          {/* Typewriter line */}
          <motion.div
            style={{ x: textX3 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <h1 className="text-[clamp(2.5rem,8vw,10rem)] font-bold leading-[1] tracking-tighter text-[#ffffff]">
              <TypewriterText />
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
          <div className="w-px h-16 bg-white/20 flex-shrink-0 mt-1" />
          <p className="text-white/50 text-sm md:text-base leading-relaxed">
            {heroContent.subtitle}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
