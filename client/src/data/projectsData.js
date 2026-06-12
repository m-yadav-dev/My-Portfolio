/**
 * @file data/projectsData.js
 * @description Static project catalog — single source of truth on the frontend.
 *
 * ARCHITECTURAL NOTE:
 *   Migrated from server/src/data/projectsData.js (Phase 7 refactor).
 *   The Express backend now handles ONLY dynamic services (RAG chat, contact email).
 *   Static project data ships with the frontend bundle — zero network latency,
 *   zero API dependency for the projects section.
 *
 * Categories MUST match spec exactly:
 *   "MERN Stack" | "n8n Automations" | "NxtWave Frontend"
 *
 * Replace Cloudinary placeholder URLs with real delivery URLs once assets are uploaded.
 */

const projectsData = [
  // ---------------------------------------------------------------------------
  // 1. MERN Stack — Chatrivo Ecosystem
  // ---------------------------------------------------------------------------
  {
    id:            "chatrivo-ecosystem",
    card_thumbnail: "https://res.cloudinary.com/dyjo8b263/image/upload/v1780918470/2925ee2e-7059-4043-887c-c31b22437b86.png",
    category:      "MERN Stack",
    title:         "Chatrivo Ecosystem",
    summary:
      "A production-grade real-time messaging platform built on a robust MERN backbone with Socket.io and n8n automation.",
    tech_stack: ["React", "Socket.io", "Node.js", "MongoDB", "Zustand", "n8n", "Express"],
    deep_dive: {
      problem:
        "Teams needed a self-hosted, real-time chat system that integrated with existing n8n automation workflows — without paying enterprise SaaS pricing.",
      solution:
        "Built a full-stack MERN chat application using Socket.io for WebSocket rooms, Zustand for client-side state, and n8n webhooks to trigger automated responses and notifications.",
      impact:
        "Delivered a production-ready messaging platform with < 50ms latency, automated onboarding flows via n8n, and zero recurring SaaS costs.",
      visual_evidence: {
        architecture_diagram: "https://res.cloudinary.com/placeholder/image/upload/v1/chatrivo-architecture",
        demo_gif:             "https://res.cloudinary.com/dyjo8b263/image/upload/v1780918384/Animation_wunt61.gif",
      },
    },
    github_url: "https://github.com/m-yadav-dev/chatrivo",
    live_url:   null,
  },

  // ---------------------------------------------------------------------------
  // 2. n8n Automations — AI Gmail Management Agent
  // ---------------------------------------------------------------------------
  {
    id:            "gmail-management-agent",
    card_thumbnail: "https://res.cloudinary.com/dyjo8b263/image/upload/v1780413252/6a277728-fbd8-45c0-8a95-53f7da1f6d3d.png",
    category:      "n8n Automations",
    title:         "AI Powered Gmail Management Agent",
    summary:
      "Automated email classification and intelligent workflow routing using Google Gemini and n8n — zero manual inbox management.",
    tech_stack: ["n8n", "Google Gemini API", "Webhooks", "JavaScript", "Gmail API"],
    deep_dive: {
      problem:
        "A high-volume inbox was consuming 2+ hours daily on manual triage, labelling, and routing emails to the correct team members.",
      solution:
        "Designed an n8n workflow that intercepts incoming Gmail via webhook, passes each email to Gemini for intent classification, then routes, labels, and drafts contextual replies automatically.",
      impact:
        "Reduced manual email processing time by 85%, automated responses for 70% of recurring query types, and created an audit trail of all AI routing decisions.",
      visual_evidence: {
        architecture_diagram: "https://res.cloudinary.com/dyjo8b263/image/upload/v1780413252/6a277728-fbd8-45c0-8a95-53f7da1f6d3d.png",
        demo_gif:             "https://res.cloudinary.com/dyjo8b263/image/upload/v1780917291/Animation_ftlfn8.gif",
      },
    },
    github_url: null,
    live_url:   null,
  },

  // ---------------------------------------------------------------------------
  // 3. NxtWave Frontend — Jobby App
  // ---------------------------------------------------------------------------
  {
    id:            "jobby-app",
    card_thumbnail: "https://res.cloudinary.com/placeholder/image/upload/v1/jobby-app-thumbnail",
    category:      "NxtWave Frontend",
    title:         "Jobby App",
    summary:
      "A comprehensive job search platform demonstrating complex UI state management, protected routing, and REST API integration.",
    tech_stack: ["ReactJS", "Tailwind CSS", "REST APIs", "React Router", "JWT Auth"],
    deep_dive: {
      problem:
        "Needed a real-world React project demonstrating authentication flows, protected routes, complex filter state, and paginated API consumption.",
      solution:
        "Built a full job search UI with JWT-based authentication, role-based route protection, multi-parameter search filters (employment type, salary range), and infinite-scroll job listings.",
      impact:
        "Demonstrated mastery of React fundamentals: controlled components, useContext for auth state, dynamic routing with useParams, and clean REST API integration patterns.",
      visual_evidence: {
        architecture_diagram: "https://res.cloudinary.com/placeholder/image/upload/v1/jobby-architecture",
        demo_gif:             "https://res.cloudinary.com/placeholder/image/upload/v1/jobby-demo",
      },
    },
    github_url: "https://github.com/m-yadav-dev/jobby-app",
    live_url:   null,
  },

  // ---------------------------------------------------------------------------
  // 4. n8n Automations — AI Code Reviewer Agent
  // ---------------------------------------------------------------------------
  {
    id:            "ai-code-reviewer-agent",
    card_thumbnail: "https://res.cloudinary.com/dyjo8b263/image/upload/v1780913575/copy_of_16dca389-1008-4c3d-ab3e-0dcf5cbe2103.png",
    category:      "n8n Automations",
    title:         "AI Code Reviewer Agent",
    summary:
      "An n8n workflow that uses Google Gemini to automatically review code snippets sent via email, providing feedback and suggestions directly in the inbox.",
    tech_stack: ["n8n", "Google Gemini API", "Webhooks", "JavaScript", "Gmail API"],
    deep_dive: {
      problem:
        "Developers often receive code snippets via email that require review, but manual feedback can be time-consuming and inconsistent.",
      solution:
        "Created an n8n workflow that triggers on incoming emails with code attachments, sends the code to Gemini for analysis, and replies with structured feedback and improvement suggestions.",
      impact:
        "Streamlined the code review process, providing instant feedback on common issues like syntax errors, security vulnerabilities, and best practice violations.",
      visual_evidence: {
        architecture_diagram: "https://res.cloudinary.com/dyjo8b263/image/upload/v1780913575/copy_of_16dca389-1008-4c3d-ab3e-0dcf5cbe2103.png",
        demo_gif:             "https://res.cloudinary.com/dyjo8b263/image/upload/v1780914193/Animation_luutys.gif",
      },
    },
    github_url: null,
    live_url:   null,
  },
];

export default projectsData;
