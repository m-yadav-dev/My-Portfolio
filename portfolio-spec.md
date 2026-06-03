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

EXPRESS RATE LIMITING:
    - express-rate-limit (v6+)

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





============================================================================================
REQUIRED BACKEND API ENDPOINTS
============================================================================================


CHAT & RAG ROUTES
-------------------

POST `api/chat`
    - Purpose: Handle all RAG chatbot interactions.
    - Payload: {"message": "User's chat query"}
    - Action: Receives query, triggers `rag.service.js` to fetch context from MongoDB Atlas.

LEAD GENERATION ROUTES
------------------------

POST `api/contact`

    - PURPOSE: Handles freelance/recruiter contact form submissions.
    - Payload: {"name": "....", "email": "...", "message": "..."}
    - Action: Validates payload using zod and dispatches email directly to the owner using the Resend API.

PROJECT DATA ROUTES (SPEC-DRIVEN)
-------------------------------------

GET `api/projects`
    - Purpose: Fetches all project configurations data from the backend to populate the frontend project grid.

GET `api/projects/:projectId`
    - Purpose: Fetches deep-dive documentation (Problem -> Solution -> Impact) for a single dynamic project page based on the projectId parameter.



===============================================================================================
REQUIRED DATA SCHEMAS (SPEC-DRIVEN DEVELOPMENT)
===============================================================================================



IMPORTANT RULE:
All frontend UI components (cards, detail pages) MUST be populated dynamically using these data structures. Do not hardcode project names, descriptions, or tech stacks in React components.


------------------------------------
1. PROJECT CONFIGURATION SCHEMA (JSON)
------------------------------------


Location: Sent via GET /api/projects from backend.

IMPORTANT RULE:

The frontend UI MUST implement a filtering mechanism based on the `category` field (MERN, n8n, NxtWave). All images MUST use the provided Cloudinary URLs.


Structure Example:
[
  {
    "id": "chat-app",
    "category": "MERN Stack",
    "title": "Chatrivo Ecosystem",
    "summary": "A production-grade real-time messaging platform built on a robust MERN backbone.",
    "tech_stack": ["React", "Socket.io", "Node.js", "MongoDB", "Zustand"],
    "deep_dive": {
      "problem": "...",
      "solution": "...",
      "impact": "...",
      "visual_evidence": {
        "architecture_diagram": "PASTE_YOUR_CLOUDINARY_URL_HERE",
        "demo_gif": "PASTE_YOUR_CLOUDINARY_URL_HERE"
      }
    }
  },
  {
    "id": "gmail-management-agent",
    "category": "n8n Automations",
    "title": "AI Powered Gmail Management AI Agent",
    "summary": "Automated email classification and workflow routing using Gemini and n8n.",
    "tech_stack": ["n8n", "Google Gemini API", "Webhooks", "JavaScript"],
    "deep_dive": {
      "problem": "...",
      "solution": "...",
      "impact": "...",
      "visual_evidence": {
        "architecture_diagram": "PASTE_YOUR_CLOUDINARY_URL_HERE_FROM_IMAGE",
        "demo_gif": "PASTE_YOUR_CLOUDINARY_URL_HERE"
      }
    }
  },
  {
    "id": "jobby-app",
    "category": "NxtWave Frontend",
    "title": "Jobby App",
    "summary": "A comprehensive job search platform focusing on complex UI state and routing.",
    "tech_stack": ["ReactJS", "Tailwind CSS", "REST APIs"],
    "deep_dive": {
      "problem": "...",
      "solution": "...",
      "impact": "...",
      "visual_evidence": {
        "architecture_diagram": "PASTE_YOUR_CLOUDINARY_URL_HERE",
        "demo_gif": "PASTE_YOUR_CLOUDINARY_URL_HERE"
      }
    }
  }
]


-------------------------
2. RAG CONTEXT DATA (MARKDOWN)
--------------------------

Location: `server/data/[cite: 2]`

These files are STRICTLY used for Vector Indexing and RAG Chatbot context, NOT for rendering the UI.
- resume.md: Contains education, certifications (Google Cloud GenAI, MCP), and work history[cite: 2].
- skills.md: Contains detailed lists of MERN and AI automation proficiencies[cite: 2].
- hiring-preferences.md: Contains ideal freelance client profiles and service offerings[cite: 2].
- projects.md: Contains narrative descriptions of projects for the AI to answer conversational queries[cite: 2].



================================================================================================
ASSET MANAGEMENT & CLOUDINARY INTEGRATION
================================================================================================


ASSET DELIVERY RULES:
    - NO heavy media files (GIFs, Videos, Architecture Diagrams) will be stored locally in the frontend or backend repositories.
    - ALL visual evidence must be delivered via Cloudinary URLs to ensure rapid page loading and to satisfy the 10-second scan rule.

FRONTEND IMPLEMENTATION RULES:
    - 1. Lazy Loading: All visual assets fetched from Cloudinary MUST implement native `loading="lazy"` attributes.
    - 2. Fallback States: UI components (like <ProjectCard> and the Project Detail gallery) must include a clean, CSS-based skeleton loader or placeholder that displays while the Cloudinary asset is resolving.
    - 3. Aspect Ratios: Always enforce strict aspect ratios (e.g., `aspect-video` in Tailwind) on image containers to prevent Cumulative Layout Shift (CLS) when Cloudinary images load.

UPDATED DATA SCHEMA REQUIREMENT:
    The `visual_evidence` object in the Project Configuration JSON must strictly use secure Cloudinary URLs (`https://res.cloudinary.com/...`).


Example:
"visual_evidence": {
  "architecture_diagram": "https://res.cloudinary.com/your-cloud-name/image/upload/v1234/portfolio/chatrivo-arch.png",
  "demo_gif": "https://res.cloudinary.com/your-cloud-name/video/upload/v1234/portfolio/chatrivo-demo.gif"
}





================================================================================================
SECURITY, VALIDATION & ENVIRONMENT MANAGEMENT
================================================================================================

1. ENVIRONMENT VARIABLES VALIDATION:
    - Abstraction Rule: The backend Application `MUST NEVER` Access `process.env` directly outside the file, create a centralized `env.js` file and configure all `env variable` and access env var through exported variable. 

 Example:
    // server/src/config/env.js
    {
        process.env.MONGODB_URI || throw new Error("MONGODB_URI is required"),
        process.env.GEMINI_API_KEY || throw new Error("GEMINI_API_KEY is required"),
        process.env.RESEND_API_KEY || throw new Error("RESEND_API_KEY is required"),
        process.env.PORT || 5000 || throw new Error("PORT is required"),
        process.env.NODE_ENV || "development", 
        process.env.CORS_ORIGIN || throw new Error("CORS_ORIGIN is required"), 
        process.env.CLIENT_URL || throw new Error("CLIENT_URL is required"), 
    }


    - Validation Schema: Use Zod (zod) to strictly parse and validate the runtime environment configuration.

    - Required Variables: 
        - PORT: Number, default 5000
        - MONGODB_URI: String (MongoDB connection string)
        - GEMINI_API_KEY: String (Google Gemini API key)
        - RESEND_API_KEY: String (Resend API key for email dispatch)
        - CORS_ORIGIN: String (Allowed origin for CORS, e.g., http://localhost:5173)
        - CLIENT_URL: String (URL of the frontend application, e.g., http://localhost:5173) 
    - Failure Behavior: If any variable fails validation at startup, the process must immediately log the validation error and terminate (process.exit(1)).


2. REQUEST VALIDATION MIDDLEWARE: 
    - Zod Enforcement: All incoming payload bodies for public write routes MUST be strictly validated via Zod schemas before hitting the controllers.

    - `api/chat` Schema: Validate that message exist, is a string, is not empty, and does not exceed a safe maximum character length `(e.g. 500 characters)`. to save LLM tokens and prevent abuse. 

    - `/api/contact` Schema: Validate that name (string), email (valid email string), and message (string) are all prevent and formatted correctly.


3. RATE LIMITING & PUBLIC ENDPOINT PROTECTION:
    - Express Rate Limiting: Implement `express-rate-limit` globally on all public routes to prevent script spam and API cost inflation.

    - Chat Limit: Restrict the `/api/chat` endpoint to a maximum of 15 request per 15 minute window per IP address.

    - Contact Form Limit: Restrict the `/api/contact` endpoint to a maximum of 3 requests per hour per IP address to prevent spam.



4. HTTP SECURITY HEADERS:

    - Helmet integration: Mount the helmet middleware layer to automatically apply secure, standard HTTP headers across all server 
        transactions.
    
    - CORS Constraints: Configure the Cross-Origin Resource Sharing (cors) policy strictly to authorize inbound traffic exclusively from your trusted frontend origin domain (http://localhost:5173 during local builds)





============================================================================================
MANDATORY AI AGENT GENERATION RULES
============================================================================================



1. `USE JavaScript (ES6+) ONLY`: The AI is strictly forbidden from writing or introducing TypeScript (.ts/.tsx) anywhere in the workspace[cite: 4, 5].

2. `USE Modular Express Architecture ONLY`: All backend services must follow the defined src/ structure (controllers, routes, services, models)[cite: 4, 5].

3. `NO ORMS/ODMS OUTSIDE MONGOOSE`: Never generate schemas or query engines using Prisma, Sequelize, or NestJS structures.

4. `ALL Business Logic MUST be Spec-Driven`: No project attributes, filtering categories, or validation thresholds may be hardcoded inside UI views[cite: 4, 5].

5. `ALWAYS Return Structured JSON`: Every backend response—including error states—must return a predictable JSON payload[cite: 4, 5].

6. `NO SKIPPING VALIDATION`: All public payload ingestion endpoints (/api/chat, /api/contact) MUST execute Zod validation parsing prior to controller execution[cite: 4, 5].

7. `DUMB FRONTEND PRINCIPLE`: The React UI must never execute Gemini embeddings or direct database transactions; it is strictly a visual consumer.




============================================================================================
FAILURE HANDLING & SYSTEM RESILIENCE
============================================================================================

RETRYABLE FAILURES (Implement Exponential Backoff / Max 3 Retries):
    - Google Gemini API timeouts or rate limits (HTTP 429/503)[cite: 5].
    - Resend Email API network timeouts[cite: 5].
    - MongoDB Atlas Vector database connectivity drops[cite: 5].

NON-RETRYABLE FAILURES (Fail Immediately and Bubble Error up to Client):
    - Empty or malformed request payloads[cite: 5].
    - Invalid email formats passing through /api/contact[cite: 4, 5].
    - Zod validation schema rejections[cite: 4, 5].

MANDATORY LOGGING FORMAT:

Every single system catch block must pass errors to the global error-handling middleware, logging a structured terminal message containing:

{
  "timestamp": "ISO-8601 String",
  "layer": "ROUTE | CONTROLLER | SERVICE | MODEL",
  "module": "e.g., rag.service.js",
  "error_message": "error.message",
  "stack_trace": "error.stack"
}[cite: 4, 5]



============================================================================================
PORTFOLIO SUCCESS CRITERIA
============================================================================================


The implementation is defined as strictly successful ONLY if:

1. The frontend initiates entirely on http://localhost:5173 without static file layout shifts.
2. The backend boots cleanly on http://localhost:5000 and successfully passes environment variable checks via env.js[cite: 4].
3. The Project Configuration JSON schema perfectly filters projects into MERN, n8n, and NxtWave categories dynamically in the view layer[cite: 4]
4. The floating chat widget successfully streams input to /api/chat and securely renders the context-injected response[cite: 4].
5. Submitting the contact form hits /api/contact, passes Zod validation, and executes a verified email dispatch via Resend[cite: 4].



===============================================================================================
STANDARDIZED API RESPONSE FORMATS (SERIALIZED JSON)
===============================================================================================


GLOBAL RESPONSE RULE:

Every API endpoint MUST return a serialized JSON object adhering to this exact top-level structure. NEVER return raw strings or unformatted arrays.



Top-Level Schema:

{
  "success": boolean,
  "data": object | array | null,
  "error": {
    "code": string,
    "message": string
  } | null
}

---------------------------------
1. SUCCESS RESPONSE EXAMPLE:
----------------------------------

Route GET: `api/projects`

Response: 
{
    "success": true,
    "data": [
        {
            "id": "chat-app", 
            "category": "MERN Stack",
            "title": "Chatrivo Ecosystem",
            ...
        }
    ], 
    "error": null
}


ROUTE POST: `api/chat`
RESPONSE:
{
    "success": true, 
    "data": {
        "role": "assistant",
        "content": "Manish has strong experience in the MERN stack, having built the Chatrivo Ecosystem..."
    }
}


ROUTE POST: `api/contact`

RESPONSE:
{
    "success": true, 
    "data": {
        "message": "Email dispatched successfully via Resend", 
        "ticket_id": "req_abc123xyz"
    }, 
    "error": null
}



================================================================================================
2. FAILURE/ERROR RESPONSE EXAMPLE:
============================================================================================

VALIDATION Failure (Zod):

{
    "success": false, 
    "data": null,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid request payload: 'email' must be a valid email address."
    }
}

RAG/Gemini Timeout Failure:

{
    "success": false, 
    "data": null,
    "error": {
        "code": "LLM_SERVICE_UNAVAILABLE",
        "message": "The AI assistant is currently experiencing high load. Please try again later."
    }
}


=============================================================================================
LOCAL END-TO-END TESTING FLOW
=============================================================================================


During local development, you MUST verify the system by simulating the exact visitor flow. Follow this strict sequence to validate the portfolio before deployment.


STEP 1: SYSTEM BOOT & ENVIRONMENT VALIDATION
---------------------------------------------------
 
1. Start MongoDB local service (or verify Atlas connection).
2. Run backend: `cd server && npm run dev` (Verify it boots on port 5000 and env variables parse successfully).
3. Run frontend: `cd client && npm run dev` (Verify it boots on port 5173).


STEP 2: THE 10-SECOND RECRUITER SCAN TEST
-----------------------------------------------

1. Open http://localhost:5173.
2. Verify the Hero Section loads instantly. 
3. Scroll to the Projects Grid. Verify that the MERN, n8n, and NxtWave categories filter projects correctly.
4. Verify that Cloudinary visual assets (GIFs/Diagrams) lazy-load smoothly without causing Cumulative Layout Shift (CLS).


STEP 3: THE RAG CHATBOT EVALUATION
---------------------------------------

1. Open the floating AI Chat widget. 
2. Submit a query: "What projects has Manish built using Socket.io?"
3. Verify the frontend displays a loading state.
4. Check the backend terminal to ensure the `vector-store.js` retrieved relevant context and `rag.service.js` generated a response.
5. Verify the UI renders the serialized JSON response accurately.


STEP 4: THE LEAD GENERATION TEST (CONTACT FORM)
--------------------------------------------------


1. Scroll to the Contact section.
2. Submit empty fields to verify Zod blocks the request and shows UI error states.
3. Submit a valid payload (Name, Email, Message).
4. Verify the backend console logs the Resend API dispatch.
5. Check your actual inbox to confirm the email was received.