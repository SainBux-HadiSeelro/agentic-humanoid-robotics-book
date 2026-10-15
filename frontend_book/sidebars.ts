import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Module 1: ROS 2 Core & Humanoid Kinematics',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Chapter 1: Intro to Robotics',
          items: [
            'chapter-1-intro/practical-examples',
            'chapter-1-intro/visual-architecture',
            'chapter-1-intro/exercises',
            'chapter-1-intro/acceptance-tests',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 2: Communication & Control',
          items: [
            'chapter-2-communication/nodes-topics-services',
            'chapter-2-communication/publisher-subscriber',
            'chapter-2-communication/client-service',
            'chapter-2-communication/comparison-guide',
            'chapter-2-communication/exercises',
            'chapter-2-communication/acceptance-tests',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 3: Python & URDF Modeling',
          items: [
            'chapter-3-python-urdf/python-rclpy',
            'chapter-3-python-urdf/urdf-basics',
            'chapter-3-python-urdf/humanoid-urdf-example',
            'chapter-3-python-urdf/integration-examples',
            'chapter-3-python-urdf/acceptance-tests',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Digital Twin (Gazebo & Unity)',
      items: [
        'setup-digital-twin',
        {
          type: 'category',
          label: 'Chapter 1: Physics Simulation with Gazebo',
          items: [
            'chapter-1-gazebo/gazebo-introduction',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 2: High-Fidelity Environments in Unity',
          items: [
            'chapter-2-unity/unity-introduction',
            'chapter-2-unity/acceptance-tests',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 3: Sensor Simulation',
          items: [
            'chapter-3-sensors/sensor-simulation',
            'chapter-3-sensors/acceptance-tests',
          ],
        },
        'capstone-project',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac™)',
      items: [
        {
          type: 'category',
          label: 'Chapter 1: Isaac Sim & Synthetic Data',
          items: [
            'chapter-1-isaac-sim/isaac-sim-introduction',
            'chapter-1-isaac-sim/synthetic-data-generation',
            'chapter-1-isaac-sim/photorealistic-simulation',
            'chapter-1-isaac-sim/exercises',
            'chapter-1-isaac-sim/acceptance-tests',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 3: Nav2 Humanoid Path Planning',
          items: [
            'chapter-3-nav2-humanoid/nav2-architecture',
            'chapter-3-nav2-humanoid/humanoid-navigation',
            'chapter-3-nav2-humanoid/path-planning',
            'chapter-3-nav2-humanoid/isaac-nav2-integration',
            'chapter-3-nav2-humanoid/exercises',
            'chapter-3-nav2-humanoid/acceptance-tests',
          ],
        },
        'complete-example-project',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA)',
      items: [
        {
          type: 'category',
          label: 'Chapter 1: Voice-to-Action with Speech',
          items: [
            'chapter-1-voice-to-action/index',
            'chapter-1-voice-to-action/speech-recognition',
            'chapter-1-voice-to-action/whisper-integration',
            'chapter-1-voice-to-action/voice-command-examples',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 2: Cognitive Planning & VLA',
          items: [
            'chapter-2-vision-language-action/index',
            'chapter-2-vision-language-action/vision-processing',
            'chapter-2-vision-language-action/llm-cognitive-planning',
            'chapter-2-vision-language-action/vision-language-integration',
          ],
        },
        {
          type: 'category',
          label: 'Chapter 3: Capstone — Autonomous Humanoid',
          items: [
            'chapter-3-autonomous-humanoid/index',
            'chapter-3-autonomous-humanoid/simulation-environment',
            'chapter-3-autonomous-humanoid/capstone-project',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '📋 Self-Assessment & Checklists',
      items: [
        'chapter-1-intro/acceptance-tests',
        'chapter-2-communication/acceptance-tests',
        'chapter-3-python-urdf/acceptance-tests',
        'chapter-1-isaac-sim/acceptance-tests',
        'chapter-3-nav2-humanoid/acceptance-tests',
      ],
    },
  ],
};

export default sidebars;
