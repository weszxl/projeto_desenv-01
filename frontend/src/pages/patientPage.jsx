import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { api } from '../api/axiosConfig'; 

const PatientPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'patient') {
      window.location.href = '/nao-autorizado';
    }

    // buscar agendamentos do paciente
    api.get('/api/appointments')
      .then(res => setAgendamentos(res.data))
      .catch(err => console.error(err));
  }, []);

  const buscarDisponibilidades = async () => {
    try {
      const res = await api.get(`/api/availability/date/${selectedDate}`);
      setDisponibilidades(res.data);
    } catch (err) {
      console.error(err);
      setErro('erro na busca de horários');
    }
  };

  const agendarConsulta = async (student_id, horario) => {
    try {
      const res = await api.post('/api/appointments', {
        student_id,
        date: selectedDate,
        start_time: horario.start_time,
        end_time: horario.end_time
      });

      setMensagem('consulta agendada!');
      setErro('');
      setDisponibilidades([]);
      setSelectedDate('');

      const agendamentosAtualizados = await api.get('/api/appointments');
      setAgendamentos(agendamentosAtualizados.data);
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.error || 'erro ao agendar');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-blue-50 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Página do Paciente
          </h1>

          {/* AGENDAR CONSULTA */}
          <section className="bg-white p-6 rounded shadow mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Agendar nova consulta
            </h2>

            <div className="flex gap-4 mb-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border px-4 py-2 rounded"
              />
              <button
                onClick={buscarDisponibilidades}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Buscar horários
              </button>
            </div>

            {disponibilidades.length > 0 && (
              <div className="space-y-3">
                {disponibilidades.map((horario) => (
                  <div
                    key={horario.id}
                    className="border p-4 rounded flex justify-between items-center"
                  >
                    <div>
                      <p className="text-gray-800 font-medium">
                        Estudante: {horario.student_name || `ID ${horario.student_id}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {horario.date} – {horario.start_time} às {horario.end_time}
                      </p>
                    </div>
                    <button
                      onClick={() => agendarConsulta(horario.student_id, horario)}
                      className="bg-gradient-to-r from-[#79FFF4] to-[#72FFDE] text-white px-4 py-2 rounded hover:opacity-90"
                    >
                      Agendar
                    </button>
                  </div>
                ))}
              </div>
            )}

            {mensagem && <p className="text-green-600 mt-4">{mensagem}</p>}
            {erro && <p className="text-red-600 mt-4">{erro}</p>}
          </section>

          {/* AGENDAMENTOS EXISTENTES */}
          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Suas consultas agendadas
            </h2>

            {agendamentos.length === 0 ? (
              <p className="text-gray-600">Você ainda não tem consultas.</p>
            ) : (
              <div className="space-y-3">
                {agendamentos.map((ag) => (
                  <div
                    key={ag.id}
                    className="border p-4 rounded flex justify-between items-center"
                  >
                    <div>
                      <p className="text-gray-800 font-medium">
                        Estudante: {ag.student_id}
                      </p>
                      <p className="text-sm text-gray-600">
                        {ag.date} – {ag.start_time} às {ag.end_time}
                      </p>
                    </div>
                    <a
                      href={ag.meet_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Ir para a consulta
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PatientPage;


