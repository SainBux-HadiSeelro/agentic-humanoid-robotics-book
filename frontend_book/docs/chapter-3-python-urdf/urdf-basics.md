---
sidebar_position: 2
---

# URDF Basics: Understanding Robot Structure

## What is URDF?

URDF (Unified Robot Description Format) is an XML-based format used in ROS to describe robot models. It defines the physical and visual properties of a robot, including:

- Links: Rigid parts of the robot
- Joints: Connections between links
- Visual and collision properties
- Inertial properties

## Basic URDF Structure

A simple URDF file looks like this:

```xml
<?xml version="1.0"?>
<robot name="my_robot">
  <!-- Base link -->
  <link name="base_link">
    <visual>
      <geometry>
        <cylinder length="0.6" radius="0.2"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <cylinder length="0.6" radius="0.2"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="10"/>
      <inertia ixx="1.0" ixy="0.0" ixz="0.0" iyy="1.0" iyz="0.0" izz="1.0"/>
    </inertial>
  </link>

  <!-- Child link connected via joint -->
  <link name="upper_leg">
    <visual>
      <geometry>
        <cylinder length="0.6" radius="0.05"/>
      </geometry>
    </visual>
  </link>

  <joint name="hip" type="fixed">
    <parent link="base_link"/>
    <child link="upper_leg"/>
    <origin xyz="0 0 0.3" rpy="0 0 0"/>
  </joint>
</robot>
```

## Links

Links represent rigid bodies in the robot. Each link can have:

- Visual properties (how it looks)
- Collision properties (how it interacts physically)
- Inertial properties (mass, center of mass, etc.)

## Joints

Joints connect links and define how they can move relative to each other:

- **Fixed**: No movement between links
- **Revolute**: Rotational movement around an axis
- **Continuous**: Unlimited rotational movement
- **Prismatic**: Linear sliding movement
- **Planar**: Movement in a plane
- **Floating**: Free movement in 3D space

## URDF for Humanoid Robots

For humanoid robots, URDF typically includes:

- A torso or base link
- Limbs with multiple segments (upper/lower arms, upper/lower legs)
- Joints that mimic human joints (shoulders, elbows, hips, knees)
- End effectors (hands, feet)

## Working with URDF in Python

You can load and manipulate URDF files in Python using various libraries:

```python
# Example of loading a URDF file in Python
import xml.etree.ElementTree as ET

def load_urdf(urdf_path):
    tree = ET.parse(urdf_path)
    root = tree.getroot()

    # Process links
    for link in root.findall('link'):
        name = link.get('name')
        print(f"Link: {name}")

    # Process joints
    for joint in root.findall('joint'):
        name = joint.get('name')
        joint_type = joint.get('type')
        print(f"Joint: {name}, Type: {joint_type}")
```

In the next section, we'll look at how to integrate URDF with your Python-based AI agents.