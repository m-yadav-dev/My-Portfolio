=======================================================================================
PROJECT NAME
==========================================================================================

======================================================================================
Manish Yadav Portfolio
======================================================================================

======================================================================================
Specification Driven Portfolio
======================================================================================

=========================================================================================
Primary Objective: AI-Powered Developer Portfolio
=========================================================================================

Build a high-converting, digital product-style portfolio designed to secure freelance contracts, attract startup founders, and pass rapid recruiter evaluations.

1. Technical Positioning: Establish the portfolio's architecture and content to focus exclusively on the MERN stack (MongoDB, Express, React.js, Node.js) combined with intelligent AI agent integrations (n8n, GenAI), explicitly avoiding the generation of code for unrelated languages or frameworks.

2. UX & Scannability Constraint: Optimize the user journey for the "10-15 second scan rule." The UI and project detail pages must prioritize rich visual evidence—such as UI demonstration GIFs and system architecture diagrams—over extensive text to instantly communicate technical capability to recruiters.

3. Design Philosophy: Enforce a strict, minimalist dark-mode aesthetic (deep obsidian #0A0A0A background) with zero overdesign, avoid over exaggeration design elements. The visual hierarchy must remain clean and documentation-style, emphasizing the business value of projects (Problem ---> Solution ---> Impact) rather than flashy, unnecessary animations.


4. Conversion Strategy: Implement a frictionless conversion funnel using clear, minimal Call-to-Actions (CTAs) that seamlessly direct users from the high-level landing page to dedicated project deep-dives, and ultimately to booking a technical discovery call.



================================================================================

IMPORTANT PROJECT STRUCTURE REQUIREMENTS
================================================================================

- client/ 
- server/ 

DO NOT CREATE:
    - frontend/
    - backend/

USE THE EXISTING STRUCTURE TO MAINTAIN CLARITY AND ALIGN WITH THE SPECIFICATION DRIVEN APPROACH.


==========================================================================================
CORE ARCHITECTURAL PRINCIPLES
==========================================================================================

ALL BUSINESS LOGIC MUST BE SPEC-DRIVEN. 

NEVER HARD-CODE ANY BUSINESS LOGIC OR FUNCTIONALITY.

1. `Spec-Driven Logic & Configurations`: All portfolio data and AI logic must remain strictly spec-driven. Never hardcode project details, prompt templates for the RAG agent, or webhook URLs directly into the React components. Maintain a clean separation of concerns by utilizing centralized configuration files (e.g., JSON schemas) or environment variables.


2. `MERN-Exclusive Ecosystem`: All generated code, API structures, and state management patterns must strictly adhere to the MERN stack paradigm. The AI is forbidden from introducing extraneous frameworks, templating engines, or languages outside of this defined ecosystem.

3. `Visual-First Asset Delivery`: The architecture must prioritize the rapid loading and optimized rendering of visual evidence (such as UI demonstration GIFs, Video demonstrations, and system architecture diagrams) over extensive text. Implement lazy loading and layout shifts prevention to ensure the site passes the 10-second scan rule.

4. `Decoupled & Modular Component Design`: UI development must follow a first-principles modular approach. Every visual element (e.g., <TechBadge>, <ProjectCard>, <ChatWidget>) must be a reusable, isolated component to allow for seamless scalability and future additions without disrupting the global layout.


5. `Minimalist Styling Constraints`: Enforce a strict, minimal dark-mode aesthetic utilizing Tailwind CSS. Complex visual hierarchies must be established through typography and spacing, explicitly avoiding bloated CSS, unnecessary background gradients, or heavy JavaScript animation libraries.

6. `Headless AI Client`: The frontend Chatbot interface must act strictly as a dumb client. It will solely manage local state (user/agent message arrays) and handle HTTP requests, while all complex business logic, vector retrieval, and LLM inference must remain entirely isolated within the backend or n8n webhook layer.





===========================================================================================
FINAL TECHNICAL STACK
===========================================================================================

FRONTEND TECH STACK:
----------

LIBRARIES:
    - React.js (v18+)

LANGUAGE:
    - JavaScript (ES6+)

STYLING:
    - Tailwind CSS (v3+)
    - shadcn/ui (v2+)
    - lucide-react icons (v0.9+)

STATE MANAGEMENT: 
    - ZUSTAND (v4+)

ROUTING:
    - React Router (v6+) / react-router-dom (v6+)

FORMS:
    - react-hook-form (v7+)
    - ZOD (v3+)

ANIMATION:
    - framer-motion (v6+)


------------------------------------------------------------------

BACKEND TECH STACK:
----------

Framework:
    - Express.js (v4+)

Runtime:
    - Node.js (v18+)

ZOD VALIDATION:
    - zod (v3+)


ARCHITECTURE:
    - Modular Express Architecture


CROSS-ORIGIN REQUEST HANDLING:
    - CORS middleware (v2+)

DOTENV MANAGEMENT:
    - dotenv (v16+)

HELMET SECURITY:
    - helmet (v6+)


MORGAN LOGGING:
    - morgan (v1+)

------------------------------------------------------------------



DATABASE
------------

Primary Database:
    - MongoDB 


OBJECT DATA MAPPING:
    - Mongoose (v6+)



----------------------------------------------------------------------


AI & RAG ARCHITECTURE STACK-
------------------------------

1. LLM Engine and Provider- 
    - LLM Provider: Google Gemini (Free tier access via @google/generative-ai SDK)
    - Embedding Model: Google Gemini Embedding API (via @google/generative-ai SDK)
    - Core SDK: @google/generative-ai (v1+)
        - Purpose: Directly interfaces with Google's API for generation and vector embeddings.

2. Orchestration Framework- 

    - Primary Framework: LangChain (v1+)
        - Purpose: Manages the RAG agent's logic, including prompt templates, vector retrieval, and response generation.
    
    - Core Abstractions and Tools:
        - langchain (v1+)
        - @langchain/core (v1+)
        - @langchain/community (v1+)

    - Integration Modules: 
        - @langchain/google-genai (v0.1+) — Connects LangChain to the Gemini models.
        - @langchain/mongodb (v0.1+) — Connects LangChain to your Atlas Vector Search.
    
    - Data Processing:
        - @langchain/textsplitters (v0.1+) — Handles chunking of your project markdown files and resume data.


3. Vector Storage & Retrieval
    - Vector Database: MongoDB Atlas with Vector Search capabilities
        - Purpose: Stores vector embeddings of project descriptions, resume data, and skills for efficient similarity search during RAG operations.



DATABASE SCHEMA & VECTOR INDEXING:
   
    - DATABASE: MongoDB Atlas (v5+)
    - Target Collection: portfolio_context(will store resume, projects data and skills data)


ATLAS VECTOR SEARCH CONFIGURATION:
    - Index Name: portfolio_vector_index
    - Embedding Model: Google Gemini Embedding API (via @google/generative-ai SDK)
    - Vector Dimensions: 768 (must strictly match Gemini embedding vector size)
    - Similarity Metric: Cosine similarity (Cosine similarity for context matching)
    - Chunking Strategy: Markdown text will be split into 500-character chunks with 50-character overlap before embedding.






EMAIL
------------

- Resend Free Tier 



TESTING
------------

- Frontend: React Testing Library (v14+) with Jest (v29+)
- Backend: Supertest (v6+) with Jest (v29+)


============================================================================================
LOCAL DEVELOPMENT REQUIREMENTS
============================================================================================

    - Node.js (v18+)
    - MongoDB Atlas Account (with Vector Search enabled)
    - Docker (optional, for containerized development)
    - Git 
    - VS Code or preferred code editor
    - Postman or similar API testing tool


RUNNING PORTS
------------------

Frontend:
    - http://localhost:5173

Backend:
    - http://localhost:5000

MONGODB:
    - localhost:27017 (for local MongoDB) or Atlas connection string for cloud database



============================================================================================
FINAL PROJECT STRUCTURE
============================================================================================



manish-portfolio/
│
├── client/                 # Strictly Frontend (React/Vite, Tailwind, Zustand)
│   ├── public/             
│   ├── src/
│   │   ├── assets/         # Crucial: Store all UI GIFs and architecture diagrams here for quick recruiter scanning
│   │   ├── components/     # Reusable UI (TechBadge, ChatWidget, ProjectCard)
│   │   ├── layouts/        # Global layout wrappers (Navigation, Footer)
│   │   ├── pages/          # Main views (LandingPage, ProjectDetail)
│   │   ├── store/          # Zustand state slices (e.g., chatState.js)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and API clients (Axios)
│   │   ├── App.jsx         # Root component and dynamic routing
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── tailwind.config.js
│
server/                 # Strictly Backend (Node.js, Express, MongoDB, LangChain)
├── src/
│   ├── config/         # DB connections, Gemini API keys, environment variables
│   ├── controllers/    # Route logic (parsing req/res, calling services)
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express API endpoints
│   ├── middleware/     # Error handling, CORS, request validation (Zod)
│   ├── services/       # Core business logic and external integrations
│   │   └── rag/        # Dedicated RAG module
│   │       ├── embeddings.js   # Handles vector generation
│   │       ├── indexer.js      # Handles data chunking and ingestion
│   │       ├── rag.service.js  # Main orchestrator for the RAG pipeline
│   │       └── vector-store.js # Handles vector database operations
│   └── app.js          # Express app configuration and middleware setup
├── package.json
├── .env
└── server.js           # Network entry point (app.listen)
|- server/data/resume.md         # Markdown file containing resume data for RAG indexing (inside /server/data/)
|- server/data/projects.md       # Markdown file containing project details for RAG indexing (inside /server/data/)
|- server/data/hiring-preferences.md # Markdown file containing hiring preferences for RAG indexing (inside /server/data/)
|- server/data/skills.md         # Markdown file containing skills data for RAG indexing (inside /server/data/)



============================================================================================
MANDATORY IMPLEMENTATIONS RULES 
============================================================================================


CLIENT FOLDER IMPLEMENTATION
---------

The entire frontend application must be implemented Only inside:

`/client`

This Includes:
    - Vite configuration
    - pages/routes (e.g., LandingPage.jsx, ProjectDetail.jsx)
    - UI components
    - Zustand state management 
    - Tailwind styling
    - shadcn/ui components
    - lucide-react icons
    - frontend API client logic (e.g., Axios calls to the Express backend)
    - form handling with react-hook-form and ZOD (e.g., contact form validation)
    - framer-motion animations
    - RAG agent interaction logic (e.g., chat interface state management, message rendering)
    - detailed Page of each project with visual evidence (GIFs, architecture diagrams) and minimal text




----------------------------------------------------------------------------------------

SERVER FOLDER IMPLEMENTATION
---------

The Entire backend application must be implemented Only inside:

`/server`


This includes: 
    CORE INFRASTRUCTURE:
     - Express Setup: Server configuration, API routes, and modular controllers.
     - Database: Mongoose schemas and MongoDB connection logic.
     - Security & Config: CORS, Helmet, centralized error-handling middleware, and dotenv management.
     - Email Service: Resend API integration for contact form submissions.
     - ENVIRONMENT CONFIGURATION: Centralized management of all `env variables` (eg., MONGODB_URI, GEMINI_API_KEY, RESEND_API_KEY) in a `.env` file with secure access patterns. Make a `env.js` module to abstract and validate environment variable access across the backend codebase.

    RAG and AI SERVICE(/server/src/services/rag/)
        - embeddings.js: Generate vectors using Google Gemini Embedding API (@google/generative-ai).
        - indexer.js: Chunk markdown files/chat queries, trigger embeddings, and pipeline data to the database.
        - vector-store.js: Handle all MongoDB Atlas Vector Search interactions (store new embeddings, execute similarity searches).
        - rag.service.js: Central orchestrator (receives query → fetches context via vector-store → generates LangChain LLM response → returns to client).
    
    DATA SOURCES FOR RAG (/server/data/): 
        - resume.md: Contains structured markdown data of the candidate's resume for indexing.
        - projects.md: Contains detailed markdown descriptions of each project for indexing.
        - hiring-preferences.md: Contains markdown data outlining the candidate's ideal job criteria for indexing.
        - skills.md: Contains markdown data listing the candidate's technical skills and proficiencies for indexing.

    


------------------------------------------------------------------------------------------------

STRICT RULES 
-----------------

1. NEVER create additional frontend/backend root directories 
2. Always use:
        `/client`
        `/server`
3. All frontend code Must remain inside:
        `/client`
4. All backend code Must remain inside:
        `/server`
5. Shared resume, projects, skills and hiring preferences data for RAG indexing must be stored as markdown files inside:
        `/server/data/`

6. Mongoose models MUST exist inside:
        `/server/src/models/`
7. Environment variable management and access abstraction MUST be implemented inside:
        `/server/src/config/env.js`
8. RAG-specific logic and integrations MUST be implemented inside:
        `/server/src/services/rag/`



============================================================================================

HOW USER or VISITOR INTERACTIONS WORK
============================================================================================


1. VISITOR LANDING & EXPLORATION FLOW-
    - The Hook: A recruiter or client lands on the homepage and instantly sees technical expertise communicated through visual evidence (UI GIFs, architecture diagrams) with minimal text.

    - The Deep-Dive: The visitor clicks a project card, navigating to a dynamic detail page formatted as technical documentation (Problem -> Solution -> Impact). 

2. AI RAG CHATBOT FLOW
    - Query Initiation: The visitor asks a question (e.g., "What is your MERN experience?") via the floating UI widget.
    - API Request: The frontend captures the input and sends a POST request to the Express backend (e.g., /api/chat).
    - Orchestration (rag.service.js): The backend routes the query to the RAG service orchestrator.
    - Vector Retrieval (vector-store.js): The system performs a cosine similarity search against the MongoDB Atlas vector index to pull relevant context (from your resume and project specs).
    - LLM Generation: The retrieved context and user query are passed to the Gemini LLM (via @google/generative-ai) using a strict prompt template to prevent hallucinations.
    - Response Delivery: The backend formats the LLM output and returns a JSON response to the frontend, instantly updating the chat UI.


3. LEAD GENERATION FLOW
    - Contact Submission: The visitor fills out the minimal contact form (Name, Email, Message) to request a freelance build or interview.

    - Email Dispatch: The backend receives the payload, validates it via Zod, and triggers the Resend API to deliver the email directly to you.






============================================================================================
REQUIRED FRONTEND ROUTES & PAGES
============================================================================================


1. APPLICATION ROUTES (React Router)
    - `/`: Main Landing Page (Single Page layout containing About, Skills, Projects, and Contact sections).
    - `/projects/:projectId`: Dynamic Project Detail Page (Deep-dive documentation for a specific project).
2. Header NAVIGATION (Smooth scroll Anchors)

When a user clicks on the header links, the app MUST smoothly scroll to the respective section ID on the Home Page (/):

    - `/about` - Scrolls to About/Value Proposition section.
    - `/skills` - Scrolls to Tech Arsenal/Skills section.
    - `/projects` - Scrolls to the Featured Case Studies/Projects grid section.
    - `/contact` - Scrolls to the Contact Form/Footer.

