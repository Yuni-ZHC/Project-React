import React from 'react';
import './Card.css'; // Import file CSS untuk styling

const Card = ({ title, data }) => {
  console.log(data);  // Log data yang dikirimkan ke Card untuk debugging

  return (
    <div className="card">
      <h2>{title}</h2>
      {data.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {title === "Data Guru" ? (
                  <>
                    <th>Nama</th>
                    <th>Mata Pelajaran</th>
                    <th>NIK</th>
                    <th>Gender</th>
                    <th>Jabatan</th>
                  </>
                ) : (
                  <>
                    <th>Nama</th>
                    <th>Kelas</th>
                    <th>Jurusan</th>
                    <th>NISN</th>
                    <th>Asal Sekolah</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.nama}</td>
                  <td>{item.mapel || item.kelas}</td>
                  <td>{item.nik || item.jurusan}</td>
                  <td>{item.gender || item.nisn}</td>
                  <td>{item.jabatan || item.sekolah}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Data tidak ditemukan</p>
      )}
    </div>
  );
};

export default Card;
