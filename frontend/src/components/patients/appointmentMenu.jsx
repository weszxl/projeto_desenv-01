import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { api } from '../../api/axiosConfig';

const tiposConsulta = [
  { label: 'Selecione o tipo', value: '' },
  { label: 'Psicologia', value: 'psicologia' },
  //{ label: 'Nutrição', value: 'nutricao' },
];

const AppointmentMenu = ({ open, onClose }) => {
  const today = new Date();
  const [tipo, setTipo] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(true);

  const [disponiveis, setDisponiveis] = useState([]);
  const [loadingDisponiveis, setLoadingDisponiveis] = useState(false);

  const isLastMonthOfYear = today.getMonth() === 11;
  const lastAllowedDate = isLastMonthOfYear
    ? new Date(today.getFullYear() + 1, 0, 31)
    : new Date(today.getFullYear(), today.getMonth() + 2, 0);

  const fromMonth = today;
  const toMonth = isLastMonthOfYear
    ? new Date(today.getFullYear() + 1, 0)
    : new Date(today.getFullYear(), today.getMonth() + 1);

  const [agendandoId, setAgendandoId] = useState(null);

  const handleAgendar = async (slot) => {
    setAgendandoId(slot.id);
    try {
      await api.post('/api/appointments', { slot_id: slot.id });
      window.location.reload();
    } catch (error) {
      alert(error?.response?.data?.error || "Erro ao agendar.");
    } finally {
      setAgendandoId(null);
    }
  };

  useEffect(() => {
    const buscarDisponiveis = async (date, tipo) => {
      if (!date) {
        setDisponiveis([]);
        return;
      }
      setLoadingDisponiveis(true);
      try {
        const dataISO = date.toISOString().split('T')[0];
        const res = await api.get(`/api/availability/date/${dataISO}`);
        const filtrados = tipo
          ? res.data.filter(d => d.specialty && d.specialty.toLowerCase() === tipo)
          : res.data;
        setDisponiveis(filtrados);
      } catch (err) {
        setDisponiveis([]);
      } finally {
        setLoadingDisponiveis(false);
      }
    };
    if (!calendarOpen && selectedDate && tipo) {
      buscarDisponiveis(selectedDate, tipo);
    } else {
      setDisponiveis([]);
    }
  }, [selectedDate, tipo, calendarOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative appointment-modal-content">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Data de preferência</h2>
        <div className="mb-4">
          <label className="block text-gray-800 mb-1 font-medium">Tipo de Consulta</label>
          <select
            className="w-full border rounded px-4 py-2 bg-gray-100 text-gray-700"
            value={tipo}
            onChange={e => setTipo(e.target.value)}
          >
            {tiposConsulta.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 mb-2 font-medium">Selecione a data</label>
          {calendarOpen ? (
            <div
              className="flex flex-col items-center rounded-lg p-2"
              style={{ backgroundColor: "#e5e7eb" }}
            >
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={date => {
                  setSelectedDate(date);
                  if (date) setCalendarOpen(false); 
                }}
                fromDate={today}
                toDate={lastAllowedDate}
                defaultMonth={today}
                showOutsideDays
                fromMonth={fromMonth}
                toMonth={toMonth}
                modifiersClassNames={{
                  selected: 'bg-purple-600 text-white font-bold',
                  today: 'text-purple-700 font-bold',
                }}
                className="rounded-lg"
                styles={{
                  head_cell: { color: '#8b5cf6', fontWeight: 'bold' }
                }}
              />
            </div>
          ) : selectedDate ? (
            <div className="flex items-center justify-between bg-purple-50 rounded px-4 py-2 mt-1">
              <span className="text-purple-700 font-medium">
                {selectedDate.toLocaleDateString('pt-BR')}
              </span>
              <button
                className="text-xs text-purple-700 underline hover:text-purple-900 ml-2"
                onClick={() => {
                  setCalendarOpen(true);
                  setDisponiveis([]); 
                }}
              >
                Alterar
              </button>
            </div>
          ) : null}
        </div>
        <div className="mb-6">
          <span className="block font-medium text-gray-800 mb-2">Estudantes Disponíveis</span>
          {loadingDisponiveis ? (
            <div className="text-center text-gray-400 border border-gray-200 rounded p-4">Carregando...</div>
          ) : !calendarOpen && disponiveis.length === 0 ? (
            <div className="text-center text-gray-400 border border-gray-200 rounded p-4">
              Nenhum estudante disponível para os filtros selecionados.
            </div>
          ) : (
            <div className="space-y-4" style={{ maxHeight: "28vh", overflowY: "auto" }}>
              {!calendarOpen && disponiveis.map(slot => (
                <div
                  key={slot.id}
                  className="border-2 border-blue-400 rounded-xl bg-gray-50 px-4 py-4 flex flex-col gap-2"
                >
                  <div className="flex items-start gap-4">
                    {/* FOTO */}
                    <div>
                      {slot.photo_url ? (
                        <img
                          src={slot.photo_url}
                          alt={slot.student_name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white text-xl font-bold">
                          {slot.student_name?.[0] || '?'}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-base">{slot.student_name}</div>
                      <div className="text-sm text-gray-700">{slot.course_name || slot.specialty}</div>
                      {slot.professor_name && (
                        <div className="text-xs text-gray-500 mt-1">
                          Professor responsável: <span className="font-medium">{slot.professor_name}</span>
                        </div>
                      )}
                      <div className="text-xs text-gray-600 mt-2">
                        {slot.about_me && slot.about_me.trim() !== '' ? slot.about_me : 'Sem informação'}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-medium text-gray-700 text-sm">
                      HORÁRIO DISPONÍVEL: <span className="font-bold">{slot.start_time.slice(0,5)}</span>
                    </span>
                    <button
                      className="bg-purple-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-purple-800 transition"
                      onClick={() => handleAgendar(slot)}
                      disabled={agendandoId === slot.id}
                    >
                      {agendandoId === slot.id ? "Agendando..." : "Agendar"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center mt-2">
          <button
            className="px-8 py-2 border border-gray-200 rounded bg-white text-gray-500 font-semibold hover:bg-gray-50 transition"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentMenu;