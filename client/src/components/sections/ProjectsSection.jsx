/**
 * @file components/sections/ProjectsSection.jsx
 * @description Featured case studies — static data, instant render, zero API.
 *
 * DATA FLOW (Phase 7 — after architectural refactor):
 *   projectsData (client/src/data/projectsData.js) → category filter → ProjectSlider
 *   No Axios, no useEffect, no isLoading — data ships with the bundle.
 *
 * This file owns: category state, section header, filter pills, empty state.
 * Slider layout + animation is entirely isolated in ProjectSlider.jsx.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData    from "@/data/projectsData";
import CategoryFilter  from "@/components/project/CategoryFilter";
import ProjectSlider   from "@/components/project/ProjectSlider";

const fadeUp = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Derive unique categories (order determined by first appearance in data)
  const categories = [...new Set(projectsData.map((p) => p.category))];

  // Filter — "All" shows everything, otherwise exact category match
  const visibleProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="py-24 px-6 border-t border-border"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          variants={stagger} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <motion.p variants={fadeUp} className="text-xs font-mono text-primary tracking-widest mb-3">
            03 / CASE STUDIES
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id="projects-heading"
            className="text-2xl md:text-3xl font-bold mb-3"
          >
            Featured builds —{" "}
            <span className="text-muted-foreground font-normal">proof over promises</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-body text-sm max-w-lg leading-relaxed">
            Each project documented as a case study:{" "}
            <code className="font-mono text-primary text-xs">Problem → Solution → Impact</code>
          </motion.p>
        </motion.div>

        {/* Category filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        {/* Slider — instant render from static data */}
        <AnimatePresence mode="wait">
          {visibleProjects.length > 0 ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <ProjectSlider
                projects={visibleProjects}
                activeCategory={activeCategory}
              />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center"
              id="projects-empty"
            >
              <p className="text-sm text-muted-foreground">
                No projects in{" "}
                <span className="text-primary font-mono">{activeCategory}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
