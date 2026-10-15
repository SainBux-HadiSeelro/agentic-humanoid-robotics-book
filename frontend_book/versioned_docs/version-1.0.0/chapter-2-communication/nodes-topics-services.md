---
sidebar_position: 1
---

# ROS 2 Communication: Nodes, Topics, and Services

## Core Communication Concepts

ROS 2 provides several communication patterns that allow different parts of your robot to interact:

- **Nodes**: Independent processes that perform computation
- **Topics**: Channels for data transmission using publish/subscribe pattern
- **Services**: Request/response communication pattern
- **Actions**: Goal-oriented communication with feedback

## Nodes

A node is an executable that uses ROS 2 to communicate with other nodes. You can think of nodes as the "processes" or "programs" in a ROS 2 system. Each node:

- Performs a specific function (e.g., sensor data processing, motion control)
- Communicates with other nodes through topics, services, or actions
- Can be written in any of the supported languages (Python, C++, etc.)

## Topics and Publish/Subscribe Pattern

Topics enable asynchronous communication between nodes using a publish/subscribe model:

- Publishers send data to a topic
- Subscribers receive data from a topic
- Multiple publishers and subscribers can exist for the same topic
- Communication is decoupled in time (publishers and subscribers don't need to run simultaneously)

This pattern is ideal for streaming data like sensor readings or robot state information.

## Services and Request/Response Pattern

Services enable synchronous communication between nodes using a request/response model:

- A client sends a request to a service
- The service processes the request and sends back a response
- Communication is synchronous (the client waits for the response)
- Useful for tasks that require a specific outcome

This pattern is ideal for operations like saving a map or executing a specific action.

We'll explore practical examples of these patterns in the following sections.