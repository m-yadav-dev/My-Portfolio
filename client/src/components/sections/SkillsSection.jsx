

import { techStack } from "../../data/techStackData.jsx";
import CategoryCard from "../skills/CategoryCard.jsx";

const SkillsSection = () => {
  const categories = Object.keys(techStack);

  return (
    <section
      id="skills"
      className="py-20 sm:py-24"
      aria-labelledby="skills-heading"
    >
      {/* Section header */}
      <div className="mb-12 sm:mb-16">
        <p className="font-mono text-cyan-400 text-xs uppercase tracking-[0.2em] mb-3">
          Capabilities
        </p>
        <h2
          id="skills-heading"
          className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
        >
          Tech Stack & Expertise
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-lg leading-relaxed">
          Production tools I use to ship full-stack applications and intelligent automation workflows.
        </p>
      </div>

      {/* Category cards grid — 1 col mobile, 2 col md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {categories.map((key, index) => (
          <CategoryCard
            key={key}
            categoryKey={key}
            skills={techStack[key]}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}


export default SkillsSection