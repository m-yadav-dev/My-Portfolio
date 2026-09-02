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

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!project) return <ProjectCardSkeleton />;

  const { id, card_thumbnail, category, title, summary, tech_stack, githubUrl } = project;

  return (
    <motion.article
      whileHover={{
        y: -3,
        boxShadow: "0 0 0 1px hsl(var(--primary)/0.3), 0 8px 24px rgba(0,0,0,0.4)",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden cursor-default
                 transition-all duration-300
                 group-hover:border-cyan-500/30
                 group-hover:shadow-[inset_0_0_20px_rgba(6,182,212,0.15)]"
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
            className="absolute inset-0 w-full h-full object-cover transform-gpu
                       transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="skeleton absolute inset-0 w-full h-full" aria-hidden="true" />
        )}

        {/* Category badge — no overlay gradient, keep image clear */}
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

        {/* Tech badges — first 4 by default, toggleable */}
        <div
          className="flex flex-wrap gap-1.5 cursor-pointer select-none"
          role="list"
          aria-label="Tech stack"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((v) => !v)}
        >
          {(isExpanded ? tech_stack : tech_stack.slice(0, 3)).map((tech) => (
            <span
              key={tech}
              role="listitem"
              className="px-2 py-0.5 rounded text-[10px] font-mono
                         bg-white/5 border border-white/10 text-gray-400"
            >
              {tech}
            </span>
          ))}
          {/* +N toggle badge — only shown when collapsed and there are hidden items */}
          {!isExpanded && tech_stack.length > 3 && (
            <span
              className="px-2 py-0.5 rounded text-[10px] font-mono border border-white/10
                         text-gray-500 hover:text-gray-300 transition-colors duration-150 cursor-pointer"
              aria-label={`Show ${tech_stack.length - 3} more technologies`}
            >
              +{tech_stack.length - 3}
            </span>
          )}
        </div>

        {/* CTA row — Case Study link + GitHub icon */}
        <div className="mt-1 flex items-center gap-3">
          <Link
            id={`project-card-cta-${id}`}
            to={`/projects/${id}`}
            className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:gap-2.5 transition-all 
            duration-200 border border-primary/40 hover:border-primary p-2  rounded-[6px]"
            aria-label={`View case study for ${title}`}
          >
            View Case Study <ArrowRight size={13} aria-hidden="true" />
          </Link>

          {githubUrl && (
            <a
              id={`project-card-github-${id}`}
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${title}`}
              className="ml-auto text-muted-foreground text-xs border text-primary flex items-center gap-3 border-primary/40 hover:border-primary p-2 rounded-[6px] transition-colors duration-200"
            >
              Github
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
        </div>
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
