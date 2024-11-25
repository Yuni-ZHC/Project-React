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
import { Box } from '@mui/material';

export default function Dashboard() {
  const [teacher, setTeacher] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3030/teacher')
      .then((response) => {
        setTeacher(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        Swal.fire('Gagal!', 'Tidak dapat memuat data guru.', 'error');
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3030/teacher/${id}`)
          .then(() => {
            setTeacher(teacher.filter((guru) => guru.id !== id));
            Swal.fire('Dihapus!', 'Data berhasil dihapus.', 'success');
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
            Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus data.', 'error');
          });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/EditGuru/${id}`);
  };

  const handleTambahGuru = () => {
    navigate('/TambahGuru');
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)',
        minHeight: '100vh',
        p: { xs: 2, md: 4 }, // Padding responsif
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleTambahGuru}
          sx={{
            borderRadius: '50px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': { backgroundColor: '#1E88E5' },
          }}
        >
          Tambah Guru
        </Button>
      </Box>

      <TableContainer
  component={Paper}
  sx={{
    borderRadius: '20px',
    overflowX: 'auto',
    p: 2,
    maxWidth: { xs: '90%', md: '80%' },
    mx: 'auto',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  }}
>
  <Table sx={{ minWidth: 650, background: 'transparent' }} aria-label="simple table">
    <TableHead>
      <TableRow sx={{ backgroundColor: '#1976d2' }}>
        <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>
          No
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>
          Nama Guru
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>
          Mapel
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>
          NIK
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>
          Gender
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>
          Jabatan
        </TableCell>
        <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>
          Aksi
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {teacher.map((guru, index) => (
        <TableRow
          key={guru.id}
          sx={{
            '&:nth-of-type(odd)': { backgroundColor: '#FFD1DC' },
            '&:nth-of-type(even)': { backgroundColor: '#FFB6C1' },
          }}
        >
          <TableCell align="center">{index + 1}</TableCell>
          <TableCell align="center">{guru.nama}</TableCell>
          <TableCell align="center">{guru.mapel}</TableCell>
          <TableCell align="center">{guru.nik}</TableCell>
          <TableCell align="center">{guru.gender}</TableCell>
          <TableCell align="center">{guru.jabatan}</TableCell>
          <TableCell align="center">
            <Button
              variant="contained"
              onClick={() => handleDelete(guru.id)}
              sx={{
                marginRight: '1px',
                borderRadius: '20%',
                '&:hover': { backgroundColor: '#f44336' },
              }}
            >
              🗑️
            </Button>
            <Button
              variant="contained"
              onClick={() => handleUpdate(guru.id)}
              sx={{ '&:hover': { backgroundColor: '#1976d2' } }}
            >
              ✏️
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

    </Box>
  );
}
