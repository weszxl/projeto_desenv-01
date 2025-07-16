import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../api/axiosConfig';

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

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      switch (response.data.user.role) {
        case 'patient':
          navigate('/patientPage');
          break;
        case 'student':
          navigate('/studentPage');
          break;
        case 'admin':
          navigate('/adminPage');
          break;
        case 'professor':
          navigate('/professorPage');
          break;

        default:
          navigate('/');
      }
    } catch (err) {
      console.error('erro no login:', err);

      if (err.response) {
        setError(err.response.data.error || 'Credenciais inválidas. Por favor, verifique seu email e senha.');
      } else if (err.request) {
        setError('Problema de conexão com o servidor. Verifique sua internet ou tente novamente.');
      } else {
        setError('Erro ao fazer login. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="h-screen w-screen overflow-hidden flex bg-white">
      <div className="hidden md:flex w-1/2 bg-gradient-to-r from-[#10ffbf] to-[#56f6e8] relative items-center justify-center p-8">
        <img
          src="/icons/homePage/login-icon.png"
          alt="Ilustração com tema de psicologia"
          className="max-w-[75%] h-auto object-contain"
        />

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
            <img src="/icons/logoteste.png" alt="Logo APP Health" className="h-12" />
        </div>
      </div>

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
            Seja bem-vindo de volta!
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mb-10 self-center text-center">
            Faça seu login
          </h2>


          {location.state?.success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md w-full">
              {location.state.success}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md w-full">
              {error}
            </div>
          )}

          <form className="space-y-8 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center">
              <input
                type="email"
                placeholder="Insira seu Email"
                className="min-w-96 border-b border-gray-500 py-3 px-3 focus:outline-none focus:border-blue-600 placeholder-gray-400 text-gray-800 text-lg bg-white"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Insira sua Senha"
                className="min-w-96 mt-8 border-b border-gray-500 py-3 px-3 focus:outline-none focus:border-blue-600 placeholder-gray-400 text-gray-800 text-lg bg-white"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-center text-base mt-2">
              <Link to="/recuperar-senha" className="text-blue-600 hover:underline font-medium">
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white font-bold py-4 rounded hover:bg-blue-800 transition disabled:opacity-50 text-xl tracking-wide"
              disabled={loading}
            >
              {loading ? 'CARREGANDO...' : 'LOGIN'}
            </button>
          </form>

          <div className="mt-6 text-base text-center w-full">
            <Link to="/cadastro" className="text-blue-600 hover:underline font-medium">
              Crie uma conta
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 text-xs flex flex-wrap justify-center gap-6 text-center">
          <a href="#" className="text-gray-500 hover:underline">Contact</a>
          <a href="#" className="text-gray-500 hover:underline">Guide</a>
          <a href="#" className="text-gray-500 hover:underline">FAQ</a>
          <a href="#" className="text-gray-500 hover:underline">Report Vulnerability</a>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;