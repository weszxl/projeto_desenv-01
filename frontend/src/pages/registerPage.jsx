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
      setError('As senhas não coincidem');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
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
          success: 'Cadastro realizado! Faça login.' 
        } 
      });
    } catch (err) {
      console.error('erro no cadastro:', err);
      
      if (err.response) {
        setError(err.response.data.error || 'Erro ao cadastrar usuário');
      } else if (err.request) {
        setError('Problema de conexão com o servidor');
      } else {
        setError('Ocorreu um erro ao fazer cadastro');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-8 bg-white">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} />
        </button>

        <div className="flex-grow flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
            Olá!
          </h1>
          <p className="text-lg md:text-xl text-blue-600 mb-6 font-medium">
            Crie sua conta agora!
          </p>

          <h2 className="text-xl md:text-2xl text-blue-600 font-semibold mb-8">
            Cadastre-se como paciente
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Insira seu Nome"
              className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-500"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Insira seu Email"
              className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-500"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Insira sua Senha"
              className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-500"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirme a Senha"
              className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-500"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : 'CADASTRAR'}
            </button>
          </form>

          <div className="mt-4 text-sm text-center">
            <Link to="/login" className="text-blue-600 hover:underline">
              Já tem uma conta? Faça login
            </Link>
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-12 text-xs text-gray-500 flex flex-wrap justify-center gap-4">
          <a href="#">Contact</a>
          <a href="#">Guide</a>
          <a href="#">FAQ</a>
          <a href="#">Report Vulnerability</a>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-cyan-300 to-teal-200 relative">
        <div className="absolute bottom-6 right-6 text-gray-700 text-sm font-medium">
          <div className="flex items-center gap-1">
            <span>APP Health</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
