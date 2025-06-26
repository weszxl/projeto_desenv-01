import React from "react";

const statusColors = {
  completed: "bg-green-100 text-green-700",
};
const statusLabels = {
  completed: "Realizada",
};

const DoneQueries = ({ consultas, onViewPatient }) => {
  if (!consultas || consultas.length === 0) {
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
  }

  return (
    <div>
      {consultas.map((appointment) => {
        const {
          id,
          patient_name,
          patient_photo,
          specialty,
          date,
          start_time,
          status,
        } = appointment;

        return (
          <div
            key={id}
            className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row justify-between items-center"
          >
            <div className="flex-1 w-full">
              <div className="font-bold text-lg text-purple-900 mb-2 flex items-center gap-3">
                {patient_photo && (
                  <img
                    src={patient_photo}
                    alt={patient_name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                )}
                {patient_name}
              </div>
              <div className="flex gap-8 text-sm mb-1">
                <div>
                  <div className="text-gray-400">Data e Horário</div>
                  <div className="font-medium">
                    {date && start_time
                      ? `${new Date(date).toLocaleDateString("pt-BR")} às ${start_time.slice(0, 5)}`
                      : "--"}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Especialidade</div>
                  <div className="font-medium">{specialty}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className={`px-3 py-1 rounded ${statusColors[status]} text-xs font-semibold`}
                >
                  {statusLabels[status]}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:items-end mt-6 md:mt-0">
              <div className="flex gap-2 mb-2">
                <button
                  className="bg-gray-100 text-gray-900 font-semibold px-4 py-1 rounded hover:bg-gray-200 transition"
                  onClick={() => onViewPatient && onViewPatient(appointment)}
                >
                  Ver Paciente
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DoneQueries;