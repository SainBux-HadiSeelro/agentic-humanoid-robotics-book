---
sidebar_position: 101
---

# Complete Example Project: AI-Powered Humanoid Robot Navigation

## Project Overview

This example project integrates all concepts learned in the three chapters to create an AI-powered humanoid robot that can navigate autonomously while avoiding obstacles and making intelligent decisions.

## System Architecture

The complete system consists of:

1. **Robot Model**: A humanoid robot defined in URDF
2. **Sensors**: LIDAR for obstacle detection, camera for object recognition
3. **AI Decision Module**: Processes sensor data and makes navigation decisions
4. **Navigation System**: Plans and executes robot movement
5. **Communication Layer**: ROS 2 topics and services for inter-component communication

## URDF Model

The robot uses a URDF model similar to the one we created, with additional sensors:

```xml
<!-- Simplified version - full URDF would include all joints and links -->
<robot name="ai_humanoid">
  <!-- Robot body with sensors -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.3 0.3 0.2"/>
      </geometry>
    </visual>
  </link>

  <!-- Camera sensor -->
  <link name="camera_link">
    <visual>
      <geometry>
        <box size="0.05 0.05 0.05"/>
      </geometry>
    </visual>
  </link>

  <joint name="camera_joint" type="fixed">
    <parent link="base_link"/>
    <child link="camera_link"/>
    <origin xyz="0.1 0 0.1"/>
  </joint>

  <!-- Additional links for limbs, etc. -->
  <!-- ... (full model would include all joints and links) ... -->
</robot>
```

## ROS 2 Nodes Implementation

### 1. Sensor Data Publisher

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan, Image
from std_msgs.msg import Float32
import random

class SensorSimulator(Node):
    def __init__(self):
        super().__init__('sensor_simulator')

        # Publishers for sensor data
        self.lidar_publisher = self.create_publisher(LaserScan, 'scan', 10)
        self.camera_publisher = self.create_publisher(Image, 'camera/image_raw', 10)

        # Timer to simulate sensor data
        self.timer = self.create_timer(0.1, self.publish_sensor_data)

    def publish_sensor_data(self):
        # Simulate LIDAR data
        lidar_msg = LaserScan()
        lidar_msg.ranges = [random.uniform(0.5, 10.0) for _ in range(360)]
        self.lidar_publisher.publish(lidar_msg)

        # Simulate camera data (simplified)
        camera_msg = Image()
        camera_msg.height = 480
        camera_msg.width = 640
        camera_msg.encoding = 'rgb8'
        # In a real implementation, this would contain actual image data
        self.camera_publisher.publish(camera_msg)

def main(args=None):
    rclpy.init(args=args)
    sensor_simulator = SensorSimulator()
    rclpy.spin(sensor_simulator)
    sensor_simulator.destroy_node()
    rclpy.shutdown()
```

### 2. AI Decision Maker

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan
from geometry_msgs.msg import Twist
from std_msgs.msg import String
import numpy as np

class AIDecisionMaker(Node):
    def __init__(self):
        super().__init__('ai_decision_maker')

        # Subscriptions
        self.lidar_subscription = self.create_subscription(
            LaserScan, 'scan', self.lidar_callback, 10)
        self.camera_subscription = self.create_subscription(
            Image, 'camera/image_raw', self.camera_callback, 10)

        # Publisher for movement commands
        self.cmd_publisher = self.create_publisher(Twist, 'cmd_vel', 10)

        # Publisher for AI decisions
        self.decision_publisher = self.create_publisher(String, 'ai_decisions', 10)

        # Store sensor data
        self.lidar_data = None
        self.camera_data = None

        # AI decision timer
        self.timer = self.create_timer(0.2, self.make_decision)

    def lidar_callback(self, msg):
        self.lidar_data = np.array(msg.ranges)

    def camera_callback(self, msg):
        self.camera_data = msg  # Process image data in real implementation

    def make_decision(self):
        if self.lidar_data is None:
            return

        # Simple AI algorithm combining multiple inputs
        cmd_msg = Twist()
        decision_msg = String()

        # Analyze LIDAR data for obstacles
        front_scan = self.lidar_data[330:30] if len(self.lidar_data) > 330 else self.lidar_data
        if len(front_scan) > 0:
            min_distance = min([d for d in front_scan if d != float('inf')], default=float('inf'))

            if min_distance < 1.0:  # Obstacle ahead
                cmd_msg.linear.x = 0.0
                cmd_msg.angular.z = 0.5  # Turn right
                decision_msg.data = f"OBSTACLE_DETECTED: min_distance={min_distance:.2f}m, turning_right"
            else:
                cmd_msg.linear.x = 0.5  # Move forward
                cmd_msg.angular.z = 0.0
                decision_msg.data = f"PATH_CLEAR: moving_forward, distance_to_obstacle={min_distance:.2f}m"

        # Publish commands and decisions
        self.cmd_publisher.publish(cmd_msg)
        self.decision_publisher.publish(decision_msg)

def main(args=None):
    rclpy.init(args=args)
    ai_node = AIDecisionMaker()
    rclpy.spin(ai_node)
    ai_node.destroy_node()
    rclpy.shutdown()
```

### 3. Navigation Controller

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist, Pose
from std_msgs.msg import String
from nav_msgs.msg import Odometry

class NavigationController(Node):
    def __init__(self):
        super().__init__('navigation_controller')

        # Subscriptions
        self.odom_subscription = self.create_subscription(
            Odometry, 'odom', self.odom_callback, 10)
        self.decision_subscription = self.create_subscription(
            String, 'ai_decisions', self.decision_callback, 10)

        # Publisher for velocity commands
        self.cmd_publisher = self.create_publisher(Twist, 'cmd_vel', 10)

        # Current robot state
        self.current_pose = None
        self.target_pose = None

    def odom_callback(self, msg):
        self.current_pose = msg.pose.pose

    def decision_callback(self, msg):
        # Process AI decision and adjust navigation accordingly
        decision = msg.data
        self.get_logger().info(f'Navigation received decision: {decision}')

        # In a real implementation, this would adjust navigation based on AI decisions

def main(args=None):
    rclpy.init(args=args)
    nav_controller = NavigationController()
    rclpy.spin(nav_controller)
    nav_controller.destroy_node()
    rclpy.shutdown()
```

## Launch File

Create a launch file to start all nodes together:

```python
# launch/ai_navigation.launch.py
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='your_robot_package',
            executable='sensor_simulator',
            name='sensor_simulator'
        ),
        Node(
            package='your_robot_package',
            executable='ai_decision_maker',
            name='ai_decision_maker'
        ),
        Node(
            package='your_robot_package',
            executable='navigation_controller',
            name='navigation_controller'
        ),
    ])
```

## Running the Complete System

1. Start the robot state publisher with your URDF:
```bash
ros2 run robot_state_publisher robot_state_publisher --ros-args -p robot_description:='$(find-pkg-share your_robot_description)/urdf/robot.urdf'
```

2. Launch the complete system:
```bash
ros2 launch your_robot_package ai_navigation.launch.py
```

3. Monitor the system:
```bash
# View robot state
rviz2

# Monitor topics
ros2 topic echo /ai_decisions
ros2 topic echo /cmd_vel
```

## Key Concepts Demonstrated

This complete example project demonstrates:

1. **URDF Integration**: Robot model with sensors defined in URDF
2. **Communication Patterns**:
   - Topics for sensor data and commands (publisher-subscriber)
   - Services for specific requests (not shown but could be added)
3. **Python Integration**: Using rclpy to create ROS 2 nodes
4. **AI Algorithm**: Decision-making based on sensor data
5. **System Integration**: Multiple nodes working together

## Extending the Project

To further enhance this project, consider:

1. Adding machine learning for object recognition
2. Implementing more sophisticated path planning algorithms
3. Adding simulation in Gazebo
4. Creating a web interface for monitoring
5. Adding safety mechanisms and emergency stops

This project brings together all the concepts from the three chapters into a cohesive, functional system.