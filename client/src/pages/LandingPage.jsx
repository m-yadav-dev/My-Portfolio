/**
 * @file pages/LandingPage.jsx
 * @description Single-page orchestrator. Imports and composes all landing sections.
 * Adds a subtle dark gradient scaffold — the only aesthetic concern owned here.
 * Zero business logic or section-specific code.
 *
 * SPEC: All sections map to header anchor IDs:
 *   #hero → #about → #skills → #projects → #contact
 */

import HeroSection     from "@/components/sections/HeroSection";
import AboutSection    from "@/components/sections/AboutSection";
import SkillsSection   from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection  from "@/components/sections/ContactSection";

export default function LandingPage() {
  return (
    /* Subtle vertical gradient — from obsidian (#0A0A0A) to a warmer near-black.
       Prevents the page from feeling flat on large screens without over-designing. */
    <div className="relative bg-gradient-to-b from-background via-background to-neutral-950 min-h-screen">
      {/* Radial noise texture overlay — subtle, non-distracting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </div>
  );
}
