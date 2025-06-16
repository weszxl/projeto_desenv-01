import React from 'react';

const WarningCompleteProfileStudent = ({ open, onClose, onGoToProfile }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center relative">
        <h2 className="text-xl font-bold text-red-600 mb-4">Perfil incompleto</h2>
        <p className="text-gray-700 mb-6">
          Complete seu perfil para adicionar horários.
        </p>
        <button
          className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-8 rounded transition"
          onClick={onGoToProfile}
        >
          Ok
        </button>
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Fechar aviso"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default WarningCompleteProfileStudent;