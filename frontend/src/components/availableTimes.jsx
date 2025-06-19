import React from 'react';

const isoToBR = (isoDate) => {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const AvailableTimes = ({ horarios, onDelete }) => (
  <div className="mt-10">
    <h2 className="font-semibold text-lg text-gray-800 mb-4">Seus Horários</h2>
    {(!horarios || horarios.length === 0) ? (
      <div className="rounded-md border bg-gray-50 px-6 py-4 shadow-sm text-gray-400 text-center">
        Nenhum horário cadastrado ainda.
      </div>
    ) : (
      <div className="space-y-4">
        {horarios.map((h) => (
          <div
            key={h.id}
            className="flex flex-col md:flex-row items-center rounded-lg shadow border bg-white px-6 py-4"
          >
            <div className="flex-1 flex flex-col md:flex-row md:items-center gap-6">
              <div>
                <div className="text-xs text-gray-400 mb-1">Data e Horário</div>
                <div className="font-medium text-gray-900">
                  {isoToBR(h.date)} às {h.start_time.slice(0,5)}
                  {h.end_time && ` — ${h.end_time.slice(0,5)}`}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Especialidade</div>
                <div className="font-medium text-gray-900">
                  {h.specialty || <span className="text-gray-400">—</span>}
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 w-full md:w-auto flex justify-end">
              <button
                className="bg-red-100 text-red-700 px-4 py-2 rounded-md font-semibold hover:bg-red-200 transition"
                onClick={() => onDelete && onDelete(h.id)}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default AvailableTimes;