import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Navbar from "./Component/Navbar";
import Swal from 'sweetalert2';

function createData(no, nama, kelas, jurusan, nisn, sekolah) {
  return { no, nama, kelas, jurusan, nisn, sekolah };
}

const initialRows = [
  createData(1, 'Eka Yuni Rahmawati', "X (10)", 'TKJ', 74637286587, 'SMA NEO Bank'),
  createData(2, 'Faiqah Nisa Azzahra', "X (10)", 'TKJ', 87452614873, 'SMA NEO Bank'),
  createData(3, 'Rodhiatul Khofifah', "X (10)", 'TKJ', 64528163724, 'SMA NEO Bank'),
  createData(4, 'Mihnatun Naja Fuadah', "X (10)", 'TKJ', 96763652874524, 'SMA NEO Bank'),
  createData(5, 'Kamilia Qotrunnada', "XII (10)", 'TKJ', 984527451946, 'SMA NEO Bank'),
  createData(6, 'Dwi Azifatul', "XI (10)", 'TKJ', 3528156478357, 'SMA NEO Bank'),
  createData(7, 'Rika Maya Sinta', "X (10)", 'TKJ', 564872817583, 'SMA NEO Bank'),
];

export default function DataMurid() {
  const [rows, setRows] = React.useState(initialRows);
  const navigate = useNavigate(); // Hook for navigation

  // Fungsi untuk menghapus data
  const handleDelete = (no) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        setRows(rows.filter((row) => row.no !== no));
        Swal.fire('Dihapus!', 'Data berhasil dihapus.', 'success');
      }
    });
  };


  return (
    <>
      <Navbar />
      <div style={{ margin: '20px', textAlign: 'right' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/Tambah_Data')} // Navigate to Tambah_data page
        >
          Tambah
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">Nama</TableCell>
              <TableCell align="right">Kelas</TableCell>
              <TableCell align="right">Jurusan</TableCell>
              <TableCell align="right">NISN</TableCell>
              <TableCell align="right">Sekolah</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.no}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.no}
                </TableCell>
                <TableCell align="right">{row.nama}</TableCell>
                <TableCell align="right">{row.kelas}</TableCell>
                <TableCell align="right">{row.jurusan}</TableCell>
                <TableCell align="right">{row.nisn}</TableCell>
                <TableCell align="right">{row.sekolah}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/Update_Data')} // Navigate to Tambah_data page
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(row.no)}
                  >
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
