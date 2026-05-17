# 🚀 CareerCopilot AI — AI-Powered Resume Analyzer

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Clerk Auth](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.dev/)
[![Gemini](https://img.shields.io/badge/AI-Google_Gemini-orange?style=for-the-badge&logo=google-gemini)](https://deepmind.google/technologies/gemini/)

**CareerCopilot AI** is a premium, state-of-the-art SaaS platform designed to help job seekers instantly optimize their resumes using artificial intelligence. By combining Google Gemini's advanced LLMs, modern server-side PDF extraction, Clerk authentication, and secure MongoDB data persistence, CareerCopilot provides job seekers with a direct ATS score, keyword analysis, suggestions for improvements, and career-boosting insights.

---

## ✨ Key Features

- 📄 **Server-Side PDF Parsing:** Uses `pdf-parse` powered by an isolated Node.js legacy PDF.js worker. It extracts raw text seamlessly without needing any expensive external processing APIs.
- ⚡ **Multi-Model Gemini Fallback Pipeline:** A custom-engineered AI pipeline that intelligently switches between Google's models (`gemini-2.5-flash` ➡️ `gemini-1.5-flash` ➡️ `gemini-pro`) to ensure 99.9% application uptime, even during heavy traffic or model deprecation phases.
- 🔒 **Enterprise Authentication:** Out-of-the-box secure login and registration flow handled by **Clerk Auth**, protected at the Next.js middleware level.
- 📊 **Detailed ATS Reports:** Returns an ATS score, standard summary, key strengths (highlighted green), missing skills (highlighted orange), and structured recommendations.
- 🗄️ **MongoDB History:** Automatically tracks and saves analyzed resumes and reports per user ID so applicants can view past feedback anytime.
- 🎨 **Premium Aesthetics:** Built with Tailwind CSS v4 featuring glassmorphic cards, smooth interactive animations, responsive flex layouts, and a curated slate-dark palette.

---

## 🏗️ Folder Structure

```text
careercopilot-ai/
├── app/                      # Next.js App Router
│   ├── api/                  # Backend REST APIs (PDF parse & Gemini AI Engine)
│   ├── dashboard/            # User Progress Analytics & Resume History
│   ├── sign-up/              # Clerk sign-up setup
│   ├── layout.tsx            # Global layout wrapper with Clerk Provider
│   └── page.tsx              # Premium Landing Page with feature highlights
├── components/               # Modular UI Components (Navbar, Hero, Upload Box, etc.)
├── lib/                      # Helper libraries & database clients
├── models/                   # Mongoose DB schema definitions
├── .env.local                # Local environment secrets (Git ignored)
├── .gitignore                # Safeguards environment variables from leak
└── README.md                 # Public-facing repository documentation
```

---

## 🚀 Quick Local Setup

Follow these steps to run the project locally on your machine:

### 1. Prerequisites
Ensure you have **Node.js** (v18.x or above) and a running instance of **MongoDB** (Atlas or local).

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/careercopilot-ai.git
cd careercopilot-ai
npm install
```

### 3. Environment Variables Configuration
Create a `.env.local` file in the root folder of the project and populate it with the following keys:

```ini
# MongoDB Connection String
MONGODB_URI=your_mongodb_connection_string

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application in action!

---

## 🛠️ Detailed Architecture

For a deep logical dive into how the backend parsers work, the multi-model AI routing, and the design reasoning, please read our comprehensive **[TECHNICAL_DOC.md](file:///c:/Users/Muhammad/Desktop/careercopilot-ai/TECHNICAL_DOC.md)**.

---

## 🤝 Contribution Guidelines

Contributions are welcome! If you find a bug or have a suggestion, feel free to open an issue or submit a pull request.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

*Built with ❤️ to elevate your career.*
