---
sidebar_position: 3
---

# Integration Examples: AI Algorithms with ROS 2

## Bringing It All Together

Now that we've covered ROS 2 communication patterns and URDF, let's look at how to integrate AI algorithms with ROS 2 systems.

## Example 1: AI Decision Making with Robot Control

Here's an example that combines AI decision-making with robot control:

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan
from geometry_msgs.msg import Twist

class AINavigationNode(Node):
    def __init__(self):
        super().__init__('ai_navigation')

        # Subscribe to sensor data
        self.subscription = self.create_subscription(
            LaserScan,
            'scan',
            self.lidar_callback,
            10)

        # Publisher for movement commands
        self.publisher = self.create_publisher(Twist, 'cmd_vel', 10)

        # Timer for AI processing
        self.timer = self.create_timer(0.1, self.ai_decision_callback)

        # Store sensor data
        self.lidar_data = None

    def lidar_callback(self, msg):
        """Process incoming LIDAR data"""
        self.lidar_data = msg.ranges

    def ai_decision_callback(self):
        """Make AI-based navigation decisions"""
        if self.lidar_data is None:
            return

        # Simple AI algorithm: avoid obstacles
        cmd_msg = Twist()

        # Check if path is clear
        front_distances = self.lidar_data[:30] + self.lidar_data[-30:]
        min_distance = min([d for d in front_distances if d != float('inf')], default=1.0)

        if min_distance > 1.0:  # Path is clear
            cmd_msg.linear.x = 0.5  # Move forward
            cmd_msg.angular.z = 0.0
        else:  # Obstacle detected
            cmd_msg.linear.x = 0.0
            cmd_msg.angular.z = 0.5  # Turn right

        self.publisher.publish(cmd_msg)

def main(args=None):
    rclpy.init(args=args)
    ai_node = AINavigationNode()
    rclpy.spin(ai_node)
    ai_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Example 2: Processing Robot State with AI

This example shows how to process robot state information with AI algorithms:

```python
import rclpy
from rclpy.node import Node
from nav_msgs.msg import Odometry
from std_msgs.msg import String
import numpy as np

class AIStateProcessor(Node):
    def __init__(self):
        super().__init__('ai_state_processor')

        # Subscribe to robot odometry
        self.odom_subscription = self.create_subscription(
            Odometry,
            'odom',
            self.odom_callback,
            10)

        # Publisher for AI decisions
        self.ai_publisher = self.create_publisher(String, 'ai_decisions', 10)

        # Store robot state
        self.position_history = []
        self.max_history = 100

    def odom_callback(self, msg):
        """Process robot odometry and make AI decisions"""
        # Extract position
        x = msg.pose.pose.position.x
        y = msg.pose.pose.position.y
        position = np.array([x, y])

        # Store position in history
        self.position_history.append(position)
        if len(self.position_history) > self.max_history:
            self.position_history.pop(0)

        # Analyze movement pattern
        if len(self.position_history) > 10:
            # Simple pattern detection
            recent_positions = np.array(self.position_history[-10:])
            displacement = recent_positions[-1] - recent_positions[0]

            # Determine movement pattern
            if np.linalg.norm(displacement) < 0.1:  # Robot is stationary
                decision = "Robot is stationary - check for obstacles"
            elif np.linalg.norm(displacement) > 5.0:  # Robot is moving fast
                decision = "Robot is moving rapidly - consider slowing down"
            else:
                decision = "Robot movement is normal"

            # Publish AI decision
            decision_msg = String()
            decision_msg.data = decision
            self.ai_publisher.publish(decision_msg)

def main(args=None):
    rclpy.init(args=args)
    ai_processor = AIStateProcessor()
    rclpy.spin(ai_processor)
    ai_processor.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Best Practices for AI-ROS Integration

1. **Modularity**: Keep AI algorithms separate from ROS communication
2. **Performance**: Be mindful of computational requirements in real-time systems
3. **Error Handling**: Implement robust error handling for AI algorithm failures
4. **Testing**: Test AI components separately from ROS integration
5. **Documentation**: Clearly document the interface between AI and ROS components

## Summary

In this course, we've covered:
- ROS 2 as middleware and the robotic nervous system concept
- Communication patterns (publishers/subscribers and clients/services)
- Python integration with rclpy
- Robot structure representation with URDF
- Integration of AI algorithms with ROS 2 systems

You now have the foundation to build sophisticated AI-powered robotic applications using ROS 2!