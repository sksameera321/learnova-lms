# LEARNOVA — Modern Learning Management Platform
### Next-Gen Engineering Academy for Autonomous Systems & Deep Computing

**Course Project Assignment 05** • Duration: 14 Days (Weeks 6–7)  
**Developer:** Sameera Bhanu (1st Year B.Tech CSE, Shri Vishnu Engineering College for Women – SVECW, Bhimavaram)  
**Live Application:** [https://sksameera321.github.io/learnova-lms/](https://sksameera321.github.io/learnova-lms/)  
**GitHub Repository:** [https://github.com/sksameera321/learnova-lms](https://github.com/sksameera321/learnova-lms)  

---

## 1. Project Objective & Vision

**LEARNOVA** is a high-performance, immersive Learning Management System (LMS) built from the ground up for modern engineering disciplines: **Autonomous AI Agents**, **Distributed Consensus (Raft/Paxos)**, **React 19 Server Architecture**, **Zero-Trust Cybersecurity**, **Creative WebGL / UI Engineering**, and **Quantum Computing**.

Rather than following generic corporate slide-deck LMS templates, LEARNOVA is designed as an **active engineering workstation**:
- An integrated **distraction-free video theatre** with variable playback speeds (1x, 1.25x, 1.5x, 2x).
- A **persistent student scratchpad** that auto-saves personal lesson notes per module to `LocalStorage`.
- An **interactive certification exam engine** with randomized multiple-choice assessment, pass/fail thresholds (75%), and in-depth pedagogical answer breakdowns.
- **Verifiable official diplomas** with cryptographically structured verification IDs, dean signatures, and isolated print styles for direct PDF export.
- Real-time student telemetry tracking active study streaks (🔥 14 days), skill XP, weekly goal progress, and course milestones.

---

## 2. Creative Direction & Brand Identity

### Brand Architecture
- **Brand Wordmark:** `LEARNOVA // Quantum & Next-Gen Engineering Academy`
- **Visual Aesthetic:** Luminous obsidian cyber-editorial with subtle skeuomorphic physical depth.
- **Color Palette:**
  - Obsidian Space Base: `#07090e`, `#0d121d`, `#131a29`
  - Electric Cyan Glow: `#38bdf8` (representing neural communication and data streams)
  - Quantum Indigo: `#6366f1` (primary action and brand identity)
  - Cyber Violet: `#a855f7` (secondary highlights)
  - Emerald Verification: `#10b981` (lesson completion, passing grades, certificates)
  - Solar Amber: `#f59e0b` (study streaks and badges)
- **Typography:**
  - Headlines: *Space Grotesk* (high-tech geometric precision)
  - Body & UI: *Plus Jakarta Sans* (refined legibility and modern proportions)
  - Code & Telemetry: *JetBrains Mono* (monospaced syntax clarity)
- **Dual-Theme Engine:** Deep Quantum Obsidian (Dark) and Clean Editorial Paper (Light) with 1-click persistent toggle.

---

## 3. Core Pages & Feature Breakdown

### A. Landing Page (`/`)
- Dynamic brand hero with animated platform telemetry counters (48,000+ Active Learners, 94.2% Completion Rate).
- Interactive course search bar with instant query forwarding to discovery.
- Popular Disciplines Bento Grid with category filters and lesson counts.
- Flagship Masterclasses showcase featuring lead instructors from DeepMind, Stripe, and AWS DynamoDB teams.
- "Why Engineers Choose LEARNOVA" architectural breakdown.
- Verified student testimonials with company and role attribution.
- High-impact call to action banner.

### B. Course Discovery Page (`/courses`)
- Instant keyword search filtering across title, description, skills, and instructor.
- Discipline filter pills (`All Categories`, `Artificial Intelligence`, `Distributed Systems`, `Full-Stack`, `Cybersecurity`, `UI/UX`, `Quantum`).
- Difficulty level selector (`All Levels`, `Beginner`, `Intermediate`, `Advanced`).
- Sort by Popularity, Rating, or Duration.
- Dynamic count summary and clean empty state with one-click filter reset.

### C. Course Detail Page (`/courses/:courseId`)
- Cinematic hero banner with star ratings, enrolled students, difficulty, and duration.
- Lead instructor profile card with credentials and research background.
- "What You Will Master" learning objectives checklist.
- Skills acquired tag cloud and prerequisites list.
- Expandable curriculum accordion displaying modules, lesson durations, and preview video flags.
- Sticky action card adapting to enrollment state (1-click free enrollment vs. "Resume Learning" with live % progress bar).

### D. Classroom & Lesson Player (`/learn/:courseId/:lessonId`)
- Distraction-free full-bleed learning theatre.
- Responsive HTML5 Video Player with custom controls, time display, play/pause, volume mute, and variable speed toggles.
- Lesson breadcrumb hierarchy and active module tag.
- Stepper buttons: `← Previous Lesson` and `Next Lesson →`.
- "Mark as Complete" toggle awarding +50 XP and auto-advancing the course progress bar.
- Dual-tab workstation:
  - **Lesson Overview**: In-depth theoretical concepts, syntax-highlighted code block with 1-click clipboard copy, and downloadable resource pills.
  - **Personal Scratchpad**: Interactive student notes editor with automatic `LocalStorage` sync per lesson.
- Collapsible curriculum sidebar with real-time green checkmarks on completed lessons and active lesson highlight.

### E. Certification Quiz System (`/quiz/:courseId`)
- Rigorous multiple-choice exams covering foundational and advanced architecture concepts.
- Step-by-step question navigation with real-time question progress indicator.
- Instant submission validation ensuring no unanswered questions remain.
- Pedagogical Result View:
  - Score percentage dial with 75% pass/fail rubric.
  - Confetti burst celebration upon passing!
  - In-depth question-by-question review showing the student's answer, correct answer, and an architectural explanation of why the answer is correct.
  - One-click unlock for the official verifiable diploma.

### F. Student Dashboard (`/dashboard`)
- Personalized welcome banner with active study streak (🔥 14 days), total XP (3,450 XP), and academic level.
- Primary "Continue Learning" hero card displaying the last accessed lesson and resume button.
- 4-metric learning analytics telemetry (Enrolled Tracks, Completed Lessons, Quiz Average, Weekly Target).
- Enrolled courses grid with live % progress meters, classroom jump buttons, and exam triggers.
- Verified Credentials Showcase with 1-click modal to view and print official certificates of mastery.

### G. Simulated Authentication & Student Profile (`/login`, `/register`, `/profile`)
- Form validation (valid email regex, minimum password length, required fields).
- "Auto-Fill Demo Student (Sameera)" button for zero-friction review testing.
- Student profile editor allowing updates to name, university, and bio.
- Persistent session state stored in `LocalStorage`.

---

## 4. Technical Architecture & Component Tree

```
learnova-lms/
├── public/
│   ├── favicon.svg             # Glowing quantum brand icon
│   └── .nojekyll               # GitHub Pages Jekyll bypass
├── src/
│   ├── assets/                 # Icons and image assets
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx      # Sticky blur header with search & theme switch
│   │   │   ├── Footer.jsx      # Multi-column footer with developer attribution
│   │   │   └── CertificateModal.jsx # Printable high-res diploma with print CSS
│   │   └── course/
│   │       └── CourseCard.jsx  # Reusable card with progress overlay
│   ├── context/
│   │   ├── AuthContext.jsx     # Simulated auth, student credentials & LocalStorage
│   │   ├── LearningContext.jsx # Course enrollments, lesson progress, notes, quiz scores
│   │   ├── ThemeContext.jsx    # Dark/Light theme token switcher
│   │   └── ToastContext.jsx    # Auto-dismissing notification stack
│   ├── data/
│   │   └── coursesData.js      # 6 comprehensive masterclasses with lessons, code & quizzes
│   ├── pages/
│   │   ├── LandingPage.jsx     # Hero, stats, bento, featured courses, testimonials
│   │   ├── CoursesPage.jsx     # Search, multi-filtering, sorting, catalogue grid
│   │   ├── CourseDetailPage.jsx# Curriculum accordion, objectives, enroll action
│   │   ├── LessonPlayerPage.jsx# Video player, speed controls, scratchpad, sidebar
│   │   ├── QuizPage.jsx        # Question steps, grading rubric, pedagogical review
│   │   ├── DashboardPage.jsx   # Telemetry, active course resume, diplomas
│   │   ├── LoginPage.jsx       # Auth portal with demo credentials auto-fill
│   │   ├── RegisterPage.jsx    # Student registration with validation
│   │   ├── ProfilePage.jsx     # Profile management & enrolled track overview
│   │   └── NotFoundPage.jsx    # 404 handler
│   ├── styles/
│   │   ├── variables.css       # Design tokens (colors, gradients, shadows, fonts)
│   │   ├── animations.css      # Keyframes for ambient mesh, glows, sweeps
│   │   └── main.css            # Base typography, button depth, debossed wells
│   ├── App.jsx                 # HashRouter setup & route declaration
│   ├── index.css               # Global CSS importer
│   └── main.jsx                # React 19 entry point
├── index.html                  # HTML5 shell with Google Fonts
├── vite.config.js              # Vite bundler config with base: './'
└── package.json
```

---

## 5. Five Technical Challenges & Their Solutions

### Challenge 1: Frictionless GitHub Pages Single Page Application (SPA) Routing
- **Problem:** Deploying React Router with standard `BrowserRouter` on GitHub Pages produces HTTP 404 errors whenever a user refreshes deep URLs like `/courses/gen-ai-agents` or `/dashboard`, because static web servers look for a physical directory structure.
- **Solution:** Implemented `HashRouter` (`#/courses/...`) combined with `base: './'` in `vite.config.js` and a root `.nojekyll` file. This guarantees 100% dependable navigation and refresh resilience on GitHub Pages without server-side rewrite rules.

### Challenge 2: Synchronizing Lesson Completion with Dynamic Course Progress & Telemetry
- **Problem:** When a user completes or un-completes a lesson, multiple disparate parts of the UI must update instantly: the classroom sidebar checkbox, the course progress percentage bar, the top breadcrumb, the overall dashboard analytics counter, and the certification unlock status.
- **Solution:** Centralized state in `LearningContext.jsx` with fine-grained memoized helpers (`getCourseProgress(courseId)` and `getOverallTelemetry()`). Toggling completion atomically recalculates completed lessons, checks if the total lesson threshold is satisfied, triggers `canvas-confetti` when a course is conquered, and persists the payload into `LocalStorage`.

### Challenge 3: Reliable Video Streaming with Custom Speed & Distraction-Free Theatre
- **Problem:** Standard browser `<video>` controls look inconsistent across Chrome, Safari, Edge, and mobile browsers, and commercial video links can suffer from CORS blocking or broken playback.
- **Solution:** Architected a bespoke overlay control bar using React refs (`videoRef.current`). Engineered custom handlers for play/pause, mute, and variable playback rates (`1x`, `1.25x`, `1.5x`, `2x`), combined with dependable open educational web video streams and an `onEnded` event listener that automatically marks the lesson complete.

### Challenge 4: Per-Lesson Student Scratchpad with LocalStorage Isolation
- **Problem:** Students need to take notes on individual lessons without having their notes overwrite other lessons or disappear on browser refresh.
- **Solution:** Keyed scratchpad notes under a composite identifier `${courseId}_${lessonId}` in `LearningContext`. Implemented a controlled textarea that instantly updates state and syncs to `localStorage` with zero latency, ensuring every lesson retains its distinct notes log.

### Challenge 5: High-Resolution Printable Diploma with CSS Print Isolation
- **Problem:** Using `window.print()` directly prints the entire webpage (navigation bar, background mesh, buttons, scrollbars), ruining the aesthetics of a student certificate.
- **Solution:** Implemented a targeted print stylesheet media query (`@media print`) inside `CertificateModal.jsx`. It sets `visibility: hidden` on all elements except `.printable-certificate`, removes navigation controls via `.no-print`, and renders a clean, high-contrast, gold-framed academic diploma ready for PDF export or framing.

---

## 6. Local Setup & Execution

To run the application locally on your workstation:

```bash
# 1. Clone repository
git clone https://github.com/sksameera321/learnova-lms.git

# 2. Enter project directory
cd learnova-lms

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev

# 5. Build optimized production bundle
npm run build
```

---

## 7. Developer & Academic Credit

- **Architect & Developer:** Sameera Bhanu  
- **Institution:** Shri Vishnu Engineering College for Women (SVECW), Bhimavaram  
- **Department:** Computer Science & Engineering (1st Year B.Tech)  
- **Assignment:** Project Assignment 05 (Modern Learning Management Platform)
