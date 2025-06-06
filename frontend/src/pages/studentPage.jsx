import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { api } from '../api/axiosConfig'; 

const StudentPage = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'student') {
      window.location.href = '/nao-autorizado';
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    try {
      const res = await api.post('/api/availability', {
        date,
        start_time: startTime,
        end_time: endTime,
      });

      setMensagem(`horário adicionado!`);
      setDate('');
      setStartTime('');
      setEndTime('');
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.error || 'erro ao inserir disponibilidade');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">Página do Estudante</h1>
          <p className="text-lg text-gray-600 mb-6">
            Informe os horários disponíveis para atendimento.
          </p>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora de início</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="w-full border rounded px-4 py-2"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora de término</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="w-full border rounded px-4 py-2"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#79FFF4] to-[#72FFDE] text-white font-semibold py-2 px-6 rounded hover:opacity-90 transition"
            >
              Salvar Horário
            </button>

            {mensagem && <p className="text-green-600">{mensagem}</p>}
            {erro && <p className="text-red-600">{erro}</p>}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentPage;


