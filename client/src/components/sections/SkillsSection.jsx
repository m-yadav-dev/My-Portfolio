/**
 * @file components/sections/SkillsSection.jsx
 * @description Tech arsenal — honeycomb category islands.
 *
 * DATA FLOW:
 *   techStackData.js → CATEGORIES array → HoneycombGrid island per category
 *
 * LAYOUT:
 *   Desktop (xl): 4 island columns side by side, items-start so islands
 *                 don't stretch to fill uneven heights
 *   Tablet  (md): 2 × 2 grid
 *   Mobile       : single column stack (HoneycombGrid falls back to flex-wrap)
 */

import { motion } from "framer-motion";
import { techStack, categoryLabels } from "@/data/techStackData";
import HoneycombGrid from "@/components/skills/HoneycombGrid";

const fadeUp = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

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
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-mono text-primary tracking-widest mb-3">
            02 / TECH ARSENAL
          </motion.p>
          <motion.h2 variants={fadeUp} id="skills-heading" className="text-2xl md:text-3xl font-bold">
            The stack behind{" "}
            <span className="text-muted-foreground font-normal">the builds</span>
          </motion.h2>
        </motion.div>

        {/* Category islands — 1 col → 2 col (md) → 4 col (xl), items-start prevents stretch */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-14 items-start">
          {CATEGORIES.map(({ key, label, tools }) => (
            <motion.div
              key={key}
              id={`cat-${key}`}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="space-y-5"
            >
              {/* Category label */}
              <motion.p
                variants={fadeUp}
                className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase border-b border-border pb-2"
              >
                {label}
              </motion.p>

              {/* Honeycomb island — hex tiles tessellated per-category */}
              <motion.div variants={fadeUp}>
                <HoneycombGrid tools={tools} />
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
