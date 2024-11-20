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

function createData(no,  nama , mapel, nik, gender, jabatan) {
    return { no, nama, mapel, nik, gender, jabatan };
}

const initialRows = [
    createData(1, 'Zhong Chenle', "Matematika", '63563290752', 'Laki-Laki', 'Guru Matematika & CEO SM Entertaiment (Suamiku)'),
    createData(2, 'Lee Jeno', "PJOK", '62968968765', 'Laki-Laki', 'Guru PJOK'),
    createData(3, 'Na Jaemin', "IPAS", '66486918798', 'Laki-Laki', 'Guru IPAS'),
    createData(4,'Kim Jennie', "Bahasa Korea", '25367467468', 'Perempuan', 'Guru B. Korea'),
    createData(5,'Enami Asa', "Bahasa Jepang", ' 46378296347', 'Perempuan', 'Guru B. Jepang'),
    createData(6,'Huang Renjun', "Bahasa China", ' 84736297453', 'Laki-Laki', 'Guru B. China'),
    createData(7,'Chen Zhe Yuan', "Seni", '73564824675', 'Laki-Laki', 'Guru Seni'),
];

export default function DataGuru() {
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
            <TableCell>No </TableCell>
              <TableCell align="right">Nama</TableCell>
              <TableCell align="right">Mapel&nbsp;</TableCell>
              <TableCell align="right">NIK&nbsp;</TableCell>
              <TableCell align="right">Gender&nbsp;</TableCell>
              <TableCell align="right">Jabatan&nbsp;</TableCell>
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
              <TableCell align="right">{row.mapel}</TableCell>
              <TableCell align="right">{row.nik}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.jabatan}</TableCell>
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
