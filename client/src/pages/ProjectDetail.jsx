/**
 * @file pages/ProjectDetail.jsx
 * @description Dynamic project deep-dive page — /projects/:projectId
 *
 * Orchestrates three sub-components:
 *   <ProjectDetailSkeleton>  — loading state
 *   <VisualEvidenceSection>  — architecture diagram + demo GIF
 *   <CaseStudyBlock>         — Problem / Solution / Impact narrative
 *
 * Phase 4 will replace `project = null` with a useProject(projectId) hook
 * that fetches GET /api/projects/:projectId.
 *
 * SPEC: All content is spec-driven — zero hardcoded project attributes.
 */

import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { GithubIcon } from "@/components/icons";
import ProjectDetailSkeleton from "@/components/project/ProjectDetailSkeleton";
import VisualEvidenceSection from "@/components/project/VisualEvidenceSection";
import CaseStudyBlock from "@/components/project/CaseStudyBlock";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ProjectDetail() {
  const { projectId } = useParams();

  // Phase 4: replace with → const { project, isLoading, error } = useProject(projectId)
  const isLoading = false;
  const error     = null;
  const project   = null; // null until API is wired

  if (isLoading) return <ProjectDetailSkeleton />;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center" role="alert" id="project-not-found">
        <p className="font-mono text-primary text-xs mb-4">404 / PROJECT_NOT_FOUND</p>
        <h1 className="text-2xl font-bold mb-3">Project not found</h1>
        <p className="text-muted-foreground text-sm mb-8">
          No project matched ID:{" "}
          <code className="font-mono text-primary bg-secondary px-1.5 py-0.5 rounded text-xs">{projectId}</code>
        </p>
        <Link id="not-found-back" to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={15} aria-hidden="true" /> Back to projects
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12" aria-label={project?.title ?? projectId}>

      {/* Back link */}
      <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="mb-10">
        <Link id="project-back-link" to="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground group transition-colors">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-200" aria-hidden="true" />
          All case studies
        </Link>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>

        {/* Category */}
        <motion.p variants={fadeUp} id="project-category" className="text-xs font-mono text-primary tracking-widest mb-3">
          {project?.category ?? "—"}
        </motion.p>

        {/* Title */}
        <motion.h1 variants={fadeUp} id="project-title" className="text-3xl md:text-4xl font-bold mb-4">
          {project?.title ?? projectId}
        </motion.h1>

        {/* Summary */}
        <motion.p variants={fadeUp} id="project-summary" className="text-body text-base mb-8 max-w-2xl leading-relaxed">
          {project?.summary ?? "Full project details load here after Phase 4 API integration."}
        </motion.p>

        {/* Tech stack badges */}
        <motion.div variants={fadeUp} id="project-tech-stack" className="flex flex-wrap gap-2 mb-12" role="list" aria-label="Technologies used">
          {(project?.tech_stack ?? ["MERN", "Node.js", "React", "MongoDB"]).map((tech) => (
            <span key={tech} role="listitem" className="px-2.5 py-1 rounded text-xs font-mono bg-secondary border border-border text-secondary-foreground">
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Visual evidence — Cloudinary assets */}
        <motion.div variants={fadeUp}>
          <VisualEvidenceSection
            architectureDiagram={project?.deep_dive?.visual_evidence?.architecture_diagram}
            demoGif={project?.deep_dive?.visual_evidence?.demo_gif}
          />
        </motion.div>

        {/* Case study breakdown */}
        <motion.div variants={fadeUp} className="mt-12 pt-10 border-t border-border">
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest mb-8 uppercase">Case Study Breakdown</p>
          <CaseStudyBlock label="Problem"  index={1} content={project?.deep_dive?.problem}  />
          <CaseStudyBlock label="Solution" index={2} content={project?.deep_dive?.solution} />
          <CaseStudyBlock label="Impact"   index={3} content={project?.deep_dive?.impact}   />
        </motion.div>

        {/* External links */}
        <motion.div variants={fadeUp} className="mt-10 pt-8 border-t border-border flex gap-4 flex-wrap">
          {project?.github_url && (
            <a id="project-github" href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200">
              <GithubIcon size={15} /> View Code
            </a>
          )}
          {project?.live_url && (
            <a id="project-live" href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded bg-primary text-obsidian text-sm font-medium hover:bg-primary/85 transition-colors duration-200">
              <ExternalLink size={15} aria-hidden="true" /> Live Demo
            </a>
          )}
        </motion.div>
      </motion.div>
    </article>
  );
}
