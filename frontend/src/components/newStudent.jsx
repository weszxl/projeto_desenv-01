import React, { useState } from 'react';
import { api } from '../api/axiosConfig';

const NewStudent = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birth_date: '',
    cep: '',
    about_me: '',
    photo_url: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, photo_url: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.cpf ||
      !form.birth_date ||
      !form.cep
    ) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('cpf', form.cpf);
      formData.append('birth_date', form.birth_date);
      formData.append('cep', form.cep);
      formData.append('about_me', form.about_me);
      if (form.photo_url) {
        formData.append('photo_url', form.photo_url);
      }

      await api.post('/students/register', formData);

      setSuccess('Estudante cadastrado com sucesso!');
      setForm({
        name: '',
        email: '',
        phone: '',
        cpf: '',
        birth_date: '',
        cep: '',
        about_me: '',
        photo_url: null,
      });
      setPhotoPreview(null);
      setTimeout(() => {
        setSuccess('');
        onSave && onSave();
        onClose();
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          'Erro ao cadastrar estudante. Verifique se o CPF ou e-mail já existe.'
      );
    }
  };

  const handleClose = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      birth_date: '',
      cep: '',
      about_me: '',
      photo_url: null,
    });
    setPhotoPreview(null);
    setError('');
    setSuccess('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-[800px] p-10 relative">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-purple-700 text-2xl bg-transparent border-none p-0 m-0 focus:outline-none"
          onClick={handleClose}
          aria-label="Fechar"
        >
          &times;
        </button>

        <div className="flex gap-6 mb-5 justify-start">
          <button className="border-b-2 border-purple-700 pb-1 font-semibold text-purple-700 cursor-default">
            Dados Pessoais
          </button>
          <button
            className="pb-1 text-gray-400 cursor-not-allowed"
            disabled
            title="Funcionalidade em desenvolvimento"
          >
            Dados Acadêmicos
          </button>
        </div>

        <h3 className="text-xl font-bold text-purple-700 mb-6 text-center">
          Adicionar foto
        </h3>

        <div className="flex justify-center mb-6">
          <label htmlFor="photo-upload" className="cursor-pointer">
            <div
              className="w-[110px] h-[110px] rounded-full border-2 border-dashed border-purple-700 flex items-center justify-center text-4xl text-purple-700 bg-cover bg-center"
              style={{
                backgroundImage: photoPreview ? `url(${photoPreview})` : 'none',
              }}
            >
              {!photoPreview && '+'}
            </div>
          </label>
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-4 text-black">
          <div>
            <label className="block text-sm font-medium mb-1 ">Nome Completo *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 bg-gray-200 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 bg-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Telefone/Contato *</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 bg-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">CPF *</label>
            <input
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 bg-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Data de Nascimento *</label>
            <input
              type="date"
              name="birth_date"
              value={form.birth_date}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 bg-gray-200 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">CEP *</label>
            <input
              type="text"
              name="cep"
              value={form.cep}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 bg-gray-200"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Sobre mim</label>
            <textarea
              name="about_me"
              value={form.about_me}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded px-4 py-2 bg-gray-200"
            ></textarea>
          </div>

          {error && <div className="col-span-2 text-red-500 text-xs">{error}</div>}
          {success && <div className="col-span-2 text-green-600 text-xs">{success}</div>}

          <div className="col-span-2 flex gap-3 mt-3">
            <button
              type="submit"
              className="flex-1 py-2 rounded bg-purple-700 text-white font-semibold hover:bg-purple-800 transition"
            >
              Salvar alterações
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
