import React, { useEffect, useState } from 'react';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import OngoingQueries from '../components/students/ongoingQueries';
import DoneQueries from '../components/students/doneQueries';
import CancelledQueries from '../components/students/cancelledQueries';
import { api } from '../api/axiosConfig';

const StudentPage = () => {
  const [selectedTab, setSelectedTab] = useState('agendadas');
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarConsultas = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/appointments');
        setConsultas(res.data);
      } catch (err) {
        setConsultas([]);
      } finally {
        setLoading(false);
      }
    };
    buscarConsultas();
  }, []);

  const agendadas = consultas.filter(c => c.status === 'scheduled');
  const realizadas = consultas.filter(c => c.status === 'completed');
  const canceladas = consultas.filter(c => c.status === 'cancelled');

  const renderContent = () => {
    if (loading) {
      return <div className="text-center text-gray-500">Carregando...</div>;
    }
    switch (selectedTab) {
      case 'agendadas':
        return <OngoingQueries consultas={agendadas} />;
      case 'realizadas':
        return <DoneQueries consultas={realizadas} />;
      case 'canceladas':
        return <CancelledQueries consultas={canceladas} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">Olá "NOME", aqui estão suas consultas</h1>
          <nav className="flex justify-center space-x-8 border-b mb-4">
            <button
              className={`pb-2 ${selectedTab === 'agendadas' ? 'border-b-2 border-purple-600 font-semibold' : 'text-gray-600'}`}
              onClick={() => setSelectedTab('agendadas')}
            >
              Agendadas
            </button>
            <button
              className={`pb-2 ${selectedTab === 'realizadas' ? 'border-b-2 border-purple-600 font-semibold' : 'text-gray-600'}`}
              onClick={() => setSelectedTab('realizadas')}
            >
              Realizadas
            </button>
            <button
              className={`pb-2 ${selectedTab === 'canceladas' ? 'border-b-2 border-purple-600 font-semibold' : 'text-gray-600'}`}
              onClick={() => setSelectedTab('canceladas')}
            >
              Canceladas
            </button>
          </nav>
          <div className="py-10">{renderContent()}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentPage;


