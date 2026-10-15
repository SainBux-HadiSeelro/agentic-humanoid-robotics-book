---
sidebar_position: 3
---

# Client-Service Pattern

## Understanding Clients and Services

The client-service pattern provides synchronous, request-response communication between nodes. Unlike the publisher-subscriber pattern, this creates a tight coupling between the client and service nodes.

### Services
- Provide specific functionality on request
- Process requests synchronously
- Return responses to the client
- Only one service can be provided for each service type on a ROS network

### Clients
- Request specific services
- Wait for responses from services
- Know which service they're requesting

## Creating a Service in Python

Here's how to create a service server:

```python
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class MinimalService(Node):
    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info('Incoming request\na: %d b: %d' % (request.a, request.b))
        return response
```

## Creating a Client in Python

And here's how to create a client:

```python
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class MinimalClient(Node):
    def __init__(self):
        super().__init__('minimal_client')
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available, waiting again...')
        self.req = AddTwoInts.Request()

    def send_request(self, a, b):
        self.req.a = a
        self.req.b = b
        self.future = self.cli.call_async(self.req)
        rclpy.spin_until_future_complete(self, self.future)
        return self.future.result()
```

## When to Use Client-Service

The client-service pattern is ideal for:
- Operations that require a specific response
- Configuration tasks
- Actions that should return success/failure
- Situations where you need guaranteed delivery and processing

## Comparing Communication Patterns

| Pattern | Use Case | Latency | Delivery Guarantee |
|---------|----------|---------|-------------------|
| Publisher-Subscriber | Streaming, broadcasting | Low | No |
| Client-Service | Request-response | Higher | Yes |

In the next chapter, we'll explore how to use these patterns with Python and integrate them with AI algorithms.