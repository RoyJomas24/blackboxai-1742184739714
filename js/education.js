// Education section functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeEducationSection();
});

function initializeEducationSection() {
    setupEducationContent();
    setupSearchFunctionality();
    setupFilterTabs();
}

function setupEducationContent() {
    const contentContainer = document.getElementById('educationContent');
    if (!contentContainer) return;

    const navContainer = document.createElement('div');
    navContainer.className = 'flex space-x-4 mb-6 border-b';
    contentContainer.parentElement.insertBefore(navContainer, contentContainer);

    const sections = {
        tentangRabies: {
            title: 'Tentang Rabies',
            content: createTentangRabiesContent()
        },
        pencegahan: {
            title: 'Pencegahan',
            content: createPencegahanContent()
        },
        penanganan: {
            title: 'Penanganan',
            content: createPenangananContent()
        },
        faq: {
            title: 'FAQ',
            content: createFAQContent()
        }
    };

    // Create navigation buttons
    Object.entries(sections).forEach(([key, section]) => {
        const button = document.createElement('button');
        button.className = 'px-4 py-2 text-gray-600 hover:text-blue-600 focus:outline-none';
        button.textContent = section.title;
        button.onclick = () => loadSection(key);
        navContainer.appendChild(button);
    });

    // Load initial section
    loadSection('tentangRabies');

    function loadSection(sectionKey) {
        const section = sections[sectionKey];
        contentContainer.innerHTML = section.content;
        
        // Update active nav button
        const buttons = navContainer.getElementsByTagName('button');
        Array.from(buttons).forEach(button => {
            button.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
            if (button.textContent === section.title) {
                button.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
            }
        });
    }
}

function createTentangRabiesContent() {
    return `
        <div class="space-y-4">
            <h3 class="text-xl font-bold text-gray-800">Apa itu Rabies?</h3>
            <p class="text-gray-600">
                Rabies adalah penyakit virus yang menyerang sistem saraf pusat dan biasanya ditularkan melalui gigitan hewan yang terinfeksi.
                Virus ini dapat menyebabkan peradangan pada otak yang hampir selalu berakibat fatal jika tidak segera ditangani.
            </p>
            
            <h4 class="text-lg font-semibold text-gray-800 mt-6">Cara Penularan</h4>
            <ul class="list-disc pl-5 text-gray-600">
                <li>Gigitan hewan terinfeksi</li>
                <li>Cakaran yang terkontaminasi air liur hewan terinfeksi</li>
                <li>Kontak langsung air liur hewan terinfeksi dengan luka terbuka</li>
            </ul>

            <h4 class="text-lg font-semibold text-gray-800 mt-6">Gejala Rabies</h4>
            <ul class="list-disc pl-5 text-gray-600">
                <li>Demam dan sakit kepala</li>
                <li>Kegelisahan dan kebingungan</li>
                <li>Kesulitan menelan</li>
                <li>Takut air (hidrofobia)</li>
                <li>Kelumpuhan progresif</li>
            </ul>
        </div>
    `;
}

function createPencegahanContent() {
    return `
        <div class="space-y-4">
            <h3 class="text-xl font-bold text-gray-800">Langkah-langkah Pencegahan Rabies</h3>
            
            <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="text-lg font-semibold text-blue-800">Vaksinasi Hewan Peliharaan</h4>
                <p class="text-gray-600 mt-2">
                    Pastikan hewan peliharaan Anda divaksinasi secara rutin sesuai jadwal yang direkomendasikan.
                    Vaksinasi adalah langkah paling efektif untuk mencegah penyebaran rabies.
                </p>
            </div>

            <div class="bg-green-50 p-4 rounded-lg mt-4">
                <h4 class="text-lg font-semibold text-green-800">Hindari Kontak dengan Hewan Liar</h4>
                <p class="text-gray-600 mt-2">
                    Jangan mendekati atau mengganggu hewan liar atau hewan yang tidak dikenal.
                    Ajarkan anak-anak untuk tidak mendekati hewan liar atau hewan yang tidak dikenal.
                </p>
            </div>

            <div class="bg-yellow-50 p-4 rounded-lg mt-4">
                <h4 class="text-lg font-semibold text-yellow-800">Pertolongan Pertama</h4>
                <ul class="list-disc pl-5 text-gray-600 mt-2">
                    <li>Cuci luka dengan air mengalir dan sabun selama 15 menit</li>
                    <li>Bersihkan luka dengan antiseptik</li>
                    <li>Segera kunjungi fasilitas kesehatan terdekat</li>
                </ul>
            </div>
        </div>
    `;
}

function createPenangananContent() {
    return `
        <div class="space-y-4">
            <h3 class="text-xl font-bold text-gray-800">Penanganan Kasus Rabies</h3>
            
            <div class="bg-red-50 p-4 rounded-lg">
                <h4 class="text-lg font-semibold text-red-800">Tindakan Segera</h4>
                <p class="text-gray-600 mt-2">
                    Jika tergigit atau tercakar hewan yang diduga rabies, segera lakukan:
                </p>
                <ol class="list-decimal pl-5 text-gray-600 mt-2">
                    <li>Cuci luka dengan air mengalir dan sabun selama 15 menit</li>
                    <li>Bersihkan dengan antiseptik</li>
                    <li>Segera ke fasilitas kesehatan untuk mendapatkan VAR (Vaksin Anti Rabies)</li>
                    <li>Laporkan kejadian ke petugas kesehatan setempat</li>
                </ol>
            </div>

            <div class="bg-purple-50 p-4 rounded-lg mt-4">
                <h4 class="text-lg font-semibold text-purple-800">Pengobatan</h4>
                <ul class="list-disc pl-5 text-gray-600 mt-2">
                    <li>Pemberian Vaksin Anti Rabies (VAR)</li>
                    <li>Pemberian Serum Anti Rabies (SAR) jika diperlukan</li>
                    <li>Perawatan luka</li>
                    <li>Pemantauan kondisi pasien</li>
                </ul>
            </div>

            <div class="mt-6">
                <h4 class="text-lg font-semibold text-gray-800">Kontak Penting</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div class="border p-4 rounded-lg">
                        <h5 class="font-semibold">Dinas Kesehatan NTT</h5>
                        <p class="text-gray-600">Telp: (0380) 833237</p>
                    </div>
                    <div class="border p-4 rounded-lg">
                        <h5 class="font-semibold">Rumah Sakit Rujukan</h5>
                        <p class="text-gray-600">RSUD Prof. Dr. W.Z. Johannes</p>
                        <p class="text-gray-600">Telp: (0380) 821111</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createFAQContent() {
    return `
        <div class="space-y-4">
            <h3 class="text-xl font-bold text-gray-800">Pertanyaan Umum</h3>
            
            <div class="space-y-4">
                <div class="border rounded-lg">
                    <button class="w-full text-left p-4 focus:outline-none" onclick="toggleFAQ(this)">
                        <div class="flex justify-between items-center">
                            <span class="font-semibold">Apakah rabies bisa disembuhkan?</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </button>
                    <div class="hidden p-4 bg-gray-50 border-t">
                        <p class="text-gray-600">
                            Setelah gejala muncul, rabies hampir selalu berakibat fatal. Namun, penyakit ini dapat dicegah dengan vaksinasi 
                            segera setelah terpapar (sebelum gejala muncul).
                        </p>
                    </div>
                </div>

                <div class="border rounded-lg">
                    <button class="w-full text-left p-4 focus:outline-none" onclick="toggleFAQ(this)">
                        <div class="flex justify-between items-center">
                            <span class="font-semibold">Berapa lama masa inkubasi rabies?</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </button>
                    <div class="hidden p-4 bg-gray-50 border-t">
                        <p class="text-gray-600">
                            Masa inkubasi rabies bervariasi dari 2 minggu hingga beberapa bulan, tergantung pada lokasi gigitan, 
                            tingkat keparahan luka, dan jarak ke sistem saraf pusat.
                        </p>
                    </div>
                </div>

                <div class="border rounded-lg">
                    <button class="w-full text-left p-4 focus:outline-none" onclick="toggleFAQ(this)">
                        <div class="flex justify-between items-center">
                            <span class="font-semibold">Apakah semua gigitan hewan perlu VAR?</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </button>
                    <div class="hidden p-4 bg-gray-50 border-t">
                        <p class="text-gray-600">
                            Tidak semua gigitan hewan memerlukan VAR. Keputusan pemberian VAR tergantung pada jenis hewan, 
                            kondisi hewan, dan penilaian risiko oleh tenaga medis.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupSearchFunctionality() {
    const searchInput = document.getElementById('educationSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const content = document.getElementById('educationContent');
        
        if (!content || searchTerm.length < 3) return;

        const text = content.innerHTML;
        const highlightedText = text.replace(
            new RegExp(searchTerm, 'gi'),
            match => `<mark class="bg-yellow-200">${match}</mark>`
        );
        
        content.innerHTML = highlightedText;
    });
}

function setupFilterTabs() {
    const filterTabs = document.querySelectorAll('[data-education-filter]');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.educationFilter;
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('bg-blue-500', 'text-white'));
            tab.classList.add('bg-blue-500', 'text-white');

            // Filter content (implement based on your content structure)
            filterContent(filter);
        });
    });
}

function filterContent(filter) {
    // Implement content filtering based on your needs
    console.log('Filtering content:', filter);
}

function toggleFAQ(element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    content.classList.toggle('hidden');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
}

// Export functions
window.toggleFAQ = toggleFAQ;
