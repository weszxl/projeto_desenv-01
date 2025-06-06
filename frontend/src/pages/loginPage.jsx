import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/axiosConfig';
import { useLocation } from 'react-router-dom';



const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      // armazena token e usuário no localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // redireciona baseado no tipo de usuário
      switch(response.data.user.role) {
        case 'patient':
          navigate('/patientPage');
          break;
        case 'student':
          navigate('/studentPage');
          break;
        case 'admin':
          navigate('/adminPage');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      console.error('erro no login:', err);
      
      if (err.response) {
        setError(err.response.data.error || 'credenciais inválidas');
      } else if (err.request) {
        setError('problema de conexão com o servidor');
      } else {
        setError('erro ao fazer login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-cyan-300 to-teal-200 relative items-center justify-center">
        <img
          src="/calendar-illustration.png"
          alt="Calendário com médicos"
          className="max-w-[75%]"
        />

        <div className="absolute bottom-6 left-6 text-gray-700 text-sm font-medium">
          <div className="flex items-center gap-1">
            <span>APP Health</span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-between p-8 bg-white">
        {/* BOTÃO DE VOLTAR */}
        <button onClick={() => navigate(-1)} className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex-grow flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
            Olá!
          </h1>
          <p className="text-lg md:text-xl text-blue-600 mb-6 font-medium">
            Seja bem vindo de volta!
          </p>

          <h2 className="text-xl md:text-2xl text-blue-600 font-semibold mb-8">
            Faça seu login
          </h2>

          {location.state?.success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              {location.state.success}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Insira seu Email"
              className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Insira sua Senha"
              className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-500"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="text-right text-sm">
              <Link to="/recuperar-senha" className="text-blue-600 hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'LOGIN'}
            </button>
          </form>

          <div className="mt-4 text-sm text-center">
            <Link to="/cadastro" className="text-blue-600 hover:underline">
              Crie uma conta
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
    </div>
  );
};

export default LoginPage;
