
let totalWatt = 0;
let energiDipilih = 'matahari'; // Default

// 2. Fungsi Memilih Sumber Energi
function setEnergy(type) {
    energiDipilih = type;

    // Update Visual Tombol (Hilangkan active dari semua, tambahkan ke yang diklik)
    const allEnergyBoxes = document.querySelectorAll('.opt-box');
    allEnergyBoxes.forEach(box => box.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Update Info di Sidebar Kiri & Pesan Dampak
    const infoText = document.getElementById('energy-info-text');
    const infoImg = document.getElementById('info-img-display');

    if (type === 'matahari') {
        infoText.innerText = "Energi Matahari berasal dari cahaya matahari. Energi ini bersih, melimpah, dan ramah lingkungan.";
        infoImg.src = "matahari.png";
    } else if (type === 'angin') {
        infoText.innerText = "Energi Angin dihasilkan oleh kincir angin. Sangat ramah lingkungan dan tidak habis!";
        infoImg.src = "angin.png";
    } else if (type === 'air') {
        infoText.innerText = "Energi Air memanfaatkan aliran air untuk listrik. Stabil dan bebas emisi!";
        infoImg.src = "air.png";
    } else if (type === 'biomassa') {
        infoText.innerText = "Energi Biomassa berasal dari bahan organik seperti tanaman atau sisa pertanian.";
        infoImg.src = "biomassa.png";
    } else if (type === 'fosil') {
        infoText.innerText = "Energi Fosil (Batubara/Minyak) menghasilkan polusi udara dan merusak atmosfer bumi.";
        infoImg.src = "fosiil.png";
    }

    // Jalankan update hasil setiap kali ganti energi
    updateLogikaHasil();
}

// 3. Fungsi Memilih Tempat (Rumah/Sekolah)
function setPlace(place) {
    const previewImg = document.getElementById('main-preview-img');
    
    // Update Visual Tombol
    document.querySelectorAll('.place-box').forEach(box => box.classList.remove('active'));
    event.currentTarget.classList.add('active');

    if (place === 'sekolah') {
        previewImg.src = "img sekolah. png";
    } else {
        previewImg.src = "img rumah. png";
    }
}

// 4. Fungsi Toggle Alat & Hitung Watt
function toggleApp(button, wattValue) {
    if (button.classList.contains('on')) {
        button.classList.remove('on');
        button.innerText = "OFF";
        totalWatt -= wattValue;
    } else {
        button.classList.add('on');
        button.innerText = "ON";
        totalWatt += wattValue;
    }

    // Update tampilan angka watt
    document.getElementById('watt-count').innerText = totalWatt;
    document.getElementById('final-watt').innerText = totalWatt;
    
    // Update progress bar tantangan (maksimal 760W)
    let progress = (totalWatt / 760) * 100;
    document.getElementById('challenge-progress').style.width = progress + "%";

    updateLogikaHasil();
}

// 5. LOGIKA UTAMA: Kategori Watt & Dampak Lingkungan
function updateLogikaHasil() {
    const impactLabel = document.getElementById('impact-label');
    const impactDesc = document.getElementById('impact-desc');
    const catLabel = document.getElementById('cat-label');
    const earthImg = document.getElementById('earth-img');
    const finalWatt = document.getElementById('final-watt');

    // 1. Tentukan Kategori Watt berdasarkan ambang batas baru
    let kategori = "";
    if (totalWatt <= 250) {
        kategori = "RENDAH";
        catLabel.style.color = "#4CAF50"; // Hijau
    } else if (totalWatt <= 500) {
        kategori = "SEDANG";
        catLabel.style.color = "#FFC107"; // Kuning
    } else {
        kategori = "TINGGI";
        catLabel.style.color = "#F44336"; // Merah
    }
    catLabel.innerText = "Kategori: " + kategori;
    finalWatt.innerText = totalWatt;

    // 2. LOGIKA GABUNGAN (Energi + Penggunaan)
    // Cek apakah energinya termasuk kategori BERSIH
    const isCleanEnergy = (energiDipilih === 'matahari' || energiDipilih === 'angin' || energiDipilih === 'air');

    if (isCleanEnergy) {
        if (kategori === "RENDAH") {
            impactLabel.innerText = "SANGAT BAIK";
            impactLabel.style.color = "#4CAF50";
            impactDesc.innerText = "Luar biasa! Kamu menggunakan energi bersih dan sangat hemat. Bumi sangat bahagia!";
            earthImg.src = "bumi baik.png"; // Bumi sangat senang
        } else if (kategori === "SEDANG") {
            impactLabel.innerText = "BAIK";
            impactLabel.style.color = "#8BC34A";
            impactDesc.innerText = "Bagus! Energinya bersih, tapi coba matikan alat yang tidak perlu agar lebih hemat.";
            earthImg.src = "bumi baik.png"; 
        } else {
            impactLabel.innerText = "CUKUP";
            impactLabel.style.color = "#FF9800";
            impactDesc.innerText = "Energi bersih itu bagus, tapi penggunaanmu terlalu tinggi. Hemat energi itu penting!";
            earthImg.src = "bumi rusak.png"; // Bumi biasa saja karena boros
        }
    } 
    else if (energiDipilih === 'biomassa') {
        if (kategori === "RENDAH") {
            impactLabel.innerText = "CUKUP";
            impactLabel.style.color = "#8BC34A";
            impactDesc.innerText = "Penggunaan hemat, tapi ingat biomassa masih menghasilkan sedikit asap.";
            earthImg.src = "bumi baik.png";
        } else {
            impactLabel.innerText = "WASPADA";
            impactLabel.style.color = "#FF9800";
            impactDesc.innerText = "Hati-hati! Penggunaan biomassa yang berlebihan bisa menambah polusi udara.";
            earthImg.src = "bumi rusak.png";
        }
    } 
    else if (energiDipilih === 'fosil') {
        if (kategori === "RENDAH") {
            impactLabel.innerText = "BURUK";
            impactLabel.style.color = "#FF9800";
            impactDesc.innerText = "Meskipun hemat, energi fosil tetap meninggalkan polusi. Yuk pindah ke energi bersih!";
            earthImg.src = "bumi rusak.png";
        } else if (kategori === "SEDANG") {
            impactLabel.innerText = "SANGAT BURUK";
            impactLabel.style.color = "#F44336";
            impactDesc.innerText = "Bumi mulai merasa sesak karena asap polusi dari listrik fosil yang kamu gunakan.";
            earthImg.src = "bumi rusak.png"; // Bumi Sedih
        } else {
            impactLabel.innerText = "BAHAYA";
            impactLabel.style.color = "#B71C1C";
            impactDesc.innerText = "Gawat! Penggunaan energi fosil yang boros merusak atmosfer dengan sangat cepat!";
            earthImg.src = "bumi rusak.png"; // Bumi Sakit/Maskeran
        }
    }
}

function resetGame() {
    if (confirm("Ingin mengulang eksperimen dari awal?")) {
        location.reload();
    }
}