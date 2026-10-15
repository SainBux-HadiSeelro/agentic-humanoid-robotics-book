import type {ReactNode} from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

interface ModuleItem {
  id: string;
  badge: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const CourseModules: ModuleItem[] = [
  {
    id: 'module-1',
    badge: 'Module 01',
    icon: '🦾',
    title: 'ROS 2 Core & Humanoid Robot Kinematics',
    description:
      'Master the backbone of modern robotics: distributed rclpy architecture, asynchronous client-services, pub/sub topologies, and complete URDF/Xacro kinematic humanoid tree design.',
    tags: ['ROS 2 Humble', 'rclpy Python', 'URDF & Xacro', 'Kinematics', 'Node Topology'],
    link: '/docs/chapter-1-intro/practical-examples',
  },
  {
    id: 'module-2',
    badge: 'Module 02',
    icon: '🌐',
    title: 'Digital Twin Simulation (Gazebo & Unity 3D)',
    description:
      'Build zero-risk physical testing environments before hardware deployment. Combine rigid-body Gazebo ODE/Bullet physics with Unity 3D photorealistic rendering, synthetic LiDAR, and depth sensing.',
    tags: ['Gazebo Sim', 'Unity 3D', 'LiDAR Sensor', 'RGB-D Depth', 'Physics Tuning'],
    link: '/docs/setup-digital-twin',
  },
  {
    id: 'module-3',
    badge: 'Module 03',
    icon: '🧠',
    title: 'The AI-Robot Brain (NVIDIA Isaac™ & Nav2)',
    description:
      'Harness GPU-accelerated robotics intelligence: photorealistic synthetic data generation (SDG), Isaac ROS accelerated visual odometry (VSLAM), and Nav2 bipedal humanoid path planning.',
    tags: ['NVIDIA Isaac Sim™', 'Isaac ROS', 'Synthetic Data (SDG)', 'Nav2 Planner', 'VSLAM'],
    link: '/docs/chapter-1-isaac-sim/isaac-sim-introduction',
  },
  {
    id: 'module-4',
    badge: 'Module 04',
    icon: '⚡',
    title: 'Vision-Language-Action (VLA) & Multimodal AI',
    description:
      'Connect cutting-edge Foundation Models to physical actuators. Build Whisper voice-to-action pipelines, LLM cognitive task breakdown planners, and run the complete Autonomous Capstone.',
    tags: ['OpenAI Whisper', 'LLM Planning', 'Multimodal VLA', 'Autonomous Capstone'],
    link: '/docs/chapter-1-voice-to-action/voice-command-examples',
  },
];

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles.curriculumSection} id="curriculum">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Curriculum & Field Labs</span>
          <Heading as="h2" className={styles.sectionTitle}>
            Architected for Physical AI Engineers
          </Heading>
          <p className={styles.sectionSubtitle}>
            A rigorous, multi-tiered curriculum taking you from low-level distributed ROS 2 communication to high-level cognitive foundation models and bipedal humanoid autonomy.
          </p>
        </div>

        <div className={styles.moduleGrid}>
          {CourseModules.map((module) => (
            <div key={module.id} className={styles.moduleCard}>
              <div className={styles.moduleHeader}>
                <span className={styles.moduleNumber}>{module.badge}</span>
                <span className={styles.moduleIcon}>{module.icon}</span>
              </div>
              <Heading as="h3" className={styles.moduleTitle}>
                {module.title}
              </Heading>
              <p className={styles.moduleDescription}>{module.description}</p>
              <div className={styles.techTags}>
                {module.tags.map((tag) => (
                  <span key={tag} className={styles.tagPill}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link to={module.link} className={styles.exploreLink}>
                Explore Module Chapters & Labs <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
