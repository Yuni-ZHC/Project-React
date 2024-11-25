import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Sidebar from "../Components/Sidebar";

export default function AddMurid() {
  const [formData, setFormData] = useState({
    nama: '',
    kelas: '',
    jurusan: '',
    nisn: '',
    asal: '',
  });
  const navigate = useNavigate();

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk mengirim data ke API
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3030/student', formData)
      .then(() => {
        // SweetAlert untuk notifikasi sukses
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data berhasil ditambahkan!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/DataSiswa'); // Kembali ke Dashboard setelah menutup alert
        });
      })
      .catch(error => {
        console.error("Error adding data:", error);
        // SweetAlert untuk notifikasi error
        Swal.fire({
          title: 'Gagal!',
          text: 'Gagal menambahkan data. Silakan coba lagi.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <>
      <Sidebar />
      <Container 
        component="main" 
        maxWidth="sm" 
        sx={{
          // Background seluruh halaman form dengan gradasi
          background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)', 
          padding: '30px', // Menambahkan padding untuk memberikan ruang di sekitar form
          borderRadius: '8px', // Membuat sudut membulat agar lebih estetik
          height: '100vh', // Agar container mengisi seluruh layar vertikal
        }}
      >
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)' }}>
            Tambah Data Siswa
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
              type="text"
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
              type="number"
              value={formData.nisn}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="asal"
              label="Asal Sekolah"
              name="asal"
              type="text"
              value={formData.asal}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3, 
                mb: 2, 
                background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)', // Gradasi warna untuk tombol
                '&:hover': {
                  background: 'linear-gradient(135deg, #FFB6C1, #FFD1DC)', // Gradasi terbalik saat hover
                },
                color: '#0d0d0d',
              }}
            >
              Simpan
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/DataSiswa')} // Navigasi kembali ke Dashboard
              sx={{
                borderColor: '#FFD1DC',
                color: '#0d0d0d',
                '&:hover': {
                  borderColor: '#FFD1DC',
                  color: '#0d0d0d',
                },
              }}
            >
              Batal
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
