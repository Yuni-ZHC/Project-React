import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Navbar from "./Component/Navbar";
import './Dashboard.css';

export default function Dashboard() {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3030/foods')
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Menampilkan SweetAlert untuk konfirmasi penghapusan
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Jika pengguna mengonfirmasi, lakukan penghapusan data
        axios.delete(`http://localhost:3030/foods/${id}`)
          .then(() => {
            // Menghapus data dari state setelah berhasil dihapus
            setFoods(foods.filter(food => food.id !== id));

            // Menampilkan SweetAlert setelah berhasil menghapus data
            Swal.fire(
              'Dihapus!',
              'Data berhasil dihapus.',
              'success'
            );
          })
          .catch(error => {
            console.error("Error deleting data:", error);
            // Menampilkan SweetAlert jika terjadi kesalahan saat menghapus data
            Swal.fire(
              'Gagal!',
              'Terjadi kesalahan saat menghapus data. Silakan coba lagi.',
              'error'
            );
          });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/Update_Makanan/${id}`); // Navigasi ke halaman Update berdasarkan ID
  };

  return (
    <div className='soft-blue-background'>
    <div style={{ minHeight: '100vh', padding: '40px' }}>
      <Navbar />
      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/Tambah_Makanan')}
          sx={{
            borderRadius: '20px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#1E88E5',
            }
          }}
        >
          Tambah data
        </Button>
      </div>
      <TableContainer component={Paper} sx={{ marginTop: '20px', borderRadius: '10px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
            <TableCell>No </TableCell>
              <TableCell align="right">Nama</TableCell>
              <TableCell align="right">Mapel&nbsp;</TableCell>
              <TableCell align="right">NIK&nbsp;</TableCell>
              <TableCell align="right">Gender&nbsp;</TableCell>
              <TableCell align="right">Jabatan&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foods.map((food, index) => (
              <TableRow
                key={food.id}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' },
                  '&:nth-of-type(even)': { backgroundColor: '#e0e0e0' },
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell align="right">{food.nama}</TableCell>
                <TableCell align="right">{food.mapel}</TableCell>
                <TableCell align="right">{food.nik}</TableCell>
                <TableCell align="right">{food.gender}</TableCell>
                <TableCell align="right">{food.jabatan}</TableCell>
                <TableCell align="right">{food.aksi}</TableCell>
                <TableCell align="right">
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleDelete(food.id)}
                    style={{ marginRight: '10px', borderRadius: '50%' }}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f44336',
                      }
                    }}
                  >
                    🗑️
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleUpdate(food.id)}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#1976d2',
                      }
                    }}
                  >
                    ✏️
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
  );
}
