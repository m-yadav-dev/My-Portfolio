/**
 * @file data/techStackData.js
 * @description Categorized tech stack — single source of truth for SkillsSection.
 *
 * Each entry: { name: string, url: string (Cloudinary PNG/SVG/WebP) }
 * Categories: frontend | backend | ai_automation | tooling
 *
 * Replace any Cloudinary placeholder URLs with real delivery URLs as needed.
 */

export const techStack = {
  frontend: [
    { name: "HTML5",         url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781169165/HTML5_bisbjc.png" },
    { name: "ReactJS",       url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781169149/React_w3c7fg.png" },
    { name: "Tailwind CSS",  url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781169164/Tailwind_CSS_sse5tl.png" },
    { name: "Bootstrap",     url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781169207/Bootstrap_agjjgc.png" },
    { name: "ShadCn",        url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781169741/shadcn-ui-seeklogo_of9dn5.png" },
    { name: "Framer Motion", url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781169459/framer-icon-seeklogo_x0ffqy.png" },
  ],
  backend: [
    { name: "Node.js",    url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781169165/Node.js_xrvd11.png" },
    { name: "MongoDB",    url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781169165/MongoDB_its7br.png" },
    { name: "Express.js", url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781169165/Express_wv77u1.png" },
    { name: "REST APIs",  url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781170585/rest-api-blue-logo-22098_1024_xix4cz.png" },
  ],
  ai_automation: [
    { name: "n8n",       url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781169206/n8n_lze6c3.webp" },
    { name: "Webhooks",  url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781169864/icons8-webhook-600_r44xf4.png" },
    { name: "LangChain", url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781171005/Langchain--Streamline-Simple-Icons_1_plcnbm.svg" },
  ],
  tooling: [
    { name: "Git",        url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781169207/Git_dasqqo.png" },
    { name: "GitHub",     url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781169206/GitHub_fkceu3.png" },
    { name: "Docker",     url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781170421/docker_d7ziyu.png" },
    { name: "Cloudinary", url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781170469/cloudinary_hefaip.svg" },
    { name: "Resend",     url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1781170318/resend_2_cv8hno.svg" },
  ],
};

/** Human-readable category labels for rendering */
export const categoryLabels = {
  frontend:      "Frontend",
  backend:       "Backend",
  ai_automation: "AI & Automation",
  tooling:       "Tooling",
};



/* ── Category icons (inline SVGs to avoid extra deps) ── */
export const categoryIcons = {
  frontend: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  backend: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
      <circle cx="6" cy="6" r="1" fill="currentColor" /><circle cx="6" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  ai_automation: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
      <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
      <circle cx="9" cy="6" r="0.5" fill="currentColor" /><circle cx="15" cy="6" r="0.5" fill="currentColor" />
    </svg>
  ),
  tooling: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};
