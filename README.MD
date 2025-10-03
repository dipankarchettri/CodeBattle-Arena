CodeBattle Arena 🚀
===================

CodeBattle Arena is a competitive programming platform designed for live coding competitions targeting college students. The platform provides secure code execution, real-time judging, live leaderboards, and comprehensive anti-cheating measures. Built as a full-stack web application, it supports multi-language code submissions (Python and JavaScript) with instant feedback and automated test case validation.

The system is architected to host fair, engaging coding events with features like tab-switching detection, paste prevention, submission history tracking, and real-time competitive rankings. The platform emphasizes both security (containerized code execution) and user experience (Monaco editor integration, modern dark-themed UI).

✨ Key Features
--------------

*   **⚡ Live Code Judging:** Get instant feedback on your solutions with a secure, sandboxed execution engine for both Python and JavaScript.
    
*   **🛡️ Secure Authentication:** A complete user registration and login system using secure, session-based authentication with Passport.js.
    
*   **🏆 Competitive Leaderboard:** See how you stack up against your peers with a real-time leaderboard that ranks users by problems solved and speed.
    
*   **📝 Personal Submission History:** Track all your past attempts, review your code, and see your progress on a personal submissions page.
    
*   **🚫 Robust Anti-Cheating:** Ensures the integrity of competitions with built-in tab-switching detection and disabled pasting in the code editor.
    
*   **💻 Modern IDE Experience:** A sleek, dark-themed UI featuring the integrated Monaco Editor (the engine behind VS Code) for a professional coding environment.
    

🛠️ Tech Stack
--------------

The project is a full-stack TypeScript monorepo with a clear separation of concerns.

**Technology**

**Frontend**

React 18, TypeScript, Vite, Tailwind CSS, Shadcn/ui, TanStack Query, Monaco Editor

**Backend**

Node.js, Express.js, TypeScript, Passport.js, Zod

**Database**

PostgreSQL (hosted on Neon), Drizzle ORM

**Code Judge**

Node.js child\_process API for sandboxed execution

**Dev Tools**

tsx for live server reloading, drizzle-kit for migrations

🏁 Getting Started: Local Setup Guide
-------------------------------------

Follow these steps to get a local copy of CodeBattle Arena up and running on your machine.

### 1\. Prerequisites

*   **Node.js:** v18 or higher.
    
*   **Git:** For cloning the repository.
    
*   **Neon Account:** You will need a free account from [Neon](https://neon.tech/) to create your cloud PostgreSQL database.
    

### 2\. Clone the Repository

```
git clone https://github.com/dipankarchettri/CodeBattle-Arena.git
cd CodeBattleArena  
``` 

### 3\. Install Dependencies

This is a monorepo, so all dependencies are managed from the root package.json.

 ```
npm install  
   ```

### 4\. Set Up Environment Variables (Crucial Step!)

The server requires a database connection string and a session secret to run.

1.  **Create a .env file** in the **root** of the project directory.
    
2.  \# .env.example# \
Get this from your Neon project dashboard (Pooled connection string)
DATABASE\_URL="postgres://user:password@ep-....aws.neon.tech/neondb?sslmode=require"\
Generate a long, random string for thisSESSION\_SECRET="your-super-long-and-random-session-secret"
    
3.  **Get Your DATABASE\_URL:**
    
    *   Log in to your [Neon](https://neon.tech/) account and go to your project dashboard.
        
    *   In the **Connection Details** widget, make sure the **"Pooled connection"** checkbox is selected.
        
    *   Copy the full connection string and paste it into your .env file.
        
4.  **Generate Your SESSION\_SECRET:**
    
    *   openssl rand -base64 32
        
    *   Copy the output and paste it into your .env file.
        

### 5\. Push the Database Schema

With your .env file configured, you can now create the tables in your Neon database using Drizzle.
```
npm run db:push   
```

You should see a message confirming that the changes were applied.

### 6\. Run the Application

You are now ready to start the development server! This single command will start both the backend server and the frontend Vite server concurrently.
```
npm run dev   
```

Your application should now be running!

*   **Backend API:** http://localhost:5000
    
*   **Frontend App:** http://localhost:5173 (This is the URL to open in your browser)
    

📂 Project Structure
--------------------

The project is organized as a monorepo with three main directories:

`client/         # React frontend application (Vite, Shadcn)    
server/         # Express.js backend API (Node.js, Drizzle)     
shared/         # Shared code, primarily the Drizzle database schema 
.env            # Local environment secrets (DO NOT COMMIT)  package.json    # Root dependencies and scripts   `

🗺️ Future Roadmap
------------------

*   \[ \] **Admin Panel:** A dedicated interface for creating, editing, and managing problems and events.
    
*   \[ \] **JavaScript Judge:** Implement the executeJavaScript function to support JS submissions.
    
*   \[ \] **Contest Mode:** A special mode with time limits, a private leaderboard, and restricted problem access.
    
*   \[ \] **Team Competitions:** Allow users to form teams and compete together.
    
*   \[ \] **Deployment:** Add Dockerfile for backend and instructions for deploying to a VPS or a service like Fly.io.
