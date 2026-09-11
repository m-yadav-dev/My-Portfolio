/**
 * @file pages/ProjectDetail.jsx
 * @description Dynamic project deep-dive — /projects/:projectId
 *
 * Looks up the project from static projectsData (instant, no API).
 *
 * LAYOUT:
 *   1. Back link
 *   2. Hero — category · title · summary · GitHub/Live CTA · tech badges
 *   3. Case Framework — 3-col grid: Problem | Solution | Impact
 *   4. <KeyFeaturesSection> — bullet grid
 *   5. <DiagramShowcase>   — full-width labelled images (conditional)
 */

import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { GithubIcon } from "@/components/icons";
import projectsData from "@/features/projects/data/projectsData";
import KeyFeaturesSection from "@/features/projects/components/KeyFeaturesSection";
import DiagramShowcase from "@/features/projects/components/DiagramShowcase";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ---------------------------------------------------------------------------
// Case framework block — Problem / Solution / Impact
// ---------------------------------------------------------------------------
function CaseBlock({ label, content, accent }) {
  if (!content) return null;
  return (
    <div className="space-y-2">
      <p className={`text-[10px] font-mono tracking-widest uppercase ${accent}`}>{label}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ProjectDetail
// ---------------------------------------------------------------------------
export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div
        className="max-w-3xl mx-auto px-6 py-24 text-center"
        role="alert"
        id="project-not-found"
      >
        <p className="font-mono text-primary text-xs mb-4">
          404 / PROJECT_NOT_FOUND
        </p>
        <h1 className="text-2xl font-bold mb-3">Project not found</h1>
        <p className="text-muted-foreground text-sm mb-8">
          No project matched ID:{" "}
          <code className="font-mono text-primary bg-secondary px-1.5 py-0.5 rounded text-xs">
            {projectId}
          </code>
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" /> Back to portfolio
        </Link>
      </div>
    );
  }

  const {
    category,
    title,
    summary,
    tech_stack,
    githubUrl,
    live_url,
    deep_dive,
  } = project;
  const { problem, solution, impact, keyFeatures, mediaAssets } =
    deep_dive ?? {};

  return (
    <article className="max-w-4xl mx-auto px-6 py-12 pb-28" aria-label={title}>
      {/* Back */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <Link
          id="project-back-link"
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground group transition-colors"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform duration-200"
            aria-hidden="true"
          />
          All case studies
        </Link>
      </motion.div>
      
      {/* ── Diagram Showcase ─────────────────────────────── */}
      <motion.div variants={fadeUp}>
        <DiagramShowcase media={mediaAssets} />
      </motion.div>

      <motion.div variants={stagger} initial="hidden" animate="visible">
        {/* ── Hero ─────────────────────────────────────────── */}
        <motion.div variants={fadeUp} className="mb-10">
          <span className="inline-block text-[10px] font-mono text-primary tracking-widest uppercase mb-3">
            {category}
          </span>
          <h1
            id="project-title"
            className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
          >
            {title}
          </h1>
          <p
            id="project-summary"
            className="text-muted-foreground text-base mb-7 max-w-2xl leading-relaxed"
          >
            {summary}
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {githubUrl && (
              <a
                id="project-github"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium
                           transform-gpu transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
              >
                <GithubIcon size={15} aria-hidden="true" /> View on GitHub
              </a>
            )}
            {live_url && (
              <a
                id="project-live"
                href={live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/40 text-primary text-sm font-medium
                           transform-gpu transition-all duration-200 hover:-translate-y-0.5 hover:border-primary"
              >
                <ExternalLink size={15} aria-hidden="true" /> Live Demo
              </a>
            )}
          </div>

          {/* Tech badges */}
          <div
            id="project-tech-stack"
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Technologies used"
          >
            {tech_stack.map((tech) => (
              <span
                key={tech}
                role="listitem"
                className="px-2.5 py-1 rounded text-xs font-mono bg-secondary border border-border text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Case Framework: Problem / Solution / Impact ──── */}
        {(problem || solution || impact) && (
          <motion.div variants={fadeUp} className="border-t border-border pt-10">
            <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-8">Case Study</p>
            <div className="flex flex-col gap-8">
              <CaseBlock label="Problem"  content={problem}  accent="text-red-400/70"     />
              <CaseBlock label="Solution" content={solution} accent="text-blue-400/70"    />
              <CaseBlock label="Impact"   content={impact}   accent="text-emerald-400/70" />
            </div>
          </motion.div>
        )}

        {/* ── Key Features ─────────────────────────────────── */}
        <motion.div variants={fadeUp}>
          <KeyFeaturesSection features={keyFeatures} />
        </motion.div>
      </motion.div>
    </article>
  );
}
