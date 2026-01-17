## Project Overview

A minimal chatbot platform where users can create AI agents and chat with them.

## Tech Stack

- Backend: Node.js, Express.js
- Frontend: React.js
- Auth: JWT
- AI: Google Gemini, OpenAI Files API
- Database: MongoDB

## Current Status

- Project structure initialized
- Backend server running
- JWT Authentication implemented
- Project model with ownership-based access control
- Prompt management scoped to projects
- Chat system uses Google Gemini via its REST API
- OpenAI-Files API to support file uplaod per project
- Simple Retrieval-Augmented Generation (RAG-lite)
- Dashboard UI for Chatbot Platform
- Login and register form with JWT authentication

## Backend Setup

### Features Implemented

- Express server initialization
- Environment variable configuration
- MongoDB connection using Mongoose
- Health check API

### Running Backend Locally

```bash
cd server
npm install
npm run dev
```

## Authentication

### Features

- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes with middleware

### API Endpoints

POST /auth/register  
POST /auth/login

## Projects / Agents

### Features

- Users can create AI projects (agents)
- Each project belongs to a user
- Ownership-based authorization enforced

### API Endpoints

POST /projects  
GET /projects  
GET /projects/:id

## Prompt Management

### Features

- Prompts can be added to AI projects
- Prompts define agent behavior
- Ownership-based access control enforced

### API Endpoints

POST /prompts/:projectId  
GET /prompts/:projectId

## Chat System

### Features

- Chat with AI agents
- Prompts combined with user message
- Integrated Google Gemini API
- Secure backend-to-AI communication

### API Endpoint

POST /chat/:projectId

### LLM Integration Choice

The chat system uses Google Gemini via its REST API.

During development, three integration approaches were evaluated:

- Gemini REST API approach
- Official Google Gemini SDK
- Gemini OpenAI-compatible REST API

The REST approach was chosen to:

- Avoid Google Cloud IAM setup
- Use explicit API-key authentication
- Keep integration predictable and debuggable
- Maintain a clean service abstraction for future provider changes

## OpenAI File Uploads

### Features

- Files uploaded per project
- Integrated OpenAI Files API
- Secure ownership checks
- File references stored in database

### API Endpoint

POST /files/:projectId (multipart/form-data)

## RAG-Lite (File-Aware Chat)

### Features

- Uploaded files used as reference context
- File content injected into chat prompts
- Simple Retrieval-Augmented Generation (RAG-lite)
- No vector database (intentionally kept simple)

### Design Note

This phase focuses on conceptual clarity before introducing embeddings or vector search.

## Frontend

### Features

- Dashboard UI for Chatbot Platform
- Sidebar with recent chats
- ChatBox for chat interface
- Login and register pages
- User authentication (JWT)
- Protected routes

### Tech Stack

- React (Vite)
- Axios
- Tailwind CSS
- react-markdown (AI response formatting)
- prismjs (code syntax highlighting)

### Design Philosophy

Frontend is intentionally simple to emphasize backend architecture and AI integration.

## Persistent Uploads on Vercel (Serverless) — Issue & Resolution

### Problem

- Our chat flow attempted to load uploaded files from the local filesystem:

  - Multer uploaded files to uploads/
  - Chat later read them via readFileContent("uploads/")
  - This works locally but fails on Vercel because:

    - \*\*Vercel serverless functions do not provide persistent writable storage

- Files written during one invocation may not exist in subsequent invocations
- Additionally, I was storing the original filename in MongoDB, not the Multer-generated disk filename, making uploads/<originalname> unreliable even locally.

#### Symptoms

- Missing file / ENOENT errors in production
- Chat responses lacking expected “reference material” context
- Inconsistent behavior across deployments and requests

### Considered Solutions

A) Store extracted text in MongoDB (Chosen)

- Extract text at upload time and persist it in the File document
- Chat uses DB content, not filesystem paths
  B) Store files in external object storage (Vercel Blob / S3 / R2)
- Save file URL in DB and fetch content when needed
- Best for large files and non-text formats, but more infrastructure
  C) Rely on OpenAI file storage / retrieval
  Not applicable to our current flow since chat is powered by Gemini and we are not using OpenAI retrieval APIs in chat

#### Implemented Fix (Solution A)

#### What changed

##### Schema

- Added content: String to File model to store extracted text.

##### Upload flow

- Extracted text immediately from req.file.path using readFileContent(...)
- Stored extracted text in MongoDB (File.content)
- Cleaned up temp file after processing
- Changed Multer destination to a serverless-safe temp directory via os.tmpdir()

##### Chat flow

- Removed filesystem reads (uploads/...)
- Injected file context from file.content stored in MongoDB

##### API hygiene

- GET /files/:projectId excludes content using .select("-content") to avoid returning large payloads by default.

##### Files updated (high level)

- server/src/models/file.model.js (added content)
- server/src/routes/file.routes.js (Multer dest: os.tmpdir())
- server/src/controllers/file.controller.js (extract + store text, cleanup temp file, exclude content in list)
- server/src/controllers/chat.controller.js (use file.content instead of reading from disk)

#### Why this approach

- Deployment-safe on Vercel (no dependency on persistent disk)
- Minimal infra changes (no S3/Vercel Blob required)
- Fast chat context (no re-reading/re-fetching files each request)
- Keeps /uploads out of GitHub (no user uploads committed)

#### Notes / Limitations

- Current extraction (readFileSync(..., "utf-8")) is best for text-based files (.txt, .md, .json, etc.).
- PDFs/DOCX will need a dedicated extraction pipeline if required later.

#### Status

- Resolved by persisting uploaded file reference content in MongoDB and removing reliance on local filesystem storage during chat execution.

## ES module hoisting issue with OPENAI API Key - Issue & Resolution

### Problem

- When you use import, all imports are evaluated before any code runs - including your dotenv.config() call.
- apiKey: process.env.OPENAI_API_KEY does not load the API key from the .env file at runtime and show undefined.

### Symptoms

- apiKey: process.env.OPENAI_API_KEY shows undefined
- OpenAI API call fails with "Missing API key"

### Solution

A) Use require instead of import to load the API key from the .env file at runtime.
B) Create a separate file that loads dotenv and import it first.

### Implemented Fix (Solution B)

- Created a src/config/env.js file to load dotenv and import it first in the server.js file.

### Why this approach (Solution Credit: Vahap Ogut @StackOverflow)

- What actually happens is all imports run first, then dotenv.config() runs. By that time gemini.service.js already tried to read process.env.OPENAI_API_KEY and got undefined.
- ES modules evaluate imports at parse time, before any code runs
- dotenv.config() must execute before any code tries to access process.env
- Creating a separate env.js file ensures dotenv is loaded before any other imports
