// Maps functionality
let mapInitialized = false;
let currentMap = null;
let currentMarker = null;

document.addEventListener('DOMContentLoaded', function() {
    // Only initialize map when the map container is visible
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            if (targetId === 'peta' || targetId === 'laporan') {
                // Show loading state
                const container = document.getElementById(targetId === 'peta' ? 'map' : 'locationPicker');
                if (container) {
                    showLoadingState(container);
                }
                
                // Initialize map
                setTimeout(() => initializeMap(targetId), 100);
            }
        });
    });
});

function showLoadingState(container) {
    container.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg p-4">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p class="text-gray-600">Memuat peta...</p>
        </div>
    `;
}

function initializeMap(context) {
    // Center on NTT (approximate coordinates)
    const nttCenter = [-8.6573, 121.0794];
    
    try {
        if (context === 'peta') {
            // Initialize main map
            const mapElement = document.getElementById('map');
            if (!mapElement._initialized) {
                // Clear any existing content
                mapElement.innerHTML = '';
                
                // Create map
                currentMap = L.map(mapElement).setView(nttCenter, 7);
                
                // Add tile layer (OpenStreetMap)
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(currentMap);

                // Add sample markers
                addSampleMarkers(currentMap);

                // Add legend
                addMapLegend(mapElement);

                mapElement._initialized = true;
            }
        } else if (context === 'laporan') {
            // Initialize location picker
            const pickerElement = document.getElementById('locationPicker');
            if (!pickerElement._initialized) {
                // Clear any existing content
                pickerElement.innerHTML = '';
                
                // Create map
                currentMap = L.map(pickerElement).setView(nttCenter, 8);
                
                // Add tile layer
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(currentMap);

                // Add draggable marker
                currentMarker = L.marker(nttCenter, { draggable: true }).addTo(currentMap);

                // Update form fields when marker is moved
                currentMarker.on('dragend', function(e) {
                    const position = e.target.getLatLng();
                    document.getElementById('latitude').value = position.lat;
                    document.getElementById('longitude').value = position.lng;
                    updateAddress(position);
                });

                // Allow clicking on map to place marker
                currentMap.on('click', function(e) {
                    currentMarker.setLatLng(e.latlng);
                    document.getElementById('latitude').value = e.latlng.lat;
                    document.getElementById('longitude').value = e.latlng.lng;
                    updateAddress(e.latlng);
                });

                pickerElement._initialized = true;
            }
        }

        mapInitialized = true;
    } catch (error) {
        console.error('Error initializing map:', error);
        showMapError(context);
    }
}

async function updateAddress(latlng) {
    try {
        // Use Nominatim for reverse geocoding
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`);
        const data = await response.json();
        document.getElementById('address').value = data.display_name;
    } catch (error) {
        console.error('Error getting address:', error);
        document.getElementById('address').value = `${latlng.lat}, ${latlng.lng}`;
    }
}

function showMapError(context, message = 'Peta tidak dapat dimuat. Silakan coba lagi nanti.') {
    const container = document.getElementById(context === 'peta' ? 'map' : 'locationPicker');
    if (container) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg p-4">
                <i class="fas fa-map-marked-alt text-4xl text-gray-400 mb-2"></i>
                <p class="text-gray-600 text-center">${message}</p>
            </div>
        `;
    }
}

// Add sample markers
function addSampleMarkers(map) {
    const sampleCases = [
        {
            position: [-10.1772, 123.6070],
            title: 'Kasus Rabies - Kupang',
            status: 'active',
            details: {
                date: '2024-01-15',
                location: 'Kupang',
                description: 'Kasus gigitan anjing rabies',
                status: 'Dalam Penanganan'
            }
        },
        {
            position: [-9.7766, 124.4190],
            title: 'Kasus Rabies - TTS',
            status: 'resolved',
            details: {
                date: '2024-01-10',
                location: 'TTS',
                description: 'Kasus gigitan anjing liar',
                status: 'Sudah Ditangani'
            }
        }
    ];

    sampleCases.forEach(caseData => {
        const marker = L.circleMarker(caseData.position, {
            radius: 8,
            fillColor: caseData.status === 'active' ? '#EF4444' : '#10B981',
            color: '#fff',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);

        // Add popup
        marker.bindPopup(createInfoWindowContent(caseData.details));
    });
}

function createInfoWindowContent(details) {
    return `
        <div class="p-4 max-w-sm">
            <h3 class="font-bold text-lg mb-2">Detail Kasus</h3>
            <div class="space-y-2">
                <p><span class="font-semibold">Tanggal:</span> ${details.date}</p>
                <p><span class="font-semibold">Lokasi:</span> ${details.location}</p>
                <p><span class="font-semibold">Deskripsi:</span> ${details.description}</p>
                <p><span class="font-semibold">Status:</span> 
                    <span class="px-2 py-1 rounded-full text-sm ${
                        details.status === 'Dalam Penanganan' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                    }">${details.status}</span>
                </p>
            </div>
        </div>
    `;
}

// Add map legend
function addMapLegend(container) {
    const legend = document.createElement('div');
    legend.className = 'absolute bottom-4 right-4 bg-white p-4 rounded shadow-md z-[1000]';
    legend.innerHTML = `
        <h4 class="font-bold mb-2">Legenda</h4>
        <div class="space-y-2">
            <div class="flex items-center">
                <div class="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                <span>Kasus Aktif</span>
            </div>
            <div class="flex items-center">
                <div class="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span>Kasus Selesai</span>
            </div>
        </div>
    `;
    container.appendChild(legend);
}
