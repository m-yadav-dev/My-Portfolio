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
    - React Router DOM (v6+)

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



