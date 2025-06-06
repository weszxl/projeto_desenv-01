import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { api } from '../api/axiosConfig'; 

const AdminPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    // verificar se é admin
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      window.location.href = '/nao-autorizado';
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    try {
      const res = await api.post('/users/register/student', {
        name,
        email,
        password,
      });

      setMensagem(`Estudante ${res.data.user.name} cadastrado!`);
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.error || 'erro no cadastro de estudante');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

      
      <Header />

      <main className="flex-1 px-6 py-10 max-w-xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Painel do Administrador
        </h1>

        <section className="bg-white border rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Cadastrar novo estudante
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#79FFF4] to-[#72FFDE] text-white font-semibold py-2 px-6 rounded hover:opacity-90 transition"
            >
              Cadastrar Estudante
            </button>

            {mensagem && <p className="text-green-600 mt-2">{mensagem}</p>}
            {erro && <p className="text-red-600 mt-2">{erro}</p>}
            
          </form>
        </section>
      </main>

      {/* FOOTER (COMPONENT) */}
      <Footer />
    </div>
  );
};

export default AdminPage;

