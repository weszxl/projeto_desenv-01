import React from "react";

const statusColors = {
  scheduled: "bg-green-100 text-green-700",
};
const statusLabels = {
  scheduled: "Confirmada",
};

const OngoingQueries = ({
  consultas,
  onCancel,
  onViewPatient,
  onJoin,
  profileLoading,
}) => {
  if (!consultas || consultas.length === 0) {
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
          Nenhum paciente agendou com você ainda.
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
          meet_link,
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
                <button
                  className="bg-red-100 text-red-700 font-semibold px-4 py-1 rounded hover:bg-red-200 transition"
                  onClick={() => onCancel && onCancel(appointment)}
                  disabled={status !== "scheduled"}
                >
                  Cancelar
                </button>
              </div>
              {meet_link && status === "scheduled" && (
                <a
                  href={meet_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-700 text-white px-8 py-2 rounded font-semibold hover:bg-purple-800 transition text-center"
                >
                  Acessar Consulta
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OngoingQueries;