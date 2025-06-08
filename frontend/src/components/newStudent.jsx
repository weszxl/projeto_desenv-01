import React, { useEffect, useState } from 'react';

const NewStudent = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: ''
  });

  const [error, setError] = useState('');

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.cpf || !form.senha) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    // INTEGRAÇÃO
    if (onSave) onSave(form);
    setForm({
      nome: '',
      email: '',
      cpf: '',
      senha: ''
    });
  };

  const handleClose = () => {
    setForm({
      nome: '',
      email: '',
      cpf: '',
      senha: ''
    });
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-purple-700 text-2xl"
          onClick={handleClose}
          aria-label="Fechar"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold text-purple-700 mb-6">Cadastrar Novo Estudante</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CPF *</label>
            <input
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha *</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 bg-gray-50"
              required
            />
          </div>
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
          <div className="flex gap-3 mt-3">
            <button
              type="submit"
              className="flex-1 py-2 rounded bg-purple-700 text-white font-semibold hover:bg-purple-800 transition"
            >
              Salvar
            </button>
            <button
              type="button"
              className="flex-1 py-2 rounded border border-gray-300 text-gray-500 font-semibold hover:bg-gray-50 transition"
              onClick={handleClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewStudent;