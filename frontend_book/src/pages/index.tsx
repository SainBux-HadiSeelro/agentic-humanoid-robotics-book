import type {ReactNode} from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import AgenticMissionConsole from '@site/src/components/AgenticMissionConsole';
import AutonomousSimPlayground from '@site/src/components/AutonomousSimPlayground';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HeroSection(): React.JSX.Element {
  return (
    <header className={styles.heroSection}>
      <div className={styles.heroContainer}>
        {/* Left Column: Branding, Title, Mission & CTAs */}
        <div>
          <div className={styles.authorBadge}>
            <span className={styles.authorPill}>PORTFOLIO SHOWCASE</span>
            <span className={styles.roleTag}>FORWARD DEPLOYED ENGINEER</span>
          </div>

          <div className={styles.authorName}>
            SAIN BUX
          </div>

          <div className={styles.authorSpecialty}>
            AGENTIC AI ENGINEER
          </div>

          <div className={styles.missionQuote}>
            BUILDING INTELLIGENT SOLUTIONS FOR A SMARTER TOMORROW
          </div>

          <Heading as="h1" className={styles.handbookTitle}>
            Autonomous Humanoid Robotics <br />
            <span className={styles.gradientText}>& Physical AI Engineering Handbook</span>
          </Heading>

          <p className={styles.subtitle}>
            A comprehensive, industry-aligned engineering handbook bridging software and physical reality.
            Master <strong>ROS 2</strong>, <strong>NVIDIA Isaac Sim™</strong>, <strong>Gazebo & Unity</strong> digital twins,
            and multimodal <strong>Vision-Language-Action (VLA)</strong> foundation models.
          </p>

          <div className={styles.ctaGroup}>
            <Link
              className={styles.primaryBtn}
              to="/docs/intro">
              📖 Start Reading Handbook
            </Link>
            <Link
              className={styles.secondaryBtn}
              to="#curriculum">
              ⚡ Explore 4-Module Roadmap
            </Link>
          </div>

          {/* Contact Strip matching the uploaded card */}
          <div className={styles.contactStrip}>
            <div className={styles.contactItem}>
              <span>📞</span>
              <a href="tel:+923113631569">+92 311 3631569</a>
            </div>
            <div className={styles.contactItem}>
              <span>✉️</span>
              <a href="mailto:sainbuxseelro11@gmail.com">sainbuxseelro11@gmail.com</a>
            </div>
            <div className={styles.contactItem}>
              <span>📍</span>
              <span>Clifton, Karachi</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Banner Card */}
        <div className={styles.visualColumn}>
          <div className={styles.bannerCard}>
            <img
              src="img/sain-bux-banner.jpg"
              alt="Sain Bux - Agentic AI Engineer"
              className={styles.bannerImg}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function StatsRibbon(): React.JSX.Element {
  return (
    <section className={styles.statsRibbon}>
      <div className={styles.statsGrid}>
        <div>
          <div className={styles.statValue}>4</div>
          <div className={styles.statLabel}>Core Engineering Modules</div>
        </div>
        <div>
          <div className={styles.statValue}>20+</div>
          <div className={styles.statLabel}>Hands-On Labs & Kinematic Models</div>
        </div>
        <div>
          <div className={styles.statValue}>100%</div>
          <div className={styles.statLabel}>Sim-to-Real Digital Twin Workflows</div>
        </div>
        <div>
          <div className={styles.statValue}>VLA</div>
          <div className={styles.statLabel}>Vision-Language-Action Autonomy</div>
        </div>
      </div>
    </section>
  );
}

function TechStackBanner(): React.JSX.Element {
  const techs = [
    { name: 'ROS 2 Humble / Iron', icon: '🤖' },
    { name: 'NVIDIA Isaac Sim™', icon: '🧠' },
    { name: 'Gazebo Physics', icon: '🌐' },
    { name: 'Unity 3D Simulation', icon: '🎮' },
    { name: 'Python rclpy & C++', icon: '⚡' },
    { name: 'Nav2 Humanoid Planning', icon: '🧭' },
    { name: 'OpenAI Whisper', icon: '🎙️' },
    { name: 'URDF / Xacro Kinematics', icon: '📐' },
  ];

  return (
    <div className={styles.techBanner}>
      <div className={styles.techTitle}>Industry-Standard Robotics & AI Technologies</div>
      <div className={styles.techRow}>
        {techs.map((tech) => (
          <span key={tech.name} className={styles.techPill}>
            <span>{tech.icon}</span>
            <span>{tech.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Sain Bux | Autonomous Humanoid Robotics & Physical AI Handbook"
      description="Created by Sain Bux, Agentic AI Engineer. Comprehensive engineering handbook for building autonomous humanoid robots using ROS 2, Gazebo, Unity, NVIDIA Isaac Sim, and Multimodal VLA models.">
      <HeroSection />
      <StatsRibbon />
      <div className="container" style={{marginTop: '2rem'}}>
        <AgenticMissionConsole />
        <AutonomousSimPlayground />
      </div>
      <TechStackBanner />
      <main id="curriculum">
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
