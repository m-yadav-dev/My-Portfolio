/**
 * @file components/sections/SkillsSection.jsx
 * @description Tech arsenal section anchored at #skills.
 * Skills are grouped into four categories and rendered as badge pills.
 * In Phase 4, each pill will be replaced by a <TechBadge> component.
 * No API calls — this data is intrinsic to the developer, not spec-driven JSON.
 */

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const SKILL_CATEGORIES = [
  {
    id: "cat-frontend",
    label: "Frontend",
    skills: ["React.js v18", "Vite", "Tailwind CSS", "Zustand", "Framer Motion", "shadcn/ui"],
  },
  {
    id: "cat-backend",
    label: "Backend",
    skills: ["Node.js v18", "Express.js", "MongoDB", "Mongoose", "REST APIs", "Zod"],
  },
  {
    id: "cat-ai",
    label: "AI & Automation",
    skills: ["n8n", "Google Gemini", "LangChain", "RAG Pipelines", "Vector Search", "Webhooks"],
  },
  {
    id: "cat-tooling",
    label: "Tooling",
    skills: ["Git", "Docker", "Postman", "MongoDB Atlas", "Cloudinary", "Resend"],
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-24 px-6 border-t border-border"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-14">
          <motion.p variants={fadeUp} className="text-xs font-mono text-primary tracking-widest mb-3">
            02 / TECH ARSENAL
          </motion.p>
          <motion.h2 variants={fadeUp} id="skills-heading" className="text-2xl md:text-3xl font-bold">
            The stack behind{" "}
            <span className="text-muted-foreground font-normal">the builds</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {SKILL_CATEGORIES.map(({ id, label, skills }) => (
            <motion.div key={id} id={id} variants={fadeUp} className="space-y-3">
              <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase border-b border-border pb-2">
                {label}
              </p>
              {/* Phase 4: Replace spans with <TechBadge> component */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-secondary text-secondary-foreground border border-border hover:border-primary/30 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
