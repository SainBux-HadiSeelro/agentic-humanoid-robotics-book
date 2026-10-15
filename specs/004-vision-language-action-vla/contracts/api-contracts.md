# API Contracts: Vision-Language-Action (VLA) Educational Module

**Input**: Feature specification from `/specs/004-vision-language-action-vla/spec.md`

## Overview

This document defines the API contracts and interfaces for the educational content related to Vision-Language-Action (VLA) systems. These contracts represent the conceptual interfaces and data exchanges that students will learn about when working with speech recognition, LLM-based cognitive planning, and natural language to ROS 2 action translation.

## Speech Recognition Interfaces

### OpenAI Whisper Interface

#### `/speech/recognize`
- **Method**: POST
- **Description**: Transcribe audio to text using Whisper model
- **Request**:
  - `audio_file`: Audio file to transcribe
  - `model`: Whisper model to use (tiny, base, small, medium, large)
  - `language`: Language code for recognition
  - `temperature`: Temperature for sampling

- **Response**:
  - `text`: Transcribed text
  - `segments`: Array of time-aligned segments
  - `language`: Detected language
  - `duration`: Audio duration

#### `/speech/recognize/streaming`
- **Method**: POST
- **Description**: Real-time streaming speech recognition
- **Request**:
  - `audio_stream`: Streaming audio data
  - `model`: Whisper model to use
  - `partial_results`: Whether to return partial results

- **Response**:
  - `partial_text`: Partial transcription results
  - `final_text`: Final transcription when speech ends
  - `confidence`: Confidence score for recognition

## LLM Cognitive Planning Interfaces

### Language Understanding and Planning Service

#### `/plan/from_language`
- **Method**: POST
- **Description**: Generate action plan from natural language command
- **Request**:
  - `command`: Natural language command
  - `context`: Current context and environment state
  - `robot_capabilities`: Available robot capabilities
  - `planning_options`: Options for planning approach

- **Response**:
  - `action_plan`: Structured action plan
  - `confidence`: Confidence in the plan
  - `reasoning`: Explanation of the planning process
  - `alternatives`: Alternative plans if applicable

#### `/plan/validate`
- **Method**: POST
- **Description**: Validate an action plan for feasibility
- **Request**:
  - `action_plan`: Plan to validate
  - `robot_state`: Current robot state
  - `environment_state`: Current environment state

- **Response**:
  - `is_valid`: Whether the plan is feasible
  - `issues`: List of issues with the plan
  - `suggestions`: Suggestions for plan improvement
  - `confidence`: Confidence in validation

## Vision Processing Interfaces

### Vision-Language Integration

#### `/vision/analyze`
- **Method**: POST
- **Description**: Analyze visual scene and provide understanding
- **Request**:
  - `image_data`: Image to analyze
  - `analysis_types`: Types of analysis (object detection, segmentation, etc.)
  - `query`: Optional query for specific information

- **Response**:
  - `objects`: Detected objects with bounding boxes
  - `scene_description`: Natural language description of scene
  - `spatial_relationships`: Relationships between objects
  - `relevance_score`: Relevance to current task

#### `/vision/query`
- **Method**: POST
- **Description**: Answer questions about visual scene
- **Request**:
  - `image_data`: Image to analyze
  - `query`: Natural language question about the image
  - `context`: Additional context for the query

- **Response**:
  - `answer`: Answer to the question
  - `confidence`: Confidence in the answer
  - `relevant_objects`: Objects relevant to the answer
  - `explanation`: Explanation of the answer

## ROS 2 Action Translation

### Natural Language to ROS Action

#### `/translate/command_to_action`
- **Method**: POST
- **Description**: Translate natural language command to ROS action
- **Request**:
  - `command`: Natural language command
  - `available_actions`: List of available ROS actions
  - `robot_config`: Robot configuration and capabilities

- **Response**:
  - `ros_action`: Corresponding ROS action
  - `parameters`: Parameters for the action
  - `confidence`: Confidence in translation
  - `alternatives`: Alternative action mappings

#### `/execute/with_feedback`
- **Method**: POST
- **Description**: Execute ROS action with progress feedback
- **Request**:
  - `action`: ROS action to execute
  - `parameters`: Action parameters
  - `feedback_frequency`: How often to provide feedback

- **Response**:
  - `execution_id`: Unique identifier for execution
  - `status`: Current execution status
  - `progress`: Progress percentage
  - `feedback`: Execution feedback

## VLA Integration Interfaces

### End-to-End VLA Pipeline

#### `/vla/process_command`
- **Method**: POST
- **Description**: Process complete voice command through VLA pipeline
- **Request**:
  - `audio_input`: Audio command input
  - `visual_context`: Current visual context
  - `environment_state`: Current environment state
  - `robot_state`: Current robot state

- **Response**:
  - `transcription`: Speech-to-text result
  - `understanding`: Language understanding result
  - `plan`: Generated action plan
  - `actions`: ROS actions to execute
  - `confidence`: Overall confidence in the process

#### `/vla/status/{execution_id}`
- **Method**: GET
- **Description**: Get status of VLA pipeline execution
- **Request**:
  - `execution_id`: Unique identifier for execution

- **Response**:
  - `status`: Current status of execution
  - `current_stage`: Current stage in VLA pipeline
  - `progress`: Overall progress percentage
  - `results`: Results from completed stages
  - `errors`: Any errors encountered

## Data Formats and Schemas

### Command Processing Schema
```json
{
  "command": "Go to the kitchen and bring me a cup",
  "context": {
    "robot_position": {"x": 0.0, "y": 0.0, "z": 0.0},
    "environment_objects": [
      {"name": "kitchen", "position": {"x": 5.0, "y": 3.0}},
      {"name": "cup", "position": {"x": 6.0, "y": 4.0}}
    ]
  },
  "robot_capabilities": ["navigation", "manipulation", "speech"]
}
```

### Action Plan Schema
```json
{
  "plan_id": "plan-123",
  "actions": [
    {
      "action_type": "navigate",
      "target": {"x": 5.0, "y": 3.0, "z": 0.0},
      "description": "Navigate to kitchen"
    },
    {
      "action_type": "locate_object",
      "object_type": "cup",
      "description": "Locate cup in kitchen"
    },
    {
      "action_type": "manipulate",
      "object_id": "cup-456",
      "description": "Pick up the cup"
    }
  ],
  "confidence": 0.85,
  "estimated_duration": 120
}
```

### ROS Action Mapping Schema
```json
{
  "command": "navigate to the kitchen",
  "ros_action": {
    "action_name": "NavigateToPose",
    "package": "nav2_msgs",
    "parameters": {
      "pose": {
        "position": {"x": 5.0, "y": 3.0, "z": 0.0},
        "orientation": {"x": 0.0, "y": 0.0, "z": 0.0, "w": 1.0}
      }
    }
  }
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
- `SPEECH_RECOGNITION_FAILED`: Whisper failed to transcribe audio
- `LLM_UNAVAILABLE`: LLM service not accessible
- `PLANNING_FAILED`: Cognitive planning failed
- `ACTION_MAPPING_FAILED`: Natural language to ROS action mapping failed
- `EXECUTION_FAILED`: ROS action execution failed
- `INSUFFICIENT_CONTEXT`: Not enough information for processing
- `ROBOT_UNAVAILABLE`: Robot not accessible for execution

## Performance Expectations

### Response Times
- Speech recognition: < 2 seconds for short commands
- Language understanding: < 1 second for simple commands
- Action planning: < 3 seconds for complex plans
- ROS action translation: < 0.5 seconds
- End-to-end VLA: < 5 seconds for complete pipeline

### Throughput
- Speech recognition: Real-time processing for streaming audio
- Command processing: Multiple concurrent requests
- Action execution: Real-time feedback during execution

## Security Considerations

### Authentication
- All API endpoints require authentication in production environments
- Educational content assumes secure local development environment
- No authentication required for learning purposes

### Data Privacy
- Speech data is processed locally in educational examples
- No real personal data used in educational examples
- All data used in educational content is synthetic