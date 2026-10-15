# Prompt History Record (PHR)

- **ID**: `005-ui-upgrade-012`
- **Date**: `2026-10-15`
- **Type**: `green`
- **Status**: `COMPLETED`
- **User Prompt**: "poora project is repo m update krdo \"git remote add origin https://github.com/SainBux-HadiSeelro/agentic-humanoid-robotics-book.git\""

## Context
Configured git remote `origin` to `https://github.com/SainBux-HadiSeelro/agentic-humanoid-robotics-book.git`, updated Docusaurus config (`baseUrl`, `organizationName`, `projectName`, social links), updated root `README.md` live demo and repository links, and pushed the complete project to `main`.

## Changes Made
1. **Docusaurus Config** ([`frontend_book/docusaurus.config.ts`](file:///c:/Users/dell/Desktop/hackathon_1/frontend_book/docusaurus.config.ts)):
   - Configured `url: 'https://sainbux-hadiseelro.github.io'`.
   - Configured `baseUrl: '/agentic-humanoid-robotics-book/'`.
   - Configured `organizationName: 'SainBux-HadiSeelro'`.
   - Configured `projectName: 'agentic-humanoid-robotics-book'`.
   - Updated navbar & footer GitHub links to point to the repository.
2. **Root Documentation** ([`README.md`](file:///c:/Users/dell/Desktop/hackathon_1/README.md)):
   - Updated Live Demo badge URL to `https://sainbux-hadiseelro.github.io/agentic-humanoid-robotics-book/`.
   - Updated clone instruction and dev links.
3. **Git Remote & Deployment**:
   - Added remote origin `https://github.com/SainBux-HadiSeelro/agentic-humanoid-robotics-book.git`.
   - Executed `git push -u origin main` successfully.
