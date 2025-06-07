import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
// import { api } from '../api/axiosConfig'; 


const StudentPage = () => {
  const [selectedTab, setSelectedTab] = useState('agendadas'); // seleção de abas

  const renderContent = () => {
    switch (selectedTab) {
      case 'agendadas':
        return (
          <div className="text-center">
            <img
              src="/images/no-schedule.png"
              alt="Sem consultas agendadas"
              className="mx-auto mb-6"
            />
            <p className="text-lg font-semibold text-gray-700">
              Você não tem consultas agendadas
            </p>
            <p className="text-gray-500">
              Estamos aqui para te ajudar, agende uma consulta para manter em dia os cuidados com a saúde e o bem-estar.
            </p>
          </div>
        );
      case 'realizadas':
        return (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">
              Você não tem consultas realizadas
            </p>
            <p className="text-gray-500">
              Consulte seu histórico de consultas para acompanhar os atendimentos realizados.
            </p>
          </div>
        );
      case 'canceladas':
        return (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">
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


