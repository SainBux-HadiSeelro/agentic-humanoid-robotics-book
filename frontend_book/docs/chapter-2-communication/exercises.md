---
sidebar_position: 5
---

# Chapter 2 Exercises: Communication Patterns

## Exercise 2.1: Publisher-Subscriber Implementation

1. Create a publisher node that publishes temperature readings from a simulated sensor every 2 seconds.
2. Create a subscriber node that receives these readings and logs them to the console.
3. Extend the subscriber to calculate and display the average temperature over the last 10 readings.
4. Add functionality to trigger an alert when temperature exceeds a threshold (e.g., 25°C).

### Solution Outline:
- Publisher: Use a timer to publish temperature values
- Subscriber: Store readings in a list, calculate average
- Add conditional logic for alerts

## Exercise 2.2: Client-Service Implementation

1. Create a service server that calculates the factorial of a given number.
2. Create a client that requests factorial calculations for different numbers.
3. Extend the service to handle multiple mathematical operations (factorial, square, cube).
4. Add error handling for invalid inputs.

### Solution Outline:
- Define a custom service message for mathematical operations
- Implement the service server with multiple operation types
- Create a client that sends requests and handles responses

## Exercise 2.3: Quality of Service (QoS) Settings

1. Research and experiment with different QoS settings for publishers and subscribers.
2. Compare performance between reliable and best-effort delivery.
3. Test the effect of different history policies (keep-all vs keep-last).
4. Document when to use different QoS settings based on your findings.

## Exercise 2.4: Communication Pattern Selection

For each scenario below, decide whether to use topics, services, or actions, and justify your choice:

1. Publishing camera images from a robot's camera
2. Requesting a robot to move to a specific location
3. Streaming robot joint angles for monitoring
4. Requesting a map of the environment from a mapping node
5. Executing a complex manipulation task that takes several minutes
6. Broadcasting robot battery level to multiple monitoring nodes

### Solution Guidance:
- Topics: For streaming data, broadcasting, real-time data
- Services: For request-response, configuration changes, specific tasks
- Actions: For long-running tasks with feedback/cancellation

## Exercise 2.5: Hybrid Communication System

Design and implement a simple robot system that uses multiple communication patterns:

1. A sensor node that publishes range readings (topics)
2. A processing node that subscribes to range data and provides collision warnings (services)
3. A navigation node that uses both topics and services to navigate safely

### Implementation Requirements:
- At least 3 nodes using different communication patterns
- Proper error handling
- Clear documentation of the communication architecture

## Exercise 2.6: Performance Comparison

1. Create a simple publisher-subscriber pair that transmits data at high frequency (100 Hz).
2. Measure the latency between publishing and receiving messages.
3. Compare this with the response time of a service call.
4. Document your findings about when to use each pattern based on performance needs.

## Exercise 2.7: Advanced Topic Patterns

1. Implement a latched topic publisher that ensures new subscribers receive the last published value immediately.
2. Create multiple publishers for the same topic and observe the behavior.
3. Implement a node that subscribes to multiple topics and combines the data.

## Solutions

### Exercise 2.1 Solution (Python):
```python
# Publisher
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32
import random

class TemperaturePublisher(Node):
    def __init__(self):
        super().__init__('temperature_publisher')
        self.publisher = self.create_publisher(Float32, 'temperature', 10)
        self.timer = self.create_timer(2.0, self.publish_temperature)

    def publish_temperature(self):
        msg = Float32()
        msg.data = 20.0 + random.uniform(-5, 5)  # Simulate temperature around 20°C
        self.publisher.publish(msg)
        self.get_logger().info(f'Published temperature: {msg.data:.2f}°C')

# Subscriber
class TemperatureSubscriber(Node):
    def __init__(self):
        super().__init__('temperature_subscriber')
        self.subscription = self.create_subscription(
            Float32, 'temperature', self.temp_callback, 10)
        self.temp_history = []

    def temp_callback(self, msg):
        self.temp_history.append(msg.data)
        if len(self.temp_history) > 10:
            self.temp_history.pop(0)

        avg_temp = sum(self.temp_history) / len(self.temp_history) if self.temp_history else 0
        self.get_logger().info(f'Received: {msg.data:.2f}°C, Average: {avg_temp:.2f}°C')

        if msg.data > 25.0:
            self.get_logger().warn('Temperature threshold exceeded!')
```

### Exercise 2.4 Solutions:
1. **Camera images**: Topics - streaming continuous data
2. **Move to location**: Action - long-running task with feedback/cancellation
3. **Joint angles**: Topics - continuous monitoring data
4. **Request map**: Service - request-response pattern
5. **Complex manipulation**: Action - long-running with feedback
6. **Battery level**: Topics - broadcasting to multiple nodes

These exercises will help you understand the practical applications of different ROS 2 communication patterns and when to use each one effectively.