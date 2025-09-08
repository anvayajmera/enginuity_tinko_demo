// Simple animations and interactions for foundation students

class SensorDashboard {
    constructor() {
        this.data = [];
        this.currentIndex = 0;
        this.init();
    }

    async init() {
        await this.loadData();
        this.updateDisplay();
        this.startDataLoop();
    }

    async loadData() {
        try {
            const response = await fetch('sensor-data.csv');
            const csvText = await response.text();
            this.data = this.parseCSV(csvText);
        } catch (error) {
            console.error('Error loading data:', error);
            this.showConnectionError();
        }
    }

    parseCSV(text) {
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',');
        return lines.slice(1).map(line => {
            const values = line.split(',');
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index];
            });
            return row;
        });
    }

    updateDisplay() {
        if (this.data.length === 0) return;
        
        const current = this.data[this.currentIndex];
        
        // Update sensor values
        document.querySelector('.temperature .sensor-value').textContent = `${current.temperature}°C`;
        document.querySelector('.light .sensor-value').textContent = `${current.light} lux`;
        document.querySelector('.sound .sensor-value').textContent = `${current.sound} dB`;
        document.querySelector('.compass .sensor-value').textContent = `${current.compass}°`;
        
        // Update movement
        const movement = this.calculateMovement(current);
        document.querySelector('.acceleration .sensor-value').textContent = movement.status;
        document.querySelector('.acceleration .sensor-status').textContent = movement.description;
        
        // Update buttons
        const buttonStatus = this.getButtonStatus(current);
        document.querySelector('.buttons .sensor-value').textContent = buttonStatus.display;
        document.querySelector('.buttons .sensor-status').textContent = buttonStatus.status;
        
        // Update statuses
        this.updateStatuses(current);
        
        // Add to activity log
        this.addLogEntry(current);
    }

    calculateMovement(data) {
        const totalAccel = Math.sqrt(
            Math.pow(parseFloat(data.acceleration_x), 2) +
            Math.pow(parseFloat(data.acceleration_y), 2) +
            Math.pow(parseFloat(data.acceleration_z), 2)
        );
        
        if (totalAccel > 10.5) return { status: 'Moving', description: 'Motion Detected' };
        return { status: 'Still', description: 'No Motion' };
    }

    getButtonStatus(data) {
        const aPressed = data.button_a === '1';
        const bPressed = data.button_b === '1';
        
        if (aPressed && bPressed) return { display: 'A + B', status: 'Both Pressed' };
        if (aPressed) return { display: 'A', status: 'A Pressed' };
        if (bPressed) return { display: 'B', status: 'B Pressed' };
        return { display: 'None', status: 'Not Pressed' };
    }

    updateStatuses(data) {
        // Temperature status
        const temp = parseFloat(data.temperature);
        const tempStatus = temp > 25 ? 'Warm' : temp < 20 ? 'Cool' : 'Normal';
        document.querySelector('.temperature .sensor-status').textContent = tempStatus;
        
        // Light status
        const light = parseInt(data.light);
        const lightStatus = light > 800 ? 'Very Bright' : light > 500 ? 'Bright' : light > 200 ? 'Dim' : 'Dark';
        document.querySelector('.light .sensor-status').textContent = lightStatus;
        
        // Sound status
        const sound = parseInt(data.sound);
        const soundStatus = sound > 60 ? 'Loud' : sound > 40 ? 'Moderate' : 'Quiet';
        document.querySelector('.sound .sensor-status').textContent = soundStatus;
        
        // Compass status
        const compass = parseInt(data.compass);
        const compassStatus = this.getDirection(compass);
        document.querySelector('.compass .sensor-status').textContent = compassStatus;
    }

    getDirection(degrees) {
        const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    }

    addLogEntry(data) {
        const logEntries = document.querySelector('.log-entries');
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `
            <span class="log-time">${time}</span>
            <span class="log-message">Data updated - Temp: ${data.temperature}°C</span>
        `;
        
        logEntries.insertBefore(entry, logEntries.firstChild);
        
        // Keep only last 5 entries
        while (logEntries.children.length > 5) {
            logEntries.removeChild(logEntries.lastChild);
        }
    }

    startDataLoop() {
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.data.length;
            this.updateDisplay();
        }, 2000); // Update every 2 seconds
    }

    showConnectionError() {
        document.querySelector('.connection-badge span:last-child').textContent = 'Error loading data';
        document.querySelector('.status-dot').className = 'status-dot disconnected';
    }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SensorDashboard();
});
