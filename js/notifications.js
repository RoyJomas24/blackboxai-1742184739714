// Notifications system
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.subscribers = [];
        this.container = document.getElementById('notificationContainer');
        this.unreadCount = 0;
        this.initialize();
    }

    initialize() {
        // Set up WebSocket connection (simulated for demo)
        this.setupWebSocket();
        
        // Initialize notification badge
        this.updateNotificationBadge();
        
        // Set up notification panel toggle
        const notificationToggle = document.getElementById('notificationToggle');
        if (notificationToggle) {
            notificationToggle.addEventListener('click', () => this.toggleNotificationPanel());
        }
    }

    setupWebSocket() {
        // Simulate WebSocket connection with periodic updates
        setInterval(() => {
            this.simulateNewNotification();
        }, 45000); // New notification every 45 seconds
    }

    simulateNewNotification() {
        const notifications = [
            {
                type: 'warning',
                title: 'Kasus Baru Terdeteksi',
                message: 'Kasus rabies baru dilaporkan di Kabupaten Kupang',
                timestamp: new Date(),
                priority: 'high'
            },
            {
                type: 'info',
                title: 'Pembaruan Status',
                message: 'Status kasus #123 telah diperbarui menjadi "Ditangani"',
                timestamp: new Date(),
                priority: 'medium'
            },
            {
                type: 'success',
                title: 'Vaksinasi Selesai',
                message: 'Program vaksinasi di Kecamatan Maulafa telah selesai',
                timestamp: new Date(),
                priority: 'low'
            }
        ];

        const notification = notifications[Math.floor(Math.random() * notifications.length)];
        this.addNotification(notification);
    }

    addNotification(notification) {
        this.notifications.unshift(notification);
        this.unreadCount++;
        this.updateNotificationBadge();
        this.renderNotification(notification);
        this.notifySubscribers(notification);

        // Play notification sound for high priority
        if (notification.priority === 'high') {
            this.playNotificationSound();
        }
    }

    renderNotification(notification) {
        if (!this.container) return;

        const element = document.createElement('div');
        element.className = `notification-item p-4 mb-3 rounded-lg shadow-md border-l-4 ${
            notification.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
            notification.type === 'success' ? 'border-green-500 bg-green-50' :
            'border-blue-500 bg-blue-50'
        }`;

        element.innerHTML = `
            <div class="flex items-start justify-between">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <i class="fas ${
                            notification.type === 'warning' ? 'fa-exclamation-triangle text-yellow-500' :
                            notification.type === 'success' ? 'fa-check-circle text-green-500' :
                            'fa-info-circle text-blue-500'
                        } text-lg"></i>
                    </div>
                    <div class="ml-3">
                        <h4 class="text-sm font-medium text-gray-900">${notification.title}</h4>
                        <p class="mt-1 text-sm text-gray-500">${notification.message}</p>
                        <p class="mt-1 text-xs text-gray-400">${this.formatTimestamp(notification.timestamp)}</p>
                    </div>
                </div>
                <button class="ml-4 text-gray-400 hover:text-gray-500" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        this.container.prepend(element);

        // Remove notification after 10 seconds if not high priority
        if (notification.priority !== 'high') {
            setTimeout(() => {
                element.remove();
            }, 10000);
        }
    }

    formatTimestamp(timestamp) {
        return new Date(timestamp).toLocaleString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    updateNotificationBadge() {
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            badge.textContent = this.unreadCount;
            badge.style.display = this.unreadCount > 0 ? 'block' : 'none';
        }
    }

    toggleNotificationPanel() {
        const panel = document.getElementById('notificationPanel');
        if (panel) {
            panel.classList.toggle('hidden');
            if (!panel.classList.contains('hidden')) {
                this.unreadCount = 0;
                this.updateNotificationBadge();
            }
        }
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    notifySubscribers(notification) {
        this.subscribers.forEach(callback => callback(notification));
    }

    playNotificationSound() {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440 Hz
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // 10% volume

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1); // 0.1 second duration
    }
}

// Initialize notification system
document.addEventListener('DOMContentLoaded', () => {
    window.notificationSystem = new NotificationSystem();
});
