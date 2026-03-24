"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { siteConfig, footerContent } from "@/data/content";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const updateHeight = () => {
      document.documentElement.style.setProperty(
        "--footer-height",
        `${el.offsetHeight}px`
      );
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <footer ref={footerRef} className="fixed bottom-0 left-0 right-0 z-0 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand + Logo + Description */}
          <div className="flex flex-col gap-5">
            <Image
              src="/images/nexoil-logo.png"
              alt="Nexoil Logo"
              width={80}
              height={80}
              className="object-contain"
            />
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              {footerContent.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <span className="text-base font-bold text-white">
              Quick Links
            </span>
            <div className="w-8 h-0.5 bg-[#ffffff]" />
            <ul className="flex flex-col gap-3 mt-1">
              {footerContent.quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <span className="text-base font-bold text-white">
              Contact
            </span>
            <div className="w-8 h-0.5 bg-[#ffffff]" />
            <div className="flex flex-col gap-4 mt-1">
              {/* Address */}
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-[#ffffff] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-white/50 text-sm leading-relaxed">
                  {siteConfig.address}
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-[#ffffff] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="flex flex-col gap-0.5">
                  <a href={`tel:${siteConfig.phone}`} className="text-white/50 text-sm hover:text-white transition-colors">
                    {siteConfig.phone}
                  </a>
                  <a href={`tel:${siteConfig.phone2}`} className="text-white/50 text-sm hover:text-white transition-colors">
                    {siteConfig.phone2}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-[#ffffff] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${siteConfig.email}`} className="text-white/50 text-sm hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/[0.06] mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
