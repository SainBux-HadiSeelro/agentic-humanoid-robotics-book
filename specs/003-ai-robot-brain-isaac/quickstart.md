# Quickstart Guide: NVIDIA Isaac AI-Robot Brain Educational Module

**Input**: Feature specification from `/specs/003-ai-robot-brain-isaac/spec.md`

## Overview

This quickstart guide provides a rapid path to understanding the core concepts of the NVIDIA Isaac ecosystem for AI-robot applications. It covers Isaac Sim for photorealistic simulation and synthetic data generation, Isaac ROS for hardware-accelerated perception and VSLAM, and Nav2 for humanoid navigation and path planning.

## Prerequisites

### Hardware Requirements
- NVIDIA GPU with CUDA support (RTX 3060 or better recommended)
- 16GB+ RAM (32GB recommended)
- 100GB+ free disk space for Isaac Sim
- Compatible CPU (Intel i7 or AMD Ryzen 7+)

### Software Requirements
- Ubuntu 22.04 LTS (or Windows with WSL2 Ubuntu 22.04)
- ROS 2 Humble Hawksbill
- NVIDIA GPU drivers (520+)
- CUDA 11.8+
- Docker (for containerized Isaac packages)

## Installation and Setup

### 1. System Preparation

First, ensure your system meets the hardware requirements and install the necessary base software:

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install basic development tools
sudo apt install build-essential cmake git python3-pip -y

# Install ROS 2 Humble dependencies
sudo apt install python3-rosdep python3-colcon-common-extensions -y
```

### 2. NVIDIA Driver and CUDA Setup

Install NVIDIA drivers and CUDA toolkit:

```bash
# Add NVIDIA package repositories
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.0-1_all.deb
sudo dpkg -i cuda-keyring_1.0-1_all.deb
sudo apt update

# Install CUDA toolkit
sudo apt install cuda-toolkit-11-8 -y

# Reboot to apply driver changes
sudo reboot
```

### 3. Isaac Sim Installation

Isaac Sim can be installed via Omniverse:

```bash
# Download and install Omniverse Launcher
# Visit https://developer.nvidia.com/omniverse/download to download the launcher

# Install Isaac Sim through Omniverse Launcher
# Follow the installation instructions in the launcher
```

### 4. Isaac ROS Packages

Install Isaac ROS packages:

```bash
# Source ROS 2 environment
source /opt/ros/humble/setup.bash

# Create a workspace
mkdir -p ~/isaac_ws/src
cd ~/isaac_ws

# Install Isaac ROS packages via apt
sudo apt update
sudo apt install ros-humble-isaac-ros-* -y

# Or build from source (for latest features)
cd ~/isaac_ws/src
git clone -b humble https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_common.git
git clone -b humble https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_image_pipeline.git
git clone -b humble https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_visual_slam.git
git clone -b humble https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_pose_estimation.git

# Build the workspace
cd ~/isaac_ws
source /opt/ros/humble/setup.bash
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install
source install/setup.bash
```

### 5. Nav2 Setup

Install the navigation stack:

```bash
# Install Nav2 packages
sudo apt update
sudo apt install ros-humble-navigation2 ros-humble-nav2-bringup -y

# Install Nav2 example packages
sudo apt install ros-humble-nav2-example-plugins -y
```

## Basic Usage Examples

### 1. Launch Isaac Sim

Start Isaac Sim with a basic environment:

```bash
# Launch Isaac Sim through Omniverse Launcher
# Or via command line:
cd ~/.local/share/ov/pkg/isaac_sim-2023.1.1/
./python.sh standalone_examples/api/omni.isaac.core_examples/test_basic_env.py
```

### 2. Run Isaac ROS Visual SLAM

Execute a basic VSLAM example:

```bash
# Source your workspace
source ~/isaac_ws/install/setup.bash

# Run the Isaac ROS Visual SLAM example
ros2 launch isaac_ros_visual_slam isaac_ros_visual_slam.launch.py
```

### 3. Test Nav2 Navigation

Launch Nav2 for navigation testing:

```bash
# Source ROS 2 and your workspace
source /opt/ros/humble/setup.bash
source ~/isaac_ws/install/setup.bash

# Launch Nav2 with a simulated environment
ros2 launch nav2_bringup navigation_launch.py use_sim_time:=True
```

## Verification Steps

### 1. Verify Isaac Sim
- Launch Isaac Sim and verify the UI loads without errors
- Check that Omniverse connects to the NVIDIA servers
- Verify that basic scenes can be loaded and rendered

### 2. Verify Isaac ROS
- Check that Isaac ROS packages are available:
```bash
ros2 pkg list | grep isaac
```
- Run a simple Isaac ROS node to verify functionality:
```bash
ros2 run isaac_ros_visual_slam visual_slam_node
```

### 3. Verify Nav2
- Check that Nav2 packages are available:
```bash
ros2 pkg list | grep nav2
```
- Verify Nav2 launch files work:
```bash
ros2 launch nav2_bringup navigation_launch.py --show-models
```

## Troubleshooting Common Issues

### CUDA/GPU Issues
- Ensure NVIDIA drivers are properly installed: `nvidia-smi`
- Verify CUDA installation: `nvcc --version`
- Check GPU availability: `nvidia-ml-py3` test

### Isaac Sim Issues
- Verify Omniverse account and license
- Check internet connectivity for asset downloads
- Ensure sufficient disk space for simulation assets

### ROS 2 Integration Issues
- Verify all packages are properly sourced
- Check for missing dependencies with `rosdep`
- Confirm correct ROS 2 distribution (Humble)

## Next Steps

1. Complete Chapter 1: Deep dive into Isaac Sim and synthetic data generation
2. Complete Chapter 2: Explore Isaac ROS for accelerated perception and VSLAM
3. Complete Chapter 3: Implement Nav2 for humanoid navigation and path planning
4. Integrate all components for a complete AI-robot brain system
5. Experiment with synthetic data generation for AI model training

## Learning Path

This quickstart provides the foundation for understanding the NVIDIA Isaac ecosystem. The three-chapter course will build on these concepts to provide comprehensive knowledge of:

- Simulation-driven development with Isaac Sim
- GPU-accelerated perception with Isaac ROS
- Advanced navigation with Nav2 for humanoid robots

Each chapter includes hands-on exercises that build upon the installation and setup completed here.

## Module 3 Educational Content Structure

The educational content for Module 3 will be organized in the frontend_book/docs directory as follows:

```
frontend_book/docs/
├── chapter-1-isaac-sim/
│   ├── isaac-sim-introduction.md
│   ├── synthetic-data-generation.md
│   ├── photorealistic-simulation.md
│   ├── exercises.md
│   └── acceptance-tests.md
├── chapter-2-isaac-ros/
│   ├── isaac-ros-overview.md
│   ├── accelerated-perception.md
│   ├── vslam-concepts.md
│   ├── gpu-acceleration.md
│   ├── exercises.md
│   └── acceptance-tests.md
├── chapter-3-nav2-humanoid/
│   ├── nav2-architecture.md
│   ├── humanoid-navigation.md
│   ├── path-planning.md
│   ├── isaac-nav2-integration.md
│   ├── exercises.md
│   └── acceptance-tests.md
```

This structure will provide comprehensive coverage of the Isaac ecosystem for educational purposes.