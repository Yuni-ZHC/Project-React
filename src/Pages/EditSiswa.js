import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useParams untuk mendapatkan ID dari URL
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

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
      {/* Set background gradient for the entire page */}
      <div style={{ 
        background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Container component="main" maxWidth="sm" sx={{
          padding: { xs: 2, sm: 3 }, // Padding responsif
          backgroundColor: 'white', // White background for the form itself
          borderRadius: 2,
          boxShadow: 3,
          mt: 2,
        }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start', // Menggeser ke kiri sedikit
              justifyContent: 'center',
              pt: 2, // Mengurangi padding atas box
              ml: 2, // Menggeser form sedikit ke kanan
            }}
          >
            <Typography component="h1" variant="h5" sx={{
              marginBottom: 1, // Mengurangi jarak bawah untuk title
              fontWeight: 'bold',
              textAlign: 'left', // Mengatur teks menjadi rata kiri
            }}>
              Edit Data Siswa
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
                sx={{ marginBottom: 2 }}
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
                sx={{ marginBottom: 2 }}
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
                sx={{ marginBottom: 2 }}
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
                sx={{ marginBottom: 2 }}
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
                sx={{ marginBottom: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 3, 
                  mb: 2, 
                  padding: '10px', 
                  backgroundColor: '#FFB6C1',
                  '&:hover': {
                    backgroundColor: '#FFD1DC',
                  },
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
                  padding: '10px',
                  borderColor: '#FFB6C1',
                  color: '#FFB6C1',
                  '&:hover': {
                    borderColor: '#FFD1DC',
                    color: '#FFD1DC',
                  },
                }}
              >
                Batal
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
}
