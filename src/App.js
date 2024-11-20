import React from "react";
import './App.css';
import { Route, Routes, Navigate } from "react-router-dom"; 
import Dashboard from "./Dashboard";
import DataGuru from "./DataGuru";
import DataMurid from "./DataMurid";
import TambahData from "./Tambah_Data";
import UpdateData from "./Update_Data";
import Navbar from "./Component/Navbar";
function App() {
  return (
    <div className="App"> 
      <Routes> 
        {/* Redirect root path "/" to "/Home" */}
        <Route path="/" element={<Navigate to="/DataGuru" />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="DataGuru" element={<DataGuru />} />
        <Route path="DataMurid" element={<DataMurid />} />
        <Route path="Tambah_Data" element={<TambahData />} />
        <Route path="Update_Data" element={<UpdateData />} />
        <Route path="Navbar" element={<Navbar />} />
      </Routes>
    </div>
  );
}

export default App;
