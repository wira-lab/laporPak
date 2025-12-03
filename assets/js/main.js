document.addEventListener("DOMContentLoaded", () => {
  // ============================
  // UTILITAS FORMAT
  // ============================
  function formatKategori(kat) {
    switch (kat) {
      case "jalan-berlubang":
        return "Jalan berlubang";
      case "lampu-jalan-mati":
        return "Lampu jalan mati";
      case "sampah-menumpuk":
        return "Sampah menumpuk";
      case "drainase-tersumbat":
        return "Drainase tersumbat";
      case "trotoar-rusak":
        return "Trotoar / trotoar rusak";
      case "taman-fasilitas":
        return "Fasilitas taman / publik rusak";
      default:
        return "Lainnya";
    }
  }

  function formatStatus(st) {
    if (st === "menunggu") return "Menunggu verifikasi";
    if (st === "diproses") return "Sedang diproses";
    if (st === "selesai") return "Selesai diperbaiki";
    return st;
  }

  function formatRupiah(angka) {
    if (typeof angka !== "number") return angka;
    return "Rp " + angka.toLocaleString("id-ID");
  }

  // ============================
// MODAL DEMO APP
// ============================
function initDemoModal() {
  const modal = document.getElementById("demoModal");
  const openBtn = document.getElementById("btnOpenDemo");
  if (!modal || !openBtn) return;

  const closeEls = modal.querySelectorAll("[data-modal-close]");

  openBtn.addEventListener("click", function (e) {
    // kalau mau tetap ke lapor.html, hapus preventDefault ini
    e.preventDefault();
    modal.classList.add("is-open");
  });

  closeEls.forEach((el) => {
    el.addEventListener("click", () => {
      modal.classList.remove("is-open");
    });
  });

  // klik area gelap di luar modal → tutup
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("is-open");
    }
  });
}

// panggil di akhir DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initDemoModal();
});


  // =====================================================
  // HALAMAN LAPOR (lapor.html) – form buat laporan user
  // ================================================MODAL DONASI=====
  const btnLokasi = document.getElementById("btnLokasi");
  const lokasiInput = document.getElementById("lokasi");
  const reportForm = document.getElementById("reportForm");

  if (btnLokasi && lokasiInput) {
    btnLokasi.addEventListener("click", () => {
      alert(
        "Ini adalah prototipe.\nPada versi penuh, tombol ini akan menggunakan GPS untuk mengisi lokasi otomatis."
      );
    });
  }

  if (reportForm) {
    reportForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const lokasi =
        document.getElementById("lokasi")?.value || "Lokasi tidak diisi";
      const kategori =
        document.getElementById("kategori")?.value || "lainnya";
      const urgensi =
        document.getElementById("urgensi")?.value || "sedang";
      const deskripsi =
        document.getElementById("deskripsi")?.value || "Tanpa deskripsi.";

      const judul =
        (kategori ? formatKategori(kategori) : "Laporan Kerusakan") +
        " - " +
        lokasi;

      const newReport = {
        id: "user-" + Date.now(),
        judul,
        kategori,
        status: "menunggu",
        urgensi,
        lokasi,
        waktu: "Baru saja",
        deskripsi,
        source: "user",
      };

      const existingRaw = localStorage.getItem("lokasibantu_my_reports");
      let existing = [];
      if (existingRaw) {
        try {
          existing = JSON.parse(existingRaw);
        } catch (e) {
          existing = [];
        }
      }

      existing.unshift(newReport);
      localStorage.setItem(
        "lokasibantu_my_reports",
        JSON.stringify(existing)
      );

      alert(
        "Terima kasih! Laporan Anda sudah disimpan sebagai 'Laporan Saya' (simulasi prototipe)."
      );

      // Kalau mau form kembali kosong, buka komentar ini:
      // reportForm.reset();
    });
  }

  // =====================================================
  // LAPORAN KELUHAN MASYARAKAT (untuk detail-laporan.html)
  // =====================================================
  const communityReports = [
    {
      id: "lap1",
      judul: "Jalan berlubang di Jl. Melati",
      kategori: "jalan-berlubang",
      status: "menunggu",
      urgensi: "tinggi",
      lokasi: "Jl. Melati, depan SDN 01",
      waktu: "2 jam lalu",
      deskripsi:
        "Lubang cukup dalam dan sering membuat pengendara motor hampir jatuh, terutama saat jam berangkat sekolah.",
      timeline: [
        "Laporan dibuat oleh warga 2 jam lalu.",
        "Sedang menunggu verifikasi admin kecamatan.",
        "Berikutnya: dapat diteruskan ke Dinas PUPR atau dibuat aksi gotong royong.",
      ],
      dana: {
        target: 1200000,
        terkumpul: 750000,
        donatur: 18,
        hariTersisa: 5,
        usage: [
          "70% — Bahan perbaikan (semen, pasir, batu kecil, alat kerja ringan).",
          "20% — APD & alat pendukung (sarung tangan, rompi, penanda jalan sementara).",
          "10% — Konsumsi dan transport sederhana untuk relawan gotong royong.",
        ],
      },
      gotong: {
        tanggal: "Minggu, 7 Desember 2025",
        waktu: "07.00 – 10.00 WIB",
        koordinator: "Ketua RT 03 / Komunitas Pemuda Melati",
        catatan:
          "Warga berencana membersihkan area dan membantu proses perbaikan awal sebelum tim teknis datang.",
      },
    },
    {
      id: "lap2",
      judul: "Lampu jalan mati dekat taman kota",
      kategori: "lampu-jalan-mati",
      status: "diproses",
      urgensi: "sedang",
      lokasi: "Taman Kota Hijau",
      waktu: "5 jam lalu",
      deskripsi:
        "Lampu mati di beberapa titik, area jadi sangat gelap saat malam hari dan rawan bagi pejalan kaki.",
      timeline: [
        "Laporan dibuat 5 jam lalu oleh warga.",
        "Admin telah memverifikasi laporan.",
        "Diteruskan ke dinas penerangan jalan kota.",
        "Menunggu jadwal perbaikan dari tim lapangan.",
      ],
      dana: {
        target: 800000,
        terkumpul: 400000,
        donatur: 9,
        hariTersisa: 3,
        usage: [
          "60% — Pengadaan lampu sementara / lampu tenaga surya kecil.",
          "25% — Pembuatan papan peringatan area gelap.",
          "15% — Konsumsi untuk relawan pemasangan sementara.",
        ],
      },
      gotong: {
        tanggal: "Sabtu, 6 Desember 2025",
        waktu: "19.00 – 21.00 WIB",
        koordinator: "Karang Taruna Taman Kota",
        catatan:
          "Relawan akan memasang lampu sementara dan memberi tanda reflektif hingga perbaikan resmi dilakukan.",
      },
    },
    {
      id: "lap3",
      judul: "Sampah menumpuk di pojok gang",
      kategori: "sampah-menumpuk",
      status: "menunggu",
      urgensi: "sedang",
      lokasi: "Gang Mawar 3",
      waktu: "1 hari lalu",
      deskripsi:
        "Tumpukan sampah sudah melewati bak dan mulai mengeluarkan bau tidak sedap, mengganggu warga sekitar.",
      timeline: [
        "Laporan dibuat 1 hari lalu oleh warga.",
        "Belum ada respons dari petugas kebersihan.",
        "Warga setempat mulai menginisiasi aksi bersih lingkungan.",
      ],
      dana: {
        target: 500000,
        terkumpul: 150000,
        donatur: 7,
        hariTersisa: 7,
        usage: [
          "50% — Kantong sampah besar, sapu, serokan, dan cairan pembersih.",
          "30% — Pembuatan papan himbauan dilarang buang sampah sembarangan.",
          "20% — Air minum dan snack sederhana untuk relawan.",
        ],
      },
      gotong: {
        tanggal: "Sabtu, 13 Desember 2025",
        waktu: "08.00 – 11.00 WIB",
        koordinator: "Komunitas Bersih Mawar",
        catatan:
          "Kegiatan diharapkan rutin sebulan sekali untuk menjaga area tetap bersih.",
      },
    },
  ];


  // ============================
// KAMPANYE DONASI SOSIAL
// (bencana alam, panti asuhan, dll)
// ============================
const donationCampaigns = [
  {
    id: "don1",
    judul: "Bantuan Darurat Banjir Kelurahan Sukamaju",
    kategori: "bencana", // bencana | pendidikan | kesehatan | sosial
    lokasi: "Kelurahan Sukamaju, Kec. Timur",
    penyelenggara: "BPBD & Relawan Warga Sukamaju",
    ringkasan:
      "Menggalang dana untuk kebutuhan logistik dasar warga terdampak banjir: makanan siap saji, selimut, dan alat kebersihan.",
    dana: {
      target: 15000000,
      terkumpul: 6200000,
      donatur: 124,
      hariTersisa: 7
    },
    tag: ["Banjir", "Darurat", "Logistik"],
    highlight: "Fokus pada bantuan cepat 7 hari pertama pasca-banjir."
  },
  {
    id: "don2",
    judul: "Beasiswa Bulanan Anak Panti Asuhan Cahaya Hati",
    kategori: "pendidikan",
    lokasi: "Panti Asuhan Cahaya Hati, Medan",
    penyelenggara: "Komunitas Peduli Pendidikan",
    ringkasan:
      "Mendukung biaya sekolah dan kebutuhan belajar 30 anak panti: buku, seragam, dan uang SPP.",
    dana: {
      target: 8000000,
      terkumpul: 3200000,
      donatur: 58,
      hariTersisa: 15
    },
    tag: ["Panti Asuhan", "Pendidikan", "Beasiswa"],
    highlight: "Donasi bisa membantu keberlangsungan sekolah selama 1 semester."
  },
  {
    id: "don3",
    judul: "Pengadaan Kursi Roda & Alat Bantu Jalan",
    kategori: "kesehatan",
    lokasi: "Beberapa kelurahan di Kota Medan",
    penyelenggara: "Forum Kesehatan Warga",
    ringkasan:
      "Pengadaan kursi roda, tongkat, dan walker bagi lansia dan penyandang disabilitas kurang mampu.",
    dana: {
      target: 12000000,
      terkumpul: 4500000,
      donatur: 73,
      hariTersisa: 20
    },
    tag: ["Disabilitas", "Lansia", "Kesehatan"],
    highlight:
      "Prioritas untuk warga yang sudah terdata di puskesmas dan kelurahan."
  }
];


// ============================
// HALAMAN PETA + DETAIL (peta.html)
// ============================

const dummyReports = [
  {
    id: "lap1",
    judul: "Jalan berlubang di Jl. Melati",
    kategori: "jalan-berlubang",
    status: "menunggu",
    urgensi: "tinggi",
    lokasi: "Jl. Melati, depan SDN 01",
    waktu: "10 menit lalu",
    deskripsi:
      "Lubang cukup dalam dan sering membuat pengendara motor hampir jatuh, terutama saat jam berangkat sekolah."
  },
  {
    id: "lap2",
    judul: "Lampu jalan mati dekat taman kota",
    kategori: "lampu-jalan-mati",
    status: "diproses",
    urgensi: "sedang",
    lokasi: "Taman Kota Hijau",
    waktu: "2 jam lalu",
    deskripsi:
      "Lampu mati di beberapa titik, area jadi sangat gelap saat malam hari dan rawan bagi pejalan kaki."
  },
  {
    id: "lap3",
    judul: "Sampah menumpuk di pojok gang",
    kategori: "sampah-menumpuk",
    status: "menunggu",
    urgensi: "sedang",
    lokasi: "Gang Mawar 3",
    waktu: "1 hari lalu",
    deskripsi:
      "Tumpukan sampah sudah melewati bak dan mulai mengeluarkan bau tidak sedap, mengganggu warga sekitar."
  },
  {
    id: "lap4",
    judul: "Drainase tersumbat saat hujan deras",
    kategori: "drainase-tersumbat",
    status: "diproses",
    urgensi: "tinggi",
    lokasi: "Jl. Ahmad Yani",
    waktu: "3 hari lalu",
    deskripsi:
      "Setiap hujan deras, air meluap ke jalan karena drainase tidak berfungsi optimal."
  },
  {
    id: "lap5",
    judul: "Trotoar retak di depan kampus",
    kategori: "trotoar-rusak",
    status: "selesai",
    urgensi: "rendah",
    lokasi: "Depan Kampus Negeri",
    waktu: "1 minggu lalu",
    deskripsi:
      "Bagian trotoar retak dan sedikit amblas, sudah diperbaiki oleh petugas pekan ini."
  },
  {
    id: "lap6",
    judul: "Ayunan taman rusak di kompleks Griya Asri",
    kategori: "fasilitas-taman",
    status: "menunggu",
    urgensi: "sedang",
    lokasi: "Taman Griya Asri Blok C",
    waktu: "45 menit lalu",
    deskripsi:
      "Rantai ayunan mulai berkarat dan dudukan patah di satu sisi, berpotensi membahayakan anak-anak."
  },
  {
    id: "lap7",
    judul: "Marka jalan pudar di perempatan utama",
    kategori: "jalan-berlubang",
    status: "diproses",
    urgensi: "rendah",
    lokasi: "Perempatan Jl. Sudirman – Jl. Merdeka",
    waktu: "5 jam lalu",
    deskripsi:
      "Marka zebra cross dan garis berhenti sudah sulit terlihat, membuat pengendara sering melewati batas."
  },
  {
    id: "lap8",
    judul: "Halte bus tanpa atap di musim hujan",
    kategori: "fasilitas-taman",
    status: "menunggu",
    urgensi: "sedang",
    lokasi: "Halte Bus Pasar Pagi",
    waktu: "2 hari lalu",
    deskripsi:
      "Atap halte sudah lepas sejak angin kencang bulan lalu, penumpang bus terpaksa berteduh di pinggir kios."
  },
  {
    id: "lap9",
    judul: "Got tertutup sedimentasi tanah",
    kategori: "drainase-tersumbat",
    status: "diproses",
    urgensi: "tinggi",
    lokasi: "Jl. Kenanga Dalam",
    waktu: "4 hari lalu",
    deskripsi:
      "Aliran air hampir tidak bergerak karena got tertutup lumpur dan pasir, rawan banjir saat hujan deras."
  },
  {
    id: "lap10",
    judul: "Jembatan kecil kayu rapuh di area sawah",
    kategori: "jalan-berlubang",
    status: "menunggu",
    urgensi: "tinggi",
    lokasi: "Akses sawah Desa Suka Maju",
    waktu: "6 jam lalu",
    deskripsi:
      "Beberapa papan jembatan sudah patah, petani harus berjalan memutar karena takut melintas."
  }
];


const mapListEl = document.getElementById("mapList");
const filterKategori = document.getElementById("filterKategori");
const filterStatus = document.getElementById("filterStatus");
const filterUrgensi = document.getElementById("filterUrgensi");
const mapDummyGrid = document.getElementById("mapDummyGrid");

// elemen bottom sheet
const sheetEl = document.getElementById("petaDetailSheet");
const sheetTitleEl = document.getElementById("sheetTitle");
const sheetMetaEl = document.getElementById("sheetMeta");
const sheetBadgesEl = document.getElementById("sheetBadges");
const sheetDescEl = document.getElementById("sheetDesc");
const sheetGotongInfoEl = document.getElementById("sheetGotongInfo");
const sheetCloseBtn = document.getElementById("sheetCloseBtn");
const sheetGotongBtn = document.getElementById("sheetGotongBtn");

// buka sheet detail
function openReportDetail(rep) {
  if (!sheetEl) return;

  const statusText = formatStatus(rep.status);

  sheetTitleEl.textContent = rep.judul;
  sheetMetaEl.textContent = `${rep.lokasi} • ${statusText} • Urgensi: ${rep.urgensi} • ${rep.waktu}`;
  sheetDescEl.textContent = rep.deskripsi || "Tidak ada deskripsi tambahan.";

  // badges
  const statusClass =
    rep.status === "selesai"
      ? "badge badge-done"
      : rep.status === "diproses"
      ? "badge badge-process"
      : "badge badge-wait";

  sheetBadgesEl.innerHTML = `
    <span class="${statusClass}">${statusText}</span>
    <span class="badge badge-community">Kolaborasi warga & pemerintah</span>
  `;

  // info gotong royong dummy berdasarkan urgensi
  if (sheetGotongInfoEl) {
    if (rep.urgensi === "tinggi") {
      sheetGotongInfoEl.textContent =
        "Rencana gotong royong akhir pekan ini. Prioritas pembersihan dan perbaikan awal di lokasi laporan.";
    } else if (rep.urgensi === "sedang") {
      sheetGotongInfoEl.textContent =
        "Gotong royong terjadwal dalam 1–2 minggu ke depan, menunggu koordinasi RT/RW dan kelurahan.";
    } else {
      sheetGotongInfoEl.textContent =
        "Belum ada jadwal gotong royong khusus. Warga tetap dihimbau menjaga kebersihan dan keamanan area.";
    }
  }

  sheetEl.classList.add("is-open");
}

// tutup sheet
function closeReportDetail() {
  if (sheetEl) {
    sheetEl.classList.remove("is-open");
  }
}

if (sheetCloseBtn && sheetEl) {
  sheetCloseBtn.addEventListener("click", closeReportDetail);
}

// tombol gotong royong (sekadar alert prototipe)
if (sheetGotongBtn) {
  sheetGotongBtn.addEventListener("click", () => {
    alert(
      "Terima kasih sudah tertarik ikut gotong royong!\n\nPada versi penuh, tombol ini akan menghubungkan Anda ke form/WA group koordinator warga."
    );
  });
}

// render list laporan
function renderReports() {
  if (!mapListEl) return;

  const kategoriVal = filterKategori ? filterKategori.value : "semua";
  const statusVal = filterStatus ? filterStatus.value : "semua";
  const urgensiVal = filterUrgensi ? filterUrgensi.value : "semua";

  const filtered = dummyReports.filter((rep) => {
    const cekKategori =
      kategoriVal === "semua" || rep.kategori === kategoriVal;
    const cekStatus = statusVal === "semua" || rep.status === statusVal;
    const cekUrgensi = urgensiVal === "semua" || rep.urgensi === urgensiVal;
    return cekKategori && cekStatus && cekUrgensi;
  });

  mapListEl.innerHTML = "";

  if (filtered.length === 0) {
    mapListEl.innerHTML =
      '<p style="font-size:0.9rem;color:#9fb1cf;">Belum ada laporan yang cocok dengan filter.</p>';
    return;
  }

  filtered.forEach((rep) => {
    const statusClass =
      rep.status === "selesai"
        ? "status-selesai"
        : rep.status === "diproses"
        ? "status-diproses"
        : "status-menunggu";

    const item = document.createElement("article");
    item.className = "map-item";
    item.innerHTML = `
      <h3 class="map-item-title">${rep.judul}</h3>
      <p class="map-item-meta">${rep.lokasi} · ${rep.waktu}</p>
      <p class="map-item-meta">
        Kategori: ${formatKategori(rep.kategori)} · Urgensi: ${rep.urgensi}
      </p>
      <p class="map-item-status ${statusClass}">
        Status: ${formatStatus(rep.status)}
      </p>
    `;

    item.addEventListener("click", () => openReportDetail(rep));
    mapListEl.appendChild(item);
  });
}

// render "peta" dummy
function renderMapGrid() {
  if (!mapDummyGrid) return;

  mapDummyGrid.innerHTML = "";

  dummyReports.forEach((rep) => {
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = `peta-map-cell urgensi-${rep.urgensi}`;
    cell.innerHTML = `
      <div class="peta-map-cell-badge">
        Urgensi: ${rep.urgensi}
      </div>
      <div class="peta-map-cell-title">${rep.judul}</div>
      <div class="peta-map-cell-location">${rep.lokasi}</div>
      <div class="peta-map-cell-meta">
        ${formatStatus(rep.status)} • ${rep.waktu}
      </div>
    `;
    cell.addEventListener("click", () => openReportDetail(rep));
    mapDummyGrid.appendChild(cell);
  });
}


// inisialisasi halaman peta
if (mapListEl || mapDummyGrid) {
  renderReports();
  renderMapGrid();

  if (filterKategori) filterKategori.addEventListener("change", renderReports);
  if (filterStatus) filterStatus.addEventListener("change", renderReports);
  if (filterUrgensi) filterUrgensi.addEventListener("change", renderReports);
}

  // =====================================================
  // HALAMAN LAPORAN SAYA (laporan-saya.html) – laporan user
  // =====================================================
  function loadUserReports() {
    const raw = localStorage.getItem("lokasibantu_my_reports");
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      console.warn("Gagal parse laporan user:", e);
    }
    return [];
  }

  const myReportsListEl = document.getElementById("myReportsList");
  const filterMyStatus = document.getElementById("filterMyStatus");

  function renderMyReports() {
    if (!myReportsListEl) return;

    const statusVal = filterMyStatus ? filterMyStatus.value : "semua";

    const allUserReports = loadUserReports();

    const filtered = allUserReports.filter((rep) => {
      return statusVal === "semua" || rep.status === statusVal;
    });

    myReportsListEl.innerHTML = "";

    if (filtered.length === 0) {
      myReportsListEl.innerHTML =
        '<p style="font-size:0.9rem;color:#6b7280;">Belum ada laporan yang Anda buat dari menu "Buat Laporan". Coba kirim satu laporan untuk melihat contoh di sini.</p>';
      return;
    }

    filtered.forEach((rep) => {
      const badgeClass =
        rep.status === "selesai"
          ? "badge badge-done"
          : rep.status === "diproses"
          ? "badge badge-process"
          : "badge badge-wait";

      const badgeText = formatStatus(rep.status);

      const card = document.createElement("article");
      card.className = "myreport-card";
      card.innerHTML = `
        <header class="myreport-header">
          <h2 class="myreport-title">${rep.judul}</h2>
          <div class="myreport-badge">
            <span class="${badgeClass}">${badgeText}</span>
          </div>
        </header>

        <p class="myreport-meta">
          ${rep.lokasi} · ${rep.waktu} · Urgensi: ${rep.urgensi}
        </p>

        <p class="myreport-desc">
          ${rep.deskripsi}
        </p>

        <div class="myreport-footer">
          <p class="myreport-meta">
            Kategori: ${formatKategori(rep.kategori)}
          </p>
          <div class="myreport-actions">
            <span class="myreport-meta">Ini laporan yang Anda kirim.</span>
          </div>
        </div>
      `;
      myReportsListEl.appendChild(card);
    });
  }

  if (myReportsListEl) {
    renderMyReports();
    if (filterMyStatus) {
      filterMyStatus.addEventListener("change", renderMyReports);
    }
  }

  // ============================
// HALAMAN DONASI (donasi.html)
// ============================
function initDonasiPage() {
  const donasiPageEl = document.getElementById("donasiPage");
  if (!donasiPageEl) return; // bukan di donasi.html

  const listEl = document.getElementById("donasiList");
  const filterEl = document.getElementById("donasiFilter");

  function renderDonasi() {
    if (!listEl) return;

    const selectedKat = filterEl ? filterEl.value : "semua";

    const filtered = donationCampaigns.filter((item) => {
      if (selectedKat === "semua") return true;
      return item.kategori === selectedKat;
    });

    listEl.innerHTML = "";

    if (filtered.length === 0) {
      listEl.innerHTML =
        '<p style="font-size:0.9rem;color:#9ca3af;">Belum ada kampanye donasi untuk kategori ini.</p>';
      return;
    }

    filtered.forEach((item) => {
      const persen =
        item.dana.target > 0
          ? Math.round((item.dana.terkumpul / item.dana.target) * 100)
          : 0;

      const card = document.createElement("article");
      card.className = "donasi-card";
      card.innerHTML = `
        <header class="donasi-card-header">
          <div>
            <div class="donasi-badge-row">
              <span class="badge badge-donasi-type">${formatKategoriDonasi(
                item.kategori
              )}</span>
              <span class="badge badge-donasi-status">Sedang Berjalan</span>
            </div>
            <h2 class="donasi-title">${item.judul}</h2>
            <p class="donasi-location">${item.lokasi}</p>
          </div>
        </header>

        <p class="donasi-summary">
          ${item.ringkasan}
        </p>

        <div class="donasi-meta">
          <span>Penyelenggara: <strong>${item.penyelenggara}</strong></span>
        </div>

        <div class="donasi-progress">
          <div class="donasi-progress-line">
            <span class="donasi-progress-label">Terkumpul</span>
            <span class="donasi-progress-amount">${formatRupiah(
              item.dana.terkumpul
            )} / ${formatRupiah(item.dana.target)}</span>
          </div>
          <div class="donasi-progress-bar">
            <div class="donasi-progress-fill" style="width:${Math.min(
              persen,
              100
            )}%;"></div>
          </div>
          <div class="donasi-progress-info">
            <span>${persen}% tercapai</span>
            <span>${item.dana.donatur} donatur · ${item.dana.hariTersisa} hari tersisa</span>
          </div>
        </div>

        <div class="donasi-tags">
          ${item.tag
            .map((t) => `<span class="donasi-tag">#${t}</span>`)
            .join("")}
        </div>

        <div class="donasi-actions">
          <button type="button" class="btn btn-primary btn-donasi" data-id="${
            item.id
          }">
            Donasi Sekarang (Simulasi)
          </button>
        </div>

        <p class="donasi-highlight">
          ${item.highlight}
        </p>
      `;

      listEl.appendChild(card);
    });

    // Pasang event untuk tombol donasi setelah card ter-render
    const buttons = listEl.querySelectorAll(".btn-donasi");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const kampanye = donationCampaigns.find((d) => d.id === id);
        if (!kampanye) return;

        alert(
          `Terima kasih!\n\nIni masih simulasi prototipe.\n\nKampanye: ${kampanye.judul}\nLokasi: ${kampanye.lokasi}\nPenyelenggara: ${kampanye.penyelenggara}\n\nPada versi penuh, tombol ini akan mengarah ke halaman pembayaran (misalnya QRIS atau e-wallet).`
        );
      });
    });
  }

  renderDonasi();

  if (filterEl) {
    filterEl.addEventListener("change", renderDonasi);
  }
}

// panggil bersama inisialisasi lain
document.addEventListener("DOMContentLoaded", () => {
  // ... inisialisasi halaman lain yang sudah kamu punya ...
  initDonasiPage();
});

  // =====================================================
  // HALAMAN DETAIL LAPORAN (detail-laporan.html)
  // =====================================================
  function initDetailPage() {
    const detailPageEl = document.getElementById("detailPage");
    if (!detailPageEl) return; // bukan di detail-laporan.html

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "lap1";

    const report =
      communityReports.find((r) => r.id === id) || communityReports[0];
    if (!report) return;

    const elJudul = document.getElementById("detailJudul");
    const elBreadcrumbTitle = document.getElementById("detailBreadcrumbTitle");
    const elMeta = document.getElementById("detailMeta");
    const elBadges = document.getElementById("detailBadges");
    const elDeskripsi = document.getElementById("detailDeskripsi");
    const elFotoCaption = document.getElementById("detailFotoCaption");
    const elTimelineList = document.getElementById("detailTimelineList");

    const elDanaTarget = document.getElementById("danaTarget");
    const elDanaTerkumpul = document.getElementById("danaTerkumpul");
    const elDanaPersen = document.getElementById("danaPersen");
    const elDanaProgressFill = document.getElementById("danaProgressFill");
    const elDanaProgressText = document.getElementById("danaProgressText");
    const elDanaUsageList = document.getElementById("danaUsageList");

    const elGotongCatatan = document.getElementById("gotongCatatan");
    const elGotongInfoList = document.getElementById("gotongInfoList");

    if (elJudul) elJudul.textContent = report.judul;
    if (elBreadcrumbTitle) elBreadcrumbTitle.textContent = report.judul;

    if (elMeta) {
      elMeta.innerHTML = `
        <span>Lokasi: ${report.lokasi}</span>
        <span>Dilaporkan: ${report.waktu}</span>
        <span>Kategori: ${formatKategori(report.kategori)}</span>
        <span>Urgensi: ${report.urgensi}</span>
      `;
    }

    if (elBadges) {
      const statusText = formatStatus(report.status);
      const statusClass =
        report.status === "selesai"
          ? "badge badge-done"
          : report.status === "diproses"
          ? "badge badge-process"
          : "badge badge-wait";

      elBadges.innerHTML = `
        <span class="${statusClass}">${statusText}</span>
        <span class="badge badge-community">Perbaikan bisa oleh warga & pemerintah</span>
      `;
    }

    if (elDeskripsi) elDeskripsi.textContent = report.deskripsi;
    if (elFotoCaption)
      elFotoCaption.textContent = `Ilustrasi area: ${report.lokasi}.`;

    if (elTimelineList && Array.isArray(report.timeline)) {
      elTimelineList.innerHTML = "";
      report.timeline.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        elTimelineList.appendChild(li);
      });
    }

    // if (report.dana && elDanaTarget && elDanaTerkumpul) {
    //   const target = report.dana.target || 0;
    //   const terkumpul = report.dana.terkumpul || 0;
    //   const donatur = report.dana.donatur || 0;
    //   const hariTersisa = report.dana.hariTersisa ?? 0;
    //   const persen = target > 0 ? Math.round((terkumpul / target) * 100) : 0;

    //   elDanaTarget.textContent = formatRupiah(target);
    //   elDanaTerkumpul.textContent = formatRupiah(terkumpul);
    //   if (elDanaPersen) {
    //     elDanaPersen.textContent = `≈ ${persen}% tercapai`;
    //   }
    //   if (elDanaProgressFill) {
    //     elDanaProgressFill.style.width = `${Math.min(persen, 100)}%`;
    //   }
    //   if (elDanaProgressText) {
    //     elDanaProgressText.textContent = `${donatur} donatur · ${hariTersisa} hari tersisa`;
    //   }

    //   if (elDanaUsageList) {
    //     elDanaUsageList.innerHTML = "";
    //     (report.dana.usage || []).forEach((u) => {
    //       const li = document.createElement("li");
    //       li.textContent = u;
    //       elDanaUsageList.appendChild(li);
    //     });
    //   }
    // }

    if (report.gotong) {
      if (elGotongCatatan) {
        elGotongCatatan.textContent = report.gotong.catatan || "";
      }
      if (elGotongInfoList) {
        elGotongInfoList.innerHTML = "";
        const infoItems = [
          `📅 Rencana: ${report.gotong.tanggal}`,
          `🕒 Waktu: ${report.gotong.waktu}`,
          `👥 Koordinator: ${report.gotong.koordinator}`,
        ];
        infoItems.forEach((txt) => {
          const li = document.createElement("li");
          li.textContent = txt;
          elGotongInfoList.appendChild(li);
        });
      }
    }

    const btnIkutGotong = document.getElementById("btnIkutGotong");
if (btnIkutGotong && report.gotong) {
  btnIkutGotong.addEventListener("click", () => {
    alert(
      `Anda mendaftar ikut gotong royong.\n\nLokasi: ${report.lokasi}\nTanggal: ${report.gotong.tanggal}\nWaktu: ${report.gotong.waktu}\nKoordinator: ${report.gotong.koordinator}\n\nCatatan: Fitur ini masih prototipe. Pada versi penuh, Anda dapat mengisi data diri dan pengingat jadwal.`
    );
  });
}
    

    // Daftar laporan masyarakat di atas (jika elemen ada)
    const communityListEl = document.getElementById("communityList");
    if (communityListEl) {
      communityListEl.innerHTML = "";
      communityReports.forEach((r) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className =
          "community-item" + (r.id === report.id ? " community-item-active" : "");
        item.innerHTML = `
          <div>
            <div class="community-item-title">${r.judul}</div>
            <div class="community-item-meta">${r.lokasi} · ${formatStatus(
              r.status
            )}</div>
          </div>
          <div class="community-item-meta">Urgensi: ${r.urgensi}</div>
        `;
        item.addEventListener("click", () => {
          window.location.href = "detail-laporan.html?id=" + r.id;
        });
        communityListEl.appendChild(item);
      });
    }

    const btnDonasiDummy = document.getElementById("btnDonasiDummy");
    if (btnDonasiDummy) {
      btnDonasiDummy.addEventListener("click", () => {
        alert(
          `Terima kasih atas niat baik Anda!\n\nIni masih simulasi prototipe untuk laporan:\n- ${report.judul}\n\nPada versi produksi, tombol ini akan mengarah ke halaman/metode pembayaran (misalnya QRIS atau e-wallet).`
        );
      });
    }
  }

  // Panggil init detail kalau halaman detail-laporan.html
  initDetailPage();
});

// ===============================
// DETAIL LAPORAN + DAFTAR LAPORAN
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const detailPage = document.getElementById("detailPage");
  if (!detailPage) return; // supaya tidak mengganggu halaman lain

  // ---------- 1. DATA DUMMY LAPORAN ----------
// =========================
// DATA DUMMY LAPORAN WARGA
// =========================
const communityReports = [
  {
    id: "lap1",
    judul: "Jalan berlubang di Jl. Melati",
    lokasi: "Jl. Melati, depan SDN 01",
    waktu: "Dibuat 2 jam lalu",
    kategori: "Jalan berlubang",
    urgensi: "Tinggi",
    status: "Menunggu verifikasi",
    deskripsi:
      "Jalan berlubang cukup besar di depan SDN 01. Membahayakan pengendara motor, terutama saat malam hari.",
    fotoCaption: "Area berlubang di depan SDN 01 pada Jl. Melati.",
    timeline: [
      "Laporan dibuat oleh warga 2 jam lalu.",
      "Sedang menunggu verifikasi admin kecamatan.",
      "Jika disetujui, dapat diarahkan ke Dinas PU atau aksi gotong royong warga."
    ],
    gotongCatatan:
      "Rencana gotong royong akan difokuskan pada penambalan sementara menggunakan batu dan pasir.",
    gotongInfo: [
      "Perkiraan jadwal: Sabtu pagi, pukul 08.00–10.00 WIB.",
      "Kebutuhan: alat kerja ringan (cangkul, sekop), batu kerikil, dan pasir.",
      "Koordinator lapangan: Pak Andi (Ketua RT 02)."
    ]
  },
  {
    id: "lap2",
    judul: "Lampu jalan mati di Taman Kota Hijau",
    lokasi: "Koridor pejalan kaki sisi timur Taman Kota Hijau",
    waktu: "Dibuat kemarin",
    kategori: "Penerangan jalan",
    urgensi: "Sedang",
    status: "Sedang diproses",
    deskripsi:
      "Beberapa lampu jalan di koridor pejalan kaki mati, membuat area taman gelap dan kurang aman pada malam hari.",
    fotoCaption: "Koridor pejalan kaki yang gelap di Taman Kota Hijau.",
    timeline: [
      "Laporan dibuat kemarin malam oleh pengunjung taman.",
      "Sedang diteruskan ke dinas terkait untuk pengecekan jaringan listrik.",
      "Perkiraan perbaikan dalam 3–5 hari kerja."
    ],
    gotongCatatan:
      "Tidak diperlukan gotong royong fisik. Warga diimbau melaporkan jika ada titik gelap lain di sekitar taman.",
    gotongInfo: [
      "Pengumpulan tambahan lokasi titik gelap melalui formulir online.",
      "Koordinasi dengan pengelola taman untuk jadwal perbaikan."
    ]
  },
  {
    id: "lap3",
    judul: "Sampah menumpuk di Gang Mawar 3",
    lokasi: "Pojok gang dekat rumah warga RT 04",
    waktu: "Dibuat 5 jam lalu",
    kategori: "Kebersihan lingkungan",
    urgensi: "Sedang",
    status: "Menunggu verifikasi",
    deskripsi:
      "Tumpukan sampah rumah tangga menumpuk karena bak sampah penuh dan belum diangkut selama beberapa hari.",
    fotoCaption: "Tumpukan sampah di pojok Gang Mawar 3.",
    timeline: [
      "Laporan dibuat oleh warga RT 04 pagi hari ini.",
      "Sedang diverifikasi dan akan diteruskan ke petugas kebersihan.",
      "Mungkin diusulkan jadwal gotong royong untuk membersihkan area sekitarnya."
    ],
    gotongCatatan:
      "Gotong royong diarahkan untuk membersihkan area sekitar dan memberi tanda larangan buang sampah sembarangan.",
    gotongInfo: [
      "Rencana jadwal: Minggu pagi, pukul 07.00–09.00 WIB.",
      "Diminta partisipasi minimal 1 per rumah.",
      "Disarankan membawa sarung tangan dan masker."
    ]
  },
  {
    id: "lap4",
    judul: "Drainase tersumbat di Jl. Ahmad Yani",
    lokasi: "Ruas jalan depan deretan ruko kuliner",
    waktu: "Dibuat 1 hari lalu",
    kategori: "Drainase & banjir",
    urgensi: "Tinggi",
    status: "Sedang diproses",
    deskripsi:
      "Saat hujan deras, air tergenang karena saluran drainase tertutup sedimen dan sampah, mengganggu akses pengendara.",
    fotoCaption: "Saluran drainase di Jl. Ahmad Yani yang tersumbat.",
    timeline: [
      "Laporan dibuat 1 hari lalu oleh pemilik ruko.",
      "Sedang dijadwalkan inspeksi oleh petugas drainase.",
      "Rencana pembersihan saluran di sepanjang 200 meter ruas jalan."
    ],
    gotongCatatan:
      "Gotong royong dapat membantu pembersihan awal sebelum petugas datang.",
    gotongInfo: [
      "Warga dan pemilik ruko dapat membantu mengangkat sampah besar.",
      "Diusulkan penempatan papan imbauan untuk tidak membuang sampah ke selokan."
    ]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("communityList")) {
    renderCommunityList();
  }
});


// =========================
// RENDER DAFTAR LAPORAN
// =========================
function renderCommunityList() {
  const listEl = document.getElementById("communityList");
  if (!listEl || !Array.isArray(communityReports)) return;

  listEl.innerHTML = communityReports
    .map((item) => {
      const urgensiKey = (item.urgensi || "Sedang").toLowerCase(); // tinggi/sedang/rendah

      return `
        <button class="community-item" type="button" data-id="${item.id}">
          <div class="community-item-main">
            <div class="community-item-title">
              ${item.judul}
            </div>
            <div class="community-item-meta">
              ${item.lokasi} · ${item.waktu}
            </div>
          </div>

          <span class="community-item-urgency urgensi-${urgensiKey}">
            Urgensi ${item.urgensi.toLowerCase()}
          </span>
        </button>
      `;
    })
    .join("");

  // klik kartu ⇒ update detail
  listEl.querySelectorAll(".community-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const report = communityReports.find((r) => r.id === id);
      if (report) {
        updateDetailFromReport(report);
        // tandai item aktif (opsional)
        listEl
          .querySelectorAll(".community-item")
          .forEach((el) => el.classList.remove("community-item-active"));
        btn.classList.add("community-item-active");
      }
    });
  });
}
// =========================
// UPDATE PANEL DETAIL
// =========================
function updateDetailFromReport(report) {
  const titleEl = document.getElementById("detailJudul");
  const metaEl = document.getElementById("detailMeta");
  const badgesEl = document.getElementById("detailBadges");
  const descEl = document.getElementById("detailDeskripsi");
  const fotoCaptionEl = document.getElementById("detailFotoCaption");
  const timelineEl = document.getElementById("detailTimelineList");
  const gotongNoteEl = document.getElementById("gotongCatatan");
  const gotongListEl = document.getElementById("gotongInfoList");
  const breadcrumbTitle = document.getElementById("detailBreadcrumbTitle");

  if (titleEl) titleEl.textContent = report.judul;

  if (breadcrumbTitle) breadcrumbTitle.textContent = report.judul;

  if (metaEl) {
    metaEl.innerHTML = `
      <span>${report.lokasi}</span>
      <span>·</span>
      <span>${report.waktu}</span>
      <span>·</span>
      <span>Kategori: ${report.kategori}</span>
    `;
  }

  if (badgesEl) {
    badgesEl.innerHTML = `
      <span class="badge badge-process">${report.status}</span>
      <span class="badge badge-community">Urgensi ${report.urgensi}</span>
    `;
  }

  if (descEl) descEl.textContent = report.deskripsi;

  if (fotoCaptionEl)
    fotoCaptionEl.textContent =
      report.fotoCaption || "Ilustrasi area kerusakan.";

  if (timelineEl && Array.isArray(report.timeline)) {
    timelineEl.innerHTML = report.timeline
      .map((step) => `<li>${step}</li>`)
      .join("");
  }

  if (gotongNoteEl)
    gotongNoteEl.textContent =
      report.gotongCatatan ||
      "Belum ada jadwal gotong royong untuk laporan ini.";

  if (gotongListEl) {
    if (Array.isArray(report.gotongInfo) && report.gotongInfo.length > 0) {
      gotongListEl.innerHTML = report.gotongInfo
        .map((info) => `<li>${info}</li>`)
        .join("");
    } else {
      gotongListEl.innerHTML = "";
    }
  }
}
// =========================
// INISIALISASI DETAIL HALAMAN
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const detailPage = document.getElementById("detailPage");
  if (!detailPage) return; // biar tidak jalan di halaman lain

  renderCommunityList();

  // cek query ?id=...
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  let initialReport =
    communityReports.find((r) => r.id === id) || communityReports[0];

  if (initialReport) {
    updateDetailFromReport(initialReport);
    // set kartu aktif
    const listEl = document.getElementById("communityList");
    if (listEl) {
      const active = listEl.querySelector(
        `.community-item[data-id="${initialReport.id}"]`
      );
      if (active) active.classList.add("community-item-active");
    }
  }
});



  // ---------- 2. AMBIL ELEMEN DOM ----------
  const listEl = document.getElementById("communityList");
  const judulEl = document.getElementById("detailJudul");
  const metaEl = document.getElementById("detailMeta");
  const badgesEl = document.getElementById("detailBadges");
  const deskripsiEl = document.getElementById("detailDeskripsi");
  const fotoCaptionEl = document.getElementById("detailFotoCaption");
  const timelineListEl = document.getElementById("detailTimelineList");
  const breadcrumbTitleEl = document.getElementById("detailBreadcrumbTitle");
  const gotongCatatanEl = document.getElementById("gotongCatatan");
  const gotongInfoListEl = document.getElementById("gotongInfoList");

  // ---------- 3. RENDER LIST DI ATAS ----------
  function renderCommunityList(activeId) {
    if (!listEl) return;
    listEl.innerHTML = "";

    communityReports.forEach((report) => {
      const item = document.createElement("div");
      item.className = "community-item";
      if (report.id === activeId) {
        item.classList.add("community-item-active");
      }
      item.dataset.reportId = report.id;

      item.innerHTML = `
        <div>
          <div class="community-item-title">${report.judul}</div>
          <div class="community-item-meta">
            ${report.lokasi} · ${report.waktu}
          </div>
        </div>
        <div class="badge badge-wait">
          ${report.urgensi === "Tinggi" ? "Urgensi tinggi" : "Urgensi " + report.urgensi.toLowerCase()}
        </div>
      `;

      listEl.appendChild(item);
    });
  }

  // ---------- 4. RENDER DETAIL LENGKAP ----------
  function renderDetail(report) {
    if (!report) return;

    if (judulEl) judulEl.textContent = report.judul;
    if (breadcrumbTitleEl) breadcrumbTitleEl.textContent = report.judul;

    if (metaEl) {
      metaEl.innerHTML = `
        <span>Lokasi: ${report.lokasi}</span>
        <span>${report.waktu}</span>
        <span>Kategori: ${report.kategori}</span>
        <span>Urgensi: ${report.urgensi}</span>
      `;
    }

    if (badgesEl) {
      const statusClass =
        report.status.includes("Menunggu") ? "badge-wait"
        : report.status.includes("Selesai") ? "badge-done"
        : "badge-process";

      badgesEl.innerHTML = `
        <span class="badge ${statusClass}">${report.status}</span>
        <span class="badge badge-community">${report.tipePenanganan}</span>
      `;
    }

    if (deskripsiEl) deskripsiEl.textContent = report.deskripsi;
    if (fotoCaptionEl) fotoCaptionEl.textContent = report.fotoCaption;

    if (timelineListEl) {
      timelineListEl.innerHTML = report.timeline
        .map((item) => `<li>${item}</li>`)
        .join("");
    }

    if (gotongCatatanEl) {
      gotongCatatanEl.textContent = report.gotongCatatan;
    }

    if (gotongInfoListEl) {
      gotongInfoListEl.innerHTML = report.gotongInfo
        .map((item) => `<li>${item}</li>`)
        .join("");
    }
  }

  // ---------- 5. INISIALISASI BERDASARKAN ?id= ----------
  const params = new URLSearchParams(window.location.search);
  const urlId = params.get("id");
  const firstReport =
    communityReports.find((r) => r.id === urlId) || communityReports[0];

  renderCommunityList(firstReport.id);
  renderDetail(firstReport);

  // ---------- 6. KLIK LIST → GANTI DETAIL ----------
  if (listEl) {
    listEl.addEventListener("click", (e) => {
      const item = e.target.closest(".community-item");
      if (!item) return;

      const id = item.dataset.reportId;
      const report = communityReports.find((r) => r.id === id);
      if (!report) return;

      renderCommunityList(id);
      renderDetail(report);
    });
  }

  // ---------- 7. TOMBOL IKUT GOTONG ROYONG ----------
  const gotongBtn = detailPage.querySelector(".gotong-card .btn");
  if (gotongBtn) {
    let joined = false;

    gotongBtn.addEventListener("click", () => {
      joined = !joined;

      if (joined) {
        gotongBtn.textContent = "Sudah Terdaftar Gotong Royong";
        gotongBtn.classList.remove("btn-secondary");
        gotongBtn.classList.add("btn-primary");

        if (gotongCatatanEl) {
          gotongCatatanEl.textContent =
            "Anda tercatat ingin ikut gotong royong (versi prototipe, belum tersimpan ke server).";
        }
      } else {
        gotongBtn.textContent = "Ikut Gotong Royong (Prototipe)";
        gotongBtn.classList.remove("btn-primary");
        gotongBtn.classList.add("btn-secondary");
      }
    });
  }
});

// =========================
// MODAL DONASI (donasi.html)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("donasiModal");
  if (!modal) return; // bukan di halaman donasi

  const btnClose = document.getElementById("btnCloseDonasi");
  const btnSubmit = document.getElementById("btnSubmitDonasi");
  const inputNama = document.getElementById("donasiNama");
  const inputNominal = document.getElementById("donasiNominal");
  const inputPesan = document.getElementById("donasiPesan");
  const modalTitle = modal.querySelector("h3");

  const donasiButtons = document.querySelectorAll(".donasi-button");

  // untuk menyimpan card kampanye yang sedang dipilih
  let activeCampaignCard = null;

  function formatRupiah(number) {
    return "Rp " + Number(number).toLocaleString("id-ID");
  }

  function openModal(titleKampanye, cardEl) {
    activeCampaignCard = cardEl || null;

    if (modalTitle && titleKampanye) {
      modalTitle.textContent = "Donasi untuk " + titleKampanye;
    }

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  // klik tombol "Donasi Sekarang" => buka modal
  donasiButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".donasi-card");
      const titleEl = card?.querySelector(".donasi-title");
      const titleText = titleEl ? titleEl.textContent.trim() : "";

      openModal(titleText, card);
    });
  });

  // tombol Batal / close
  if (btnClose) {
    btnClose.addEventListener("click", closeModal);
  }

  // tombol Kirim Donasi (dummy)
  if (btnSubmit) {
    btnSubmit.addEventListener("click", () => {
      if (!activeCampaignCard) {
        alert("Terjadi kesalahan: kampanye tidak ditemukan.");
        return;
      }

      const nama = inputNama.value.trim();
      const nominalStr = inputNominal.value.trim();
      const nominal = parseInt(nominalStr, 10);

      if (!nama || !nominalStr) {
        alert("Nama dan nominal donasi harus diisi dulu ya.");
        return;
      }

      if (isNaN(nominal) || nominal <= 0) {
        alert("Nominal donasi harus angka lebih dari 0.");
        return;
      }

      // Ambil data lama dari atribut data-*
      let current = parseInt(activeCampaignCard.dataset.terkumpul, 10);
      const target = parseInt(activeCampaignCard.dataset.target, 10);

      if (isNaN(current)) current = 0;

      // Tambahkan donasi baru
      current += nominal;
      activeCampaignCard.dataset.terkumpul = current;

      // Hitung persentase
      const percent = Math.min(100, Math.round((current / target) * 100));

      // Update teks "Terkumpul"
      const nominalEl = activeCampaignCard.querySelector(".donasi-nominal");
      if (nominalEl) {
        nominalEl.textContent =
          `${formatRupiah(current)} dari ${formatRupiah(target)}`;
      }

      // Update progress bar
      const barFill = activeCampaignCard.querySelector(
        ".donasi-progress-fill"
      );
      if (barFill) {
        barFill.style.width = percent + "%";
      }

      // Update "xx% tercapai"
      const metaEl = activeCampaignCard.querySelector(
        ".donasi-progress-meta span:first-child"
      );
      if (metaEl) {
        metaEl.textContent = `${percent}% tercapai`;
      }

      // Dummy feedback
      alert(
        `Terima kasih, ${nama}!\nDonasi sebesar ${formatRupiah(
          nominal
        )} sudah tercatat (dummy).`
      );

      // Reset form
      inputNama.value = "";
      inputNominal.value = "";
      inputPesan.value = "";

      closeModal();
    });
  }

  // Tutup modal kalau klik area gelap
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("donasiModal");
  const btnSubmit = document.getElementById("btnSubmitDonasi");
  const btnClose = document.getElementById("btnCloseDonasi");
  const inputNama = document.getElementById("donasiNama");
  const inputNominal = document.getElementById("donasiNominal");
  const inputPesan = document.getElementById("donasiPesan");

  // kalau bukan di halaman donasi, jangan jalanin apa-apa
  if (!modal) return;

  let activeCard = null;

  function formatRupiah(num) {
    return num.toLocaleString("id-ID");
  }

  // buka modal saat tombol "Donasi Sekarang" diklik
  document.querySelectorAll(".donasi-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCard = btn.closest(".donasi-card");
      if (!activeCard) return;
      modal.classList.remove("hidden");
    });
  });

  // tutup modal
  btnClose.addEventListener("click", () => {
    modal.classList.add("hidden");
    inputNama.value = "";
    inputNominal.value = "";
    inputPesan.value = "";
  });

  // submit donasi
  btnSubmit.addEventListener("click", () => {
    if (!activeCard) return;

    const nominal = parseInt(inputNominal.value, 10);
    if (isNaN(nominal) || nominal <= 0) {
      alert("Masukkan nominal donasi yang valid.");
      return;
    }

    let current = parseInt(activeCard.dataset.terkumpul || "0", 10);
    const target = parseInt(activeCard.dataset.target || "0", 10);

    if (!target || isNaN(target)) {
      alert("Data target donasi tidak valid di kartu ini.");
      return;
    }

    current += nominal;
    activeCard.dataset.terkumpul = current.toString();

    const percent = Math.min(100, Math.round((current / target) * 100));

    // update tulisan "Rp xxx dari Rp yyy"
    const nominalEl = activeCard.querySelector(".donasi-nominal");
    if (nominalEl) {
      nominalEl.textContent =
        `Rp ${formatRupiah(current)} dari Rp ${formatRupiah(target)}`;
    }

    // update progress bar
    const barFill = activeCard.querySelector(".donasi-progress-fill");
    if (barFill) {
      barFill.style.width = `${percent}%`;
    }

    // update "xx% tercapai"
    const metaPercentEl =
      activeCard.querySelector(".donasi-progress-meta span:first-child");
    if (metaPercentEl) {
      metaPercentEl.textContent = `${percent}% tercapai`;
    }

    // (opsional) kasih notifikasi sederhana
    alert("Terima kasih, donasi Anda tercatat sebagai data dummy 😊");

    // reset & tutup modal
    inputNama.value = "";
    inputNominal.value = "";
    inputPesan.value = "";
    modal.classList.add("hidden");
  });
});

