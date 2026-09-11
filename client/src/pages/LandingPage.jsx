/**
 * @file pages/LandingPage.jsx
 * @description Single-page landing. Composes all homepage sections.
 */

import { HeroSection } from "@/features/home";
import SkillsSection from "@/features/skills/components/SkillsSection";
import { ProjectsSection } from "@/features/projects";
import ContactSection from "@/features/contact/components/ContactSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}