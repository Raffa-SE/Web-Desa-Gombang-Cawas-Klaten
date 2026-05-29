    document.addEventListener("DOMContentLoaded", () => {
        // 1. Data Pencarian Statis
        const siteData = [
            { name: "Surat Undangan", keywords: ["surat", "undangan", "download", "pengantar"], url: "Surat/surat.pdf" },
            { name: "Laporan Keluhan Warga (Lapor Warga)", keywords: ["lapor", "warga", "keluhan", "aspirasi", "whatsapp"], url: "https://wa.me/6285778948765" },
            { name: "Data Statistik Desa", keywords: ["data", "statistik", "kependudukan", "blt", "infrastruktur"], url: "#bagian-statistik" },
            { name: "Halaman Profil Desa", keywords: ["profil", "sejarah", "visi", "misi", "perangkat"], url: "profil.html" },
            { name: "Halaman Kegiatan Desa", keywords: ["kegiatan", "berita", "acara", "event", "agustus"], url: "kegiatan.html" },
            { name: "Halaman Katalog UMKM", keywords: ["umkm", "produk", "lokal", "katalog", "toko", "belanja"], url: "umkm.html" }
        ];

        const searchBtn = document.getElementById("searchBtn");
        const searchInput = document.getElementById("searchInput");
        const resultsContainer = document.getElementById("searchResults");

        // Fungsi utama untuk pencarian
        function performSearch() {
            const query = searchInput.value.trim().toLowerCase();
            
            // Logika untuk tombol "Cari" atau "Enter": Ambil hasil pertama dan buka
            const filteredResults = siteData.filter(item => {
                return item.name.toLowerCase().includes(query) || 
                    item.keywords.some(keyword => keyword.includes(query));
            });

            if (filteredResults.length > 0) {
                const firstResult = filteredResults[0];
                
                // Jika link adalah internal scroll (#)
                if (firstResult.url.startsWith("#")) {
                    const target = document.querySelector(firstResult.url);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        resultsContainer.style.display = "none";
                        searchInput.value = "";
                    }
                } else {
                    // Jika link adalah file atau halaman, buka link tersebut
                    window.location.href = firstResult.url;
                }
            } else if (query !== "") {
                alert("Maaf, data tidak ditemukan.");
            }
        }

        // Fungsi untuk menampilkan list saat ngetik (Real-time)
        function showSuggestions() {
            const query = searchInput.value.trim().toLowerCase();
            resultsContainer.innerHTML = "";

            if (query === "") {
                resultsContainer.style.display = "none";
                return;
            }

            const filtered = siteData.filter(item => 
                item.name.toLowerCase().includes(query) || 
                item.keywords.some(k => k.includes(query))
            );

            if (filtered.length > 0) {
                resultsContainer.style.display = "block";
                filtered.forEach(result => {
                    const resultItem = document.createElement("a");
                    resultItem.href = result.url;
                    resultItem.classList.add("search-result-item");
                    resultItem.innerHTML = `<i class="fa-solid fa-arrow-right" style="margin-right:8px; font-size:0.8rem;"></i> ${result.name}`;
                    
                    // Event jika diklik dari dropdown
                    resultItem.addEventListener('click', (e) => {
                        if (result.url.startsWith("#")) {
                            e.preventDefault();
                            const target = document.querySelector(result.url);
                            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            resultsContainer.style.display = "none";
                            searchInput.value = "";
                        }
                    });
                    resultsContainer.appendChild(resultItem);
                });
            } else {
                resultsContainer.style.display = "block";
                resultsContainer.innerHTML = `<div class="search-no-result"><i class="fa-solid fa-circle-exclamation"></i> DATA TIDAK DITEMUKAN</div>`;
            }
        }

        // Event Listeners
        if (searchBtn && searchInput) {
            // Klik tombol cari
            searchBtn.addEventListener("click", performSearch);
            
            // Tekan Enter
            searchInput.addEventListener("keypress", (e) => {
                if (e.key === 'Enter') performSearch();
            });

            // Real-time suggest
            searchInput.addEventListener("input", showSuggestions);
            
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) resultsContainer.style.display = "none";
            });
        }

        // Smooth scroll untuk link internal (#)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== "#") {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });