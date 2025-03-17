// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeTrendChart();
    initializeDistributionChart();
});

function initializeApp() {
    // Setup navigation
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    
    // Show dashboard by default
    document.getElementById('dashboard').classList.remove('hidden');
    navLinks[0].classList.add('bg-blue-700');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Hide all sections
            sections.forEach(section => section.classList.add('hidden'));
            
            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }

            // Update active nav link
            navLinks.forEach(l => l.classList.remove('bg-blue-700'));
            link.classList.add('bg-blue-700');
        });
    });
}

function initializeTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
            datasets: [{
                label: 'Kasus Rabies',
                data: [12, 19, 15, 25, 22, 30],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Tren Kasus Rabies 6 Bulan Terakhir'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Jumlah Kasus'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Bulan'
                    }
                }
            }
        }
    });
}

function initializeDistributionChart() {
    const ctx = document.getElementById('distributionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Kupang', 'TTS', 'TTU', 'Belu', 'Alor', 'Ende'],
            datasets: [{
                label: 'Jumlah Kasus',
                data: [25, 18, 15, 12, 10, 8],
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Distribusi Kasus per Kabupaten'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Jumlah Kasus'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Kabupaten'
                    }
                }
            }
        }
    });
}

// Handle form submissions
document.addEventListener('submit', function(e) {
    if (e.target.matches('#reportForm')) {
        e.preventDefault();
        handleReportSubmission(e.target);
    }
});

async function handleReportSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    try {
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitButton.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        showNotification('Laporan berhasil dikirim!', 'success');
        
        // Reset form
        form.reset();

    } catch (error) {
        console.error('Error submitting report:', error);
        showNotification('Gagal mengirim laporan. Silakan coba lagi.', 'error');
    } finally {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    } text-white z-50 transition-opacity duration-300`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${
                type === 'success' ? 'fa-check-circle' : 
                type === 'error' ? 'fa-exclamation-circle' : 
                'fa-info-circle'
            } mr-2"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Fade out and remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}
