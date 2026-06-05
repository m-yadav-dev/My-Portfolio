/**
 * @file components/sections/ProjectsSection.jsx
 * @description Featured case studies section — spec-driven, API-powered.
 *
 * DATA FLOW:
 *   1. useEffect → Axios GET /api/projects
 *   2. Response: { success, data: Project[], error }
 *   3. Local state: projects[], isLoading, activeCategory, error
 *   4. CategoryFilter derives tabs from unique categories in the data
 *   5. Filtered projects → responsive ProjectCard grid
 *
 * SPEC RULES:
 *   - Zero hardcoded project data in this component
 *   - Category filter uses exact strings from API: "MERN Stack" | "n8n Automations" | "NxtWave Frontend"
 *   - Cloudinary thumbnails: loading="lazy" enforced inside ProjectCard
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import CategoryFilter from "@/components/project/CategoryFilter";
import ProjectCard from "@/components/project/ProjectCard";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const SKELETON_COUNT = 3;

export default function ProjectsSection() {
  const [projects, setProjects]             = useState([]);
  const [isLoading, setIsLoading]           = useState(true);
  const [error, setError]                   = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // ---------------------------------------------------------------------------
  // Fetch spec-driven project data from backend
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;

    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.get("/projects");
        if (!cancelled) setProjects(res.data.data ?? []);
      } catch (err) {
        if (!cancelled) setError(err.message ?? "Failed to load projects.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchProjects();
    return () => { cancelled = true; }; // cleanup on unmount
  }, []);

  // ---------------------------------------------------------------------------
  // Derive unique categories from API data (spec-ordered)
  // ---------------------------------------------------------------------------
  const categories = [...new Set(projects.map((p) => p.category))];

  // ---------------------------------------------------------------------------
  // Filter projects by active category
  // ---------------------------------------------------------------------------
  const visibleProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="py-24 px-6 border-t border-border"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-12">
          <motion.p variants={fadeUp} className="text-xs font-mono text-primary tracking-widest mb-3">
            03 / CASE STUDIES
          </motion.p>
          <motion.h2 variants={fadeUp} id="projects-heading" className="text-2xl md:text-3xl font-bold mb-3">
            Featured builds —{" "}
            <span className="text-muted-foreground font-normal">proof over promises</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-body text-sm max-w-lg leading-relaxed">
            Each project documented as a case study:{" "}
            <code className="font-mono text-primary text-xs">Problem → Solution → Impact</code>
          </motion.p>
        </motion.div>

        {/* Category filter — only show once data is loaded */}
        {!isLoading && !error && categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        )}

        {/* Error state */}
        {error && (
          <div
            id="projects-error"
            className="rounded-lg border border-destructive/30 bg-destructive/5 p-8 text-center"
            role="alert"
          >
            <p className="text-xs font-mono text-destructive mb-1">FETCH_ERROR</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        )}

        {/* Loading — skeleton grid */}
        {isLoading && (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-label="Loading projects"
            aria-busy="true"
          >
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <motion.div key={i} variants={fadeUp}>
                <ProjectCard project={undefined} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Loaded — project card grid */}
        {!isLoading && !error && (
          <motion.div
            id="projects-grid"
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleProjects.length > 0 ? (
              visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-3 py-16 text-center" id="projects-empty">
                <p className="text-sm text-muted-foreground">
                  No projects found in category:{" "}
                  <span className="text-primary font-mono">{activeCategory}</span>
                </p>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
}
