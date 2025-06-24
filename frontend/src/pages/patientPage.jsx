import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axiosConfig';

import Header from "../components/common/header";
import Footer from "../components/common/footer";
import AppointmentMenu from "../components/patients/appointmentMenu";
import WarningCompleteProfile from "../components/patients/warningCompleteProfile";
import OngoingQueries from "../components/patients/ongoingQueries";
import DoneQueries from "../components/patients/doneQueries";
import CancelledQueries from "../components/patients/cancelledQueries";

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

  const handleCancel = async (appointment) => {
    // console.log('cancelando?:', appointment.id); // log

    try {
      // console.log('PATCH'); // log
      await api.patch(`/api/appointments/${appointment.id}/cancel`,);
      // console.log('PATCHes'); // log
      await fetchAppointments();
    } catch (error) {
      console.log('Erro no PATCH:', error);
      // alert('erro pra cancelar.'); // log
    }
  };

  const handleViewStudent = (appointment) => {
    alert(`Perfil do estudante: ${appointment.student_name}\nFuncionalidade.`);
  };

  const handleReschedule = (appointment) => {
    alert('Funcionalidade.');
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
          <OngoingQueries
            appointments={agendadas}
            onCancel={handleCancel}
            onViewStudent={handleViewStudent}
            onReschedule={handleReschedule}
            onJoin={handleJoinMeet}
            onAgendarConsulta={handleAgendarConsulta}
            profileLoading={profileLoading}
          />
        );
      }
      case 'realizadas': {
        const realizadas = appointments.filter(a => a.status === 'completed');
        return (
          <DoneQueries
            appointments={realizadas}
            onViewStudent={handleViewStudent}
            onJoin={handleJoinMeet}
          />
        );
      }
      case 'canceladas': {
        const canceladas = appointments.filter(a => a.status === 'cancelled');
        return (
          <CancelledQueries
            appointments={canceladas}
            onViewStudent={handleViewStudent}
          />
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


