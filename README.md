## Project Overview
A minimal chatbot platform where users can create AI agents and chat with them.

## Tech Stack
- Backend: Node.js, Express.js
- Frontend: React.js
- Auth: JWT
- AI: Google Gemini, OpenAI Files API

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
