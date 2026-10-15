---
sidebar_position: 4
---

# Chapter 3: Sensor Simulation for Humanoid Robots

## Overview of Humanoid Robot Sensors

Humanoid robots rely on various sensors to perceive their environment and navigate safely. In simulation, accurately modeling these sensors is crucial for developing and testing perception algorithms before deployment on real robots. This chapter covers the simulation of three critical sensor types: LiDAR, depth cameras, and IMUs.

### Common Sensor Types in Humanoid Robots

1. **LiDAR (Light Detection and Ranging)**: Provides 2D or 3D distance measurements
2. **Depth Cameras**: Capture 3D structure of the environment
3. **IMUs (Inertial Measurement Units)**: Measure orientation, velocity, and acceleration
4. **RGB Cameras**: Provide visual information
5. **Force/Torque Sensors**: Measure contact forces
6. **GPS**: Provide absolute position (outdoor environments)

For this module, we'll focus on the three most critical sensors for humanoid navigation and perception: LiDAR, depth cameras, and IMUs.

## LiDAR Simulation

### Understanding LiDAR in Robotics

LiDAR sensors emit laser beams and measure the time it takes for the light to return after reflecting off objects. This provides accurate distance measurements that are essential for:

- Obstacle detection and avoidance
- Environment mapping
- Localization
- Path planning

### LiDAR Simulation in Gazebo

Gazebo provides excellent LiDAR simulation through its ray-based sensor system:

#### Creating a LiDAR Sensor in SDF

```xml
<sensor name="laser_front" type="ray">
  <pose>0.2 0 0.1 0 0 0</pose>
  <ray>
    <scan>
      <horizontal>
        <samples>720</samples>
        <resolution>1</resolution>
        <min_angle>-1.570796</min_angle>
        <max_angle>1.570796</max_angle>
      </horizontal>
    </scan>
    <range>
      <min>0.1</min>
      <max>30.0</max>
      <resolution>0.01</resolution>
    </range>
  </ray>
  <plugin name="laser_controller" filename="libgazebo_ros_ray_sensor.so">
    <ros>
      <namespace>laser</namespace>
      <remapping>~/out:=scan</remapping>
    </ros>
    <output_type>sensor_msgs/LaserScan</output_type>
  </plugin>
</sensor>
```

#### LiDAR Parameters Explained

- **Samples**: Number of rays in the scan (affects resolution)
- **Min/Max angle**: Field of view of the sensor
- **Range min/max**: Minimum and maximum detectable distances
- **Resolution**: Angular resolution of the sensor

### LiDAR Simulation in Unity

Unity requires custom implementation for realistic LiDAR simulation:

#### Basic LiDAR Implementation in C#

```csharp
using UnityEngine;
using System.Collections.Generic;

public class LidarSimulation : MonoBehaviour
{
    [Header("Lidar Parameters")]
    public int numberOfRays = 720;
    public float minAngle = -90f;
    public float maxAngle = 90f;
    public float maxRange = 30f;
    public float updateRate = 10f; // Hz

    [Header("Noise Parameters")]
    public float noiseLevel = 0.01f;

    private float updateInterval;
    private float lastUpdateTime;
    private List<float> ranges;

    void Start()
    {
        updateInterval = 1f / updateRate;
        ranges = new List<float>(new float[numberOfRays]);
    }

    void Update()
    {
        if (Time.time - lastUpdateTime >= updateInterval)
        {
            SimulateLidarScan();
            lastUpdateTime = Time.time;
        }
    }

    void SimulateLidarScan()
    {
        float angleIncrement = (maxAngle - minAngle) / numberOfRays;

        for (int i = 0; i < numberOfRays; i++)
        {
            float angle = minAngle + i * angleIncrement;
            float angleRad = angle * Mathf.Deg2Rad;

            Vector3 direction = new Vector3(
                Mathf.Cos(angleRad),
                0f,
                Mathf.Sin(angleRad)
            );

            RaycastHit hit;
            if (Physics.Raycast(transform.position, transform.TransformDirection(direction), out hit, maxRange))
            {
                float distance = hit.distance;
                // Add noise to simulate real sensor
                distance += Random.Range(-noiseLevel, noiseLevel);
                ranges[i] = Mathf.Clamp(distance, 0f, maxRange);
            }
            else
            {
                ranges[i] = maxRange;
            }
        }

        // Publish scan data (to be integrated with ROS bridge)
        PublishScanData();
    }

    void PublishScanData()
    {
        // Implementation for publishing to ROS would go here
        // This would connect to the Unity-ROS bridge
    }
}
```

### Comparing LiDAR Simulation Approaches

| Aspect | Gazebo | Unity |
|--------|--------|-------|
| Accuracy | High (physics-based ray tracing) | Moderate (Unity's physics engine) |
| Performance | Good for 2D LiDAR, can be heavy for 3D | Good, but depends on implementation |
| Ease of Setup | Straightforward with SDF | Requires custom scripting |
| ROS Integration | Native support | Requires bridge |

## Depth Camera Simulation

### Understanding Depth Cameras

Depth cameras provide 3D structure information by measuring the distance to objects in the scene. They're essential for:

- 3D mapping and reconstruction
- Object recognition and segmentation
- Safe navigation
- Manipulation tasks

### Depth Camera Simulation in Gazebo

Gazebo provides realistic depth camera simulation:

#### Creating a Depth Camera in SDF

```xml
<sensor name="depth_camera" type="depth">
  <pose>0.1 0 0.5 0 0 0</pose>
  <camera>
    <horizontal_fov>1.047</horizontal_fov> <!-- 60 degrees -->
    <image>
      <width>640</width>
      <height>480</height>
      <format>R8G8B8</format>
    </image>
    <clip>
      <near>0.1</near>
      <far>10</far>
    </clip>
  </camera>
  <plugin name="camera_controller" filename="libgazebo_ros_openni_kinect.so">
    <alwaysOn>true</alwaysOn>
    <updateRate>30.0</updateRate>
    <cameraName>depth_camera</cameraName>
    <imageTopicName>/rgb/image_raw</imageTopicName>
    <depthImageTopicName>/depth/image_raw</depthImageTopicName>
    <pointCloudTopicName>/depth/points</pointCloudTopicName>
    <cameraInfoTopicName>/rgb/camera_info</cameraInfoTopicName>
    <frameName>depth_camera_frame</frameName>
    <baseline>0.1</baseline>
    <distortion_k1>0.0</distortion_k1>
    <distortion_k2>0.0</distortion_k2>
    <distortion_k3>0.0</distortion_k3>
    <distortion_t1>0.0</distortion_t1>
    <distortion_t2>0.0</distortion_t2>
  </plugin>
</sensor>
```

#### Depth Camera Parameters

- **Resolution**: Image width and height affect performance and detail
- **Field of View**: Affects the area captured by the camera
- **Near/Far clipping**: Defines the range of depth measurement
- **Update Rate**: How frequently the camera captures images

### Depth Camera Simulation in Unity

Unity's native camera system can be adapted for depth simulation:

#### Depth Camera Implementation in C#

```csharp
using UnityEngine;

[RequireComponent(typeof(Camera))]
public class DepthCameraSimulation : MonoBehaviour
{
    [Header("Camera Parameters")]
    public int width = 640;
    public int height = 480;
    public float nearClip = 0.1f;
    public float farClip = 10f;

    [Header("Noise Parameters")]
    public float noiseLevel = 0.02f;

    private Camera cam;
    private RenderTexture depthTexture;
    private Texture2D depthTexture2D;

    void Start()
    {
        cam = GetComponent<Camera>();
        cam.depthTextureMode = DepthTextureMode.Depth;

        // Create render texture for depth
        depthTexture = new RenderTexture(width, height, 24);
        depthTexture.format = RenderTextureFormat.Depth;
        cam.targetTexture = depthTexture;

        depthTexture2D = new Texture2D(width, height, TextureFormat.RFloat, false);
    }

    void Update()
    {
        RenderDepthTexture();
    }

    void RenderDepthTexture()
    {
        // Render the depth texture
        cam.Render();

        // Read the depth texture
        RenderTexture.active = depthTexture;
        depthTexture2D.ReadPixels(new Rect(0, 0, width, height), 0, 0);
        depthTexture2D.Apply();

        // Process depth data
        ProcessDepthData();
    }

    void ProcessDepthData()
    {
        // Convert texture data to depth values
        Color[] pixels = depthTexture2D.GetPixels();

        for (int i = 0; i < pixels.Length; i++)
        {
            float depth = pixels[i].r; // Depth is stored in the red channel
            // Apply noise and convert to real-world units
            depth += Random.Range(-noiseLevel, noiseLevel);

            // Depth values from Unity are non-linear, convert to linear
            float linearDepth = (2.0f * nearClip) / (farClip + nearClip - depth * (farClip - nearClip));
            pixels[i] = new Color(linearDepth, 0, 0, 1); // Store in red channel
        }

        // Publish depth data (to be integrated with ROS bridge)
        PublishDepthData();
    }

    void PublishDepthData()
    {
        // Implementation for publishing to ROS would go here
    }

    void OnDestroy()
    {
        if (depthTexture != null)
            depthTexture.Release();
    }
}
```

### Depth Camera Considerations

- **Resolution**: Higher resolution provides more detail but impacts performance
- **Field of View**: Wider FOV captures more scene but may reduce accuracy
- **Noise Modeling**: Real depth cameras have noise patterns that should be simulated
- **Post-processing**: Apply realistic noise and distortion models

## IMU Simulation

### Understanding IMUs in Humanoid Robots

IMUs (Inertial Measurement Units) are critical for humanoid robots as they provide:

- Orientation estimation (roll, pitch, yaw)
- Angular velocity measurement
- Linear acceleration measurement
- Balance and stability control

### IMU Simulation in Gazebo

Gazebo provides built-in IMU sensor simulation:

#### Creating an IMU Sensor in SDF

```xml
<sensor name="imu_sensor" type="imu">
  <always_on>true</always_on>
  <update_rate>100</update_rate>
  <pose>0 0 0.5 0 0 0</pose>
  <imu>
    <angular_velocity>
      <x>
        <noise type="gaussian">
          <mean>0.0</mean>
          <stddev>0.0017</stddev>  <!-- ~0.1 deg/s -->
        </noise>
      </x>
      <y>
        <noise type="gaussian">
          <mean>0.0</mean>
          <stddev>0.0017</stddev>
        </noise>
      </y>
      <z>
        <noise type="gaussian">
          <mean>0.0</mean>
          <stddev>0.0017</stddev>
        </noise>
      </z>
    </angular_velocity>
    <linear_acceleration>
      <x>
        <noise type="gaussian">
          <mean>0.0</mean>
          <stddev>1.7e-2</stddev>  <!-- 17 mg -->
        </noise>
      </x>
      <y>
        <noise type="gaussian">
          <mean>0.0</mean>
          <stddev>1.7e-2</stddev>
        </noise>
      </y>
      <z>
        <noise type="gaussian">
          <mean>0.0</mean>
          <stddev>1.7e-2</stddev>
        </noise>
      </z>
    </linear_acceleration>
  </imu>
  <plugin name="imu_plugin" filename="libgazebo_ros_imu_sensor.so">
    <ros>
      <namespace>imu</namespace>
      <remapping>~/out:=data</remapping>
    </ros>
    <frame_name>imu_link</frame_name>
    <initial_orientation_as_reference>false</initial_orientation_as_reference>
  </plugin>
</sensor>
```

#### IMU Noise Modeling

Real IMUs have several types of noise:

- **Gyroscope noise**: Affects angular velocity measurements
- **Accelerometer noise**: Affects linear acceleration measurements
- **Bias drift**: Long-term drift in sensor readings
- **Temperature effects**: Changes in sensor characteristics

### IMU Simulation in Unity

Unity requires custom implementation for IMU simulation:

#### IMU Simulation in C#

```csharp
using UnityEngine;

public class IMUSimulation : MonoBehaviour
{
    [Header("Gyroscope Parameters")]
    public float gyroNoiseDensity = 0.0017f; // rad/s/sqrt(Hz)
    public float gyroRandomWalk = 0.0001f;   // rad/s^2/sqrt(Hz)

    [Header("Accelerometer Parameters")]
    public float accelNoiseDensity = 0.017f; // m/s^2/sqrt(Hz)
    public float accelRandomWalk = 0.001f;   // m/s^3/sqrt(Hz)

    [Header("Simulation Parameters")]
    public float updateRate = 100f; // Hz

    private float updateInterval;
    private float lastUpdateTime;

    // Internal state
    private Vector3 trueAngularVelocity;
    private Vector3 trueLinearAcceleration;
    private Vector3 gyroBias;
    private Vector3 accelBias;

    // Output values
    private Vector3 simulatedAngularVelocity;
    private Vector3 simulatedLinearAcceleration;

    void Start()
    {
        updateInterval = 1f / updateRate;
        lastUpdateTime = Time.time;

        // Initialize biases
        gyroBias = Vector3.zero;
        accelBias = Vector3.zero;
    }

    void Update()
    {
        if (Time.time - lastUpdateTime >= updateInterval)
        {
            SimulateIMU();
            lastUpdateTime = Time.time;
        }
    }

    void SimulateIMU()
    {
        // Calculate true values based on Unity's physics
        CalculateTrueValues();

        // Apply noise and bias
        ApplyNoiseModel();

        // Publish IMU data
        PublishIMUData();
    }

    void CalculateTrueValues()
    {
        // For a humanoid robot, get the true angular velocity and acceleration
        // This would typically come from the Rigidbody component
        Rigidbody rb = GetComponent<Rigidbody>();
        if (rb != null)
        {
            trueAngularVelocity = rb.angularVelocity;
            trueLinearAcceleration = rb.velocity / Time.fixedDeltaTime;
        }
        else
        {
            // If no rigidbody, estimate from transform changes
            trueAngularVelocity = EstimateAngularVelocity();
            trueLinearAcceleration = EstimateLinearAcceleration();
        }
    }

    Vector3 EstimateAngularVelocity()
    {
        // Estimate angular velocity from rotation changes
        // This is a simplified approach
        return Vector3.zero; // Implement based on your specific needs
    }

    Vector3 EstimateLinearAcceleration()
    {
        // Estimate linear acceleration from position changes
        // This is a simplified approach
        return Vector3.zero; // Implement based on your specific needs
    }

    void ApplyNoiseModel()
    {
        // Apply gyroscope noise and bias
        simulatedAngularVelocity = trueAngularVelocity + gyroBias;
        simulatedAngularVelocity += GetNoiseVector(gyroNoiseDensity);

        // Apply accelerometer noise and bias
        simulatedLinearAcceleration = trueLinearAcceleration + accelBias;
        simulatedLinearAcceleration += GetNoiseVector(accelNoiseDensity);

        // Update bias with random walk
        gyroBias += GetNoiseVector(gyroRandomWalk * Time.fixedDeltaTime);
        accelBias += GetNoiseVector(accelRandomWalk * Time.fixedDeltaTime);
    }

    Vector3 GetNoiseVector(float noiseDensity)
    {
        return new Vector3(
            RandomGaussian() * noiseDensity,
            RandomGaussian() * noiseDensity,
            RandomGaussian() * noiseDensity
        );
    }

    float RandomGaussian()
    {
        // Box-Muller transform for Gaussian random numbers
        float u1 = Random.value;
        float u2 = Random.value;
        if (u1 < float.Epsilon) u1 = float.Epsilon;
        return Mathf.Sqrt(-2.0f * Mathf.Log(u1)) * Mathf.Cos(2.0f * Mathf.PI * u2);
    }

    void PublishIMUData()
    {
        // Implementation for publishing to ROS would go here
        // This would connect to the Unity-ROS bridge
    }
}
```

### IMU Simulation Considerations

- **Noise modeling**: Realistic noise characteristics are crucial for algorithm development
- **Bias modeling**: Long-term drift affects orientation estimation
- **Temperature effects**: Though often ignored in simulation, can be added for advanced models
- **Coordinate frame**: Ensure proper alignment with robot coordinate system

## ROS 2 Integration for Sensor Data

### Gazebo ROS 2 Packages

Gazebo provides native ROS 2 integration through the `gazebo_ros_pkgs`:

#### Key Packages:
- `gazebo_ros`: Core ROS 2 integration for Gazebo
- `gazebo_plugins`: Various sensor and controller plugins
- `gazebo_dev`: Development tools for custom Gazebo plugins

### Unity ROS 2 Bridge

Unity requires the Unity ROS 2 Bridge for communication:

#### Key Components:
- `ROS-TCP-Endpoint`: TCP-based communication between Unity and ROS 2
- `Unity-Robotics-Hub`: Comprehensive framework for Unity-ROS integration
- Message serialization/deserialization between Unity and ROS 2
- Transform synchronization between Unity and ROS 2 coordinate systems

### Sensor Message Types

ROS 2 uses standardized message types for sensor data:

- `sensor_msgs/LaserScan`: For LiDAR data
- `sensor_msgs/Image` and `sensor_msgs/PointCloud2`: For depth camera data
- `sensor_msgs/Imu`: For IMU data
- `sensor_msgs/CameraInfo`: For camera calibration information

## Performance Optimization for Sensor-Heavy Simulations

### Computational Considerations

Sensor simulation can be computationally expensive:

1. **LiDAR**: Ray casting for each beam
2. **Depth cameras**: Rendering and processing full images
3. **Multiple sensors**: Cumulative computational load

### Optimization Strategies

1. **Sensor fusion**: Combine data from multiple sensors efficiently
2. **Adaptive update rates**: Reduce update rates when less accuracy is needed
3. **Selective simulation**: Simulate only sensors that are actively used
4. **LOD for sensors**: Reduce sensor quality at a distance

### Hardware Considerations

- **GPU**: Critical for depth camera simulation
- **CPU**: Important for LiDAR and IMU calculations
- **Memory**: Sensor data can consume significant memory
- **Network**: For Unity-ROS bridge communication

## Practical Exercise: Implementing Sensor Simulation

### Objective

Create a humanoid robot model with simulated LiDAR, depth camera, and IMU sensors.

### Steps

1. Create a humanoid robot model in either Gazebo or Unity
2. Add LiDAR sensor with realistic parameters
3. Add depth camera with appropriate settings
4. Add IMU with realistic noise characteristics
5. Verify sensor data publication to ROS 2

### Expected Outcome

A humanoid robot model that publishes realistic sensor data compatible with ROS 2 sensor message types.

## Summary

In this chapter, we've covered sensor simulation for humanoid robots, focusing on three critical sensor types:

- **LiDAR**: For 2D/3D environment mapping and obstacle detection
- **Depth Cameras**: For 3D structure information and object recognition
- **IMUs**: For orientation and motion sensing

You've learned how to implement these sensors in both Gazebo and Unity environments, with realistic noise and performance characteristics. The chapter also covered ROS 2 integration for sensor data publication and performance optimization strategies.

With all three chapters complete, you now have a comprehensive understanding of digital twin technology for humanoid robotics, covering physics simulation, environment creation, and sensor modeling.