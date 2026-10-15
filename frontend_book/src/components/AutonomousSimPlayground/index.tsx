import React, {useRef, useEffect, useState} from 'react';
import styles from './styles.module.css';

interface Obstacle {
  x: number;
  y: number;
  radius: number;
}

export default function AutonomousSimPlayground(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [telemetry, setTelemetry] = useState({
    speed: 0.45,
    yawRate: 0.12,
    clearance: 1.45,
    state: 'PATH_FOLLOWING',
  });

  const stateRef = useRef({
    robot: { x: 100, y: 190, angle: 0, speed: 2.2 },
    target: { x: 500, y: 190 },
    obstacles: [
      { x: 260, y: 190, radius: 24 },
      { x: 380, y: 120, radius: 20 },
      { x: 380, y: 260, radius: 20 },
    ] as Obstacle[],
    isRunning: true,
  });

  useEffect(() => {
    stateRef.current.isRunning = isRunning;
  }, [isRunning]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Add new obstacle at click position
    stateRef.current.obstacles.push({
      x: clickX,
      y: clickY,
      radius: Math.floor(Math.random() * 8) + 18,
    });
  };

  const handleClearObstacles = () => {
    stateRef.current.obstacles = [
      { x: 260, y: 190, radius: 24 },
    ];
  };

  const handleRandomizeTarget = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    stateRef.current.target = {
      x: Math.floor(Math.random() * (canvas.width - 160)) + 80,
      y: Math.floor(Math.random() * (canvas.height - 120)) + 60,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set internal resolution
    canvas.width = 720;
    canvas.height = 380;

    let animId: number;

    const render = () => {
      const { robot, target, obstacles, isRunning: running } = stateRef.current;

      // Clear Canvas
      ctx.fillStyle = '#001322';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Subtle Coordinate Grid
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 1. Draw Target Waypoint (Glowing Gold / Cyan Diamond)
      ctx.save();
      ctx.translate(target.x, target.y);
      ctx.fillStyle = '#00D2FF';
      ctx.shadowColor = '#00D2FF';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(0, 0, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Autonomous Navigation Controller Logic
      if (running) {
        const dx = target.x - robot.x;
        const dy = target.y - robot.y;
        const distToTarget = Math.sqrt(dx * dx + dy * dy);

        // If target reached, pick a new target
        if (distToTarget < 25) {
          stateRef.current.target = {
            x: Math.floor(Math.random() * (canvas.width - 160)) + 80,
            y: Math.floor(Math.random() * (canvas.height - 120)) + 60,
          };
        }

        // Attraction vector toward target
        let desiredAngle = Math.atan2(dy, dx);
        let minClearance = 999;

        // LiDAR Raycast Simulation (36 rays)
        const rayCount = 36;
        const maxRayDist = 120;
        let obstacleRepulsionX = 0;
        let obstacleRepulsionY = 0;

        for (let i = 0; i < rayCount; i++) {
          const rayAngle = (i * 2 * Math.PI) / rayCount;
          let rayDist = maxRayDist;

          // Check obstacles intersection
          obstacles.forEach((obs) => {
            const ox = obs.x - robot.x;
            const oy = obs.y - robot.y;
            const obsDist = Math.sqrt(ox * ox + oy * oy);
            const obsAngle = Math.atan2(oy, ox);
            let diff = Math.abs(rayAngle - obsAngle);
            if (diff > Math.PI) diff = 2 * Math.PI - diff;

            if (diff < 0.4 && obsDist < rayDist) {
              rayDist = Math.max(obsDist - obs.radius, 10);
            }
          });

          // Check boundary walls
          const endX = robot.x + Math.cos(rayAngle) * rayDist;
          const endY = robot.y + Math.sin(rayAngle) * rayDist;

          if (endX < 10) rayDist = Math.min(rayDist, Math.abs(robot.x - 10));
          if (endX > canvas.width - 10) rayDist = Math.min(rayDist, Math.abs(canvas.width - 10 - robot.x));
          if (endY < 10) rayDist = Math.min(rayDist, Math.abs(robot.y - 10));
          if (endY > canvas.height - 10) rayDist = Math.min(rayDist, Math.abs(canvas.height - 10 - robot.y));

          minClearance = Math.min(minClearance, rayDist);

          // If obstacle close, add repulsion
          if (rayDist < 60) {
            const force = (60 - rayDist) / 60;
            obstacleRepulsionX -= Math.cos(rayAngle) * force * 1.5;
            obstacleRepulsionY -= Math.sin(rayAngle) * force * 1.5;
          }

          // Draw LiDAR Ray
          ctx.strokeStyle = rayDist < 45 ? 'rgba(239, 68, 68, 0.45)' : 'rgba(0, 210, 255, 0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(robot.x, robot.y);
          ctx.lineTo(
            robot.x + Math.cos(rayAngle) * rayDist,
            robot.y + Math.sin(rayAngle) * rayDist
          );
          ctx.stroke();
        }

        // Combine attraction and repulsion
        const steerX = Math.cos(desiredAngle) + obstacleRepulsionX;
        const steerY = Math.sin(desiredAngle) + obstacleRepulsionY;
        const finalAngle = Math.atan2(steerY, steerX);

        // Smooth angle rotation
        let angleDiff = finalAngle - robot.angle;
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

        robot.angle += angleDiff * 0.12;

        // Move robot forward
        const currentSpeed = minClearance < 35 ? robot.speed * 0.4 : robot.speed;
        robot.x += Math.cos(robot.angle) * currentSpeed;
        robot.y += Math.sin(robot.angle) * currentSpeed;

        // Keep inside bounds
        robot.x = Math.max(25, Math.min(canvas.width - 25, robot.x));
        robot.y = Math.max(25, Math.min(canvas.height - 25, robot.y));

        // Update telemetry
        setTelemetry({
          speed: Number((currentSpeed * 0.2).toFixed(2)),
          yawRate: Number((angleDiff * 1.5).toFixed(2)),
          clearance: Number((minClearance * 0.05).toFixed(2)),
          state: minClearance < 40 ? 'AVOIDING_OBSTACLE' : 'PATH_FOLLOWING',
        });
      }

      // 3. Draw Obstacles
      obstacles.forEach((obs) => {
        ctx.save();
        ctx.fillStyle = '#002B49';
        ctx.strokeStyle = '#00D2FF';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00D2FF';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner obstacle tech pattern
        ctx.fillStyle = 'rgba(0, 210, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(obs.x, obs.y, obs.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 4. Draw Robot (Humanoid Mobile Base)
      ctx.save();
      ctx.translate(robot.x, robot.y);
      ctx.rotate(robot.angle);

      // Robot chassis
      ctx.fillStyle = '#00D2FF';
      ctx.shadowColor = '#00D2FF';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.fill();

      // Heading orientation pointer
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(18, 0);
      ctx.lineTo(8, -6);
      ctx.lineTo(8, 6);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={styles.simSection}>
      <div className={styles.simHeader}>
        <div className={styles.simTitle}>
          <span>⚡</span>
          <span>Live Autonomous Robot Simulator (ROS 2 Nav2 & LiDAR AI)</span>
        </div>
        <div className={styles.instructionBadge}>
          👉 Click Canvas to Drop Obstacles!
        </div>
      </div>

      <div className={styles.simCanvasWrapper}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onClick={handleCanvasClick}
          title="Click to spawn obstacles"
        />
      </div>

      {/* Real-Time Telemetry Dashboard */}
      <div className={styles.telemetryGrid}>
        <div className={styles.telemetryItem}>
          <span className={styles.telemetryLabel}>Controller State</span>
          <span className={styles.telemetryValue} style={{color: telemetry.state === 'AVOIDING_OBSTACLE' ? '#F59E0B' : '#10B981'}}>
            {telemetry.state}
          </span>
        </div>
        <div className={styles.telemetryItem}>
          <span className={styles.telemetryLabel}>Linear Velocity (/cmd_vel)</span>
          <span className={styles.telemetryValue}>{telemetry.speed} m/s</span>
        </div>
        <div className={styles.telemetryItem}>
          <span className={styles.telemetryLabel}>LiDAR Min Clearance</span>
          <span className={styles.telemetryValue}>{telemetry.clearance} m</span>
        </div>
        <div className={styles.telemetryItem}>
          <span className={styles.telemetryLabel}>Active Sensors</span>
          <span className={styles.telemetryValue}>360° LiDAR + Nav2</span>
        </div>
      </div>

      {/* Control Bar */}
      <div className={styles.controlBar}>
        <div style={{display: 'flex', gap: '0.6rem'}}>
          <button
            type="button"
            className={styles.simBtn}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? '⏸️ Pause Autonomy' : '▶️ Resume Autonomy'}
          </button>
          <button
            type="button"
            className={styles.simBtn}
            onClick={handleClearObstacles}
          >
            🧹 Reset Obstacles
          </button>
          <button
            type="button"
            className={styles.simBtn}
            onClick={handleRandomizeTarget}
          >
            🎯 New Waypoint
          </button>
        </div>
        <div className={styles.hintText}>
          Real-time vector field collision avoidance running in-browser
        </div>
      </div>
    </div>
  );
}
