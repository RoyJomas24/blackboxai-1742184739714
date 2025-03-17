// Case reporting form functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeReportForm();
    setupLocationPicker();
});

function initializeReportForm() {
    const form = document.getElementById('reportForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitButton.disabled = true;

        try {
            // Get form data
            const formData = new FormData(form);
            const data = {
                location: {
                    lat: formData.get('latitude'),
                    lng: formData.get('longitude'),
                    address: formData.get('address')
                },
                patientName: formData.get('patientName'),
                patientAge: formData.get('patientAge'),
                incidentDate: formData.get('incidentDate'),
                description: formData.get('description'),
                animalType: formData.get('animalType'),
                reporterName: formData.get('reporterName'),
                reporterContact: formData.get('reporterContact'),
                images: await handleImageUpload(form.querySelector('#imageUpload').files)
            };

            // Simulate API call (replace with actual API endpoint)
            await submitReport(data);

            // Show success message
            showNotification('Laporan berhasil dikirim!', 'success');
            
            // Reset form
            form.reset();
            
            // Update maps and statistics
            if (window.addMarker) {
                window.addMarker({
                    position: data.location,
                    title: 'Kasus Baru',
                    status: 'active',
                    details: {
                        date: data.incidentDate,
                        location: data.location.address,
                        description: data.description,
                        status: 'Baru Dilaporkan'
                    }
                });
            }

        } catch (error) {
            console.error('Error submitting report:', error);
            showNotification('Gagal mengirim laporan. Silakan coba lagi.', 'error');
        } finally {
            // Reset button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

function setupLocationPicker() {
    const mapPicker = document.getElementById('locationPicker');
    if (!mapPicker) return;

    // Initialize map picker
    const pickerMap = new google.maps.Map(mapPicker, {
        center: { lat: -8.6573, lng: 121.0794 }, // NTT center
        zoom: 8
    });

    // Add marker for picked location
    let marker = new google.maps.Marker({
        map: pickerMap,
        draggable: true
    });

    // Update form fields when marker is moved
    google.maps.event.addListener(marker, 'dragend', function() {
        const position = marker.getPosition();
        document.getElementById('latitude').value = position.lat();
        document.getElementById('longitude').value = position.lng();
        
        // Get address using reverse geocoding
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: position }, (results, status) => {
            if (status === 'OK' && results[0]) {
                document.getElementById('address').value = results[0].formatted_address;
            }
        });
    });

    // Allow clicking on map to place marker
    pickerMap.addListener('click', function(e) {
        marker.setPosition(e.latLng);
        google.maps.event.trigger(marker, 'dragend');
    });
}

async function handleImageUpload(files) {
    // Simulate image upload - in real implementation, would upload to server/cloud storage
    return new Promise((resolve) => {
        const imageUrls = [];
        for (let file of files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageUrls.push(e.target.result);
                if (imageUrls.length === files.length) {
                    resolve(imageUrls);
                }
            };
            reader.readAsDataURL(file);
        }
        if (files.length === 0) resolve([]);
    });
}

async function submitReport(data) {
    // Simulate API call - replace with actual API endpoint
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Report submitted:', data);
            resolve({ success: true });
        }, 1500);
    });
}

function showNotification(message, type = 'info') {
    const notificationContainer = document.createElement('div');
    notificationContainer.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    } text-white`;
    
    notificationContainer.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${
                type === 'success' ? 'fa-check-circle' : 
                type === 'error' ? 'fa-exclamation-circle' : 
                'fa-info-circle'
            } mr-2"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notificationContainer);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notificationContainer.remove();
    }, 5000);
}

// Export functions
window.initializeReportForm = initializeReportForm;
window.setupLocationPicker = setupLocationPicker;
