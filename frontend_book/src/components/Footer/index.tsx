import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

function Footer(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  return (
    <footer className={clsx('footer', styles.footer)}>
      <div className="container">
        <div className="row">
          {/* Column 1: Author & Engineering Identity */}
          <div className="col col--5">
            <h3 style={{color: '#00D2FF', fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.4rem'}}>
              SAIN BUX
            </h3>
            <p style={{color: '#E0F7FE', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem'}}>
              AGENTIC AI ENGINEER • FORWARD DEPLOYED ENGINEER
            </p>
            <p style={{color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '380px'}}>
              Building Intelligent Solutions for a Smarter Tomorrow. Engineering handbook covering ROS 2, Digital Twins, Isaac Sim™, and Vision-Language-Action (VLA).
            </p>
          </div>

          {/* Column 2: Curriculum Chapters */}
          <div className="col col--3">
            <h4 style={{color: '#FFFFFF', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem'}}>
              Handbook Modules
            </h4>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', lineHeight: '2'}}>
              <li><Link to="/docs/intro" style={{color: '#00D2FF'}}>⚡ Overview & Quickstart</Link></li>
              <li><Link to="/docs/chapter-1-intro/practical-examples" style={{color: '#CBD5E1'}}>🦾 Module 1: ROS 2 Core</Link></li>
              <li><Link to="/docs/setup-digital-twin" style={{color: '#CBD5E1'}}>🌐 Module 2: Digital Twin</Link></li>
              <li><Link to="/docs/chapter-1-isaac-sim/isaac-sim-introduction" style={{color: '#CBD5E1'}}>🧠 Module 3: Isaac Sim™</Link></li>
              <li><Link to="/docs/chapter-1-voice-to-action/voice-command-examples" style={{color: '#CBD5E1'}}>🎙️ Module 4: VLA Autonomy</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="col col--4">
            <h4 style={{color: '#FFFFFF', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem'}}>
              Contact & Connect
            </h4>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', lineHeight: '2.2', color: '#CBD5E1'}}>
              <li>
                <span>📞 </span>
                <a href="tel:+923113631569" style={{color: '#00D2FF', textDecoration: 'none'}}>+92 311 3631569</a>
              </li>
              <li>
                <span>✉️ </span>
                <a href="mailto:sainbuxseelro11@gmail.com" style={{color: '#00D2FF', textDecoration: 'none'}}>sainbuxseelro11@gmail.com</a>
              </li>
              <li>
                <span>📍 </span>
                <span>Clifton, Karachi</span>
              </li>
              <li>
                <span>💼 </span>
                <a href="https://github.com/facebook/docusaurus" target="_blank" rel="noreferrer" style={{color: '#00D2FF', textDecoration: 'none'}}>GitHub Portfolio</a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0, 210, 255, 0.2)', textAlign: 'center', fontSize: '0.85rem', color: '#94A3B8'}}>
          Copyright © {new Date().getFullYear()} Sain Bux. All rights reserved. Physical AI & Autonomous Robotics Handbook.
        </div>
      </div>
    </footer>
  );
}

export default Footer;