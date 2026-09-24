

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import projectsData from "../data/projectsData";
import ragMockup from "@/assets/rag-chatbot-mockup.jpg";

/* ── Fallback thumbnails for projects missing card_thumbnail ── */
const thumbnailOverrides = {
  "rag-chatbot": ragMockup,
};

function getThumbnail(project) {
  if (project.card_thumbnail) return project.card_thumbnail;
  return thumbnailOverrides[project.id] || null;
}

/* ── Tech pill (tiny, inline) ── */
function TechPill({ label }) {
  return (
    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-gray-400">
      {label}
    </span>
  );
}

/* ── Featured Project Card (full-width, 60/40 split on desktop) ── */
function FeaturedCard({ project }) {
  const thumb = getThumbnail(project);

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block glass-surface rounded-xl border border-slate-800 overflow-hidden transition-colors duration-300 hover:border-cyan-400/20"
      aria-label={`View case study: ${project.title}`}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image — 60% on desktop */}
        <div className="lg:w-[60%] overflow-hidden bg-[#0a0a0e]">
          {thumb ? (
            <img
              src={thumb}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              loading="eager"
            />
          ) : (
            <div className="w-full aspect-video bg-slate-900/50 flex items-center justify-center">
              <span className="text-slate-600 text-sm font-mono">Preview</span>
            </div>
          )}
        </div>

        {/* Text — 40% on desktop */}
        <div className="lg:w-[40%] p-6 sm:p-8 flex flex-col justify-center">
          <p className="font-mono text-cyan-400 text-[11px] uppercase tracking-[0.15em] mb-3">
            {project.category} — Featured
          </p>
          <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight mb-3">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
            {project.summary}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5 mb-6" role="list" aria-label="Tech stack">
            {(project.tech_stack || []).slice(0, 4).map((t) => (
              <TechPill key={t} label={t} />
            ))}
            {(project.tech_stack || []).length > 4 && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500">
                +{(project.tech_stack || []).length - 4}
              </span>
            )}
          </div>

          {/* CTA */}
          <span className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all duration-200">
            View Case Study <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Secondary Project Card (equal-sized grid card) ── */
function SecondaryCard({ project }) {
  const thumb = getThumbnail(project);

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block glass-surface rounded-xl border border-slate-800 overflow-hidden transition-colors duration-300 hover:border-cyan-400/20"
      aria-label={`View case study: ${project.title}`}
    >
      {/* Image */}
      <div className="overflow-hidden bg-[#0a0a0e]">
        {thumb ? (
          <img
            src={thumb}
            alt={`${project.title} preview`}
            className="w-full aspect-video object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-video bg-slate-900/50 flex items-center justify-center">
            <span className="text-slate-600 text-sm font-mono">Preview</span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="p-5 sm:p-6">
        <p className="font-mono text-cyan-400 text-[10px] uppercase tracking-[0.15em] mb-2">
          {project.category}
        </p>
        <h3 className="text-white text-lg font-bold tracking-tight mb-2">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.summary}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-5" role="list" aria-label="Tech stack">
          {(project.tech_stack || []).slice(0, 3).map((t) => (
            <TechPill key={t} label={t} />
          ))}
          {(project.tech_stack || []).length > 3 && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500">
              +{(project.tech_stack || []).length - 3}
            </span>
          )}
        </div>

        {/* CTA */}
        <span className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all duration-200">
          View Case Study <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

/* ── ProjectsSection ── */
export default function ProjectsSection() {
  // First project = featured, rest = secondary grid
  const featured = projectsData.find((p) => p.id === "rag-chatbot") || projectsData[0];
  const secondary = projectsData.filter((p) => p.id !== featured.id);

  return (
    <section
      id="case-studies"
      tabIndex="-1"
      className="py-20 sm:py-24 scroll-mt-16 focus:outline-none"
      aria-labelledby="projects-heading"
    >
      {/* Section header */}
      <div className="mb-12 sm:mb-16">
        <p className="font-mono text-cyan-400 text-xs uppercase tracking-[0.2em] mb-3">
          Portfolio
        </p>
        <h2
          id="projects-heading"
          className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
        >
          Selected Work
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-lg leading-relaxed">
          Production projects demonstrating full-stack architecture and AI integration.
        </p>
      </div>

      {/* Featured project */}
      <div className="mb-5 sm:mb-6 animate-fade-in-up">
        <FeaturedCard project={featured} />
      </div>

      {/* Secondary projects — 2-col grid on md+ */}
      {secondary.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {secondary.map((project, i) => (
            <div
              key={project.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <SecondaryCard project={project} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
