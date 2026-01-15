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
