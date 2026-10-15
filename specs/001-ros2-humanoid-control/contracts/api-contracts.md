# API Contracts: ROS 2 Humanoid Control Educational Module

**Date**: 2025-12-19
**Feature**: 001-ros2-humanoid-control
**Input**: Feature specification from `/specs/001-ros2-humanoid-control/spec.md`

## Educational Content API

### Get Educational Content
- **Endpoint**: `GET /api/content/{id}`
- **Purpose**: Retrieve educational content by ID
- **Request Parameters**:
  - id (path): Unique identifier for the content
- **Response**: Educational content object with title, content, objectives, etc.
- **Success Code**: 200 OK
- **Error Codes**: 404 Not Found if content doesn't exist

### List Educational Content
- **Endpoint**: `GET /api/content`
- **Purpose**: List available educational content
- **Query Parameters**:
  - type (optional): Filter by content type (chapter, lesson, exercise)
  - difficulty (optional): Filter by difficulty level
- **Response**: Array of educational content summaries
- **Success Code**: 200 OK

## User Progress API

### Get User Progress
- **Endpoint**: `GET /api/user/{id}/progress`
- **Purpose**: Retrieve a user's progress through educational content
- **Request Parameters**:
  - id (path): Unique identifier for the user
- **Response**: User progress object with completed content, current position, etc.
- **Success Code**: 200 OK

### Update User Progress
- **Endpoint**: `POST /api/user/{id}/progress`
- **Purpose**: Update a user's progress through educational content
- **Request Parameters**:
  - id (path): Unique identifier for the user
- **Request Body**: Progress update object with content ID and status
- **Response**: Updated progress object
- **Success Code**: 200 OK
- **Error Codes**: 400 Bad Request if invalid progress data

## Robot Model API

### Get Robot Model
- **Endpoint**: `GET /api/robot-models/{id}`
- **Purpose**: Retrieve a robot model definition
- **Request Parameters**:
  - id (path): Unique identifier for the robot model
- **Response**: Robot model object with URDF content, description, etc.
- **Success Code**: 200 OK
- **Error Codes**: 404 Not Found if robot model doesn't exist

### List Robot Models
- **Endpoint**: `GET /api/robot-models`
- **Purpose**: List available robot models
- **Response**: Array of robot model summaries
- **Success Code**: 200 OK

## Exercise API

### Get Exercise
- **Endpoint**: `GET /api/exercises/{id}`
- **Purpose**: Retrieve an exercise for practice
- **Request Parameters**:
  - id (path): Unique identifier for the exercise
- **Response**: Exercise object with instructions, requirements, etc.
- **Success Code**: 200 OK
- **Error Codes**: 404 Not Found if exercise doesn't exist

### Submit Exercise Solution
- **Endpoint**: `POST /api/exercises/{id}/submit`
- **Purpose**: Submit a solution for an exercise
- **Request Parameters**:
  - id (path): Unique identifier for the exercise
- **Request Body**: Solution object with code or configuration
- **Response**: Evaluation result with success/failure and feedback
- **Success Code**: 200 OK
- **Error Codes**: 400 Bad Request if solution format is invalid