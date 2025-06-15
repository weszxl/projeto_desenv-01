import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../api/axiosConfig';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem. Por favor, verifique.');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      navigate('/login', {
        state: {
          success: 'Cadastro realizado com sucesso! Agora você pode fazer login.'
        }
      });
    } catch (err) {
      console.error('erro no cadastro:', err);

      if (err.response) {
        setError(err.response.data.error || 'Erro ao cadastrar usuário. Tente novamente.');
      } else if (err.request) {
        setError('Problema de conexão com o servidor. Verifique sua internet ou tente novamente.');
      } else {
        setError('Ocorreu um erro inesperado ao fazer o cadastro. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-white">
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8  left-8 bg-white border border-gray-200 rounded-lg hover:bg-cyan-100 text-gray-500 hover:text-gray-700 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex flex-col items-start px-8 py-16 w-full max-w-sm mx-auto">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
            Olá!
          </h1>
          <p className="text-2xl text-blue-700 mb-10 font-medium">
            Crie sua conta agora!
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mb-10 self-center text-center">
            Cadastre-se como paciente
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md w-full">
              {error}
            </div>
          )}

          <form className="space-y-10 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-6 items-center justify-center">
              <input
                type="text"
                name="name"
                placeholder="Insira seu Nome"
                className="min-w-96 border-b border-gray-500 py-3 px-3 focus:outline-none focus:border-blue-600 placeholder-gray-400 text-gray-800 text-lg bg-white"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Insira seu Email"
                className="min-w-96 border-b border-gray-500 py-3 px-3 focus:outline-none focus:border-blue-600 placeholder-gray-400 text-gray-800 text-lg bg-white"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Insira sua Senha"
                className="min-w-96 border-b border-gray-500 py-3 px-3 focus:outline-none focus:border-blue-600 placeholder-gray-400 text-gray-800 text-lg bg-white"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirme a Senha"
                className="min-w-96 border-b border-gray-500 py-3 px-3 focus:outline-none focus:border-blue-600 placeholder-gray-400 text-gray-800 text-lg bg-white"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
          </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white font-bold py-4 rounded hover:bg-blue-800 transition disabled:opacity-50 text-xl tracking-wide"
              disabled={loading}
            >
              {loading ? 'CADASTRANDO...' : 'CADASTRAR'}
            </button>
          </form>

          <div className="mt-6 text-base text-center w-full">
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Já tem uma conta? Faça login
            </Link>
          </div>
        </div>

        <div className="w-full text-xs text-gray-500 flex flex-wrap justify-center gap-6 mt-12 text-center">
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Guide</a>
          <a href="#" className="hover:underline">FAQ</a>
          <a href="#" className="hover:underline">Report Vulnerability</a>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#7AFFF4] to-[#72FFDF] relative items-center justify-center p-8">
        <img
          src="/images/psychology-illustration.png"
          alt="Ilustração com tema de psicologia"
          className="max-w-[75%] h-auto object-contain"
        />

        <div className="absolute bottom-8 left-8 text-blue-800 text-base font-semibold">
          <div className="flex items-center gap-1">
            <span>APP Health</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;