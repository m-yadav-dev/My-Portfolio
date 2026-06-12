/**
 * @file components/project/ProjectCard.jsx
 * @description Visual card for a single project — used inside ProjectSlider.
 *
 * PERFORMANCE (Phase 7):
 *   - All <img> tags use loading="lazy" decoding="async" — defers off-screen
 *     GIF/PNG decode to a background thread, preventing layout jank.
 *   - transform-gpu on the thumbnail ensures scale() animations stay on the
 *     GPU compositor, not the main thread.
 *
 * SPEC RULES:
 *   - card_thumbnail: 16:9 aspect-ratio container (CLS prevention)
 *   - tech_stack badges: spec-driven, never hardcoded
 *   - Hover: 3px lift + primary border glow (whileHover on motion.article)
 *   - "View Case Study" CTA → /projects/:projectId
 *   - Skeleton rendered when project prop is undefined
 *
 * Props:
 *   project  {object}  — single project object from projectsData.js
 */

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  if (!project) return <ProjectCardSkeleton />;

  const { id, card_thumbnail, category, title, summary, tech_stack } = project;

  return (
    <motion.article
      whileHover={{
        y: -3,
        boxShadow: "0 0 0 1px hsl(var(--primary)/0.3), 0 8px 24px rgba(0,0,0,0.4)",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden cursor-default"
      aria-label={`Project: ${title}`}
    >
      {/* Thumbnail — lazy + async decode to offload GIF decode from main thread */}
      <div
        className="relative w-full overflow-hidden bg-secondary shrink-0"
        style={{ aspectRatio: "16 / 9" }}
      >
        {card_thumbnail ? (
          <img
            src={card_thumbnail}
            alt={`${title} screenshot`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transform-gpu group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="skeleton absolute inset-0 w-full h-full" aria-hidden="true" />
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono bg-obsidian/85 border border-border/60 text-muted-foreground backdrop-blur-sm">
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

        {/* Tech badges — spec-driven */}
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
            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-muted-foreground/50">
              +{tech_stack.length - 4}
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
// Skeleton — shown while parent loads (Phase 7: kept for reuse on ProjectDetail)
// ---------------------------------------------------------------------------
function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden" aria-hidden="true">
      <div className="skeleton w-full shrink-0" style={{ aspectRatio: "16/9" }} />
      <div className="p-5 space-y-3 flex-1">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
        <div className="flex gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-5 w-14 rounded" />
          ))}
        </div>
        <div className="skeleton h-4 w-24 rounded" />
      </div>
    </div>
  );
}
