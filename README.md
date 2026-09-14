# AlgoMentor — Frontend Application

An interactive, high-performance Data Structures & Algorithms (DSA) learning platform and AI coding tutor built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**.

AlgoMentor combines structured concept notes, interactive LeetCode-style coding challenges, real-time algorithm visualizers, daily streak tracking, and a context-aware AI tutor.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Development & Build Scripts](#development--build-scripts)
- [Key Modules & Components](#key-modules--components)
  - [1. Study Notes & Curriculum](#1-study-notes--curriculum)
  - [2. Interactive Coding Practice](#2-interactive-coding-practice)
  - [3. Context-Aware AI Tutor](#3-context-aware-ai-tutor)
  - [4. Algorithm & Complexity Visualizer](#4-algorithm--complexity-visualizer)
  - [5. Progress & Streaks](#5-progress--streaks)
  - [6. Admin & Database Inspector](#6-admin--database-inspector)
- [Backend Integration](#backend-integration)
- [Security & Environment Variables](#security--environment-variables)
- [License](#license)

---

## Features

- 📚 **Comprehensive DSA Curriculum**: Curated guides across Arrays, Two Pointers, Sliding Window, Linked Lists, Trees, Graphs, Dynamic Programming, and more.
- 💻 **Interactive Code Practice Panel**: LeetCode-style code editor with syntax highlighting, custom test case execution, multiple programming languages (JavaScript, Python, Java, C++, TypeScript), and real-time execution results.
- 🤖 **Context-Aware AI Tutor**: Integrated chat panel powered by Google Gemini that inspects the user's active topic, problem description, notes, and code in real time to provide targeted hints, explanations, and debugging help.
- 🔍 **Interactive Code Reviews**: Instant AI code review evaluating time/space complexity, edge cases, and code style.
- 📊 **Dynamic Algorithm Visualizers**: Step-by-step visual demonstrations for searching, sorting, and tree traversals with adjustable speed.
- 📈 **Big-O Complexity Visualizer**: Visual comparison of $O(1)$, $O(\log n)$, $O(n)$, $O(n \log n)$, $O(n^2)$, and $O(2^n)$ runtime curves.
- 🔥 **Daily Streaks & Mastery Heatmap**: GitHub/LeetCode-style activity grid, streak counters, and per-topic mastery indicators.
- 📝 **Topic Quizzes**: Concept-check quizzes with instant validation and answer explanations.
- ⚡ **Supabase Cloud Sync & Local Fallback**: Seamless offline-ready experience with `localStorage` and optional Supabase database synchronization.
- 🛠️ **Admin & Problem Seeder**: Built-in admin dashboard to inspect Supabase tables, seed standard DSA problem sets, and test connections.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Bundler & Tooling** | [Vite 6](https://vite.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with CSS variables & dark palette |
| **Animations** | [Motion](https://motion.dev/) (Framer Motion v12) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **State Management** | React Context API (`AppContext`) + Browser `localStorage` |
| **Cloud Database / Auth** | [Supabase Client](https://supabase.com/docs/reference/javascript) (`@supabase/supabase-js`) |
| **AI Integration** | Google Gemini API (`@google/genai`) & Node.js Backend Proxy |

---

## Project Structure

```
├── index.html                  # HTML entry point with metadata & fonts
├── package.json                # Project dependencies and workspace scripts
├── vite.config.ts              # Vite configuration with Tailwind CSS plugin
├── tsconfig.json               # TypeScript compiler configuration
├── metadata.json               # Application metadata
├── .env.example                # Example environment variable declarations
├── .gitignore                  # Git ignored files (.env, node_modules, dist)
├── src/
│   ├── main.tsx                # React DOM root entry point
│   ├── App.tsx                 # Root router and modal rendering container
│   ├── index.css               # Global styles, fonts, and Tailwind v4 imports
│   ├── types.ts                # Shared TypeScript models, enums, and interfaces
│   ├── context/
│   │   └── AppContext.tsx      # Global state provider (topics, problems, streaks, theme)
│   ├── pages/
│   │   ├── MainApp.tsx         # Primary 3-column learning and coding workspace
│   │   ├── LoginPage.tsx       # Supabase email & Google OAuth login screen
│   │   ├── OnboardingPage.tsx  # Interactive onboarding survey for skill level
│   │   └── AdminPanelPage.tsx  # Supabase database inspector and seed dashboard
│   ├── components/
│   │   ├── TopBar.tsx          # Navigation header, streak widget, and topic selector
│   │   ├── Sidebar.tsx         # Topic roadmap navigator with progress indicators
│   │   ├── NotesView.tsx       # Markdown topic study notes and code snippets
│   │   ├── PracticePanel.tsx   # Multi-language code editor, test runner, submission tab
│   │   ├── ChatPanel.tsx       # AI Tutor chatbox with code & context injection
│   │   ├── QuizSection.tsx     # Interactive topic assessment quiz component
│   │   ├── StreakModal.tsx     # Streak stats, heatmap, and study milestones
│   │   ├── ProgressModal.tsx   # Topic-by-topic mastery breakdown modal
│   │   ├── SettingsModal.tsx   # User profile, appearance, and API configuration
│   │   ├── ComplexityVisualizer.tsx # Interactive Big-O graph visualizer
│   │   └── visualizer/
│   │       └── DSAVisualizer.tsx    # Step-by-step algorithm animation engine
│   ├── services/
│   │   ├── geminiClient.ts     # Client-side Gemini fallback client
│   │   └── supabaseAdminService.ts # Supabase administrative CRUD and table inspector
│   ├── data/
│   │   ├── dsaTopics.ts        # Comprehensive list of DSA topics and roadmap items
│   │   ├── topicDetails.ts     # In-depth theory notes, problems, and quizzes
│   │   └── visualizationsData.ts # Data structures and animation step definitions
│   └── utils/
│       └── dsaProgress.ts      # Progress calculation and streak utility functions
└── backend/                    # Dedicated Express + TypeScript backend (optional)
```

---

## Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **npm**: `v9.0.0` or higher (or `pnpm` / `bun` / `yarn`)

### Installation

1. Clone or navigate to the repository root:
   ```bash
   git clone <repository-url>
   cd algomentor
   ```

2. Install all frontend dependencies:
   ```bash
   npm install
   ```

### Environment Configuration

Create a local environment file based on the provided template:

```bash
cp .env.example .env
```

Configure the following variables in `.env`:

```env
# Supabase Configuration (Optional - enables cloud persistence and auth)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Backend API Endpoint (defaults to local Express server)
VITE_BACKEND_URL=http://localhost:3000

# Google Gemini API Key (Server-side only; do not expose in public repositories)
GEMINI_API_KEY=your-gemini-api-key
```

> **Security Note:** Never commit `.env` or `.env.local` files containing live secrets to version control. The repository's `.gitignore` automatically prevents them from being tracked.

### Development & Build Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server at `http://localhost:3000` |
| `npm run build` | Compiles TypeScript and creates an optimized production bundle in `dist/` |
| `npm run preview` | Serves the production build locally for verification |
| `npm run lint` | Runs the TypeScript compiler (`tsc --noEmit`) to validate type safety |
| `npm run clean` | Cleans up the `dist/` folder and temporary build artifacts |
| `npm run backend:dev` | Runs the backend server in development mode |
| `npm run backend:build` | Compiles the backend TypeScript service |
| `npm run backend:test` | Runs the backend automated test suite |

---

## Key Modules & Components

### 1. Study Notes & Curriculum
- **Location:** `src/components/NotesView.tsx` & `src/data/topicDetails.ts`
- Provides comprehensive explanations, algorithmic patterns (e.g., Two Pointers, Fast & Slow Pointers), visual ASCII diagrams, and time/space complexity comparisons for each topic.
- Includes embedded quizzes (`src/components/QuizSection.tsx`) to assess comprehension before coding.

### 2. Interactive Coding Practice
- **Location:** `src/components/PracticePanel.tsx`
- Features an IDE-style code editor with:
  - Language selection: **JavaScript**, **Python**, **Java**, **C++**, **TypeScript**.
  - Boilerplate generator per problem and language.
  - Tabbed interface: Problem Description, Starter Code / Editor, Test Cases, and Results.
  - Test runner supporting multiple standard and custom test cases.
  - One-click **"Review with AI"** button to analyze solutions.

### 3. Context-Aware AI Tutor
- **Location:** `src/components/ChatPanel.tsx`
- Chat panel that assists the learner without giving away answers directly.
- Automatically includes:
  - Current topic name and active subtopic.
  - Active problem statement and constraints.
  - Current editor code and selected programming language.
  - Quick action prompt chips: *"Give me a hint"*, *"Explain time complexity"*, *"Find the bug"*, and *"Walk through test case"*.

### 4. Algorithm & Complexity Visualizer
- **Location:** `src/components/visualizer/DSAVisualizer.tsx` & `src/components/ComplexityVisualizer.tsx`
- Renders step-by-step visual state changes for algorithms (Array indexing, Binary Search boundaries, Stack push/pop operations).
- Playback controls include: Play, Pause, Step Forward, Step Backward, and Speed Slider ($0.5\times$ to $2\times$).

### 5. Progress & Streaks
- **Location:** `src/components/StreakModal.tsx`, `src/components/ProgressModal.tsx`, `src/utils/dsaProgress.ts`
- Tracks daily practice streaks, problems solved by difficulty (Easy, Medium, Hard), total study time, and per-category mastery percentages.
- Automatically persists data to `localStorage` under `algomentor_progress` and syncs with Supabase when signed in.

### 6. Admin & Database Inspector
- **Location:** `src/pages/AdminPanelPage.tsx`
- Allows developers and administrators to:
  - Test live Supabase connection status.
  - View record counts and inspect rows across `profiles`, `problems`, `user_progress`, and `code_submissions`.
  - Seed 15+ standard DSA problems directly into Supabase with one click.

---

## Backend Integration

While AlgoMentor can run as a standalone client application, it pairs seamlessly with the Express backend located in `/backend`.

- **Health Check:** `GET /api/health`
- **AI Chatbot:** `POST /api/chat` (receives user message + screen context, returns Gemini tutor response)
- **Code Review:** `POST /api/review` (evaluates code, complexity, edge cases, and best practices)
- **Code Execution:** `POST /api/code/run` (sandboxed code execution against test cases)
- **User Progress:** `GET /api/progress`, `POST /api/progress` (persists topic progress)

When running both services locally:
1. Start the backend: `npm run backend:dev` (runs on `http://localhost:3001` or configured port).
2. Start the frontend: `npm run dev` (runs on `http://localhost:3000`).

---

## Security & Environment Variables

1. **Client-Side vs Server-Side Variables:**
   - Variables prefixed with `VITE_` (such as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) are exposed to the client bundle by design.
   - Private secrets (such as `GEMINI_API_KEY` or `SUPABASE_SERVICE_ROLE_KEY`) should **never** be prefixed with `VITE_` and should remain strictly on the backend.
2. **Git Hygiene:**
   - Both root and backend `.gitignore` configurations exclude `.env`, `.env.local`, and build artifacts from version control.

---

## License

This project is licensed under the [MIT License](LICENSE).`
