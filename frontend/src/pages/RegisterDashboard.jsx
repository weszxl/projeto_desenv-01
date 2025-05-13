import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/api/patients/register', {
        name,
        email,
        password
      });

      if (response.data.id) {
        // autentica o usuário automaticamente após o cadastro
        const loginResponse = await api.post('/api/auth/login', {
          email,
          password,
          role: 'patient'
        });
        
        if (loginResponse.data.token) {
          login(loginResponse.data.token, 'patient');
          navigate('/paciente');
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao cadastrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between h-16 px-6">
          <img src="./icons/logo.png" alt="Logo" className="h-8 w-8" />
          <nav className="space-x-8">
            <a href="#sobre" className="hover:underline">Sobre nós</a>
            <a href="#contato" className="hover:underline">Entre em contato</a>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition"
            >
              Fazer login
            </button>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Crie sua conta</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                minLength="6"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded-lg text-white font-medium ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Já tem uma conta?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline"
            >
              Faça login
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="contato" className="mt-auto bg-blue-600 text-white py-12">
        <div className="max-w-screen-xl mx-auto text-center px-6 space-y-4">
          <h3 className="text-2xl font-semibold">Fale conosco</h3>
          <p className="text-gray-100">
            E-mail: contato@psicofacil.com &nbsp;|&nbsp; Telefone: (XX) XXXX-XXXX
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" aria-label="Instagram">
              <img src="./icons/instagram.svg" alt="Instagram" className="h-8 w-8" />
            </a>
            <a href="#" aria-label="Facebook">
              <img src="./icons/facebook.svg" alt="Facebook" className="h-8 w-8" />
            </a>
            <a href="#" aria-label="WhatsApp">
              <img src="./icons/whatsapp.svg" alt="WhatsApp" className="h-8 w-8" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;