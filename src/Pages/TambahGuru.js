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

export default function Addguru() {
  const [formData, setFormData] = useState({
    nama: '',
    mapel: '',
    nik: '',
    gender: '',
    jabatan: '',
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
    axios.post('http://localhost:3030/teacher', formData)
      .then(() => {
        // SweetAlert untuk notifikasi sukses
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data berhasil ditambahkan!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/DataGuru'); // Kembali ke Dashboard setelah menutup alert
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
      <Container component="main" maxWidth="sm" sx={{ background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)', padding: '20px', borderRadius: '8px' }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)' }}>
            Tambah Data Guru
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nama"
              label="Nama Guru"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="mapel"
              label="Mata Pelajaran"
              name="mapel"
              value={formData.mapel}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="nik"
              label="NIK"
              name="nik"
              type="number"
              value={formData.nik}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="jabatan"
              label="Jabatan"
              name="jabatan"
              value={formData.jabatan}
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
              onClick={() => navigate('/DataGuru')} // Navigasi kembali ke Dashboard
              sx={{
                borderColor: '#FFB6C1',
                color: '#0d0d0d',
                '&:hover': {
                  borderColor: '#0d0d0d',
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
