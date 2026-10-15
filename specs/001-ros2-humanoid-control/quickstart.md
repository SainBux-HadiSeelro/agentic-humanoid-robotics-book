# Quickstart: ROS 2 Humanoid Control Educational Module

**Date**: 2025-12-19
**Feature**: 001-ros2-humanoid-control
**Input**: Feature specification from `/specs/001-ros2-humanoid-control/spec.md`

## Prerequisites

- Node.js v18 or higher
- npm or yarn package manager
- Python 3.8 or higher
- ROS 2 Humble Hawksbill (or newer LTS version)

## Setup Docusaurus Environment

1. Install Docusaurus globally:
   ```bash
   npm install -g @docusaurus/cli
   ```

2. Navigate to your project directory and create a new Docusaurus site:
   ```bash
   npx create-docusaurus@latest my-ros2-course classic
   cd my-ros2-course
   ```

3. Install additional dependencies for code examples:
   ```bash
   npm install @docusaurus/module-type-aliases @docusaurus/types
   ```

## Configure Docusaurus for ROS 2 Content

1. Update `docusaurus.config.js` to include course-specific settings:
   ```javascript
   // Add to docusaurus.config.js
   module.exports = {
     title: 'ROS 2 for AI Developers',
     tagline: 'Bridging AI and Robotics with ROS 2',
     // ... other config
     presets: [
       [
         'classic',
         /** @type {import('@docusaurus/preset-classic').Options} */
         ({
           docs: {
             sidebarPath: require.resolve('./sidebars.js'),
             // Set routeBasePath to '/' to display at the site's root
             routeBasePath: '/',
             // ... other docs config
           },
           // ... other preset config
         }),
       ],
     ],
   };
   ```

2. Create the course structure with three chapters in `docs/`:
   - `docs/chapter-1-intro/` - Introduction to ROS 2 and the Robotic Nervous System
   - `docs/chapter-2-communication/` - ROS 2 Communication (Nodes, Topics, Services)
   - `docs/chapter-3-python-urdf/` - Python Agents, rclpy, and Humanoid URDF Basics

## Add Your First Content

1. Create your first chapter in `docs/chapter-1-intro/intro-to-ros2.md`:
   ```markdown
   # Introduction to ROS 2 and the Robotic Nervous System

   ## What is ROS 2?

   ROS 2 (Robot Operating System 2) is a flexible framework for writing robot software. It's a collection of tools, libraries, and conventions that aim to simplify the task of creating complex and robust robot behavior across a wide variety of robot platforms.

   ## Why ROS 2 for AI Developers?

   As an AI developer, you might wonder why you need ROS 2. The answer lies in its role as a "robotic nervous system"...
   ```

2. Update `sidebars.js` to include your new content:
   ```javascript
   // sidebars.js
   module.exports = {
     tutorialSidebar: [
       {
         type: 'category',
         label: 'Chapter 1: Introduction to ROS 2',
         items: ['chapter-1-intro/intro-to-ros2'],
       },
       {
         type: 'category',
         label: 'Chapter 2: ROS 2 Communication',
         items: ['chapter-2-communication/nodes-topics-services'],
       },
       {
         type: 'category',
         label: 'Chapter 3: Python and URDF',
         items: ['chapter-3-python-urdf/python-rclpy-urdf'],
       },
     ],
   };
   ```

## Running the Development Server

1. Start the development server:
   ```bash
   npm run start
   ```

2. Open your browser to `http://localhost:3000` to see your course.

## Adding Code Examples

For Python and ROS 2 examples, use Docusaurus code blocks with appropriate syntax highlighting:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Building for Production

To build the static files for deployment:

```bash
npm run build
```

The output will be in the `build/` directory and can be served by any static hosting service.