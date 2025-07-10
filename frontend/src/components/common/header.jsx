import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-[#10ffbf] to-[#56f6e8] shadow-md py-4 px-6 flex justify-between items-center">      <Link to="/">

        <img src="../icons/logoteste.png" alt="Logo" className="h-10" />



      </Link>

      <nav className="flex space-x-4">
        {isLoggedIn && user ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none bg-transparent"
            >
              <img
                src={user.image || "https://via.placeholder.com/32"}
                alt="Avatar do usuário"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-gray-700">{user.name}</span>
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                
                {user.role === "student" && (
                  <Link
                    to="/studentPage-availability"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Meus horários
                  </Link>
                )}
                
                <Link
                  to={
                    user.role === "patient"
                      ? "/patientPage-dados"
                      : user.role === "student"
                      ? "/studentPage-dados"
                      : user.role === "admin"
                      ? "/adminPage-dados"
                      : "/"
                  }
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Meus dados
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/cadastro"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Cadastre-se
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
            >
              Entrar
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
