# YSWS Sensor Dashboard

## Overview
The YSWS Sensor Dashboard is a web-based development platform designed to connect with physical electronics kits such as Arduino and Microbit. This dashboard visualizes live sensor data in real-time, providing an intuitive and interactive interface for students to engage with hardware programming.

## Features
- **Live Sensor Data Visualization**: Displays real-time data from various sensors including ultrasonic distance, temperature, and more through readable charts and gauges.
- **Device Control**: Users can interact with connected components directly from the dashboard, allowing them to toggle LEDs, change motor speeds, and trigger buzzers.
- **Multiple Difficulty Levels**: 
  - **Simple Version**: A beginner-friendly interface for younger students with large buttons and clear labels.
  - **Advanced Version**: A feature-rich interface for high school students with advanced customization options.

## Technical Stack
- **Arduino/Microbit**: Collects sensor and device data and sends it over serial.
- **Node.js**: Acts as a bridge between serial data and the web browser using WebSockets.
- **React**: The interactive frontend that visualizes data and allows user controls.
- **Local Development**: The entire setup can be run locally, making it accessible without the need for expensive cloud infrastructure.

## Getting Started
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/ysws-sensor-dashboard.git
   cd ysws-sensor-dashboard
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm start
   ```

4. **Open in Browser**: Navigate to `http://localhost:3000` to view the dashboard.

## Educational Purpose
The YSWS Sensor Dashboard aims to provide students with a hands-on experience in coding and hardware interaction. It lowers the barrier for underprivileged kids to explore embedded systems and fosters a learning environment where they can experiment and innovate.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.