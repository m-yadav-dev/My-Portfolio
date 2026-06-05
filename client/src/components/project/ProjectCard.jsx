/**
 * @file components/project/ProjectCard.jsx
 * @description Visual card representing a single project in the grid.
 *
 * SPEC RULES:
 *  - `card_thumbnail` uses loading="lazy" + fixed aspect-ratio container (CLS prevention)
 *  - `tech_stack` array is mapped to badge pills — never hardcoded
 *  - "View Case Study" CTA navigates to /projects/:projectId
 *  - Skeleton state displayed when `project` prop is undefined (loading)
 *
 * Props:
 *   project  {object}  — single project object from /api/projects
 */

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ProjectCard({ project }) {
  if (!project) return <ProjectCardSkeleton />;

  const { id, card_thumbnail, category, title, summary, tech_stack } = project;

  return (
    <motion.article
      variants={cardVariant}
      className="group flex flex-col rounded-lg border border-border bg-card hover:border-primary/25 transition-colors duration-300 overflow-hidden"
      aria-label={`Project: ${title}`}
    >
      {/* Thumbnail — Cloudinary, lazy-loaded, CLS-safe aspect ratio */}
      <div
        className="relative w-full overflow-hidden bg-secondary"
        style={{ aspectRatio: "16 / 9" }}
      >
        {card_thumbnail ? (
          <img
            src={card_thumbnail}
            alt={`${title} screenshot`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          /* Skeleton fallback while Cloudinary URL resolves */
          <div className="skeleton absolute inset-0 w-full h-full" aria-hidden="true" />
        )}

        {/* Category badge overlay */}
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono bg-obsidian/80 border border-border text-muted-foreground backdrop-blur-sm">
          {category}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-3">
          {summary}
        </p>

        {/* Tech stack — spec-driven array, never hardcoded */}
        <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tech stack">
          {tech_stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              role="listitem"
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary border border-border text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {tech_stack.length > 4 && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-muted-foreground/60">
              +{tech_stack.length - 4} more
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          id={`project-card-cta-${id}`}
          to={`/projects/${id}`}
          className="mt-1 inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:gap-2.5 transition-all duration-200"
          aria-label={`View case study for ${title}`}
        >
          View Case Study <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Inline skeleton — shown during loading state inside the grid
// ---------------------------------------------------------------------------
function ProjectCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden" aria-hidden="true">
      <div className="skeleton w-full" style={{ aspectRatio: "16/9" }} />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
        <div className="flex gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-5 w-14 rounded" />)}
        </div>
        <div className="skeleton h-4 w-24 rounded" />
      </div>
    </div>
  );
}
