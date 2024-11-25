import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { blue, pink } from '@mui/material/colors';

const Dashboard = () => {
  const navigate = useNavigate();

  // Fungsi untuk menavigasi ke halaman lain saat card diklik
  const goToPage = (page) => {
    navigate(page);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFD1DC',
        minHeight: '100vh',
        paddingTop: '30px',
        paddingBottom: '30px',
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: '700',
          color: blue[300],
          marginBottom: '50px',
          textAlign: 'center',
        }}
      >
        Selamat datang di Dashboard Yuni!
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 15,
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '1100px',
          padding: '0 10px',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
        }}
      >
        {/* Card Dashboard */}
        <Card
          onClick={() => goToPage('/Dashboard')}
          sx={{
            background: `linear-gradient(to bottom, #FFB6C1, #FFD1DC)`,
            boxShadow: 3,
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6,
            },
            marginBottom: '15px',
            height: '150px',
            width: '100%',
            maxWidth: '350px',
          }}
        >
          <CardHeader
            avatar={<FaClipboardList size={30} color="#FFD1DC" />}
            title={<Typography variant="h6" sx={{ color: '#0d0d0d' }}>Dashboard</Typography>}
            sx={{ backgroundColor: pink[200] }}
          />
          <CardContent>
            <Typography sx={{ color: '#0d0d0d' }}>
              Overview sistem dan data.
            </Typography>
          </CardContent>
        </Card>

        {/* Card Data Guru */}
        <Card
          onClick={() => goToPage('/DataGuru')}
          sx={{
            background: `linear-gradient(to bottom, #FFB6C1, #FFD1DC)`,
            boxShadow: 3,
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6,
            },
            marginBottom: '15px',
            height: '150px',
            width: '100%',
            maxWidth: '350px',
          }}
        >
          <CardHeader
            avatar={<FaChalkboardTeacher size={30} color="#FFD1DC" />}
            title={<Typography variant="h6" sx={{ color: '#0d0d0d' }}>Data Guru</Typography>}
            sx={{ backgroundColor: pink[200] }}
          />
          <CardContent>
            <Typography sx={{ color: '#0d0d0d' }}>
              Manajemen data guru sekolah.
            </Typography>
          </CardContent>
        </Card>

        {/* Card Data Siswa */}
        <Card
          onClick={() => goToPage('/DataSiswa')}
          sx={{
            background: `linear-gradient(to bottom, #FFD1DC, #FFB6C1)`,
            boxShadow: 3,
            cursor: 'pointer',
            transition: 'transform 0.4s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 10,
            },
            height: '150px',
            width: '100%',
            maxWidth: '350px',
          }}
        >
          <CardHeader
            avatar={<FaUsers size={30} color="#FFD1DC" />}
            title={<Typography variant="h6" sx={{ color: '#0d0d0d' }}>Data Siswa</Typography>}
            sx={{ backgroundColor: pink[200] }}
          />
          <CardContent>
            <Typography sx={{ color: '#0d0d0d' }}>
              Manajemen data siswa sekolah.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
