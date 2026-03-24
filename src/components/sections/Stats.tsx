"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { statsContent } from "@/data/content";

const barData = [
  { label: "Product Consistency Rating", value: 98 },
  { label: "Delivery Punctuality", value: 97 },
  { label: "Regulatory Compliance", value: 100 },
  { label: "Client Renewal Rate", value: 95 },
];

function AnimatedBar({ label, value, index }: { label: string; value: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "start 80%"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0%", `${value}%`]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/60">{label}</span>
        <span className="text-sm font-medium text-[#2ABFAB]">{value}%</span>
      </div>
      <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden relative">
        <motion.div
          style={{ width }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2ABFAB] to-[#34d9c3] rounded-full"
        />
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="bg-[#0f1115] text-white relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2ABFAB]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[13px] font-medium uppercase tracking-widest text-[#2ABFAB] mb-6"
        >
          {statsContent.sectionLabel}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            viewport={{ once: true }}
            className="text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.1] tracking-tight text-white whitespace-pre-line"
          >
            {statsContent.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-white/50 text-base md:text-lg leading-relaxed pt-2"
          >
            {statsContent.description}
          </motion.p>
        </div>
      </div>

      {/* Stats grid — large teal numbers */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-b border-white/[0.06] py-12">
          {statsContent.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-2"
            >
              <span className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-[#2ABFAB]">
                {stat.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-white/30">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Capabilities — card grid */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {statsContent.capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#2ABFAB]/10 flex items-center justify-center mb-4">
                <div className="w-2 h-2 rounded-full bg-[#2ABFAB]" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">{cap.title}</h3>
              <p className="text-white/35 text-xs leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress bars */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-12 pb-28 md:pb-36">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-lg font-semibold text-white mb-8"
        >
          Our Track Record
        </motion.h3>
        <div className="flex flex-col gap-6">
          {barData.map((bar, i) => (
            <AnimatedBar key={bar.label} label={bar.label} value={bar.value} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
