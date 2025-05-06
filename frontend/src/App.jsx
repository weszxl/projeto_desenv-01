import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterDashboard';
import VoluntaryPage from './pages/VoluntaryDashboard';
import StudentPage from './pages/StudentDashboard';
import PatientPage from './pages/PatientDashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/voluntary" element={<VoluntaryPage />} />
          <Route path="/student-homepage" element={<StudentPage />} />
          <Route path="/patient-homepage" element={<PatientPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;





