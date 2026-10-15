---
sidebar_position: 1
title: "⚡ Hands-On: ROS 2 in Action"
---

# ⚡ Hands-On: ROS 2 in Action

:::tip 💡 The Core Mental Model
In ROS 2, a robot is **not** one giant program. It is a distributed network of specialized micro-programs called **Nodes** that talk to each other over named radio channels called **Topics**.
:::

Let's understand this through three progressive, hands-on examples that you will use throughout this entire handbook!

---

## 📢 Example 1: The Robot's Voice & Ears (Pub/Sub)

Think of the **Publisher** as a robot's vocal cords broadcasting sensor readings, and the **Subscriber** as the robot's ears listening for updates.

```
┌──────────────────┐    Topic: /chatter     ┌──────────────────┐
│   Talker Node    │───────────────────────▶│  Listener Node   │
│  "Hello World: 0"│     (std_msgs/String)  │ "I heard: ..."   │
└──────────────────┘                        └──────────────────┘
```

### 1. The Talker Node (`talker.py`)
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Talker(Node):
    def __init__(self):
        super().__init__('talker')
        # Create a publisher on topic 'chatter' with queue depth of 10
        self.publisher = self.create_publisher(String, 'chatter', 10)
        
        # Fire timer_callback every 1.0 second
        self.timer = self.create_timer(1.0, self.timer_callback)
        self.count = 0
        self.get_logger().info('🎙️ Talker Node online and broadcasting!')

    def timer_callback(self):
        msg = String()
        msg.data = f'⚡ Robot Telemetry Beacon #{self.count}'
        self.publisher.publish(msg)
        self.get_logger().info(f'Broadcasting: "{msg.data}"')
        self.count += 1

def main(args=None):
    rclpy.init(args=args)
    talker = Talker()
    rclpy.spin(talker)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### 2. The Listener Node (`listener.py`)
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Listener(Node):
    def __init__(self):
        super().__init__('listener')
        # Subscribe to topic 'chatter' and trigger listener_callback on every message
        self.subscription = self.create_subscription(
            String,
            'chatter',
            self.listener_callback,
            10)
        self.get_logger().info('👂 Listener Node online and waiting for broadcasts...')

    def listener_callback(self, msg):
        self.get_logger().info(f'🎯 Received: "{msg.data}"')

def main(args=None):
    rclpy.init(args=args)
    listener = Listener()
    rclpy.spin(listener)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

:::info 🔍 Key Takeaway
Notice how `Talker` has no idea who `Listener` is. It simply sends messages to `/chatter`. If 5 different microservices want to listen, they can all subscribe simultaneously without changing a single line of the talker!
:::

---

## 🔄 Example 2: Real-World Robot Pipeline

Here is how real humanoid robots connect cameras, neural networks, and motor drivers:

```
[📷 Stereo Camera] ──▶ Topic: /camera/raw_image ──▶ [🧠 Object Detector Node]
                                                              │
                                                              ▼ Topic: /detected_obstacles
                                                    [🧭 Navigation Planner]
                                                              │
                                                              ▼ Topic: /cmd_vel
                                                    [🦾 Bipedal Leg Actuators]
```

- Each block runs as an independent process.
- If the camera driver crashes, the rest of the robot's brain stays alive and can safely engage emergency brakes.

---

## 🤖 Example 3: Obstacle Avoidance AI Controller

Here is how a real autonomous decision-maker node reads simulated LiDAR lasers and steers the robot away from walls:

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan
from geometry_msgs.msg import Twist, Vector3

class ObstacleAvoidanceAI(Node):
    def __init__(self):
        super().__init__('obstacle_avoidance_ai')

        # 1. Listen to simulated LiDAR sensor data
        self.scan_sub = self.create_subscription(
            LaserScan, '/scan', self.scan_callback, 10)

        # 2. Publish movement velocity commands (linear and angular)
        self.cmd_pub = self.create_publisher(Twist, '/cmd_vel', 10)

        self.latest_scan = None
        self.get_logger().info('🚀 Autonomous Reflex System Engaged!')

    def scan_callback(self, msg):
        """Process incoming 360-degree LiDAR laser beams"""
        self.latest_scan = msg.ranges

    def make_reflex_decision(self):
        """Evaluate forward clearance and decide velocity"""
        if not self.latest_scan:
            return 0.0, 0.0  # Safe halt if sensor is dark

        # Sample front 60-degree cone (30 degrees left + 30 degrees right)
        front_distances = self.latest_scan[-30:] + self.latest_scan[:30]
        # Filter out 0 or inf readings
        valid_distances = [d for d in front_distances if d > 0.05]
        min_clearance = min(valid_distances) if valid_distances else 0.0

        if min_clearance < 0.75:  # Wall or obstacle within 75cm!
            self.get_logger().warn(f'⚠️ Obstacle detected at {min_clearance:.2f}m! Turning right...')
            return 0.0, -0.6   # Stop moving forward, rotate right
        else:
            return 0.4, 0.0    # Cruise forward at 0.4 m/s

def main(args=None):
    rclpy.init(args=args)
    ai_node = ObstacleAvoidanceAI()

    # Control loop ticks at 10 Hz (every 100 milliseconds)
    def control_loop():
        linear_x, angular_z = ai_node.make_reflex_decision()
        cmd = Twist()
        cmd.linear = Vector3(x=linear_x, y=0.0, z=0.0)
        cmd.angular = Vector3(x=0.0, y=0.0, z=angular_z)
        ai_node.cmd_pub.publish(cmd)

    timer = ai_node.create_timer(0.1, control_loop)
    rclpy.spin(ai_node)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

---

## 🎯 Next Steps

Now that you've seen the big picture of ROS 2 nodes and communication:
- Check out the [**Visual System Architecture Diagrams →**](/docs/chapter-1-intro/visual-architecture)
- Try the [**Hands-On Code Exercises →**](/docs/chapter-1-intro/exercises)