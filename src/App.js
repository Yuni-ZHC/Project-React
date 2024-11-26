import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Dashboard from './Pages/Dashboard';
import DataGuru from './Pages/DataGuru';
import DataSiswa from './Pages/DataSiswa';
import TambahGuru from './Pages/TambahGuru';
import EditGuru from './Pages/EditGuru';
import TambahSiswa from './Pages/TambahSiswa';
import EditSiswa from './Pages/EditSiswa';
import './App.css';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <div className="App">
        <Sidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />
        <div className={`content ${collapsed ? 'collapsed' : 'expanded'}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/DataGuru" element={<DataGuru />} />
            <Route path="/DataSiswa" element={<DataSiswa />} />
            <Route path="/TambahGuru" element={<TambahGuru />} />
            <Route path="/EditGuru/:id" element={<EditGuru />} />
            <Route path="/TambahSiswa" element={<TambahSiswa />} />
            <Route path="/EditSiswa/:id" element={<EditSiswa />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
