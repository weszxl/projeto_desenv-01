import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import AppointmentMenu from '../components/appointmentMenu';
import WarningCompleteProfile from '../components/warningCompleteProfile'; 
import { api } from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const PatientPage = () => {
  const [selectedTab, setSelectedTab] = useState('agendadas');
  const [showAppointmentMenu, setShowAppointmentMenu] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(false); 
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

  const renderContent = () => {
    switch (selectedTab) {
      case 'agendadas':
        return (
          <div className="text-center flex flex-col items-center justify-center py-12">
            <img
              src="/images/no-schedule.png"
              alt="Sem consultas agendadas"
              className="mx-auto mb-6"
              style={{ maxWidth: 220 }}
            />
            <p className="text-lg font-semibold text-gray-700 mb-1">
              Você não tem consultas agendadas
            </p>
            <p className="text-gray-500 mb-5">
              Estamos aqui para te ajudar, agende uma consulta para manter em dia os cuidados com a saúde e o bem-estar.
            </p>
            <button
              className="bg-purple-700 hover:bg-purple-800 transition text-white font-semibold py-2 px-7 rounded"
              onClick={handleAgendarConsulta}
              disabled={profileLoading}
            >
              Agendar consulta
            </button>
          </div>
        );
      case 'realizadas':
        return (
          <div className="text-center flex flex-col items-center justify-center py-12">
            <p className="text-lg font-semibold text-gray-700 mb-1">
              Você não tem consultas realizadas
            </p>
            <p className="text-gray-500">
              Consulte seu histórico de consultas para acompanhar os atendimentos realizados.
            </p>
          </div>
        );
      case 'canceladas':
        return (
          <div className="text-center flex flex-col items-center justify-center py-12">
            <p className="text-lg font-semibold text-gray-700 mb-1">
              Você não tem consultas canceladas
            </p>
            <p className="text-gray-500">
              Caso tenha dúvidas sobre consultas canceladas, entre em contato com o suporte.
            </p>
          </div>
        );
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


