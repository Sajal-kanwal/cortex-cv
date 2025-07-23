<div align="center">
  <img src="public/images/resume-scan-2.gif" alt="Cortex-CV" width="200px" />
  <h1 align="center">Cortex-CV: Your Personal AI Resume Coach</h1>
  <p align="center">
    <a href="#-about-the-project">About</a> •
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#-user-flow">User Flow</a>
  </p>
</div>

---

## 🤖 About The Project

Cortex-CV is a sophisticated, full-stack resume analyzer designed to empower job seekers by providing them with AI-driven insights into their resumes. By leveraging the serverless capabilities of Puter.js, Cortex-CV offers a seamless and interactive experience for users to upload, analyze, and enhance their resumes, ultimately increasing their chances of landing their dream job.

At its core, Cortex-CV is more than just a tool; it's a personal resume coach that provides actionable feedback and a comprehensive analysis of your resume's strengths and weaknesses. Whether you're a recent graduate or a seasoned professional, Cortex-CV is here to help you put your best foot forward.

## ✨ Features

- **AI-Powered Resume Analysis:** Get detailed feedback on your resume's content, formatting, and keyword optimization.
- **ATS Friendliness Score:** See how well your resume is likely to perform with Applicant Tracking Systems (ATS).
- **Interactive UI:** A clean, modern, and responsive interface built with React and Tailwind CSS.
- **Secure File Uploads:** Drag-and-drop file uploads for a smooth user experience.
- **Serverless Architecture:** Powered by Puter.js for a scalable and efficient backend.
- **Detailed Resume View:** Analyze your resume section by section with AI-generated insights.
- **User Authentication:** Secure user authentication to keep your data private.
- **Resume Tracking:** Keep track of all your submitted resumes and their analysis reports.

## 🛠️ Tech Stack

| Category           | Technology                                                                                                                                                            |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**       | [React](https://react.dev/), [React Router](https://reactrouter.com/), [Tailwind CSS](https://tailwindcss.com/), [Vite](https://vitejs.dev/)                                     |
| **Backend**        | [Puter.js](https://puter.com/)                                                                                                                                        |
| **State Mgmt**     | [Zustand](https://zustand-demo.pmnd.rs/)                                                                                                                              |
| **PDF Processing** | [PDF.js](https://mozilla.github.io/pdf.js/)                                                                                                                           |
| **Linting**        | [ESLint](https://eslint.org/)                                                                                                                                         |
| **Formatting**     | [Prettier](https://prettier.io/)                                                                                                                                      |

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v20 or higher)
- npm

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/cortex-cv.git
    cd cortex-cv
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

## 📂 Project Structure

```
/cortex-cv
├── /app
│   ├── /routes
│   │   ├── home.tsx
│   │   ├── auth.tsx
│   │   ├── upload.tsx
│   │   └── resume.tsx
│   ├── app.css
│   ├── root.tsx
│   └── routes.ts
├── /public
│   ├── /icons
│   └── /images
├── package.json
├── vite.config.ts
└── README.md
```

## 🌊 User Flow

1.  **Authentication:** Users are first prompted to authenticate. This ensures that all resume data and analysis reports are kept private and secure.
2.  **Dashboard:** After logging in, users are taken to their dashboard, where they can view all their previously submitted resumes and their corresponding analysis reports.
3.  **Upload Resume:** Users can upload a new resume by providing the company name, job title, and job description, along with the resume file.
4.  **Analysis:** Once the resume is uploaded, Cortex-CV's AI engine analyzes the resume in the context of the provided job description.
5.  **View Report:** After the analysis is complete, users can view a detailed report that includes an ATS friendliness score, section-by-section feedback, and actionable suggestions for improvement.

---

<div align="center">
  <p>Made with ❤️ by [Your Name]</p>
</div>