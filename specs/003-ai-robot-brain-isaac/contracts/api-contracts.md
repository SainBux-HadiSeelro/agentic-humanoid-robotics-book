# API Contracts: NVIDIA Isaac AI-Robot Brain Educational Module

**Input**: Feature specification from `/specs/003-ai-robot-brain-isaac/spec.md`

## Overview

This document defines the API contracts and interfaces for the educational content related to NVIDIA Isaac technologies. These contracts represent the conceptual interfaces and data exchanges that students will learn about when working with Isaac Sim, Isaac ROS, and Nav2.

## Isaac Sim Interfaces

### Synthetic Data Generation API

#### `/synthetic-data/generate`
- **Method**: POST
- **Description**: Generate synthetic training data from simulation environment
- **Request**:
  - `simulation_config`: Object containing environment settings
  - `sensor_config`: Object defining sensor properties
  - `quantity`: Number of samples to generate
  - `output_format`: Desired format for generated data

- **Response**:
  - `job_id`: Unique identifier for the generation job
  - `status`: Current status of the job
  - `estimated_completion`: Estimated time to completion
  - `output_path`: Path to generated data

#### `/synthetic-data/status/{job_id}`
- **Method**: GET
- **Description**: Check status of synthetic data generation job
- **Request**:
  - `job_id`: Unique identifier for the generation job

- **Response**:
  - `status`: Current status (pending, running, completed, failed)
  - `progress`: Progress percentage (0-100)
  - `generated_samples`: Number of samples generated so far
  - `estimated_remaining`: Estimated time remaining

#### `/synthetic-data/download/{job_id}`
- **Method**: GET
- **Description**: Download generated synthetic data
- **Request**:
  - `job_id`: Unique identifier for completed generation job

- **Response**:
  - Binary data stream of generated dataset
  - Metadata file with annotations and ground truth

## Isaac ROS Perception Interfaces

### Visual SLAM Service

#### `/visual_slam/start`
- **Method**: POST
- **Description**: Initialize and start visual SLAM process
- **Request**:
  - `camera_config`: Camera parameters and calibration
  - `initial_pose`: Initial robot pose estimate
  - `map_resolution`: Resolution of generated map

- **Response**:
  - `session_id`: Unique identifier for SLAM session
  - `status`: Initialization status
  - `estimated_map_size`: Estimated size of map

#### `/visual_slam/pose`
- **Method**: GET
- **Description**: Get current robot pose estimate from SLAM
- **Response**:
  - `position`: 3D position (x, y, z)
  - `orientation`: Quaternion (x, y, z, w)
  - `confidence`: Confidence level of estimate (0-1)
  - `timestamp`: Timestamp of estimate

#### `/visual_slam/map`
- **Method**: GET
- **Description**: Get current map from SLAM process
- **Response**:
  - `map_data`: Occupancy grid or point cloud data
  - `resolution`: Map resolution
  - `origin`: Map origin coordinates
  - `timestamp`: Timestamp of map

### Accelerated Perception Pipeline

#### `/perception/detect_objects`
- **Method**: POST
- **Description**: Run object detection on input image
- **Request**:
  - `image_data`: Input image data
  - `model_type`: Type of detection model to use
  - `confidence_threshold`: Minimum confidence for detections

- **Response**:
  - `detections`: Array of detected objects
    - `class`: Object class
    - `confidence`: Detection confidence
    - `bbox`: Bounding box coordinates
    - `mask`: Segmentation mask (if available)

#### `/perception/estimate_depth`
- **Method**: POST
- **Description**: Estimate depth from stereo images or single image
- **Request**:
  - `image_data`: Input image(s) for depth estimation
  - `method`: Depth estimation method to use

- **Response**:
  - `depth_map`: Depth values for each pixel
  - `confidence_map`: Confidence for each depth estimate
  - `units`: Units of depth measurement

## Nav2 Navigation Interfaces

### Path Planning Service

#### `/navigate/to_pose`
- **Method**: POST
- **Description**: Plan and execute navigation to target pose
- **Request**:
  - `target_pose`: Target position and orientation
  - `planner_id`: ID of path planner to use
  - `controller_id`: ID of controller to use

- **Response**:
  - `navigation_id`: Unique identifier for navigation task
  - `status`: Current navigation status
  - `path`: Planned path as array of waypoints

#### `/navigate/cancel/{navigation_id}`
- **Method**: POST
- **Description**: Cancel ongoing navigation task
- **Request**:
  - `navigation_id`: Unique identifier for navigation task

- **Response**:
  - `status`: Cancellation status
  - `final_pose`: Robot's final pose after cancellation

#### `/navigate/status/{navigation_id}`
- **Method**: GET
- **Description**: Get status of ongoing navigation task
- **Request**:
  - `navigation_id`: Unique identifier for navigation task

- **Response**:
  - `status`: Current navigation status (executing, completed, failed, canceled)
  - `progress`: Navigation progress percentage
  - `current_pose`: Current robot pose
  - `remaining_distance`: Distance to goal

### Map Management

#### `/map/save`
- **Method**: POST
- **Description**: Save current map to file
- **Request**:
  - `map_name`: Name for saved map
  - `format`: Desired format (png, yaml, etc.)

- **Response**:
  - `status`: Save operation status
  - `file_path`: Path to saved map file

#### `/map/load`
- **Method**: POST
- **Description**: Load map from file
- **Request**:
  - `file_path`: Path to map file to load
  - `map_name`: Name to assign to loaded map

- **Response**:
  - `status`: Load operation status
  - `map_info`: Information about loaded map

## Isaac Sim-ROS Bridge Interfaces

### Simulation Control

#### `/simulation/start`
- **Method**: POST
- **Description**: Start Isaac Sim simulation
- **Request**:
  - `scene_file`: Path to scene file to load
  - `simulation_config`: Simulation parameters

- **Response**:
  - `simulation_id`: Unique identifier for simulation
  - `status`: Current simulation status
  - `start_time`: Simulation start time

#### `/simulation/pause`
- **Method**: POST
- **Description**: Pause Isaac Sim simulation
- **Request**:
  - `simulation_id`: Unique identifier for simulation

- **Response**:
  - `status`: Pause operation status

#### `/simulation/reset`
- **Method**: POST
- **Description**: Reset Isaac Sim simulation
- **Request**:
  - `simulation_id`: Unique identifier for simulation

- **Response**:
  - `status`: Reset operation status

## Data Formats and Schemas

### Pose Message Format
```json
{
  "position": {
    "x": 0.0,
    "y": 0.0,
    "z": 0.0
  },
  "orientation": {
    "x": 0.0,
    "y": 0.0,
    "z": 0.0,
    "w": 1.0
  }
}
```

### Detection Message Format
```json
{
  "class": "object_class",
  "confidence": 0.85,
  "bbox": {
    "x_min": 100,
    "y_min": 50,
    "x_max": 200,
    "y_max": 150
  },
  "mask": "base64_encoded_mask"
}
```

### Path Message Format
```json
{
  "header": {
    "stamp": "timestamp",
    "frame_id": "map"
  },
  "poses": [
    {
      "position": {"x": 0.0, "y": 0.0, "z": 0.0},
      "orientation": {"x": 0.0, "y": 0.0, "z": 0.0, "w": 1.0}
    }
  ]
}
```

## Error Handling

### Standard Error Response
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Descriptive error message",
    "details": "Additional error details",
    "timestamp": "ISO 8601 timestamp"
  }
}
```

### Common Error Codes
- `ISAAC_SIM_UNAVAILABLE`: Isaac Sim not accessible
- `GPU_UNAVAILABLE`: GPU acceleration not available
- `INSUFFICIENT_RESOURCES`: Not enough system resources
- `INVALID_PARAMETERS`: Invalid parameters provided
- `PERCEPTION_FAILED`: Perception pipeline failed
- `NAVIGATION_FAILED`: Navigation task failed
- `SIMULATION_ERROR`: Simulation error occurred

## Performance Expectations

### Response Times
- Perception services: < 100ms for standard operations
- SLAM pose updates: < 50ms
- Navigation commands: < 10ms
- Simulation control: < 10ms

### Throughput
- Object detection: 30+ FPS on RTX 3060
- SLAM processing: 30+ FPS with stereo cameras
- Navigation updates: 10+ Hz

## Security Considerations

### Authentication
- All API endpoints require authentication in production environments
- Educational content assumes secure local development environment
- No authentication required for learning purposes

### Data Privacy
- Synthetic data generation does not involve real personal data
- All data used in educational examples is synthetic
- No real-world privacy concerns for educational content