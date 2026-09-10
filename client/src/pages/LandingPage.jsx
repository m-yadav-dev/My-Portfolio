/**
 * @file pages/LandingPage.jsx
 * @description Single-page landing. Composes all homepage sections.
 */

import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
    </>
  );
}