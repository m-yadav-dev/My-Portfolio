
const projectsData = [
  // ---------------------------------------------------------------------------
  // 1. MERN Stack — Chatrivo Ecosystem
  // ---------------------------------------------------------------------------
  {
    id: "chatrivo-ecosystem",
    card_thumbnail: "https://res.cloudinary.com/dyjo8b263/image/upload/v1780918470/2925ee2e-7059-4043-887c-c31b22437b86.png",
    category: "MERN Stack",
    title: "Chatrivo Ecosystem",
    summary: "A production-grade real-time messaging platform built on a robust MERN backbone with Socket.io and n8n automation.",
    tech_stack: ["React", "Socket.io", "Node.js", "MongoDB", "Zustand", "n8n", "Express"],
    githubUrl: "https://github.com/m-yadav-dev/chatrivo-app",
    live_url: "https://chatrivo-app.duckdns.org/",
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
          url: "https://res.cloudinary.com/dyjo8b263/image/upload/v1780918384/Animation_wunt61.gif",
        },
      ],
    },
  },

  //-----------------------------------------------------

  // RAG Based College ChatBot 

  {
    id: "rag-chatbot",
    card_thumbnail: "", 
    category: "MERN Stack", 
    title: "RAG Based College ChatBot",
    summary: "A RAG-powered chatbot that provides students and faculty with instant, accurate answers from college documents through a centralized knowledge base.", 
    tech_stack: [ "React", "Zustand", "ZOD",  "TailwindCSS", "Node.js", "MongoDB", "Express", "LangChain", "Redis", "Gemini API","Cloudinary","Upstash Redis" ], 
    githubUrl: "https://github.com/m-yadav-dev/rag-based-college-chatbot",
    live_url: "https://docututor-chat.vercel.app", 
    
    deep_dive: {
      problem: ""
    }
  }
  // -----------------------------------------------------
  // Ai Powered Code Translator
  // -----------------------------------------------------


];

export default projectsData;
