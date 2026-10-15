---
sidebar_position: 1
title: "📡 How Robots Talk: Nodes, Topics & Services"
---

# 📡 How Robots Talk: Nodes, Topics & Services

:::tip 🍕 The Restaurant Analogy (Simplest Way to Understand ROS 2)
Imagine running a busy high-tech pizza restaurant. You don't have one person doing everything. You have a **Chef**, a **Cashier**, and a **Delivery Driver**.
In ROS 2:
- Each person is an independent **Node**.
- The kitchen order ticket board is a **Topic**.
- Asking the manager for change is a **Service**.
- Baking a pizza with live countdown updates is an **Action**.
:::

Let's break down the 4 core communication channels that make autonomous robots work!

---

## 1. 🤖 What is a Node? (The Workers)

A **Node** is simply a small Python or C++ script dedicated to doing **one specific job**. 

For example, in a humanoid robot:
- `camera_node`: Reads pixels from the eye camera.
- `lidar_node`: Measures distance to nearby walls.
- `balance_node`: Keeps the bipedal legs upright.
- `speech_node`: Listens to your voice.

```
       ┌────────────────┐
       │   camera_node  │ ──▶ Captures raw video frames
       └────────────────┘
       ┌────────────────┐
       │   speech_node  │ ──▶ Listens to microphone
       └────────────────┘
       ┌────────────────┐
       │   leg_node     │ ──▶ Moves motor servos
       └────────────────┘
```

> **Why separate nodes?** If the speech node crashes, the leg balance node keeps running! The robot won't fall down just because someone spoke too softly.

---

## 2. 📢 Topics: The Continuous Broadcast Radio

A **Topic** is a one-way communication channel (Publish / Subscribe):
- One node **Publishes** data (like an FM radio station).
- Any number of other nodes can **Subscribe** (like cars tuning into the station).
- Neither side blocks or waits for the other.

```
[📷 camera_node] ──Publishes──▶ Topic: /camera/image ──Subscribes──▶ [🧠 AI Vision Node]
                                                     ──Subscribes──▶ [🖥️ Web Dashboard]
```

**Best for**: Continuous sensor streams, LiDAR lasers, video feeds, motor velocities (`/cmd_vel`).

---

## 3. 📞 Services: The Quick Question & Answer

A **Service** is a direct two-way phone call (Request / Response):
- A Client node sends a **Request** and waits.
- The Server node does the work and sends back a **Response**.

```
[Navigation Client] ──"Reset Odometer to (0,0)"──▶ [Odometry Server]
[Navigation Client] ◀────── "Reset Successful" ─────── [Odometry Server]
```

**Best for**: One-time checks, resetting sensors, triggering calibration, turning headlights on/off.

---

## 4. ⏳ Actions: Long-Running Missions with Live Progress

What if an instruction takes 30 seconds to finish, like *"Walk 10 meters forward"*?
- If you use a Service, the robot freezes waiting for 30 seconds!
- Instead, you use an **Action**:
  1. **Send Goal**: "Walk to the door".
  2. **Live Feedback**: "Completed 2m... 5m... 8m..." (robot streams progress).
  3. **Cancelable**: You can abort midway if an obstacle appears.
  4. **Result**: "Arrived at door successfully".

---

## 📊 Summary Cheat Sheet

| Communication Pattern | Data Flow | Blocking? | Real-World Example |
| :--- | :--- | :--- | :--- |
| **Topic** | 1-to-Many Streaming | No (Async) | Camera frames, LiDAR scan, `/cmd_vel` |
| **Service** | 1-to-1 Request/Reply | Yes (Sync) | Reset sensor, trigger camera snapshot |
| **Action** | Goal + Live Feedback | Async with Cancel | Navigate to charging pad, grasp object |

---

:::info 🚀 Ready to code?
**Click the Next Chapter button below** to write and run your first live Python Publisher & Subscriber nodes!
:::