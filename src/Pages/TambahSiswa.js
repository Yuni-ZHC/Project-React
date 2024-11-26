import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

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
      {/* Outer div with background gradient for the whole page */}
      <Box 
        sx={{
          background: 'linear-gradient(to bottom, #FFD1DC, #FFB6C1)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: { xs: '20px', md: '40px' }, // Mengurangi padding menjadi lebih kecil
          backgroundSize: 'cover',
        }}
      >

        <Container 
          component="main" 
          maxWidth="sm" 
          sx={{
            background: '#fff', // White background for the form container
            padding: '20px', // Reduced padding to minimize space
            borderRadius: '8px',
          }}
        >
          <Box
            sx={{
              marginTop: 2, // Reduced margin-top for the form
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
              Tambah Data Siswa
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nama"
                label="Nama Siswa"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                sx={{ marginBottom: '10px' }} // Reduce space between inputs
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
                sx={{ marginBottom: '10px' }} // Reduce space between inputs
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
                sx={{ marginBottom: '10px' }} // Reduce space between inputs
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
                sx={{ marginBottom: '10px' }} // Reduce space between inputs
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
                sx={{ marginBottom: '10px' }} // Reduce space between inputs
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2, 
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
                  mb: 2, 
                  background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)', // Gradasi warna untuk tombol
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FFB6C1, #FFD1DC)', // Gradasi terbalik saat hover
                  },
                  color: '#0d0d0d',
                }}
              >
                Batal
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
