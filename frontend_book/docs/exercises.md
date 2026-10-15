---
sidebar_position: 100
---

# Practical Exercises

## Chapter 1 Exercises

### Exercise 1.1: Understanding ROS 2 Concepts
1. Research and explain the difference between ROS 1 and ROS 2
2. Identify three key benefits of using ROS 2 for robotics development
3. Describe how ROS 2 functions as a "robotic nervous system"

### Exercise 1.2: Middleware Architecture
1. Draw a simple diagram showing how different robot components communicate through ROS 2
2. Explain why middleware is important for robotics applications
3. List three real-world robots that use ROS/ROS 2

## Chapter 2 Exercises

### Exercise 2.1: Publisher-Subscriber Pattern
Create a simple publisher node that publishes temperature readings and a subscriber node that processes these readings:

1. Create a publisher that publishes random temperature values every second
2. Create a subscriber that receives these values and logs them
3. Extend the subscriber to trigger an alert when temperature exceeds a threshold

### Exercise 2.2: Client-Service Pattern
Implement a simple service for calculating robot path planning:

1. Create a service that accepts start and end coordinates
2. Create a client that requests path calculations
3. Implement a simple path calculation algorithm (e.g., straight line)

### Exercise 2.3: Communication Pattern Comparison
1. Identify three scenarios where you would use publisher-subscriber vs client-service
2. Implement the same functionality using both patterns and compare their performance
3. Discuss the trade-offs between the two patterns

## Chapter 3 Exercises

### Exercise 3.1: Python and rclpy
1. Create a Python node that subscribes to sensor data and publishes processed information
2. Implement a simple AI algorithm (e.g., decision tree) that runs in a ROS 2 node
3. Connect your AI algorithm to robot control commands

### Exercise 3.2: URDF Manipulation
1. Modify the humanoid URDF example to add a camera sensor to the head
2. Add joint limits to prevent self-collision
3. Create a URDF for a simple mobile robot (base + wheels)

### Exercise 3.3: Integration Project
Combine all concepts learned in this course:

1. Create a robot that uses sensor data to make AI-based navigation decisions
2. Implement the robot model in URDF
3. Use appropriate communication patterns (topics for sensor data, services for specific actions)
4. Document your design choices and the reasoning behind them

## Advanced Integration Exercise

### Exercise 4: Complete AI-ROS Integration
Design and implement a complete system that:
1. Uses a camera sensor to detect objects
2. Applies AI image recognition to classify objects
3. Plans navigation to approach interesting objects
4. Avoids obstacles while navigating
5. Logs all actions and decisions for analysis

This exercise combines all the concepts from the three chapters into a comprehensive project.