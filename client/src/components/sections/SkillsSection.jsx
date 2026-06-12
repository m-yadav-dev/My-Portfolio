/**
 * @file components/sections/SkillsSection.jsx
 * @description Tech arsenal section — image-based icon grid.
 *
 * DATA FLOW (Phase 6 refactor):
 *   techStack (data/techStackData.js) → 4 category columns → TechBadge grid
 *
 * This file owns: section header, category label row, stagger animation.
 * Icon rendering is entirely delegated to <TechBadge>.
 * Zero hardcoded skill strings — all content comes from techStackData.js.
 */

import { motion } from "framer-motion";
import { techStack, categoryLabels } from "@/data/techStackData";
import TechBadge from "@/components/skills/TechBadge";

const fadeUp = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
};

// Map the techStack object into an ordered array for rendering
const CATEGORIES = Object.entries(techStack).map(([key, tools]) => ({
  key,
  label: categoryLabels[key],
  tools,
}));

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-24 px-6 border-t border-border bg-[#0B0C10]"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          variants={stagger} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <motion.p variants={fadeUp} className="text-xs font-mono text-primary tracking-widest mb-3">
            02 / TECH ARSENAL
          </motion.p>
          <motion.h2 variants={fadeUp} id="skills-heading" className="text-2xl md:text-3xl font-bold">
            The stack behind{" "}
            <span className="text-muted-foreground font-normal">the builds</span>
          </motion.h2>
        </motion.div>

        {/* Category columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
          {CATEGORIES.map(({ key, label, tools }) => (
            <motion.div
              key={key}
              id={`cat-${key}`}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="space-y-4"
            >
              {/* Category label */}
              <motion.p
                variants={fadeUp}
                className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase border-b border-border pb-2"
              >
                {label}
              </motion.p>

              {/* Icon grid — responsive wrap */}
              <motion.div
                variants={stagger}
                className="grid grid-cols-3 gap-2.5"
              >
                {tools.map(({ name, url }) => (
                  <motion.div key={name} variants={fadeUp}>
                    <TechBadge name={name} url={url} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
