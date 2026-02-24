# ResumeAI

ResumeAI is a cutting-edge, AI-powered platform designed to analyze, optimize, and build professional resumes that bypass Applicant Tracking Systems (ATS) and land you interviews. It provides a comprehensive suite of career tools wrapped in a stunning, modern UI.

## Features

- **AI Resume Builder:** Create professional, ATS-friendly resumes using our intuitive builder. AI suggestions help you write bullet points, summaries, and skills.
- **ATS Analysis Engine:** Upload your existing resume and a target job description. Our AI neural engine decodes recruiter algorithms, providing a deep scan of keyword density, format compatibility, and skill gaps to give you a matching score and actionable feedback.
- **Mock Interviews:** Practice for the real thing with our AI Mock Interview engine. It generates tailored questions based on your resume and provides instant feedback and sentiment analysis on your answers.
- **Premium Templates:** Choose from a curated selection of fully customizable, professional resume templates designed for different industries and experience levels.
- **Multi-language Support (i18n):** Fully available in English and Arabic, with complete Right-to-Left (RTL) layout support.
- **Dark Mode:** A sleek, premium dark mode using the 'Slate' color palette for reduced eye strain and a modern aesthetic.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.

## Tech Stack

This project is built with a modern, robust technology stack:

- **Frontend Framework:** Angular 20
- **Styling:** Tailwind CSS (v3.4), SCSS
- **State Management & Reactivity:** Angular Signals, RxJS
- **Authentication & Backend:** Firebase / AngularFire (Authentication, Firestore Database, Storage)
- **Internationalization:** `@ngx-translate/core`
- **AI Integrations:** OpenRouter AI (used for LLM capabilities in resume building and analysis)
- **PDF Generation & Document Parsing:** `jspdf`, `html2pdf.js`, `mammoth` (DOCX parsing), `tesseract.js` (OCR), `pdfjs-dist`
- **Charts:** `ng2-charts` & `chart.js` (for visual data representation)

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (v20 or higher recommended)
- npm (v11 or higher)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ResumeAi2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   *Note: This project strictly uses `npm` as defined in package.json.*

3. **Environment Configuration:**
   You will need to set up your environment variables for Firebase and the AI Service (OpenRouter).
   Create `src/environments/environment.ts` and `src/environments/environment.development.ts` with your specific API keys:
   ```typescript
   export const environment = {
     production: false,
     firebase: {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     },
     openRouterApiKey: "YOUR_OPENROUTER_API_KEY"
   };
   ```

### Development Server

Run the following command to start the development server:
```bash
npm run start
# or
ng serve
```
Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

### Building for Production

To build the project for a production environment, run:
```bash
npm run build
# or
ng build
```
The build artifacts will be stored in the `dist/` directory.

### Server-Side Rendering (SSR)

This project supports Angular Server-Side Rendering. To run the SSR build locally:
```bash
npm run serve:ssr:resume-ai
```

## Project Structure (Key Directories)

- `src/app/core/`: Application-wide singleton services (Auth, Theme, Language, AI Integration, Parsing), guards, and interceptors.
- `src/app/shared/`: Reusable components (Header, Footer, UI elements), directives, and pipes.
- `src/app/pages/`: Feature modules and route components (Home, CV Creation, ATS Analysis, Mock Interview, Profile, Auth).
- `public/assets/i18n/`: Translation files for internationalization (`en.json`, `ar.json`).
- `src/styles.css` / `src/styles.scss`: Global styles, Tailwind directives, and core theme definitions.

## Key Services

- `ThemeService`: Manages global Light/Dark mode state and persistence via `localStorage`.
- `LanguageService`: Handles English/Arabic switching, RTL layout application, and translation synchronization.
- `AuthService`: Integrates with Firebase Authentication for user sessions.
- `AtsService` / `OpenRouterAiService`: Manages the communication with AI models for resume analysis and content generation.

## License

© 2026 ResumeAI. All rights reserved.
