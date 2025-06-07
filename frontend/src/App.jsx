import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/homepage';

import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';

import PatientPage from './pages/patientPage';
import PatientPageDados from './pages/patientPage-dados';

import StudentPage from './pages/studentPage';
import StudentPageDados from './pages/studentPage-dados';

import VoluntaryPage from './pages/voluntaryPage';

import AdminPage from './pages/adminPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/patientPage" element={<PatientPage />} />
        <Route path="/patientPage-dados" element={<PatientPageDados />} />


        <Route path="/studentPage" element={<StudentPage />} />
        <Route path="/studentPage-dados" element={<StudentPageDados />} />

        <Route path="/adminPage" element={<AdminPage />} />

        <Route path="/voluntaryPage" element={<VoluntaryPage />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;







