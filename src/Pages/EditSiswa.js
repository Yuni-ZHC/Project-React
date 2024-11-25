import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useParams untuk mendapatkan ID dari URL
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Sidebar from "../Components/Sidebar";

export default function EditSiswa() {
  const [formData, setFormData] = useState({
    nama: '',
    kelas: '',
    jurusan: '',
    nisn: '',
    sekolah: '',
  }); // State untuk menyimpan input form
  const navigate = useNavigate();
  const { id } = useParams(); // Ambil ID dari URL

  // Load data awal berdasarkan ID
  useEffect(() => {
    axios.get(`http://localhost:3030/student/${id}`) // Ambil data berdasarkan ID
      .then(response => {
        setFormData(response.data); // Isi form dengan data dari API
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        alert('Gagal memuat data. Silakan coba lagi.');
      });
  }, [id]);

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk mengirim data yang diperbarui ke API
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3030/student/${id}`, formData) // Kirim data yang diperbarui
      .then(() => {
        // SweetAlert untuk notifikasi sukses
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data berhasil diperbarui!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/DataSiswa'); // Kembali ke halaman Dashboard setelah menutup alert
        });
      })
      .catch(error => {
        console.error("Error updating data:", error);
        // SweetAlert untuk notifikasi error
        Swal.fire({
          title: 'Gagal!',
          text: 'Gagal memperbarui data. Silakan coba lagi.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <>
      <Sidebar />
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)',
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Edit Data Siswa
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nama"
              label="Nama Siswa"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="kelas"
              label="Kelas"
              name="kelas"
              type="text"
              value={formData.kelas}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="jurusan"
              label="Jurusan"
              name="jurusan"
              value={formData.jurusan}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="nisn"
              label="NISN"
              name="nisn"
              value={formData.nisn}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="sekolah"
              label="Asal Sekolah"
              name="sekolah"
              value={formData.sekolah}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Simpan
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/DataSiswa')} // Navigasi kembali ke Dashboard
            >
              Batal
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
