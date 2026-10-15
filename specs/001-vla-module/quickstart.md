# Quickstart Guide: Vision-Language-Action (VLA) Module

## Overview
This guide will help you get started with the Vision-Language-Action educational module. The module teaches how to integrate voice commands, visual input, and LLM-based cognitive planning to control simulated robots.

## Prerequisites
- Node.js 18+ installed
- Access to OpenAI API (for Whisper speech recognition)
- A modern web browser (Chrome, Firefox, or Safari)
- Basic knowledge of robotics concepts

## Setup Instructions

### 1. Clone and Setup the Repository
```bash
git clone [repository-url]
cd frontend_book
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
LLM_API_KEY=your_llm_api_key_here  # If using a different LLM provider
```

### 3. Start the Development Server
```bash
npm start
```

The documentation site will be available at `http://localhost:3000`.

## Getting Started with VLA Concepts

### Chapter 1: Voice-to-Action with Speech Recognition
1. Navigate to the Voice-to-Action chapter
2. Try the interactive speech recognition demo
3. Speak a command like "Move forward" or "Turn left"
4. Observe how Whisper transcribes your speech
5. See how the system translates the command into an action sequence

### Chapter 2: Vision-Language-Action and Cognitive Planning
1. Navigate to the Vision-Language-Action chapter
2. Upload an image to the vision processing demo
3. Provide a natural language goal (e.g., "Pick up the red object")
4. Observe how the system analyzes the visual input
5. See how the LLM generates a cognitive plan

### Chapter 3: Capstone — The Autonomous Humanoid
1. Navigate to the capstone chapter
2. Interact with the complete VLA pipeline
3. Combine voice commands with visual input
4. Watch the simulated humanoid execute complex tasks
5. Experiment with multi-step commands

## Interactive Components

### Voice Command Demo
- Click the microphone button to start recording
- Speak a command (e.g., "Move robot forward 1 meter")
- See the transcribed text and resulting action sequence
- Watch the simulated robot execute the action

### Vision Processing Demo
- Upload an image using the image upload component
- Add a text description of your goal
- See object detection results
- Observe the cognitive planning process

### Simulation Viewer
- View the robot's current state and environment
- Watch action sequences execute in real-time
- Pause, resume, or reset the simulation
- Adjust simulation speed for better observation

## Troubleshooting

### Speech Recognition Issues
- Ensure your microphone is working and permissions are granted
- Speak clearly and avoid background noise
- Check that your API keys are properly configured

### Simulation Issues
- Clear browser cache if the simulation appears broken
- Ensure your browser supports WebGL for 3D visualization
- Check that you're using a supported browser version

### API Connection Issues
- Verify API keys are correctly set in environment variables
- Check internet connection
- Ensure API usage limits haven't been exceeded

## Next Steps
1. Complete all three chapters to understand the complete VLA pipeline
2. Experiment with complex multi-step commands
3. Try combining voice and vision inputs
4. Explore the ROS 2 action sequence examples
5. Review the technical documentation for deeper understanding

## Resources
- [Docusaurus Documentation](https://docusaurus.io/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs/)
- [ROS 2 Documentation](https://docs.ros.org/en/rolling/)
- [VLA Module Specification](./spec.md)
- [Technical Implementation Guide](./plan.md)