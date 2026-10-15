# Data Model: Module 2 — The Digital Twin (Gazebo & Unity)

**Feature**: `002-digital-twin-gazebo-unity` | **Date**: 2025-12-23 | **Spec**: [spec.md](./spec.md)

## Overview

This document defines the data structures and relationships for the digital twin educational module, focusing on simulation data, sensor data, and educational content organization.

## Core Entities

### 1. DigitalTwinEnvironment
Represents a complete digital twin simulation environment

```
DigitalTwinEnvironment {
  id: string (unique identifier)
  name: string (display name)
  description: string (purpose and features)
  platform: enum (GAZEBO | UNITY | HYBRID)
  humanoid_model: string (URDF/SDF/Unity asset reference)
  physics_properties: PhysicsProperties
  environment_assets: [EnvironmentAsset]
  sensor_configurations: [SensorConfiguration]
  ros_integration: ROSIntegration
  complexity_level: enum (BEGINNER | INTERMEDIATE | ADVANCED)
  creation_date: timestamp
  last_modified: timestamp
}
```

### 2. PhysicsProperties
Defines physics simulation parameters

```
PhysicsProperties {
  engine: enum (ODE | BULLET | SIMBODY | PHYSX)
  gravity: Vector3 (x, y, z components)
  time_step: float (simulation time step in seconds)
  real_time_factor: float (simulation speed multiplier)
  contact_properties: ContactProperties
  collision_detection: string (algorithm used)
}
```

### 3. EnvironmentAsset
Represents environment components (terrain, objects, lighting)

```
EnvironmentAsset {
  id: string (unique identifier)
  name: string (display name)
  type: enum (TERRAIN | OBSTACLE | FURNITURE | LIGHTING | MATERIAL)
  asset_path: string (file path or reference)
  position: Vector3 (x, y, z coordinates)
  rotation: Vector3 (Euler angles)
  scale: Vector3 (x, y, z scale factors)
  physical_properties: PhysicalProperties
  visual_properties: VisualProperties
}
```

### 4. SensorConfiguration
Defines sensor properties and simulation parameters

```
SensorConfiguration {
  id: string (unique identifier)
  name: string (display name)
  type: enum (LIDAR | DEPTH_CAMERA | IMU | RGB_CAMERA | FORCE_TORQUE)
  platform: enum (GAZEBO | UNITY)
  ros_topic: string (ROS 2 topic name)
  parameters: SensorParameters
  noise_model: NoiseModel
  frame_id: string (TF frame identifier)
  position: Vector3 (relative to robot)
  orientation: Vector3 (relative to robot)
}
```

### 5. SensorParameters
Specific parameters for different sensor types

```
SensorParameters {
  // Common parameters
  update_rate: float (Hz)
  range_min: float (minimum range in meters)
  range_max: float (maximum range in meters)

  // LiDAR-specific
  horizontal_resolution: float (angular resolution in radians)
  vertical_resolution: float (vertical angular resolution)
  horizontal_fov: float (horizontal field of view in radians)
  vertical_fov: float (vertical field of view in radians)

  // Camera-specific
  image_width: int (pixel width)
  image_height: int (pixel height)
  fov: float (field of view in radians)
  distortion_coefficients: [float] (camera distortion parameters)

  // IMU-specific
  gyroscope_noise_density: float
  accelerometer_noise_density: float
  gyroscope_random_walk: float
  accelerometer_random_walk: float
}
```

### 6. ROSIntegration
Defines ROS 2 integration aspects

```
ROSIntegration {
  robot_description_topic: string (typically "/robot_description")
  tf_prefix: string (prefix for TF frames)
  joint_state_topic: string (typically "/joint_states")
  sensor_topics: [string] (list of sensor topic names)
  control_topics: [string] (list of control topic names)
  simulation_control_services: [string] (list of service names)
  coordinate_frame: string (reference coordinate frame)
}
```

## Educational Content Structure

### 7. CourseChapter
Represents a major section of the educational content

```
CourseChapter {
  id: string (unique identifier)
  title: string (chapter title)
  description: string (summary of chapter content)
  objectives: [string] (learning objectives)
  duration: int (estimated duration in minutes)
  difficulty: enum (BEGINNER | INTERMEDIATE | ADVANCED)
  content_sections: [ContentSection]
  practical_exercises: [PracticalExercise]
  assessment: Assessment
}
```

### 8. ContentSection
A subsection within a chapter

```
ContentSection {
  id: string (unique identifier)
  title: string (section title)
  content_type: enum (TEXT | VIDEO | DIAGRAM | INTERACTIVE | DEMO)
  content: string (Markdown or HTML content)
  learning_outcomes: [string] (specific outcomes)
  prerequisites: [string] (required knowledge)
  duration: int (estimated time in minutes)
}
```

### 9. PracticalExercise
Hands-on activity for students

```
PracticalExercise {
  id: string (unique identifier)
  title: string (exercise title)
  description: string (detailed description)
  objectives: [string] (what students will learn)
  steps: [ExerciseStep]
  required_assets: [string] (files or resources needed)
  expected_outcome: string (what success looks like)
  hints: [string] (helpful tips)
  solution: string (reference solution)
}
```

### 10. ExerciseStep
Individual step within a practical exercise

```
ExerciseStep {
  id: string (unique identifier)
  step_number: int (sequence number)
  instruction: string (what to do)
  expected_result: string (what should happen)
  verification_method: string (how to verify completion)
}
```

## Simulation Data Models

### 11. SimulationState
Current state of a simulation run

```
SimulationState {
  id: string (unique identifier)
  environment_id: string (reference to DigitalTwinEnvironment)
  timestamp: timestamp (when state was captured)
  robot_pose: Pose (position and orientation)
  joint_states: [JointState] (all joint positions, velocities, efforts)
  sensor_data: [SensorData] (current sensor readings)
  simulation_time: float (time in simulation)
  real_time_factor: float (current real-time factor)
  performance_metrics: PerformanceMetrics
}
```

### 12. SensorData
Data from a simulated sensor

```
SensorData {
  id: string (unique identifier)
  sensor_id: string (reference to SensorConfiguration)
  timestamp: timestamp (ROS timestamp)
  data: object (sensor-specific data payload)
  frame_id: string (coordinate frame)
  sequence_number: int (message sequence number)
}
```

### 13. PerformanceMetrics
Performance data for simulation

```
PerformanceMetrics {
  real_time_factor: float (actual vs desired simulation speed)
  cpu_usage: float (percentage CPU used)
  memory_usage: float (MB of RAM used)
  rendering_fps: float (frames per second for visualization)
  physics_update_rate: float (actual physics update rate)
  communication_latency: float (ROS communication delay in ms)
}
```

## Assessment Structure

### 14. Assessment
Evaluation for a chapter or course

```
Assessment {
  id: string (unique identifier)
  title: string (assessment title)
  type: enum (QUIZ | PRACTICAL | PROJECT | PEER_REVIEW)
  questions: [AssessmentQuestion]
  passing_score: float (percentage required to pass)
  time_limit: int (minutes, 0 for unlimited)
  feedback: AssessmentFeedback
}
```

### 15. AssessmentQuestion
Individual question in an assessment

```
AssessmentQuestion {
  id: string (unique identifier)
  question_text: string (the question)
  question_type: enum (MULTIPLE_CHOICE | TRUE_FALSE | SHORT_ANSWER | CODE)
  options: [string] (for multiple choice)
  correct_answer: string (expected answer)
  points: int (value of question)
  difficulty: enum (EASY | MEDIUM | HARD)
  explanation: string (why the answer is correct)
}
```

## Relationships

### Core Relationships
- DigitalTwinEnvironment contains many EnvironmentAsset
- DigitalTwinEnvironment contains many SensorConfiguration
- DigitalTwinEnvironment has one PhysicsProperties
- DigitalTwinEnvironment has one ROSIntegration
- CourseChapter contains many ContentSection
- CourseChapter contains many PracticalExercise
- CourseChapter has one Assessment
- PracticalExercise contains many ExerciseStep
- SimulationState contains many SensorData
- Assessment contains many AssessmentQuestion

### Educational Flow
- CourseChapter -> ContentSection (ordered sequence)
- CourseChapter -> PracticalExercise (applied learning)
- CourseChapter -> Assessment (evaluation)
- PracticalExercise -> ExerciseStep (step-by-step process)

## Validation Rules

1. **DigitalTwinEnvironment Validation**:
   - Must have at least one EnvironmentAsset
   - PhysicsProperties must be valid for the selected engine
   - Sensor configurations must have unique names within environment

2. **SensorConfiguration Validation**:
   - Parameters must be within physically realistic ranges
   - Frame IDs must follow ROS naming conventions
   - Update rates must be positive values

3. **CourseChapter Validation**:
   - Must have at least one ContentSection
   - Learning objectives must align with content
   - Duration estimates must be reasonable

4. **SimulationState Validation**:
   - Robot pose must be within environment bounds
   - Joint states must be within physical limits
   - Sensor data must be consistent with sensor configuration

## Indexes

For efficient data retrieval:

1. DigitalTwinEnvironment: index on (platform, complexity_level)
2. CourseChapter: index on (difficulty, duration)
3. SensorConfiguration: index on (type, platform)
4. SimulationState: index on (environment_id, timestamp)
5. AssessmentQuestion: index on (question_type, difficulty)

This data model provides a comprehensive structure for organizing the digital twin simulation content and educational materials while maintaining flexibility for different simulation platforms and learning approaches.