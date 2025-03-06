import React, { useContext } from 'react'
import Login from './pages/login'
import { SnackbarProvider } from "notistack";

import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';

const App = () => {
  const {aToken} = useContext(AdminContext)
  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <SnackbarProvider maxSnack={5}>
        {" "}
        {/* maxSnack limits the number of toasts displayed at once */}
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
          </Routes>
        </div>
      </SnackbarProvider>
    </div>
  ) : (
    <>
      <SnackbarProvider maxSnack={3}>
        {" "}
        {/* maxSnack limits the number of toasts displayed at once */}
        <Login />
      </SnackbarProvider>
    </>
  );
}

export default App