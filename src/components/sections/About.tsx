"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { aboutContent } from "@/data/content";

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="about" className="bg-white">
      {/* Section header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[13px] font-medium uppercase tracking-widest text-black/40 mb-6"
        >
          {aboutContent.sectionLabel}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            viewport={{ once: true }}
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-black whitespace-pre-line"
          >
            {aboutContent.heading}
          </motion.h2>

          <div className="flex flex-col gap-6 pt-2">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-black/60 text-base md:text-lg leading-relaxed"
            >
              {aboutContent.description}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-black/60 text-base md:text-lg leading-relaxed"
            >
              {aboutContent.descriptionRight}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Two-up images like Oklo's "Modernizing" section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aboutContent.highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden bg-[#f5f5f5] p-8 md:p-10 min-h-[200px] flex flex-col justify-end"
            >
              <span className="text-[13px] font-medium uppercase tracking-widest text-[#000000] mb-2">
                {item.label}
              </span>
              <p className="text-black/60 text-sm md:text-base leading-relaxed max-w-md">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-width image with caption */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div
          ref={imageRef}
          className="relative w-full overflow-hidden rounded-2xl aspect-[16/8]"
        >
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-[-5%] w-[110%] h-[110%]"
          >
            <Image
              src="/images/WhatsApp-Image-2024-09-06-at-15.16.35-5_7e3f4907.jpeg"
              alt="Road tanker fleet"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-10 max-w-3xl mx-auto text-center text-black/50 text-base md:text-lg leading-relaxed"
        >
          {aboutContent.caption}
        </motion.p>
      </div>
    </section>
  );
}
