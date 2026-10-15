---
sidebar_position: 6
---

# Chapter 2 Acceptance Tests

## Learning Objectives Assessment

After completing Chapter 2, you should be able to:

### Objective 1: Understand Nodes in ROS 2
**Test**: Explain the role and implementation of nodes
- [ ] Define what a ROS 2 node is and its purpose
- [ ] Create a basic ROS 2 node in Python using rclpy
- [ ] Explain the lifecycle of a ROS 2 node
- [ ] Identify when to use multiple nodes vs. a single node

### Objective 2: Master Topic Communication
**Test**: Implement and understand publisher-subscriber patterns
- [ ] Create a publisher node that sends messages on a topic
- [ ] Create a subscriber node that receives messages from a topic
- [ ] Explain the asynchronous nature of topic communication
- [ ] Implement proper error handling for topic communication

### Objective 3: Master Service Communication
**Test**: Implement and understand client-server patterns
- [ ] Create a service server that responds to requests
- [ ] Create a client that makes requests to a service
- [ ] Explain the synchronous nature of service communication
- [ ] Handle service request/response and error cases

### Objective 4: Choose Appropriate Communication Patterns
**Test**: Select the right pattern for different scenarios
- [ ] Determine when to use topics vs. services vs. actions
- [ ] Explain the trade-offs between different communication patterns
- [ ] Design a system architecture using appropriate patterns
- [ ] Implement hybrid systems combining multiple patterns

## Practical Skills Assessment

### Skill 1: Node Implementation
**Task**: Create and run basic ROS 2 nodes
- [ ] Implement a node that inherits from rclpy.Node
- [ ] Add publishers, subscribers, services, or clients as needed
- [ ] Use timers for periodic operations
- [ ] Properly handle node lifecycle (initialization, spinning, cleanup)

### Skill 2: Topic Communication
**Task**: Implement publisher-subscriber communication
- [ ] Create a publisher with appropriate message type
- [ ] Create a subscriber with appropriate callback function
- [ ] Test communication between nodes
- [ ] Adjust Quality of Service (QoS) settings appropriately

### Skill 3: Service Communication
**Task**: Implement client-server communication
- [ ] Create a service server with proper request/response handling
- [ ] Create a client that makes service requests
- [ ] Test the client-server interaction
- [ ] Handle service call failures appropriately

## Self-Assessment Questions

1. What is the difference between a publisher-subscriber and client-server communication pattern?
2. When would you use topics instead of services?
3. How do you create a custom message type in ROS 2?
4. What are Quality of Service (QoS) settings and why are they important?
5. How do you handle multiple publishers for the same topic?
6. What happens when a service server is not available when a client makes a request?

## Answer Guide

1. Publisher-subscriber is asynchronous with loose coupling; client-server is synchronous with tight coupling.
2. Use topics for streaming data, broadcasting, or when guaranteed delivery isn't required.
3. Custom messages are defined in .msg files in a package's msg directory.
4. QoS settings control message delivery behavior like reliability, durability, and history.
5. Messages from multiple publishers are combined in the topic's message queue.
6. The client will typically block or timeout waiting for the service.

## Chapter 2 Completion Checklist

By the end of Chapter 2, you should be able to:
- [ ] Create ROS 2 nodes in Python using rclpy
- [ ] Implement publisher-subscriber communication patterns
- [ ] Implement client-server communication patterns
- [ ] Choose appropriate communication patterns for different scenarios
- [ ] Use Quality of Service settings effectively
- [ ] Debug communication issues between nodes
- [ ] Design modular systems using ROS 2 communication patterns
- [ ] Understand the trade-offs between different communication approaches

If you can complete all these items, you're ready to move on to Chapter 3: Python Agents, rclpy, and Humanoid URDF Basics.