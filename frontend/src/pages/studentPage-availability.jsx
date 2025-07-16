import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import AvailableTimes from '../components/students/availableTimes';
import WarningCompleteProfileStudent from '../components/students/warningCompleteProfileStudent';
import { api } from '../api/axiosConfig';

const formatPhone = (value) => value.replace(/\D/g, '').replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d{5})(\d{1,4})$/, '$1-$2').slice(0, 15);
const formatCPF = (value) => value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1.$2').slice(0, 14);
const formatCEP = (value) => value.replace(/\D/g, '').replace(/(\d{5})(\d{1,3})$/, '$1-$2').slice(0, 9);
const isoToBR = (isoDate) => {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const StudentPageAvailability = () => {
  const [data, setData] = useState('');
  const [horaInicial, setHoraInicial] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [msg, setMsg] = useState(null);
  const [msgTipo, setMsgTipo] = useState('');
  const [loading, setLoading] = useState(true);
  const [openWarningProfile, setOpenWarningProfile] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(true);
  const [studentId, setStudentId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/student/profile');
        setProfileCompleted(!!data.profile_completed);
        setStudentId(data.user_id);
      } catch (error) {
        setMsg('Não foi possível carregar os dados.');
        setMsgTipo('erro');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (studentId) {
      fetchHorarios();
    }
    // eslint-disable-next-line
  }, [studentId]);

  const fetchHorarios = async () => {
    try {
      if (!studentId) return;
      const { data } = await api.get(`/api/availability/student/${studentId}`);
      setHorarios(data);
    } catch {
      setHorarios([]);
    }
  };

  const handleDisponibilidadeSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setMsgTipo('');
    if (!data || !horaInicial) {
      setMsg('Preencha todos os campos de disponibilidade.');
      setMsgTipo('erro');
      return;
    }
    const horaFinal = calcularHoraFinal(horaInicial);
    try {
      await api.post('/api/availability', {
        date: data,
        start_time: horaInicial,
        end_time: horaFinal
      });
      setMsg('Horário adicionado com sucesso!');
      setMsgTipo('sucesso');
      setData('');
      setHoraInicial('');
      fetchHorarios();
    } catch (err) {
      let msgErro = 'Erro ao adicionar horário.';
      if (err.response && err.response.data && err.response.data.error) {
        msgErro = err.response.data.error;
      }
      setMsg(msgErro);
      setMsgTipo('erro');
    }
  };

  const handleDisponibilidadeCancelar = () => {
    navigate('/studentPage');
  };

  const calcularHoraFinal = (horaInicial) => {
    if (!horaInicial) return '';
    const [hora, minuto] = horaInicial.split(':').map(Number);
    const date = new Date();
    date.setHours(hora);
    date.setMinutes(minuto);
    date.setMinutes(date.getMinutes() + 60);
    return date.toTimeString().slice(0,5);
  };
  const horaFinal = calcularHoraFinal(horaInicial);

  const handleDeleteHorario = async (id) => {
    try {
      await api.delete(`/api/availability/${id}`);
      fetchHorarios();
    } catch (err) {
      setMsg('Erro ao deletar horário.');
      setMsgTipo('erro');
    }
  };

  const handleBack = () => {
    navigate('/studentPage');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-blue-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <span className="text-lg text-gray-600">Carregando dados...</span>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header />
      <main className="flex-grow py-10 px-2">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={handleBack}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition"
            aria-label="Voltar para página do estudante"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Meus horários disponíveis</h1>
          <p className="text-gray-600 mb-6">Gerencie os horários que você pode atender pacientes.</p>
          {msg && (
            <div className={`mb-4 p-3 rounded text-center ${msgTipo === 'erro' ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'}`}>
              {msg}
            </div>
          )}
          <div className="bg-white rounded-lg shadow px-5 py-7">
            <form
              className="flex flex-col items-center"
              id="form-disponibilidade"
              onSubmit={handleDisponibilidadeSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data *</label>
                  <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="w-full border rounded px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horário Inicial *</label>
                  <input
                    type="time"
                    value={horaInicial}
                    onChange={(e) => setHoraInicial(e.target.value)}
                    className="w-full border rounded px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horário Final</label>
                  <input
                    type="time"
                    value={horaFinal}
                    readOnly
                    className="w-full border rounded px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row w-full gap-3">
                <button
                  type="button"
                  className="flex-1 py-2 rounded bg-purple-700 text-white font-semibold hover:bg-purple-800 transition mb-2 md:mb-0"
                  onClick={() => {
                    if (profileCompleted) {
                      document.getElementById('form-disponibilidade').requestSubmit();
                    } else {
                      setOpenWarningProfile(true);
                    }
                  }}
                >
                  Adicionar Horário
                </button>
                <button
                  type="button"
                  className="flex-1 py-2 rounded border border-gray-300 text-gray-500 font-semibold hover:bg-gray-50 transition"
                  onClick={handleDisponibilidadeCancelar}
                >
                  Cancelar
                </button>
              </div>
            </form>

            {/* MODAL DE AVISO DE PERFIL */}
            <WarningCompleteProfileStudent
              open={openWarningProfile}
              onClose={() => setOpenWarningProfile(false)}
              onGoToProfile={() => {
                setOpenWarningProfile(false);
              }}
            />

            {/* LISTA DE HORÁRIOS */}
            <AvailableTimes horarios={horarios} onDelete={handleDeleteHorario} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentPageAvailability;