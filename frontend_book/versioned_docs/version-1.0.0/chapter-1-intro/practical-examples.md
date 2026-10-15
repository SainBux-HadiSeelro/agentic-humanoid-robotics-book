---
sidebar_position: 3
---

# Practical Examples: ROS 2 in Action

## Example 1: Simple Publisher-Subscriber System

Let's look at a practical example that demonstrates the ROS 2 communication patterns we'll learn about in Chapter 2.

### Publisher Node
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Talker(Node):
    def __init__(self):
        super().__init__('talker')
        self.publisher = self.create_publisher(String, 'chatter', 10)
        timer_period = 2  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello World: {self.i}'
        self.publisher.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    talker = Talker()
    rclpy.spin(talker)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Subscriber Node
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Listener(Node):
    def __init__(self):
        super().__init__('listener')
        self.subscription = self.create_subscription(
            String,
            'chatter',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')

def main(args=None):
    rclpy.init(args=args)
    listener = Listener()
    rclpy.spin(listener)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Example 2: Robot Middleware in Practice

Here's how ROS 2 acts as middleware in a real robot system:

```
[Camera Node] -----> [Image Processing Node] -----> [Navigation Node]
     |                       |                           |
     v                       v                           v
[Raw Images] -----> [Processed Images] --------> [Movement Commands]
```

In this system:
- The Camera Node publishes raw images to a topic
- The Image Processing Node subscribes to these images, processes them, and publishes results
- The Navigation Node uses the processed images to make movement decisions

## Example 3: AI Integration Pattern

Here's how an AI algorithm might integrate with ROS 2:

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan
from geometry_msgs.msg import Twist
import numpy as np

class AINavigator(Node):
    def __init__(self):
        super().__init__('ai_navigator')

        # Subscribe to sensor data
        self.scan_subscription = self.create_subscription(
            LaserScan, 'scan', self.scan_callback, 10)

        # Publisher for movement commands
        self.cmd_publisher = self.create_publisher(Twist, 'cmd_vel', 10)

        self.latest_scan = None

    def scan_callback(self, msg):
        """Process incoming LIDAR scan"""
        self.latest_scan = msg.ranges

    def make_ai_decision(self):
        """Simple AI decision based on sensor data"""
        if self.latest_scan is None:
            return 0.0, 0.0  # No movement if no data

        # Simple obstacle avoidance AI
        front_distances = self.latest_scan[330:] + self.latest_scan[:30]  # Front 60 degrees
        min_front_dist = min(front_distances)

        if min_front_dist < 0.8:  # Obstacle too close
            return 0.0, 0.5  # Turn right
        else:
            return 0.5, 0.0  # Move forward

def main(args=None):
    rclpy.init(args=args)
    ai_nav = AINavigator()

    # Make decisions at 10Hz
    timer = ai_nav.create_timer(0.1, lambda: ai_nav.cmd_publisher.publish(
        Twist(linear=Vector3(x=ai_nav.make_ai_decision()[0]),
              angular=Vector3(z=ai_nav.make_ai_decision()[1]))
    ))

    rclpy.spin(ai_nav)
    rclpy.shutdown()
```

These examples demonstrate how ROS 2 enables different components of a robot system to work together through its middleware architecture. In the next chapters, we'll explore these patterns in more detail.