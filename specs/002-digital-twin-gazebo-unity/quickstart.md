# Quickstart Guide: Module 2 — The Digital Twin (Gazebo & Unity)

**Feature**: `002-digital-twin-gazebo-unity` | **Date**: 2025-12-23 | **Spec**: [spec.md](./spec.md)

## Overview

This quickstart guide provides the essential steps to begin working with digital twin technology for humanoid robotics using Gazebo and Unity. Follow these steps to set up your environment and run your first simulation.

## Prerequisites

Before starting, ensure you have:

### System Requirements
- **Operating System**: Ubuntu 22.04 LTS or Windows 10/11
- **CPU**: Multi-core processor (Intel i5 or equivalent)
- **RAM**: 16GB or more recommended
- **GPU**: Dedicated graphics card with OpenGL 4.5+ support
- **Storage**: 20GB free space for simulation environments

### Software Requirements
- ROS 2 Humble Hawksbill installed and configured
- Gazebo Harmonic or newer
- Unity 2022.3 LTS or newer
- Git version control system
- Node.js v18+ and npm for Docusaurus
- Python 3.8+ with pip

## Installation Steps

### 1. Install ROS 2 Humble

**Ubuntu:**
```bash
# Add ROS 2 repository
sudo apt update && sudo apt install -y curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Install ROS 2 packages
sudo apt update
sudo apt install -y ros-humble-desktop ros-humble-gazebo-ros-pkgs
sudo apt install -y python3-colcon-common-extensions python3-rosdep
```

**Windows:**
- Download and install ROS 2 Humble from the official ROS website
- Follow the Windows installation guide for binary packages

### 2. Install Gazebo

**Ubuntu:**
```bash
sudo apt install gazebo libgazebo-dev
```

**Alternative installation via Homebrew (if available):**
```bash
brew install gazebo
```

### 3. Install Unity Hub and Unity Editor

1. Download Unity Hub from the Unity website
2. Install Unity Hub and sign in with your Unity ID
3. Install Unity 2022.3 LTS version through Unity Hub
4. Install additional modules if prompted (Linux Build Support, etc.)

### 4. Set Up Your Workspace

```bash
# Create workspace directory
mkdir -p ~/digital_twin_ws/src
cd ~/digital_twin_ws

# Source ROS 2 environment
source /opt/ros/humble/setup.bash

# Create colcon workspace
colcon build
source install/setup.bash
```

### 5. Set Up Docusaurus for Educational Content

```bash
# Navigate to frontend_book directory
cd /path/to/your/project/frontend_book

# Install dependencies
npm install

# Start development server
npm start
```

## First Simulation: Basic Humanoid in Gazebo

### 1. Create a Simple Humanoid Model

Create a basic humanoid URDF file (`~/digital_twin_ws/src/my_robot_description/urdf/simple_humanoid.urdf`):

```xml
<?xml version="1.0"?>
<robot name="simple_humanoid">
  <!-- Base link -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.3 0.2 0.5"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.3 0.2 0.5"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="10.0"/>
      <inertia ixx="1.0" ixy="0.0" ixz="0.0" iyy="1.0" iyz="0.0" izz="1.0"/>
    </inertial>
  </link>

  <!-- Head -->
  <link name="head">
    <visual>
      <geometry>
        <sphere radius="0.1"/>
      </geometry>
      <material name="white">
        <color rgba="1 1 1 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <sphere radius="0.1"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="2.0"/>
      <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.01"/>
    </inertial>
  </link>

  <joint name="head_joint" type="fixed">
    <parent link="base_link"/>
    <child link="head"/>
    <origin xyz="0 0 0.35"/>
  </joint>

  <!-- Left leg -->
  <link name="left_leg">
    <visual>
      <geometry>
        <box size="0.1 0.1 0.4"/>
      </geometry>
      <material name="red">
        <color rgba="1 0 0 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.1 0.1 0.4"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="3.0"/>
      <inertia ixx="0.05" ixy="0.0" ixz="0.0" iyy="0.05" iyz="0.0" izz="0.01"/>
    </inertial>
  </link>

  <joint name="left_leg_joint" type="fixed">
    <parent link="base_link"/>
    <child link="left_leg"/>
    <origin xyz="-0.1 0 -0.3"/>
  </joint>

  <!-- Right leg -->
  <link name="right_leg">
    <visual>
      <geometry>
        <box size="0.1 0.1 0.4"/>
      </geometry>
      <material name="red">
        <color rgba="1 0 0 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.1 0.1 0.4"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="3.0"/>
      <inertia ixx="0.05" ixy="0.0" ixz="0.0" iyy="0.05" iyz="0.0" izz="0.01"/>
    </inertial>
  </link>

  <joint name="right_leg_joint" type="fixed">
    <parent link="base_link"/>
    <child link="right_leg"/>
    <origin xyz="0.1 0 -0.3"/>
  </joint>
</robot>
```

### 2. Launch the Simulation

Create a launch file (`~/digital_twin_ws/src/my_robot_description/launch/simple_humanoid.launch.py`):

```python
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node
from launch.substitutions import Command
from ament_index_python.packages import get_package_share_directory
import os

def generate_launch_description():
    package_dir = get_package_share_directory('my_robot_description')

    # Robot state publisher
    robot_state_publisher = Node(
        package='robot_state_publisher',
        executable='robot_state_publisher',
        name='robot_state_publisher',
        output='screen',
        parameters=[{
            'robot_description': Command(['xacro ', os.path.join(package_dir, 'urdf', 'simple_humanoid.urdf')])
        }]
    )

    # Spawn entity in Gazebo
    spawn_entity = Node(
        package='gazebo_ros',
        executable='spawn_entity.py',
        arguments=[
            '-topic', 'robot_description',
            '-entity', 'simple_humanoid'
        ],
        output='screen'
    )

    return LaunchDescription([
        robot_state_publisher,
        spawn_entity
    ])
```

### 3. Run the Simulation

```bash
# Build your workspace
cd ~/digital_twin_ws
colcon build
source install/setup.bash

# Start Gazebo
ign gazebo -r empty.sdf

# In another terminal, launch the robot
ros2 launch my_robot_description simple_humanoid.launch.py
```

## First Unity Environment

### 1. Create Unity Project

1. Open Unity Hub
2. Click "New Project"
3. Select "3D (Built-in Render Pipeline)" template
4. Name your project "DigitalTwinEnvironment"
5. Click "Create Project"

### 2. Basic Scene Setup

1. Create a plane for the ground (GameObject → 3D Object → Plane)
2. Add a humanoid model or use capsules to represent your robot
3. Add lighting (GameObject → Light → Directional Light)
4. Set up camera view for the scene

### 3. Export and Integrate

1. Export your Unity scene as a package
2. Document the scene structure for educational purposes

## Running the Educational Content

### 1. Start the Docusaurus Server

```bash
# Navigate to frontend_book directory
cd /path/to/your/project/frontend_book

# Install dependencies
npm install

# Start development server
npm start
```

### 2. Access the Educational Content

Open your browser to `http://localhost:3000` to access the educational content for the digital twin module.

## Key Commands and Shortcuts

### Gazebo Commands
- `ign gazebo -r empty.sdf` - Start Gazebo with empty world
- `ros2 topic list` - List available ROS topics
- `ros2 topic echo /topic_name` - Monitor topic data
- `ign topic -t /gazebo/default/world_stats -e` - Monitor Gazebo world stats

### Unity Shortcuts
- `WASD` - Move camera in Scene view
- `Q` - Select tool
- `W` - Move tool
- `E` - Rotate tool
- `R` - Scale tool

### ROS 2 Commands
- `source /opt/ros/humble/setup.bash` - Source ROS environment
- `ros2 run package_name executable_name` - Run a ROS node
- `ros2 topic list` - List all topics
- `ros2 service list` - List all services

## Troubleshooting

### Common Issues

**Gazebo won't start:**
- Check if ROS 2 environment is sourced
- Verify Gazebo installation: `which ign`
- Check for conflicting processes

**Unity performance issues:**
- Reduce rendering quality in Unity settings
- Close other applications to free up resources
- Check GPU drivers are up to date

**ROS 2 communication issues:**
- Verify ROS_DOMAIN_ID is consistent across terminals
- Check network configuration if using multi-machine setup
- Ensure all nodes are on the same network

## Next Steps

1. Complete Chapter 1: Digital Twins and Physics Simulation with Gazebo
2. Explore Chapter 2: High-Fidelity Environments and Interaction in Unity
3. Implement Chapter 3: Sensor Simulation for Humanoid Robots
4. Work on the capstone project integrating both simulation environments

## Getting Help

- Check the detailed documentation in the Docusaurus site
- Review the ROS 2 and Gazebo official documentation
- Join the ROS community forums for support
- Consult Unity documentation for environment creation