/**
 * @file data/projectsData.js
 * @description Static project catalog — single source of truth on the frontend.
 *
 * Each project exposes:
 *   id           — URL slug for /projects/:projectId
 *   githubUrl    — direct repo link
 *   deep_dive    — { problem, solution, impact, keyFeatures[], mediaAssets[] }
 *
 * mediaAssets[] — NORMALISED visual evidence array (replaces the former
 *   dual-key schema of diagramShowcase[] + visual_evidence{}).
 *   Schema: { title: string, url: string }
 *   Rule:   title "Result / Demo" FIRST (highest recruiter impact), then "Architecture".
 *
 * Categories MUST match spec: "MERN Stack" | "n8n Automations" | "NxtWave Frontend"
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
    summary:       "A production-grade real-time messaging platform built on a robust MERN backbone with Socket.io and n8n automation.",
    tech_stack:    ["React", "Socket.io", "Node.js", "MongoDB", "Zustand", "n8n", "Express"],
    githubUrl:     "https://github.com/m-yadav-dev/chatrivo-app",
    live_url:      null,
    deep_dive: {
      problem:
        "Teams needed a self-hosted, real-time chat system that integrated with existing n8n automation workflows — without paying enterprise SaaS pricing.",
      solution:
        "Built a full-stack MERN chat application using Socket.io for WebSocket rooms, Zustand for client-side state, and n8n webhooks to trigger automated responses and notifications. The architecture uses event-driven messaging with room-based isolation.",
      impact:
        "Delivered a production-ready messaging platform with < 50ms latency, automated onboarding flows via n8n, zero recurring SaaS costs, and a clean audit trail of all automation events.",
      keyFeatures: [
        "WebSocket rooms with Socket.io for real-time isolation per chat channel",
        "Zustand global state — zero prop-drilling across the messaging UI",
        "n8n webhook triggers for automated onboarding notifications",
        "MongoDB persistence for message history and user sessions",
        "JWT-based authentication with refresh token rotation",
        "Responsive UI with optimistic message rendering < 50ms perceived latency",
      ],
      mediaAssets: [
        {
          title: "Result / Demo",
          url:   "https://res.cloudinary.com/dyjo8b263/image/upload/v1780918384/Animation_wunt61.gif",
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // 2. n8n Automations — AI Gmail Management Agent
  // ---------------------------------------------------------------------------
  {
    id:            "gmail-management-agent",
    card_thumbnail: "https://res.cloudinary.com/dyjo8b263/image/upload/v1780413252/6a277728-fbd8-45c0-8a95-53f7da1f6d3d.png",
    category:      "n8n Automations",
    title:         "AI Powered Gmail Management Agent",
    summary:       "Automated email classification and intelligent workflow routing using Google Gemini and n8n — zero manual inbox management.",
    tech_stack:    ["n8n", "Google Gemini API", "Webhooks", "JavaScript", "Gmail API"],
    githubUrl:     "https://github.com/m-yadav-dev",
    live_url:      null,
    deep_dive: {
      problem:
        "A high-volume inbox was consuming 2+ hours daily on manual triage, labelling, and routing emails to the correct team members.",
      solution:
        "Designed an n8n workflow that intercepts incoming Gmail via webhook, passes each email to Gemini for intent classification, then routes, labels, and drafts contextual replies automatically.",
      impact:
        "Reduced manual email processing time by 85%, automated responses for 70% of recurring query types, and created an audit trail of all AI routing decisions.",
      keyFeatures: [
        "Gmail webhook trigger — real-time interception of all incoming mail",
        "Gemini intent classification with structured JSON output",
        "Auto-labelling and folder routing based on AI category",
        "Contextual reply drafting for 70% of recurring query types",
        "Full audit trail of every AI routing decision stored in Google Sheets",
        "n8n error-handling branches with Slack alert on classification failure",
      ],
      mediaAssets: [
        {
          title: "Result / Demo",
          url:   "https://res.cloudinary.com/dyjo8b263/image/upload/v1780917291/Animation_ftlfn8.gif",
        },
        {
          title: "Architecture",
          url:   "https://res.cloudinary.com/dyjo8b263/image/upload/v1780413252/6a277728-fbd8-45c0-8a95-53f7da1f6d3d.png",
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // 3. NxtWave Frontend — Jobby App
  // ---------------------------------------------------------------------------
  {
    id:            "jobby-app",
    card_thumbnail: "https://res.cloudinary.com/placeholder/image/upload/v1/jobby-app-thumbnail",
    category:      "NxtWave Frontend",
    title:         "Jobby App",
    summary:       "A comprehensive job search platform demonstrating complex UI state management, protected routing, and REST API integration.",
    tech_stack:    ["ReactJS", "Tailwind CSS", "REST APIs", "React Router", "JWT Auth"],
    githubUrl:     "https://github.com/m-yadav-dev/jobby-app",
    live_url:      null,
    deep_dive: {
      problem:
        "Needed a real-world React project demonstrating authentication flows, protected routes, complex filter state, and paginated API consumption.",
      solution:
        "Built a full job search UI with JWT-based authentication, role-based route protection, multi-parameter search filters (employment type, salary range), and infinite-scroll job listings.",
      impact:
        "Demonstrated mastery of React fundamentals: controlled components, useContext for auth state, dynamic routing with useParams, and clean REST API integration patterns.",
      keyFeatures: [
        "JWT authentication with protected route wrappers",
        "Multi-parameter search: employment type, salary range, keyword",
        "Infinite-scroll pagination consuming a REST API",
        "useContext for global auth state — zero Redux overhead",
        "Responsive layout with Tailwind CSS utility-first design",
      ],
      mediaAssets: [], // No media assets — section hidden automatically
    },
  },

  // ---------------------------------------------------------------------------
  // 4. n8n Automations — AI Code Reviewer Agent
  // ---------------------------------------------------------------------------
  {
    id:            "ai-code-reviewer-agent",
    card_thumbnail: "https://res.cloudinary.com/dyjo8b263/image/upload/v1780913575/copy_of_16dca389-1008-4c3d-ab3e-0dcf5cbe2103.png",
    category:      "n8n Automations",
    title:         "AI Code Reviewer Agent",
    summary:       "An n8n workflow that uses Google Gemini to automatically review code snippets sent via email, providing structured feedback directly in the inbox.",
    tech_stack:    ["n8n", "Google Gemini API", "Webhooks", "JavaScript", "Gmail API"],
    githubUrl:     "https://github.com/m-yadav-dev/ai-code-reviewer-agent",
    live_url:      null,
    deep_dive: {
      problem:
        "Developers receive code snippets via email that require review, but manual feedback is time-consuming, inconsistent, and blocks the feedback loop.",
      solution:
        "Created an n8n workflow that triggers on incoming emails with code, sends the snippet to Gemini for structured analysis, and auto-replies with categorised feedback covering syntax, security, and best practices.",
      impact:
        "Streamlined the code review cycle with instant AI-generated feedback, reducing review turnaround from hours to seconds for common issues like syntax errors and security anti-patterns.",
      keyFeatures: [
        "Email trigger — detects code-containing emails via Gmail API",
        "Gemini structured analysis: syntax, security, best-practices categories",
        "Auto-reply with formatted, actionable code review in the original thread",
        "Severity tagging (Critical / Warning / Info) per feedback item",
        "n8n error branch — fallback alert to developer on Gemini timeout",
        "Audit log of all reviews stored for quality tracking",
      ],
      mediaAssets: [
        {
          title: "Result / Demo",
          url:   "https://res.cloudinary.com/dyjo8b263/image/upload/v1780914193/Animation_luutys.gif",
        },
        {
          title: "Architecture",
          url:   "https://res.cloudinary.com/dyjo8b263/image/upload/v1780913575/copy_of_16dca389-1008-4c3d-ab3e-0dcf5cbe2103.png",
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // 5. MERN Stack — Edureach College RAG
  // ---------------------------------------------------------------------------
  {
    id:            "edureach-college-rag",
    card_thumbnail: "https://res.cloudinary.com/dyjo8b263/image/upload/v1780986745/a3068984-c151-4817-97e1-d7810a727d45.png",
    category:      "MERN Stack",
    title:         "Edureach College RAG",
    summary:       "A Retrieval-Augmented Generation system that lets students query a college's entire knowledge base via a conversational AI interface — built on the MERN stack with Google Gemini and MongoDB Atlas Vector Search.",
    tech_stack:    ["React", "Node.js", "Express", "MongoDB", "LangChain", "Google Gemini API", "Atlas Vector Search"],
    githubUrl:     "https://github.com/m-yadav-dev/Building-EduReach-Agentic-College-Chatbot",
    live_url:      null,
    deep_dive: {
      problem:
        "Students spend hours searching fragmented college portals, PDF handbooks, and email threads to find answers to time-sensitive questions about admissions, fees, and schedules.",
      solution:
        "Built a RAG pipeline that ingests all college documents into MongoDB Atlas Vector Search, uses Gemini embeddings for semantic retrieval, and surfaces grounded, cited answers through a clean MERN chat interface.",
      impact:
        "Reduced average student query resolution time from 20+ minutes (manual search) to under 10 seconds, with zero hallucinated answers due to context grounding and a source-citation UI.",
      keyFeatures: [
        "Document ingestion pipeline — PDF/Markdown chunking via LangChain",
        "MongoDB Atlas Vector Search with gemini-embedding-001 (3072-dim vectors)",
        "Cosine similarity retrieval — top-4 context chunks per query",
        "Gemini 1.5 Flash generation grounded strictly to retrieved context",
        "Source citation UI — every answer shows which document it came from",
        "Express RAG API with Zod validation and 15 req/15 min rate limiting",
      ],
      mediaAssets: [
        {
          title: "Result / Demo",
          url:   "https://res.cloudinary.com/dyjo8b263/image/upload/v1780983917/Animation_y6swq7.gif",
        },
        {
          title: "RAG Architecture",
          url:   "https://res.cloudinary.com/dyjo8b263/image/upload/v1781345346/edu_reach_data_flow_1_optimized_jyxn4o.png",
        },
      ],
    },
  },
];

export default projectsData;
