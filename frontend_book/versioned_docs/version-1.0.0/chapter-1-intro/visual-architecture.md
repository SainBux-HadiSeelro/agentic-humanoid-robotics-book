---
sidebar_position: 5
---

# Visual Architecture: ROS 2 System Diagrams

## Basic ROS 2 Architecture

The fundamental architecture of a ROS 2 system:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Sensor Node   │    │  Processing Node │    │  Actuator Node  │
│                 │    │                  │    │                 │
│  ┌───────────┐  │    │  ┌───────────┐   │    │  ┌───────────┐  │
│  │ Publisher │  │───▶│  │ Subscriber│   │───▶│  │ Subscriber│  │
│  └───────────┘  │    │  └───────────┘   │    │  └───────────┘  │
│                 │    │                  │    │                 │
│  Topic: /scan   │    │ Topic: /processed│    │  Topic: /cmd    │
└─────────────────┘    │    Data         │    └─────────────────┘
                       └──────────────────┘
```

## Middleware Layer

ROS 2 as middleware sits between the operating system and robot applications:

```
┌─────────────────────────────────────────────────────────────┐
│                   Robot Applications                        │
├─────────────────────────────────────────────────────────────┤
│          ROS 2 Communication Layer (DDS)                    │
├─────────────────────────────────────────────────────────────┤
│              Operating System                               │
├─────────────────────────────────────────────────────────────┤
│             Hardware Layer                                  │
└─────────────────────────────────────────────────────────────┘
```

## Node Communication Patterns

Different communication patterns in ROS 2:

### Publisher-Subscriber (Topics)
```
      ┌─────────────┐
      │ Publisher   │
      │ Node A      │
      └──────┬──────┘
             │ (Topic: /sensor_data)
             ▼
      ┌─────────────┐    ┌─────────────┐
      │ Subscriber  │    │ Subscriber  │
      │ Node B      │    │ Node C      │
      └─────────────┘    └─────────────┘
```

### Client-Service
```
┌─────────────┐              ┌─────────────┐
│ Client      │              │ Service     │
│ Node A      │─────────────▶│ Node B      │
└─────────────┘ Request/Response └─────────────┘
```

## Complete Robot System Example

A more complete example of a mobile robot system:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Camera Node   │    │   Perception     │    │ Navigation Node │
│                 │    │     Node         │    │                 │
│  ┌───────────┐  │    │  ┌───────────┐   │    │  ┌───────────┐  │
│  │ Publisher │  │───▶│  │ Subscriber│   │───▶│  │ Subscriber│  │
│  └───────────┘  │    │  │ Publisher │   │    │  └───────────┘  │
│                 │    │  └───────────┘   │    │                 │
│ Topic: /camera │    │ Topics: /image,   │    │ Topic: /cmd_vel │
└─────────────────┘    │ /detected_obj    │    └─────────────────┘
                       └─────────┬────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   AI Decision Maker     │
                    │       Node              │
                    │  ┌─────────────────┐    │
                    │  │ Service Server  │    │
                    │  │ (path planning) │    │
                    │  └─────────────────┘    │
                    └─────────────────────────┘
```

## Key Takeaways

1. **Decentralized**: Nodes communicate through topics/services rather than direct connections
2. **Language Agnostic**: Nodes can be written in different programming languages
3. **Distributed**: Nodes can run on different computers in a network
4. **Modular**: Adding or removing nodes doesn't affect the entire system significantly

These diagrams illustrate how ROS 2 enables complex robot systems to be built from modular, reusable components that communicate through well-defined interfaces.