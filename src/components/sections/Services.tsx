"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { servicesContent } from "@/data/content";

function ServiceCard({
  service,
  index,
}: {
  service: (typeof servicesContent.services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col border-b-2 border-[#2ABFAB] pb-6"
    >
      {/* Image with parallax */}
      <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-6 group">
        <motion.div
          style={{ y: imgY }}
          className="absolute inset-[-10%] w-[120%] h-[120%]"
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
      </div>

      {/* Text */}
      <h3 className="text-xl font-bold text-black mb-3 leading-tight">
        {service.title}
      </h3>
      <p className="text-black/50 text-sm leading-relaxed mb-6 flex-1">
        {service.description}
      </p>

      {/* CTA button */}
      <a
        href="#contact"
        className="inline-flex items-center justify-center px-5 py-2.5 rounded bg-[#2ABFAB] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#24a999] transition-colors w-fit"
      >
        View Detail
      </a>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section id="services" ref={sectionRef} className="bg-white overflow-hidden">
      {/* Section header */}
      <motion.div style={{ y: headerY }} className="max-w-[1400px] mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-10 md:pb-14">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[13px] font-medium uppercase tracking-widest text-black/40 mb-4"
        >
          {servicesContent.sectionLabel}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          viewport={{ once: true }}
          className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-black"
        >
          {servicesContent.heading}
        </motion.h2>
      </motion.div>

      {/* 3-column service cards */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {servicesContent.services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
