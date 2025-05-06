import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/axiosConfig';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/login', { email, password });
      
      if (response.data.token) {
        login(response.data.token, response.data.role);
        onClose();
        // redirecionamento conforme user
        response.data.role === 'student' 
          ? navigate('/student-homepage') 
          : navigate('/patient-homepage');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Acessar conta</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Digite seu email"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Digite sua senha"
            />
          </div>

          {error && <p className="text-red-600 text-sm">⚠️ {error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Acessar conta
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-sm text-gray-600">
            Ainda não é cadastrado?{' '}
            <button 
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:underline"
            >
              Fazer cadastro
            </button>
          </p>
          
          <p className="text-sm text-gray-600 pt-4 border-t border-gray-200">
            Estuda?{' '}
            <button
              onClick={() => navigate('/voluntary')}
              className="text-blue-600 hover:underline"
            >
              Faz a boa pra nós!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
