---
id: 11
title: Set GitHub Repository Name and BaseURL to physical-ai-robotics-handbook
stage: green
date: 2026-10-15
surface: agent
model: gemini-3.8-flash
feature: 005-ui-upgrade
branch: 005-ui-upgrade
user: user
command: /sp.implement
labels: ["github", "repository-name", "baseUrl", "configuration", "docusaurus"]
links:
  spec: "specs/006-premium-ui-branding/spec.md"
  ticket: null
  adr: null
  pr: null
files:
  - frontend_book/docusaurus.config.ts
  - README.md
tests:
  - npm run typecheck
  - npm run build
---

## Prompt

set krlo ye
[Setting repo name to physical-ai-robotics-handbook]

## Response snapshot

Configured the repository and Docusaurus site name to `physical-ai-robotics-handbook`. Updated `baseUrl: '/physical-ai-robotics-handbook/'` and `projectName: 'physical-ai-robotics-handbook'` in `docusaurus.config.ts`. Updated live demo URLs, badges, and clone instructions in the root `README.md`. Verified that TypeScript and production build compile with 0 errors.

## Outcome

- ✅ Impact: Repository URL, GitHub Pages path, and documentation are now synchronized under the name `physical-ai-robotics-handbook`.
- 🧪 Tests: `npm run typecheck` passed (0 errors), `npm run build` compiled 100% cleanly.
- 📁 Files: `docusaurus.config.ts` and `README.md`.
- 🔁 Next prompts: none
- 🧠 Reflection: Keeping repo name, projectName, and baseUrl identical prevents routing and static asset pathing mismatches on GitHub Pages.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
