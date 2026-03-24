"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { navLinks } from "@/data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [heroMenuOpen, setHeroMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on scroll
  useEffect(() => {
    if (scrolled) setHeroMenuOpen(false);
    if (!scrolled) setMobileOpen(false);
  }, [scrolled]);

  const handleNavClick = () => {
    setMobileOpen(false);
    setHeroMenuOpen(false);
  };

  return (
    <>
      {/* ===== HERO NAVBAR — transparent, full width ===== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? "opacity-0 pointer-events-none -translate-y-4" : "opacity-100"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 h-16">
          <a href="#home" className="flex items-center">
            <Image
              src="/images/nexoil-logo.png"
              alt="Nexoil"
              width={100}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium tracking-wide uppercase text-black/50 transition-colors duration-300 hover:text-black"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-[13px] font-semibold bg-black/80 text-white hover:bg-black transition-all duration-300"
          >
            Get in Touch
          </a>

          {/* Mobile hamburger for hero */}
          <button
            className="md:hidden p-2 text-black/60"
            aria-label="Toggle menu"
            onClick={() => setHeroMenuOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {heroMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Hero mobile dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            heroMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="px-3 py-3 text-[14px] font-medium text-black/60 rounded-lg transition-colors hover:text-black hover:bg-black/[0.04]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleNavClick}
              className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-full text-[13px] font-semibold bg-black/80 text-white hover:bg-black transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </nav>

      {/* ===== FLOATING PILL NAVBAR — appears after scrolling past hero ===== */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${
          scrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-6 pointer-events-none"
        }`}
      >
        <div
          className="backdrop-blur-xl border border-white/30
            bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.70)_100%)]
            shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)]
            md:rounded-full"
          style={{
            borderRadius: mobileOpen ? "16px" : "9999px",
            transition: "border-radius 0.15s ease",
          }}
        >
          {/* Top bar row */}
          <div className="flex items-center gap-1 px-2 py-1.5">
            {/* Logo */}
            <a href="#home" className="flex items-center px-2" onClick={handleNavClick}>
              <Image
                src="/images/nexoil-logo.png"
                alt="Nexoil"
                width={60}
                height={24}
                className="h-6 w-auto object-contain"
              />
            </a>

            <div className="w-px h-5 bg-black/10 mx-1 hidden md:block" />

            {/* Nav links — desktop only */}
            <div className="hidden md:flex items-center">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-black/60 rounded-full transition-all duration-300 hover:text-black hover:bg-black/[0.04]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="w-px h-5 bg-black/10 mx-1 hidden md:block" />

            {/* CTA — desktop only */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center px-4 py-1.5 rounded-full text-[12px] font-semibold bg-[#0f1115] text-white hover:bg-black transition-colors duration-300"
            >
              Get in Touch
            </a>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-1.5 ml-auto text-black/60 rounded-full hover:bg-black/[0.04]"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile dropdown — grid row transition for smooth expand */}
          <div
            className="md:hidden grid transition-[grid-template-rows] duration-200 ease-out"
            style={{
              gridTemplateRows: mobileOpen ? "1fr" : "0fr",
            }}
          >
            <div className="overflow-hidden">
              <div className="border-t border-black/[0.06] mx-3 pt-3 pb-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="px-3 py-2.5 text-[13px] font-medium text-black/60 rounded-lg transition-colors duration-200 hover:text-black hover:bg-black/[0.04]"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={handleNavClick}
                  className="mt-1 mx-3 inline-flex items-center justify-center px-4 py-2.5 rounded-full text-[12px] font-semibold bg-[#0f1115] text-white hover:bg-black transition-colors duration-300"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
