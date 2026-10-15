---
sidebar_position: 4
---

# Comparison Guide: Topics vs Services vs Actions

## When to Use Topics (Publisher-Subscriber)

### Use Topics When:
- Streaming continuous data (sensor readings, robot state)
- Broadcasting information to multiple subscribers
- Real-time performance is critical
- Guaranteed delivery is not required
- Data flow is one-way (publish → subscribe)

### Examples:
- Camera image streams
- LIDAR scan data
- Robot odometry
- Joint states
- Battery level monitoring

### Advantages:
- Low latency
- Supports multiple publishers and subscribers
- Asynchronous communication
- Good for real-time systems

### Disadvantages:
- No guaranteed delivery
- No acknowledgment of receipt
- No request-response pattern

## When to Use Services (Client-Server)

### Use Services When:
- Need guaranteed request-response communication
- Operation has a clear start and end
- Request needs specific processing and response
- Synchronous communication is acceptable
- Need to modify robot state/configurations

### Examples:
- Saving a map
- Executing a specific action (e.g., "take picture")
- Changing robot parameters
- Requesting a path plan
- Calibrating sensors

### Advantages:
- Guaranteed delivery and processing
- Request-response pattern
- Synchronous operation
- Error handling in responses

### Disadvantages:
- Blocking calls (client waits for response)
- Higher latency than topics
- Only one server per service type

## When to Use Actions

### Use Actions When:
- Task takes a long time to complete
- Need feedback during execution
- Want to cancel a running task
- Need goal-oriented behavior

### Examples:
- Navigation to a goal
- Object manipulation tasks
- Complex trajectory execution
- Long-running data processing

## Decision Matrix

| Requirement | Topics | Services | Actions |
|-------------|--------|----------|---------|
| Real-time streaming | ✓ | ✗ | ✗ |
| Request-response | ✗ | ✓ | ✓ |
| Feedback during execution | ✗ | ✗ | ✓ |
| Task cancellation | ✗ | ✗ | ✓ |
| Multiple receivers | ✓ | ✗ | ✓ |
| Guaranteed delivery | ✗ | ✓ | ✓ |
| Low latency | ✓ | Δ | Δ |

Key: ✓ = Excellent fit, Δ = Acceptable fit, ✗ = Poor fit

## Hybrid Approaches

Often, the best solutions combine multiple communication patterns:

### Example: Robot Navigation System
- **Topics**: Publish current robot position, sensor data
- **Services**: Request new navigation goal (when simple)
- **Actions**: Execute navigation with feedback and cancellation capability
- **Topics**: Publish navigation status updates during execution

## Common Mistakes to Avoid

1. **Using services for streaming data**: This creates unnecessary blocking and overhead
2. **Using topics for critical commands**: No guarantee of delivery can cause missed commands
3. **Overusing services**: Can create bottlenecks and reduce system responsiveness
4. **Ignoring QoS settings**: Different Quality of Service settings can improve performance for different use cases

## Best Practices

1. **Design for failure**: Always consider what happens when communication fails
2. **Use appropriate data types**: Choose message types that match your data structure
3. **Consider bandwidth**: Large messages on high-frequency topics can congest the network
4. **Test with multiple nodes**: Verify your communication patterns work with multiple publishers/subscribers
5. **Document your interfaces**: Clearly specify what data is published where and when

Understanding when to use each communication pattern is crucial for designing efficient and robust ROS 2 systems.