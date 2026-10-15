---
sidebar_position: 1
---

# Python Agents and rclpy

## Introduction to rclpy

rclpy is the Python client library for ROS 2. It provides the Python API that allows you to create ROS 2 nodes, publish and subscribe to topics, and provide or use services.

## Creating Your First ROS 2 Node in Python

Here's a simple example of a ROS 2 node written in Python:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Key Concepts in rclpy

- **Node**: The basic execution unit in ROS 2
- **Publisher**: Used to send messages to topics
- **Subscriber**: Used to receive messages from topics
- **Service Client**: Used to call services
- **Service Server**: Used to provide services

## Integration with AI Algorithms

For AI developers, rclpy provides the bridge between your Python-based AI algorithms and the ROS 2 ecosystem. You can:

- Publish sensor data processed by your AI algorithms
- Subscribe to topics to receive data for your AI models
- Use services to request specific actions from other nodes
- Implement complex behaviors combining AI decision-making with robot control

In the next section, we'll explore URDF (Unified Robot Description Format).