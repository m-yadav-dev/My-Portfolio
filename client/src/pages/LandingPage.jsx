/**
 * @file pages/LandingPage.jsx
 * @description Single-page orchestrator. Imports and composes all landing sections.
 * Contains ZERO styling or business logic — purely a section sequencer.
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
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
