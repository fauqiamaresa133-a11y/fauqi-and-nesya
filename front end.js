document.addEventListener('DOMContentLoaded', function () {
  // Database Simulasi NIM & Pengguna
 const databasePengguna = {
  "3312601017": {
    nama: "Fauqii Amaresa",
    password: "F3102927",
    role: "inventaris"
  },
  "3312601018": {
    nama: "Nesya Anggriani",
    password: "Nesyaanaklucu02",
    role: "peminjaman"
  }
};

  // Toggle Password Visibilitas
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('passwordInput');

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function () {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.classList.toggle('fa-eye');
      this.classList.toggle('fa-eye-slash');
    });
  }

  // Handle Login Form
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nim = document.getElementById('nimInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    const pengguna = databasePengguna[nim];

    if (pengguna && pengguna.password === password) {
      document.getElementById('userNameDisplay').textContent = pengguna.nama;

      document.getElementById('loginPage').style.display = 'none';
      document.getElementById('appLayout').style.display = 'flex';

      aturMenuAdmin(pengguna.role);
    } else {
      alert('NIM atau password salah! Silakan coba kembali.');
    }
  });
}

  // Handle Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      if(confirm('Apakah Anda ingin keluar/logout dari sistem?')) {
        document.getElementById('appLayout').style.display = 'none';
        document.getElementById('loginPage').style.display = 'flex';
        document.getElementById('nimInput').value = '';
        document.getElementById('passwordInput').value = '';
      }
    });
  }

  // Sidebar Navigation
  const menuItems = document.querySelectorAll('.sidebar-menu li');
  const sections = document.querySelectorAll('.view-section');

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      menuItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');

      const target = this.getAttribute('data-target');
      sections.forEach(sec => sec.classList.remove('active'));
      document.getElementById(target).classList.add('active');
    });
  });

  // Fitur Pencarian Realtime Header (Global Live Search)
  const globalSearchInput = document.getElementById('globalSearchInput');
  if (globalSearchInput) {
    globalSearchInput.addEventListener('keyup', function () {
      const keyword = globalSearchInput.value.toLowerCase();
      const activeSection = document.querySelector('.view-section.active');
      const tableRows = activeSection.querySelectorAll('tbody tr');

      tableRows.forEach(row => {
        const textContent = row.textContent.toLowerCase();
        if (textContent.includes(keyword)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // Handle Modal Form Submit
  const modalForm = document.getElementById('modalForm');
  if (modalForm) {
    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Data berhasil disimpan!');
      closeModal();
    });
  }
});

// Modal Global Controls
const modal = document.getElementById('dataModal');
function openModal(title) {
  document.getElementById('modalTitle').textContent = title;
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}


// FORM PEMINJAMAN
document.getElementById("formPeminjaman")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const tanggalPinjam =
        document.getElementById("tanggalPinjam").value;

    const tanggalKembali =
        document.getElementById("tanggalKembali").value;

    if (tanggalKembali < tanggalPinjam) {
        alert("Tanggal pengembalian tidak boleh sebelum tanggal peminjaman!");
        return;
    }

    alert("Data peminjaman berhasil diisi!");

    this.reset();
});


function showSection(sectionId) {
    document.querySelectorAll(".view-section").forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");

    document.querySelectorAll(".sidebar-menu li").forEach(menu => {
        menu.classList.remove("active");
    });

    const activeMenu = document.querySelector(
        `.sidebar-menu li[data-target="${sectionId}"]`
    );

    if (activeMenu) {
        activeMenu.classList.add("active");
    }
}

/* PENCARIAN RIWAYAT PEMINJAMAN */

const cariRiwayatPinjam =
    document.getElementById("cariRiwayatPinjam");

if (cariRiwayatPinjam) {

    cariRiwayatPinjam.addEventListener("input", function() {

        const keyword = this.value.toLowerCase();

        const rows = document.querySelectorAll(
            "#tabelRiwayatPinjam tbody tr"
        );

        rows.forEach(function(row) {

            const data = row.textContent.toLowerCase();

            row.style.display = data.includes(keyword)
                ? ""
                : "none";

        });
    });
}

/* PROSES PENGEMBALIAN BARANG */

const formPengembalian = document.getElementById("formPengembalian");

if (formPengembalian) {

    formPengembalian.addEventListener("submit", function(e) {

        e.preventDefault();

        const id = document.getElementById("idPinjamKembali").value;
        const nama = document.getElementById("namaPeminjamKembali").value;
        const nim = document.getElementById("nimKembali").value;
        const barang = document.getElementById("barangKembali").value;
        const jumlah = document.getElementById("jumlahKembali").value;
        const tanggalPinjam = document.getElementById("tanggalPinjamKembali").value;
        const tanggalKembali = document.getElementById("tanggalDikembalikan").value;
        const kondisi = document.getElementById("kondisiBarang").value;
        const catatan = document.getElementById("catatanKembali").value;

        // Validasi tanggal
        if (tanggalKembali < tanggalPinjam) {
            alert("Tanggal pengembalian tidak boleh sebelum tanggal peminjaman!");
            return;
        }

        // Format tanggal
        function formatTanggal(tanggal) {
            const [tahun, bulan, hari] = tanggal.split("-");
            return `${hari}/${bulan}/${tahun}`;
        }

        // Masukkan ke tabel riwayat pengembalian
        const tabel = document.querySelector(
            "#tabelPengembalian tbody"
        );

        if (tabel) {

            const nomor = tabel.rows.length + 1;

            const baris = tabel.insertRow();

            baris.innerHTML = `
                <td>${nomor}</td>
                <td>${id}</td>
                <td>${nama}</td>
                <td>${barang}</td>
                <td>${jumlah}</td>
                <td>${formatTanggal(tanggalPinjam)}</td>
                <td>${formatTanggal(tanggalKembali)}</td>
                <td>
                    <span class="${kondisi === 'Baik'
                        ? 'condition-good'
                        : 'condition-bad'}">
                        ${kondisi}
                    </span>
                </td>
                <td>
                    <span class="return-success">
                        Dikembalikan
                    </span>
                </td>
            `;
        }

        // Ubah status di riwayat peminjaman
        const riwayat = document.querySelectorAll(
            "#tabelRiwayatPinjam tbody tr"
        );

        riwayat.forEach(function(row) {

            if (row.cells[1].textContent.trim() === id) {

                row.cells[8].innerHTML = `
                    <span class="status-selesai">
                        Dikembalikan
                    </span>
                `;
            }

        });

        alert(
            "Pengembalian berhasil diproses!\n\n" +
            "ID Peminjaman: " + id +
            "\nNama: " + nama +
            "\nBarang: " + barang +
            "\nKondisi: " + kondisi
        );

        formPengembalian.reset();

    });
}
// PENCARIAN LAPORAN
const cariLaporan = document.getElementById("cariLaporan");

if (cariLaporan) {
    cariLaporan.addEventListener("input", function () {
        const keyword = this.value.toLowerCase();
        const rows = document.querySelectorAll(
            "#tabelLaporan tbody tr"
        );

        rows.forEach(function (row) {
            const data = row.textContent.toLowerCase();

            row.style.display = data.includes(keyword)
                ? ""
                : "none";
        });
    });
}


// CETAK LAPORAN
function cetakLaporan() {
    const tabel = document.getElementById("tabelLaporan");

    if (!tabel) return;

    const isiLaporan = tabel.outerHTML;

    const jendelaCetak = window.open("", "_blank");

    jendelaCetak.document.write(`
        <html>
        <head>
            <title>Laporan Peminjaman Barang</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 25px;
                }

                h2 {
                    text-align: center;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 25px;
                }

                th, td {
                    border: 1px solid #333;
                    padding: 10px;
                    text-align: center;
                    font-size: 12px;
                }

                th {
                    background: #eee;
                }
            </style>
        </head>

        <body>
            <h2>LAPORAN PEMINJAMAN BARANG</h2>
            <p>Rekap Data Peminjaman dan Pengembalian</p>

            ${isiLaporan}

        </body>
        </html>
    `);

    jendelaCetak.document.close();
    jendelaCetak.print();
}
// BATAL LOGOUT
function batalLogout() {
    const dashboard = document.querySelector(
        '[data-target="sec-dashboard"]'
    );

    if (dashboard) {
        dashboard.click();
    }
}

// KONFIRMASI LOGOUT
function konfirmasiLogout() {
    const yakin = confirm("Apakah kamu yakin ingin logout?");

    if (yakin) {
        window.location.href = "front end.html";
    }
}