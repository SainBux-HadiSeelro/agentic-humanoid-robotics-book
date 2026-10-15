# API Contracts: Vision-Language-Action (VLA) Module

## Overview
This document defines the API contracts for the VLA educational module, enabling integration between speech recognition, LLM processing, and robot simulation components.

## Voice Processing API

### POST /api/vla/voice/process
Process voice input and generate text transcription

**Request**:
```json
{
  "audioData": "base64-encoded-audio",
  "language": "en",
  "model": "whisper-1"
}
```

**Response (200)**:
```json
{
  "id": "uuid",
  "text": "transcribed text from speech",
  "confidence": 0.95,
  "processingTime": 1200,
  "timestamp": "2025-12-24T10:00:00Z"
}
```

**Response (400)**:
```json
{
  "error": "Invalid audio format",
  "message": "Audio must be in WAV or MP3 format"
}
```

## Cognitive Planning API

### POST /api/vla/planning/generate
Generate cognitive plan from text command and optional visual input

**Request**:
```json
{
  "command": "Move the robot forward 2 meters",
  "visionData": {
    "imageId": "image-uuid",
    "objects": ["robot", "obstacle"],
    "spatialRelations": "robot is 2m from obstacle"
  },
  "context": {
    "robotCapabilities": ["move_forward", "turn", "detect_obstacles"],
    "environmentConstraints": ["no_collision", "stay_in_bounds"]
  }
}
```

**Response (200)**:
```json
{
  "id": "plan-uuid",
  "commands": [
    {
      "action": "move_forward",
      "parameters": {"distance": 2.0, "unit": "meters"},
      "estimatedTime": 5000
    }
  ],
  "reasoning": "Moving forward 2 meters to reach destination while avoiding obstacles",
  "confidence": 0.89,
  "timestamp": "2025-12-24T10:00:00Z"
}
```

## Robot Simulation API

### POST /api/vla/simulation/execute
Execute action sequence on simulated robot

**Request**:
```json
{
  "planId": "plan-uuid",
  "actions": [
    {
      "action": "move_forward",
      "parameters": {"distance": 2.0, "unit": "meters"}
    }
  ],
  "simulationOptions": {
    "speed": 1.0,
    "visualization": true
  }
}
```

**Response (200)**:
```json
{
  "executionId": "execution-uuid",
  "status": "completed",
  "robotState": {
    "position": {"x": 2.0, "y": 0.0, "z": 0.0},
    "orientation": {"roll": 0, "pitch": 0, "yaw": 0},
    "velocity": {"x": 0, "y": 0, "z": 0}
  },
  "executionTime": 5200,
  "timestamp": "2025-12-24T10:00:00Z"
}
```

### GET /api/vla/simulation/state/{robotId}
Get current state of simulated robot

**Response (200)**:
```json
{
  "robotId": "sim-robot-1",
  "state": {
    "position": {"x": 1.5, "y": 0.0, "z": 0.0},
    "orientation": {"roll": 0, "pitch": 0, "yaw": 0},
    "status": "idle",
    "batteryLevel": 0.85,
    "capabilities": ["move_forward", "turn", "detect_obstacles"]
  },
  "timestamp": "2025-12-24T10:00:00Z"
}
```

## Vision Processing API

### POST /api/vla/vision/analyze
Analyze visual input and extract relevant information

**Request**:
```json
{
  "imageData": "base64-encoded-image",
  "analysisType": ["object_detection", "spatial_relations"],
  "context": "Analyze for robot navigation purposes"
}
```

**Response (200)**:
```json
{
  "id": "vision-analysis-uuid",
  "objects": [
    {
      "name": "red_cube",
      "position": {"x": 1.0, "y": 0.5, "z": 0.0},
      "confidence": 0.92
    }
  ],
  "spatialRelations": [
    "red_cube is 1.5m in front of robot",
    "blue_box is to the left of red_cube"
  ],
  "timestamp": "2025-12-24T10:00:00Z"
}
```

## Error Response Format

All error responses follow this format:

**Response (4xx/5xx)**:
```json
{
  "error": "error_code",
  "message": "Human-readable error message",
  "details": "Optional detailed error information",
  "timestamp": "2025-12-24T10:00:00Z"
}
```

## Common Error Codes
- `INVALID_INPUT`: Request data doesn't meet requirements
- `PROCESSING_FAILED`: Service failed to process the request
- `RESOURCE_NOT_FOUND`: Requested resource doesn't exist
- `RATE_LIMIT_EXCEEDED`: Too many requests in given time period
- `SERVICE_UNAVAILABLE`: Service temporarily unavailable