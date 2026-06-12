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
