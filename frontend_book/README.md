# Autonomous Humanoid Robotics & Physical AI Handbook (Frontend Book)

This package contains the Docusaurus frontend documentation and interactive simulation platform for the **Autonomous Humanoid Robotics & Physical AI Handbook**, created by **Sain Bux** (*Agentic AI Engineer & Forward Deployed Engineer*).

---

## ⚡ Quickstart

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
# or: npm start

# Run TypeScript type safety verification
npm run typecheck

# Build production static website
npm run build
```

---

## 📁 Architecture Overview

- `src/pages/index.tsx`: Main portfolio landing page with Sain Bux branding, live stats, and tech stack pills.
- `src/components/AgenticMissionConsole`: Interactive Multi-Agent Control Center (Task DAG decomposition, VLM grounding, Nav2 action dispatch, Safety watchdog).
- `src/components/AutonomousSimPlayground`: Interactive 2D Canvas robotics simulator with real-time 360° LiDAR raycasting and dynamic obstacle avoidance.
- `src/components/HomepageFeatures`: 4-Module interactive curriculum showcase cards.
- `src/theme/DocItem/Layout`: High-tech card reading surface with functional previous/next chapter pagination.
- `docs/`: Markdown curriculum covering ROS 2, Digital Twins (Gazebo/Unity), NVIDIA Isaac Sim™, and Vision-Language-Action (VLA).

---

## 📄 Documentation & Full Project README

For complete architecture diagrams, agentic workflows, and author contact information, please refer to the root [**README.md**](../README.md).
