import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Navbar from "./Component/Navbar";

export default function AddData() {
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
    axios.post('http://localhost:3030/Data', formData)
      .then(() => {
        // SweetAlert untuk notifikasi sukses
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data berhasil ditambahkan!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/Dashboard'); // Kembali ke Dashboard setelah menutup alert
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
      <Navbar />
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Tambah Data
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nama"
              label="nama Guru"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="mapel"
              label="mapel"
              name="mapel"
              type="Text"
              value={formData.mapel}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="nik"
              label="nik"
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
              label="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="jabatan"
              label="jabatan"
              name="jabatan"
              value={formData.jabatan}
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
              onClick={() => navigate('Dashboard')} // Navigasi kembali ke Dashboard
            >
              Batal
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
