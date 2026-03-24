"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { ctaContent, siteConfig } from "@/data/content";

export default function ContactCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
        <Image
          src="/images/lubricant.jpg"
          alt="Petroleum storage facility"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-32 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[13px] font-medium uppercase tracking-widest text-white/40 mb-6"
        >
          {ctaContent.sectionLabel}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            viewport={{ once: true }}
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white whitespace-pre-line"
          >
            {ctaContent.heading}
          </motion.h2>

          <div className="flex flex-col gap-8 pt-2">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-white/60 text-base md:text-lg leading-relaxed"
            >
              {ctaContent.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/80 transition-colors"
              >
                {ctaContent.cta}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
