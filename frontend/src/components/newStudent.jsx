import React, { useState } from 'react';
import { api } from '../api/axiosConfig';

const NewStudent = ({ open, onClose, onSave }) => {
  const [tab, setTab] = useState('personal');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birth_date: '',
    cep: '',
    about_me: '',
    photo_url: null,
    course_name: '',
    institution: '',
    semester: '',
    register_number: '',
    academic_status: 'active',
    start_date: '',
    end_date: '',
    academic_observation: '',
  });
  const [error, setError] = useState({ message: '', tab: '' });
  const [success, setSuccess] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError({ message: '', tab: '' });
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
    const missingPersonal = !form.name || !form.email || !form.phone || !form.cpf || !form.birth_date || !form.cep;
    const missingAcademic =
      !form.course_name ||
      !form.institution ||
      !form.semester ||
      !form.register_number ||
      !form.start_date ||
      !form.end_date;

    if (missingPersonal) {
      setError({ message: 'Preencha todos os campos obrigatórios em Dados Pessoais.', tab: 'personal' });
      setTab('personal');
      return;
    }

    if (missingAcademic) {
      setError({ message: 'Preencha todos os campos obrigatórios em Dados Acadêmicos.', tab: 'academic' });
      setTab('academic');
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
      formData.append('course_name', form.course_name);
      formData.append('institution', form.institution);
      formData.append('semester', form.semester);
      formData.append('register_number', form.register_number);
      formData.append('academic_status', form.academic_status);
      formData.append('start_date', form.start_date);
      formData.append('end_date', form.end_date);
      formData.append('academic_observation', form.academic_observation);

      await api.post('/students/register', formData);

      setError({ message: '', tab: '' });
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
        course_name: '',
        institution: '',
        semester: '',
        register_number: '',
        academic_status: 'active',
        start_date: '',
        end_date: '',
        academic_observation: '',
      });
      setPhotoPreview(null);
      setTimeout(() => {
        setSuccess('');
        onSave && onSave();
        onClose();
      }, 1200);
    } catch (err) {
      setError({
        message:
          err.response?.data?.error || 'Erro ao cadastrar estudante. Verifique se os dados estão corretos.',
        tab: '',
      });
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
      course_name: '',
      institution: '',
      semester: '',
      register_number: '',
      academic_status: 'active',
      start_date: '',
      end_date: '',
      academic_observation: '',
    });
    setPhotoPreview(null);
    setError({ message: '', tab: '' });
    setSuccess('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-[800px] p-10 relative max-h-[90vh] overflow-auto">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-purple-700 text-2xl bg-transparent border-none p-0 m-0 focus:outline-none"
          onClick={handleClose}
          aria-label="Fechar"
        >
          &times;
        </button>

        <div className="flex gap-6 mb-5 justify-start">
          <button
            className={`pb-1 font-semibold cursor-pointer ${
              tab === 'personal' ? 'border-b-2 border-purple-700 text-purple-700' : 'text-gray-400'
            }`}
            onClick={() => setTab('personal')}
          >
            Dados Pessoais
          </button>
          <button
            className={`pb-1 font-semibold cursor-pointer ${
              tab === 'academic' ? 'border-b-2 border-purple-700 text-purple-700' : 'text-gray-400'
            }`}
            onClick={() => setTab('academic')}
          >
            Dados Acadêmicos
          </button>
        </div>

        {tab === 'personal' && (
          <>
            <h3 className="text-xl font-bold text-purple-700 mb-6 text-center">Adicionar foto</h3>

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
                <label className="block text-sm font-medium mb-1">Nome Completo *</label>
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
                  className="w-full border rounded px-4 py-2 bg-gray-200"
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
                <label className="block text-sm font-medium mb-1">Sobre você</label>
                <textarea
                  name="about_me"
                  value={form.about_me}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2 bg-gray-200"
                  rows="4"
                />
              </div>
            </form>
          </>
        )}

        {tab === 'academic' && (
          <>
            <h3 className="text-xl font-bold text-purple-700 mb-6 text-center">Dados Acadêmicos</h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-4 text-black">
              <div>
                <label className="block text-sm font-medium mb-1">Curso *</label>
                <input
                  type="text"
                  name="course_name"
                  value={form.course_name}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2 bg-gray-200"
                  required
                  placeholder="Digite o nome do curso"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Instituição *</label>
                <input
                  type="text"
                  name="institution"
                  value={form.institution}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2 bg-gray-200"
                  required
                  placeholder="Digite a instituição"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Semestre *</label>
                <input
                  type="number"
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2 bg-gray-200"
                  required
                  placeholder="Semestre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Número de Matrícula *</label>
                <input
                  type="text"
                  name="register_number"
                  value={form.register_number}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2 bg-gray-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Situação Acadêmica *</label>
                <select
                  name="academic_status"
                  value={form.academic_status}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2 bg-gray-200"
                  required
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Data de Início *</label>
                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2 bg-gray-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Data de Término *</label>
                <input
                  type="date"
                  name="end_date"
                  value={form.end_date}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2 bg-gray-200"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Observações Acadêmicas</label>
                <textarea
                  name="academic_observation"
                  value={form.academic_observation}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2 bg-gray-200"
                  rows="4"
                />
              </div>
            </form>
          </>
        )}

        <div className="mt-6 text-center">
          {error.message && <p className="text-red-600">{error.message}</p>}
          {success && <p className="text-green-600">{success}</p>}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleSubmit}
              className="px-8 py-2 bg-purple-700 text-white rounded"
            >
              Salvar
            </button>
            <button
              onClick={handleClose}
              className="px-8 py-2 bg-gray-400 text-white rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStudent;
