import React, {useState, useEffect, useRef} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface LogMessage {
  id: string;
  time: string;
  agent: string;
  text: string;
  code?: string;
  type?: 'info' | 'success' | 'warn';
}

const PRESETS = [
  {
    id: 'mission-1',
    label: '🏭 Autonomous Pipeline Inspection (Zone 4)',
    prompt: 'Inspect chemical pipeline valve in Zone 4, verify pressure gauge reading using VLM, and log telemetry.',
  },
  {
    id: 'mission-2',
    label: '🦾 Bipedal Docking & Battery Recharging',
    prompt: 'Navigate humanoid robot to inductive charging pad, align bipedal feet autonomously, and verify power draw.',
  },
  {
    id: 'mission-3',
    label: '🎯 Voice Command: Pick & Place Red Cylinder',
    prompt: 'Voice instruction received: "Locate red gear on conveyor, execute inverse kinematics grasp, and drop in bin B."',
  },
];

export default function AgenticMissionConsole(): React.JSX.Element {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customPrompt, setCustomPrompt] = useState(PRESETS[0].prompt);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [logs, setLogs] = useState<LogMessage[]>([
    {
      id: 'init-1',
      time: '12:00:01',
      agent: 'ORCHESTRATOR',
      text: 'Agentic Mission Controller ready. System nodes connected: ROS 2 Humble, Isaac Sim VLM, Nav2.',
    },
    {
      id: 'init-2',
      time: '12:00:02',
      agent: 'SAFETY_CRITIC',
      text: 'Safety watchdog active. Hardware limits verified (Max Velocity: 0.8 m/s, Torque: 120 Nm).',
      type: 'success',
    },
  ]);

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSelectPreset = (index: number) => {
    setSelectedPreset(index);
    setCustomPrompt(PRESETS[index].prompt);
  };

  const getTime = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  };

  const runMission = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStep(1);

    const baseId = Date.now();

    // Step 1: Planner Agent
    setLogs((prev) => [
      ...prev,
      {
        id: `${baseId}-1`,
        time: getTime(),
        agent: 'ORCHESTRATOR',
        text: `New Mission Dispatched: "${customPrompt}"`,
      },
      {
        id: `${baseId}-2`,
        time: getTime(),
        agent: 'PLANNER_AGENT',
        text: 'Decomposing natural language instruction into DAG Task Graph...',
        code: `GoalDAG: [1. Localize] -> [2. Traverse Waypoints] -> [3. VLM Perception] -> [4. Actuate & Report]`,
      },
    ]);

    // Step 2: Vision / Perception Agent
    setTimeout(() => {
      setCurrentStep(2);
      setLogs((prev) => [
        ...prev,
        {
          id: `${baseId}-3`,
          time: getTime(),
          agent: 'VISION_VLM_AGENT',
          text: 'Acquiring stereo camera & depth feed. Running multimodal zero-shot grounding...',
          code: `Target Identified: 3D Bounding Box [x: 2.14, y: -0.42, z: 0.88] (Confidence: 98.4%)`,
        },
      ]);
    }, 1500);

    // Step 3: Nav2 & Kinematics Action Agent
    setTimeout(() => {
      setCurrentStep(3);
      setLogs((prev) => [
        ...prev,
        {
          id: `${baseId}-4`,
          time: getTime(),
          agent: 'NAV_ACTION_AGENT',
          text: 'Generating bipedal humanoid costmap. Publishing velocity trajectory to /cmd_vel...',
          code: `ROS2 pub /cmd_vel geometry_msgs/Twist "{linear: {x: 0.45}, angular: {z: -0.12}}"`,
        },
      ]);
    }, 3200);

    // Step 4: Safety Critic & Verification
    setTimeout(() => {
      setCurrentStep(4);
      setLogs((prev) => [
        ...prev,
        {
          id: `${baseId}-5`,
          time: getTime(),
          agent: 'SAFETY_CRITIC',
          text: 'All acceptance criteria validated. Zero collision boundaries violated.',
          type: 'success',
        },
        {
          id: `${baseId}-6`,
          time: getTime(),
          agent: 'ORCHESTRATOR',
          text: '🎉 Autonomous mission execution succeeded with 100% telemetry validation.',
          type: 'success',
        },
      ]);
      setIsRunning(false);
    }, 4800);
  };

  return (
    <div className={styles.consoleWrapper}>
      {/* Top Header */}
      <div className={styles.consoleHeader}>
        <div className={styles.windowControls}>
          <span className={clsx(styles.dot, styles.dotRed)}></span>
          <span className={clsx(styles.dot, styles.dotYellow)}></span>
          <span className={clsx(styles.dot, styles.dotGreen)}></span>
        </div>
        <div className={styles.consoleTitle}>
          <span>🤖</span>
          <span>Sain Bux • Agentic Autonomous Control Center</span>
        </div>
        <div className={styles.statusLive}>
          <span className={styles.liveDot}></span>
          <span>SWARM ONLINE</span>
        </div>
      </div>

      {/* Main Console Body */}
      <div className={styles.consoleBody}>
        {/* Left: Interactive Input & Multi-Agent Swarm Tracker */}
        <div className={styles.controlPanel}>
          <div>
            <div className={styles.label}>Select Pre-Programmed Autonomous Mission</div>
            <div className={styles.presetSelect}>
              {PRESETS.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  className={clsx(styles.presetBtn, {
                    [styles.presetBtnActive]: selectedPreset === idx,
                  })}
                  onClick={() => handleSelectPreset(idx)}
                >
                  <span>⚡</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className={styles.label}>Or Natural Language Mission Command</div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                className={styles.customInput}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter autonomous robot goal..."
              />
              <button
                type="button"
                className={styles.runBtn}
                onClick={runMission}
                disabled={isRunning}
              >
                {isRunning ? 'EXECUTING...' : 'DISPATCH 🚀'}
              </button>
            </div>
          </div>

          <div>
            <div className={styles.label}>Active Multi-Agent Swarm Pipeline</div>
            <div className={styles.agentPipeline}>
              <div
                className={clsx(styles.agentStep, {
                  [styles.agentStepActive]: currentStep === 1,
                  [styles.agentStepComplete]: currentStep > 1,
                })}
              >
                1. Planner
              </div>
              <div
                className={clsx(styles.agentStep, {
                  [styles.agentStepActive]: currentStep === 2,
                  [styles.agentStepComplete]: currentStep > 2,
                })}
              >
                2. VLM Vision
              </div>
              <div
                className={clsx(styles.agentStep, {
                  [styles.agentStepActive]: currentStep === 3,
                  [styles.agentStepComplete]: currentStep > 3,
                })}
              >
                3. ROS 2 Nav
              </div>
              <div
                className={clsx(styles.agentStep, {
                  [styles.agentStepActive]: currentStep === 4,
                  [styles.agentStepComplete]: currentStep >= 4 && !isRunning,
                })}
              >
                4. Critic Guard
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Terminal Log Stream */}
        <div className={styles.terminalPanel} ref={terminalRef}>
          {logs.map((log) => (
            <div key={log.id} className={styles.logEntry}>
              <span className={styles.logTime}>[{log.time}]</span>
              <span className={styles.logAgent}>[{log.agent}]</span>
              <span
                className={clsx(styles.logText, {
                  [styles.logSuccess]: log.type === 'success',
                  [styles.logWarn]: log.type === 'warn',
                })}
              >
                {log.text}
              </span>
              {log.code && <div className={styles.logCode}>{log.code}</div>}
            </div>
          ))}
          {isRunning && (
            <div className={styles.logEntry} style={{color: '#00D2FF', fontStyle: 'italic'}}>
              ⚡ Multi-agent computation in progress...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
