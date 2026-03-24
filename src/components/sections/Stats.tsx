"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { statsContent } from "@/data/content";

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    if (!inView) return;

    if (value === "24/7") {
      const controls = animate(0, 24, {
        duration: 1.5,
        ease: [0.25, 1, 0.5, 1],
        onUpdate(v) { setDisplayed(Math.round(v) + "/7"); },
      });
      return () => controls.stop();
    }

    if (value === "10K+") {
      const controls = animate(0, 10, {
        duration: 2,
        ease: [0.25, 1, 0.5, 1],
        onUpdate(v) { setDisplayed(Math.round(v * 10) / 10 + "K+"); },
      });
      return () => controls.stop();
    }

    const match = value.match(/^([\d.]+)(.*)/);
    if (!match) return;

    const end = parseFloat(match[1]);
    const suffix = match[2];

    const controls = animate(0, end, {
      duration: 2,
      ease: [0.25, 1, 0.5, 1],
      onUpdate(v) {
        setDisplayed(Math.round(v) + suffix);
      },
    });

    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{displayed}</span>;
}

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
        <span className="text-sm font-medium text-[#ffffff]">{value}%</span>
      </div>
      <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden relative">
        <motion.div
          style={{ width }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ffffff] to-[#cccccc] rounded-full"
        />
      </div>
    </motion.div>
  );
}

const CURSOR_SIZE = 120;

function XrayCursor({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const [visible, setVisible] = useState(false);

  const x = useSpring(mouseX, { stiffness: 500, damping: 40, mass: 0.3 });
  const y = useSpring(mouseY, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let clientX = -999;
    let clientY = -999;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      mouseX.set(px);
      mouseY.set(py);

      // Check if cursor is inside section bounds
      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;
      setVisible(inside && clientX > 0);
    };

    // Track mouse globally at all times
    const onMove = (e: MouseEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
      update();
    };

    const onScroll = () => update();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionRef, mouseX, mouseY]);

  const clipPath = useTransform(
    [x, y],
    ([cx, cy]: number[]) => `circle(${CURSOR_SIZE / 2}px at ${cx}px ${cy}px)`
  );

  return (
    <motion.div
      className="absolute inset-0 z-30 pointer-events-none"
      style={{
        clipPath,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s",
        backgroundColor: "white",
      }}
    >
      {/* Inverted content clone */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-16">
        <p className="text-[13px] font-medium uppercase tracking-widest text-black/60 mb-6">
          {statsContent.sectionLabel}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24">
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.1] tracking-tight text-black whitespace-pre-line">
            {statsContent.heading}
          </h2>
          <p className="text-black/50 text-base md:text-lg leading-relaxed pt-2">
            {statsContent.description}
          </p>
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-b border-black/[0.08] py-12">
          {statsContent.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-black">
                {stat.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-black/40">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {statsContent.capabilities.map((cap) => (
            <div key={cap.title} className="rounded-xl border border-black/[0.08] bg-black/[0.03] p-6">
              <div className="w-8 h-8 rounded-lg bg-black/10 flex items-center justify-center mb-4">
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>
              <h3 className="text-sm font-semibold text-black mb-2">{cap.title}</h3>
              <p className="text-black/50 text-xs leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-12 pb-28 md:pb-36">
        <h3 className="text-lg font-semibold text-black mb-8">Our Track Record</h3>
        <div className="flex flex-col gap-6">
          {barData.map((bar) => (
            <div key={bar.label} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-black/60">{bar.label}</span>
                <span className="text-sm font-medium text-black">{bar.value}%</span>
              </div>
              <div className="h-2 bg-black/[0.08] rounded-full overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 bg-black rounded-full" style={{ width: `${bar.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="bg-[#0f1115] text-white relative overflow-hidden cursor-none">
      {/* X-ray cursor */}
      <XrayCursor sectionRef={sectionRef} />

      {/* Subtle gradient accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ffffff]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[13px] font-medium uppercase tracking-widest text-[#ffffff] mb-6"
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

      {/* Stats grid */}
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
              <span className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-[#ffffff]">
                {i < 3 ? <CountUp value={stat.value} /> : stat.value}
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
              <div className="w-8 h-8 rounded-lg bg-[#ffffff]/10 flex items-center justify-center mb-4">
                <div className="w-2 h-2 rounded-full bg-[#ffffff]" />
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
