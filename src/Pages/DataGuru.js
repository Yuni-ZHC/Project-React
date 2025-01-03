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
import { Box, TextField } from '@mui/material';

export default function Dashboard() {
  const [teacher, setTeacher] = useState([]);
  const [filteredTeacher, setFilteredTeacher] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3030/teacher')
      .then((response) => {
        setTeacher(response.data);
        setFilteredTeacher(response.data); // Initialize filteredTeacher with all data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        Swal.fire('Gagal!', 'Tidak dapat memuat data guru.', 'error');
      });
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = teacher.filter((guru) =>
      guru.nama.toLowerCase().includes(value)
    );
    setFilteredTeacher(filtered);
  };

  const handleTableClick = () => {
    setIsSidebarCollapsed(true);
  };

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
            const updatedTeachers = teacher.filter((guru) => guru.id !== id);
            setTeacher(updatedTeachers);
            setFilteredTeacher(updatedTeachers); // Update filtered data
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
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: isSidebarCollapsed ? '50px' : '50px',
          transition: 'width 0.3s ease',
          background: '#1976d2',
          color: 'white',
          p: 2,
          flexShrink: 0, // Memastikan sidebar tidak mengecil saat halaman diperkecil
        }}
      >
      </Box>
  
      {/* Konten Utama */}
      <Box
        sx={{
          flex: 1,
          p: 4,
          transition: 'margin-left 0.3s ease',
          marginLeft: isSidebarCollapsed ? '70px' : '400px',
        }}
      >
        {/* Search Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 7,
            width: '100%',
          }}
        >
          <Paper
            elevation={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              borderRadius: '15px',
              background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              width: '450px',
            }}
          >
            <TextField
              label="Cari Guru"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              fullWidth
              sx={{
                background: 'white',
                borderRadius: '5px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#FFB6C1',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FFD1DC',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                marginLeft: '10px',
                backgroundColor: '#FFB6C1',
                color: '#fff',
                borderRadius: '10px',
                padding: '5px 15px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#FFD1DC',
                },
              }}
            >
              Cari
            </Button>
          </Paper>
        </Box>
  
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
            borderRadius: '10px',
            overflowX: 'auto',
            p: 2,
            maxWidth: '100%',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
          onClick={handleTableClick}
        >
          <Table
            sx={{ minWidth: 800, background: 'transparent' }}
            aria-label="simple table"
          >
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
              {filteredTeacher.map((guru, index) => (
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
                  <TableCell
                    align="center"
                    sx={{ width: '150px', minWidth: '150px' }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(guru.id)}
                        sx={{
                          borderRadius: '20%',
                          minWidth: '40px',
                          '&:hover': { backgroundColor: '#f44336' },
                        }}
                      >
                        🗑️
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleUpdate(guru.id)}
                        sx={{
                          borderRadius: '20%',
                          minWidth: '40px',
                          '&:hover': { backgroundColor: '#1976d2' },
                        }}
                      >
                        ✏️
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
  
}
