// Data Dummy (Cadangan)
const dummyData = [
    {
        title: "Koneksi API Gnews Sedang Limit (Status 403)",
        image: "https://via.placeholder.com/800x450/dc3545/fff?text=API+Limit+Reached",
        description: "Maaf, kuota harian API gratis telah habis. Berita asli akan muncul kembali setelah 24 jam atau ganti API Key baru.",
        source: { name: "System" },
        publishedAt: new Date().toISOString(),
        url: "#"
    }
];

// Konfigurasi API
const API_KEY = 'ec2e6b7df235cc92408a97ad8a99dabe';
let currentPage = 1;
let currentCategory = 'general';
let currentSearch = '';

// Helper: Validasi Gambar
function getImageUrl(imageUrl) {
    return imageUrl || 'https://via.placeholder.com/800x450/333/fff?text=No+Image';
}

// Fungsi Utama: Ambil Berita
async function loadNews(page = 1) {
    showLoading();
    let url = '';

    if (currentSearch) {
        url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(currentSearch)}&page=${page}&lang=id&country=id&apikey=${API_KEY}`;
    } else {
        url = `https://gnews.io/api/v4/top-headlines?category=${currentCategory}&lang=id&country=id&page=${page}&apikey=${API_KEY}`; 
    }

    try {
        const resp = await fetch(url);
        
        if (!resp.ok) {
            throw new Error(`Limit API atau Error!`);
        }
        
        const data = await resp.json();
        
        if (data.articles && data.articles.length > 0) {
            renderLayout(data.articles);
            document.getElementById('pageNumber').innerText = `Page ${page}`;
            currentPage = page;
        } else {
            showNoResults();
        }
    } catch (err) {
        console.error("Gagal memuat berita asli, beralih ke dummy:", err);
        renderLayout(dummyData); // Menggunakan data dummy saat error
        document.getElementById('pageNumber').innerText = `Page ${page} (Offline Mode)`;
    }
}

// UI Helpers
function showLoading() {
    const middleCol = document.getElementById('middleColumn');
    middleCol.innerHTML = `
        <div class="text-center py-5">
            <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3 text-muted">Loading news...</p>
        </div>`;
}

function showNoResults() {
    const middleCol = document.getElementById('middleColumn');
    middleCol.innerHTML = `
        <div class="alert alert-warning text-center" role="alert">
            <i class="bi bi-exclamation-triangle fs-1 d-block mb-3"></i>
            <h4>No news found</h4>
            <p class="mb-0">Try different keywords or category</p>
        </div>`;
}

// Event Listeners
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

// Pencarian
searchBtn.addEventListener('click', () => {
    const q = searchInput.value.trim();
    if (q !== "") {
        currentSearch = q;
        currentCategory = 'general';
        currentPage = 1;
        loadNews(currentPage);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});

// Kategori Navigasi
document.getElementById('categoryNav').addEventListener('click', (e) => {
    const cat = e.target.dataset.cat;
    if (cat) {
        document.querySelectorAll('.category-link').forEach(link => link.classList.remove('text-danger'));
        e.target.classList.add('text-danger');
        
        currentCategory = cat;
        currentSearch = '';
        searchInput.value = ''; 
        currentPage = 1;
        loadNews(currentPage);
    }
});

// Pagination
document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    loadNews(currentPage);
    window.scrollTo(0, 0);
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadNews(currentPage);
        window.scrollTo(0, 0);
    }
});

// Fungsi Render Layout
function renderLayout(articles) {
    const cols = ['leftColumn', 'middleColumn', 'rightColumn', 'breakingColumn'];
    cols.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });

    if (!articles || articles.length === 0) {
        showNoResults();
        return;
    }

    //Headline (Tengah)
    const main = articles[0];
    const mainImage = getImageUrl(main.image);
    document.getElementById('middleColumn').innerHTML = `
        <div class="card bg-dark text-white border-0 rounded-0 position-relative overflow-hidden shadow">
            <img src="${mainImage}" class="hero-main w-100" alt="main" onerror="this.src='https://via.placeholder.com/800x450/333/fff?text=No+Image'">
            <div class="card-img-overlay d-flex flex-column justify-content-end p-4" style="background: linear-gradient(transparent, rgba(0,0,0,0.8));">
                <span class="badge bg-danger mb-2 rounded-0 align-self-start">${main.source?.name || 'Unknown Source'}</span>
                <h2 class="fw-bold"><a href="${main.url}" target="_blank" class="text-white text-decoration-none">${main.title}</a></h2>
                <p class="text-white-50 small mb-0">${main.description || ''}</p>
            </div>
        </div>`;

    //Berita Terbaru (Kiri)
    const freshArticles = articles.slice(1, 5);
    freshArticles.forEach(art => {
        document.getElementById('leftColumn').innerHTML += `
            <div class="mb-4 border-bottom pb-2">
                <h6 class="fw-bold mb-1"><a href="${art.url}" target="_blank" class="text-dark text-decoration-none">${art.title}</a></h6>
                <small class="text-danger fw-bold d-block mb-1 text-uppercase" style="font-size:0.7rem;">${art.source?.name || 'Unknown'}</small>
                <small class="text-muted">${new Date(art.publishedAt).toLocaleDateString()}</small>
            </div>`;
    });
    // trendign
    const popularArticles = articles.slice(5, 9);
    popularArticles.forEach(art => {
        const artImage = getImageUrl(art.image);
        document.getElementById('rightColumn').innerHTML += `
            <div class="mb-3 d-flex gap-2 align-items-start">
                <img src="${artImage}" style="width:70px; height:50px; object-fit:cover;" class="rounded shadow-sm" onerror="this.src='https://via.placeholder.com/70x50/ddd/333?text=No+Image'">
                <div>
                    <h6 class="fw-bold mb-0" style="font-size: 0.85rem;"><a href="${art.url}" target="_blank" class="text-dark text-decoration-none">${art.title}</a></h6>
                </div>
            </div>`;
    });
    // bawah
    const breakingArticles = articles.slice(0, 4);
    breakingArticles.forEach(art => {
        const breakingImage = getImageUrl(art.image);
        document.getElementById('breakingColumn').innerHTML += `
            <div class="col">
                <div class="card bg-dark text-white border-0 rounded-0 position-relative h-100 shadow-sm">
                    <img src="${breakingImage}" class="card-img h-100 object-fit-cover" style="min-height:220px; opacity:0.7;" onerror="this.src='https://via.placeholder.com/400x220/333/fff?text=No+Image'">
                    <div class="card-img-overlay d-flex flex-column justify-content-end p-3" style="background: linear-gradient(transparent, rgba(0,0,0,0.8));">
                        <h6 class="fw-bold small m-0"><a href="${art.url}" target="_blank" class="text-white text-decoration-none">${art.title}</a></h6>
                    </div>
                </div>
            </div>`;
    });
}

// tampilan awal
loadNews(currentPage);

// Logika Dark Mode
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});