import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axiosConfig';

import Header from '../components/header';
import Footer from '../components/footer';
import AppointmentMenu from '../components/appointmentMenu';
import WarningCompleteProfile from '../components/warningCompleteProfile';
import PatientActiveQueries from "../components/patientActiveQueries";

const PatientPage = () => {
  const [selectedTab, setSelectedTab] = useState('agendadas');
  const [showAppointmentMenu, setShowAppointmentMenu] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/patient/profile');
        setProfile(data);
      } catch (err) {
        setProfile(null);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      setAppointmentsLoading(true);
      try {
        const { data } = await api.get('/api/appointments');
        setAppointments(data);
      } catch (err) {
        setAppointments([]);
      } finally {
        setAppointmentsLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const isProfileComplete = profile &&
    profile.nome?.trim() &&
    profile.email?.trim() &&
    profile.phone?.trim() &&
    profile.cpf?.trim() &&
    (profile.birth?.trim() || profile.nascimento?.trim()) &&
    profile.cep?.trim();

  const handleAgendarConsulta = () => {
    if (isProfileComplete) {
      setShowAppointmentMenu(true);
    } else {
      setShowWarning(true);
    }
  };

  const handleGoToProfile = () => {
    setShowWarning(false);
    navigate('/patientPage-dados');
  };

  // ajustar implementação
  const handleCancel = (appointment) => {
    alert('Funcionalidade de cancelar consulta em breve.');
  };

  // ajustar implementação
  const handleViewStudent = (appointment) => {
    alert(`Perfil do estudante: ${appointment.student_name}\nFuncionalidade em breve.`);
  };

  // ajustar implementação
  const handleReschedule = (appointment) => {
    alert('Funcionalidade de remarcar em breve.');
  };

  const handleJoinMeet = (appointment) => {
    if (appointment.meet_link) {
      window.open(appointment.meet_link, "_blank");
    }
  };

  const renderContent = () => {
    if (appointmentsLoading) {
      return <div className="text-center py-10 text-gray-600">Carregando...</div>;
    }

    switch (selectedTab) {
      case 'agendadas': {
        const agendadas = appointments.filter(a => a.status === 'scheduled');
        return (
          <PatientActiveQueries
            appointments={agendadas}
            onCancel={handleCancel}
            onViewStudent={handleViewStudent}
            onReschedule={handleReschedule}
            onJoin={handleJoinMeet}
          />
        );
      }
      case 'realizadas': {
        const realizadas = appointments.filter(a => a.status === 'completed');
        return (
          <div>
            {realizadas.length === 0 ? (
              <div className="text-center flex flex-col items-center justify-center py-12">
                <p className="text-lg font-semibold text-gray-700 mb-1">
                  Você não tem consultas realizadas
                </p>
                <p className="text-gray-500">
                  Consulte seu histórico de consultas para acompanhar os atendimentos realizados.
                </p>
              </div>
            ) : (
              <PatientActiveQueries
                appointments={realizadas}
                onCancel={handleCancel}
                onViewStudent={handleViewStudent}
                onReschedule={handleReschedule}
                onJoin={handleJoinMeet}
              />
            )}
          </div>
        );
      }
      case 'canceladas': {
        const canceladas = appointments.filter(a => a.status === 'cancelled');
        return (
          <div>
            {canceladas.length === 0 ? (
              <div className="text-center flex flex-col items-center justify-center py-12">
                <p className="text-lg font-semibold text-gray-700 mb-1">
                  Você não tem consultas canceladas
                </p>
                <p className="text-gray-500">
                  Caso tenha dúvidas sobre consultas canceladas, entre em contato com o suporte.
                </p>
              </div>
            ) : (
              <PatientActiveQueries
                appointments={canceladas}
                onCancel={handleCancel}
                onViewStudent={handleViewStudent}
                onReschedule={handleReschedule}
                onJoin={handleJoinMeet}
              />
            )}
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header />
      <main className="flex-grow px-2 py-10">
        <div className="max-w-5xl mx-auto">
          <nav className="flex justify-center space-x-8 border-b mb-8">
            <button
              className={`pb-2 px-8 text-lg font-medium focus:outline-none ${
                selectedTab === 'agendadas'
                  ? 'border-b-2 border-purple-600 text-purple-700'
                  : 'text-gray-600'
              }`}
              onClick={() => setSelectedTab('agendadas')}
            >
              Agendadas
            </button>
            <button
              className={`pb-2 px-8 text-lg font-medium focus:outline-none ${
                selectedTab === 'realizadas'
                  ? 'border-b-2 border-purple-600 text-purple-700'
                  : 'text-gray-600'
              }`}
              onClick={() => setSelectedTab('realizadas')}
            >
              Realizadas
            </button>
            <button
              className={`pb-2 px-8 text-lg font-medium focus:outline-none ${
                selectedTab === 'canceladas'
                  ? 'border-b-2 border-purple-600 text-purple-700'
                  : 'text-gray-600'
              }`}
              onClick={() => setSelectedTab('canceladas')}
            >
              Canceladas
            </button>
          </nav>
          <div className="">{renderContent()}</div>
        </div>
      </main>
      <AppointmentMenu open={showAppointmentMenu} onClose={() => setShowAppointmentMenu(false)} />
      <WarningCompleteProfile
        open={showWarning}
        onClose={() => setShowWarning(false)}
        onGoToProfile={handleGoToProfile}
      />
      <Footer />
    </div>
  );
};

export default PatientPage;


