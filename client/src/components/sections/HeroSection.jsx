/**
 * @file components/sections/HeroSection.jsx
 * @description Hero — the first 10-second recruiter impression.
 *
 * SPEC: "Hook" — communicates MERN + AI expertise instantly through
 * clear headline, value proposition, and two CTAs (Projects / Contact).
 * Subtle grid + radial glow convey technical depth without over-design.
 */

import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

export default function HeroSection() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-6"
      aria-label="Hero introduction"
    >
      {/* Dot-grid background — documentation aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Accent glow */}
      <div
        className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(41,216,224,0.05) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Availability pill */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-6">
          <span id="hero-availability" className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/5 text-primary text-xs font-mono tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            Open to freelance &amp; full-time roles
          </span>
        </motion.div>

        {/* H1 — single per spec SEO rule */}
        <motion.h1
          custom={0.08}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          id="hero-heading"
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
        >
          MERN Stack Developer
          <br />
          <span className="text-primary">&amp; AI Integrations</span>
        </motion.h1>

        {/* Value proposition */}
        <motion.p custom={0.16} variants={fadeUp} initial="hidden" animate="visible" id="hero-subheadline" className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Production-grade full-stack products — React, Express, MongoDB, Node.js —
          augmented with intelligent AI agents (n8n, Google Gemini) that ship measurable business outcomes.
        </motion.p>

        {/* CTAs */}
        <motion.div custom={0.24} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-cta-projects"
            type="button"
            onClick={() => scrollTo("projects")}
            className="w-full sm:w-auto px-7 py-3 rounded bg-primary text-obsidian text-sm font-semibold hover:bg-primary/85 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            View Case Studies <ArrowDown size={15} aria-hidden="true" />
          </button>
          <button
            id="hero-cta-contact"
            type="button"
            onClick={() => scrollTo("contact")}
            className="w-full sm:w-auto px-7 py-3 rounded border border-border text-foreground/75 text-sm font-medium hover:border-primary/35 hover:text-foreground transition-all duration-200"
          >
            Book a Discovery Call
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
          <span className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">scroll</span>
          <div className="w-px h-7 bg-gradient-to-b from-border to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
