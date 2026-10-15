---
sidebar_position: 2
---

# Publisher-Subscriber Pattern

## Understanding Publishers and Subscribers

The publisher-subscriber pattern is one of the fundamental communication methods in ROS 2. It enables asynchronous, one-way data transmission between nodes through topics.

### Publishers
- Send data to a topic
- Don't know which (if any) subscribers will receive the data
- Continue operating regardless of subscriber presence

### Subscribers
- Receive data from a topic
- Don't know which publisher sent the data
- Process incoming messages as they arrive

## Creating a Publisher in Python

Here's how to create a publisher node using rclpy:

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
```

## Creating a Subscriber in Python

And here's how to create a subscriber node:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info('I heard: "%s"' % msg.data)
```

## When to Use Publisher-Subscriber

The publisher-subscriber pattern is ideal for:
- Streaming sensor data (camera images, LIDAR scans, IMU readings)
- Broadcasting robot state information
- Situations where you don't need guaranteed delivery
- Real-time systems where low latency is important

In the next section, we'll look at the client-service pattern for request-response communication.