import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const tiposConsulta = [
  { label: 'Selecione o tipo', value: '' },
  { label: 'Psicologia', value: 'psicologia' },
  { label: 'Nutrição', value: 'nutricao' },
];

const AppointmentMenu = ({ open, onClose }) => {
  const today = new Date();
  const [tipo, setTipo] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(true);

  const isLastMonthOfYear = today.getMonth() === 11;
  const lastAllowedYear = today.getFullYear();
  const lastAllowedMonth = isLastMonthOfYear ? 0 : today.getMonth() + 1;
  const lastAllowedDate = isLastMonthOfYear
    ? new Date(today.getFullYear() + 1, 0, 31)
    : new Date(today.getFullYear(), today.getMonth() + 2, 0);

  const fromMonth = today;
  const toMonth = isLastMonthOfYear
    ? new Date(today.getFullYear() + 1, 0)
    : new Date(today.getFullYear(), today.getMonth() + 1);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
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
                onSelect={setSelectedDate}
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
              <div className="flex justify-end w-full mt-2">
                <button
                  className={`text-purple-700 font-semibold px-3 py-1 rounded hover:bg-purple-100 transition ${
                    selectedDate ? '' : 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!selectedDate}
                  onClick={() => setCalendarOpen(false)}
                >
                  OK
                </button>
              </div>
            </div>
          ) : selectedDate ? (
            <div className="flex items-center justify-between bg-purple-50 rounded px-4 py-2 mt-1">
              <span className="text-purple-700 font-medium">
                {selectedDate.toLocaleDateString('pt-BR')}
              </span>
              <button
                className="text-xs text-purple-700 underline hover:text-purple-900 ml-2"
                onClick={() => setCalendarOpen(true)}
              >
                Alterar
              </button>
            </div>
          ) : null}
        </div>
        <div className="mb-6">
          <span className="block font-medium text-gray-800 mb-2">Estudantes Disponíveis</span>
          <div className="text-center text-gray-400 border border-gray-200 rounded p-4">
            Nenhum estudante disponível para os filtros selecionados.
          </div>
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