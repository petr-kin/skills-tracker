# QA Skills Development Tracker

https://petr-kin.github.io/skills-tracker

An interactive React-based app for tracking QA skill progress, courses, and projects. Designed for QA professionals focused on automation, testing methodologies, and career growth.

---

## ✨ Features

* **Skill Tracking**: Rate your skill level (Beginner to Advanced) across testing frameworks, languages, tools, and methodologies.
* **Priority Management**: Assign and sort by priority (High, Medium, Low, None).
* **Course Management**: Track planned, in-progress, and completed courses with metadata.
* **Project Tracking**: Log real QA projects with tech stacks, notes, and GitHub URLs.
* **Searchable Interface**: Easily filter skills, courses, and projects.
* **GitHub Sync**: Save and load your progress to a GitHub repo using a personal access token.
* **Persistent Storage**: LocalStorage fallback ensures your data is never lost.

---

## ⚡ Tech Stack

* **React** (with hooks)
* **LocalStorage** for offline persistence
* **GitHub REST API v3** (via Octokit) for sync

---

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/qa-skills-tracker.git
cd qa-skills-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

App will be available at `http://localhost:3000`

---

## 📂 File Overview

* `App.js` - Main component with tabs for skills, courses, and projects
* `initialSkills.js` - Predefined QA skills and categories
* `utils/github.js` - GitHub auth and file save/load functions

---

## 💼 GitHub Integration

To enable sync with GitHub:

1. Generate a **Personal Access Token** [here](https://github.com/settings/tokens/new) with `repo` scope.
2. Click **"Connect to GitHub"** in the app.
3. Provide:

   * Your GitHub token
   * GitHub username
   * Repository name (must already exist)

App saves these files:

* `qa-skills-data.json`
* `qa-courses-data.json`
* `qa-projects-data.json`

You can disconnect anytime. Local data is retained.

---

## 📉 Skill Levels

* `0`: Not Started
* `1`: Beginner
* `2`: Intermediate
* `3`: Advanced

---

## 📊 Categories

* **Frameworks**: Playwright, Selenium, Cypress, etc.
* **Languages**: JavaScript, Python, TypeScript, etc.
* **Testing Skills**: API, E2E, Unit Testing, Security, etc.
* **Methodologies**: Agile, TDD, CI/CD, DevOps
* **Tools**: GitHub Actions, Postman, Docker, JIRA
* **Databases**: MySQL, PostgreSQL, MongoDB, etc.

---

## 📊 Progress

* Tracked visually per category
* Overall progress indicator
* Reset button available to clear all data

---

## 🛠️ Customization

* Modify `initialSkills`, `initialCourses`, or `initialProjects` directly
* Extend with more tabs (e.g., certifications, job apps)

---

## 📗 License

MIT License © 2025 Petr Kindlmann

---

## 🎓 Credits

* Built with love for QA engineers
* Powered by [Octokit](https://github.com/octokit/rest.js)
* Initial UI inspired by [Tailwind](https://tailwindcss.com/) components

---

## 🎨 Preview

![Screenshot](./screenshot.png) *(Add a screenshot once available)*
