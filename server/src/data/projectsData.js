/**
 * @file src/data/projectsData.js
 * @description Spec-driven project configuration array.
 *
 * SPEC RULE: "Zero hardcoded data in UI components."
 * This is the single source of truth for all project data served by the API.
 * All `card_thumbnail`, `architecture_diagram`, and `demo_gif` values use
 * Cloudinary placeholder URLs — replace with real Cloudinary delivery URLs
 * once assets are uploaded.
 *
 * Categories MUST match the spec exactly:
 *   "MERN Stack" | "n8n Automations" | "NxtWave Frontend"
 */

"use strict";

const projects = [
  // ---------------------------------------------------------------------------
  // 1. MERN Stack — Chatrivo Ecosystem
  // ---------------------------------------------------------------------------
  {
    id: "chatrivo-ecosystem",
    card_thumbnail: "https://res.cloudinary.com/placeholder/image/upload/v1/chatrivo-thumbnail",
    category: "MERN Stack",
    title: "Chatrivo Ecosystem",
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
        architecture_diagram:
          "https://res.cloudinary.com/placeholder/image/upload/v1/chatrivo-architecture",
        demo_gif:
          "https://res.cloudinary.com/placeholder/image/upload/v1/chatrivo-demo",
      },
    },
    github_url: "https://github.com/m-yadav-dev/chatrivo",
    live_url: null,
  },

  // ---------------------------------------------------------------------------
  // 2. n8n Automations — AI Gmail Management Agent
  // ---------------------------------------------------------------------------
  {
    id: "gmail-management-agent",
    card_thumbnail: "https://res.cloudinary.com/placeholder/image/upload/v1/gmail-agent-thumbnail",
    category: "n8n Automations",
    title: "AI Powered Gmail Management Agent",
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
        architecture_diagram:
          "https://res.cloudinary.com/placeholder/image/upload/v1/gmail-agent-architecture",
        demo_gif:
          "https://res.cloudinary.com/placeholder/image/upload/v1/gmail-agent-demo",
      },
    },
    github_url: null,
    live_url: null,
  },

  // ---------------------------------------------------------------------------
  // 3. NxtWave Frontend — Jobby App
  // ---------------------------------------------------------------------------
  {
    id: "jobby-app",
    card_thumbnail: "https://res.cloudinary.com/placeholder/image/upload/v1/jobby-app-thumbnail",
    category: "NxtWave Frontend",
    title: "Jobby App",
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
        architecture_diagram:
          "https://res.cloudinary.com/placeholder/image/upload/v1/jobby-architecture",
        demo_gif:
          "https://res.cloudinary.com/placeholder/image/upload/v1/jobby-demo",
      },
    },
    github_url: "https://github.com/m-yadav-dev/jobby-app",
    live_url: null,
  },
];

module.exports = projects;
