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
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

export default function Dashboard() {
  const [student, setStudent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3030/student')
      .then(response => {
        setStudent(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3030/student/${id}`)
          .then(() => {
            setStudent(student.filter(murid => murid.id !== id));
            Swal.fire('Dihapus!', 'Data berhasil dihapus.', 'success');
          })
          .catch(error => {
            console.error("Error deleting data:", error);
            Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus data. Silakan coba lagi.', 'error');
          });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/EditSiswa/${id}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredStudents = student.filter((murid) =>
    murid.nama.toLowerCase().includes(searchTerm) ||
    murid.kelas.toLowerCase().includes(searchTerm) ||
    murid.jurusan.toLowerCase().includes(searchTerm) ||
    murid.nisn.toString().includes(searchTerm) ||
    murid.asal.toLowerCase().includes(searchTerm)
  );

  return (
    <Box 
      sx={{
        background: 'linear-gradient(to bottom, #FFD1DC, #FFB6C1)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: { xs: '20px', md: '40px' },
      }}
    >
     <Box 
  sx={{
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1200px',
  }}
>
  <Paper
    elevation={6}
    sx={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderRadius: '15px',
      background: 'linear-gradient(to right, #FFD1DC, #FFB6C1)',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      width: '350px',
    }}
  >
    <TextField
      label="Cari Siswa"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearch}
      fullWidth
      sx={{
        background: 'white',
        borderRadius: '5px',
      }}
    />
    <Button
      variant="contained"
      sx={{
        marginLeft: '10px',
        backgroundColor: '#FFB6C1',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#FFD1DC',
        },
        borderRadius: '10px',
        padding: '5px 15px',
      }}
    >
      Cari
    </Button>
  </Paper>
</Box>

      <TableContainer
          component={Paper}
          sx={{
            borderRadius: '20px',
            overflowX: 'auto',
            p: 2,
            maxWidth: { xs: '80%', md: '80%' },
            mx: 'auto',
            ml: '220px', // Geser tabel ke kanan
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>No</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Nama Siswa</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Kelas</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Jurusan</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>NISN</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Asal Sekolah</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((murid, index) => (
              <TableRow
                key={murid.id}
                sx={{
                  background: index % 2 === 0 
                    ? 'linear-gradient(135deg, #FFD1DC, #FFB6C1)' 
                    : 'linear-gradient(135deg, #FFB6C1, #FFD1DC)',
                }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{murid.nama}</TableCell>
                <TableCell align="center">{murid.kelas}</TableCell>
                <TableCell align="center">{murid.jurusan}</TableCell>
                <TableCell align="center">{murid.nisn}</TableCell>
                <TableCell align="center">{murid.asal}</TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained" 
                    onClick={() => handleDelete(murid.id)}
                    style={{ marginRight: '10px', borderRadius: '50%' }}
                  >
                    🗑️
                  </Button>
                  <Button 
                    variant="contained" 
                    onClick={() => handleUpdate(murid.id)}
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
