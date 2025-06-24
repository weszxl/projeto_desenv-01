import React, { useEffect, useState } from 'react';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import NewStudent from '../components/admin/newStudent';
import { api } from '../api/axiosConfig';

const AdminPage = () => {
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('Todos os tipos');
  const [filtroStatus, setFiltroStatus] = useState('Todos os status');
  const tiposUsuario = [
    'Estudante',
    'Professor',
  ];
  const [showNewStudent, setShowNewStudent] = useState(false);

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await api.get('/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(data);
    } catch (err) {
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesBusca =
      user.nome?.toLowerCase().includes(busca.toLowerCase()) ||
      user.email?.toLowerCase().includes(busca.toLowerCase());
    const matchesTipo =
      filtroTipo === 'Todos os tipos' || user.tipo === filtroTipo;
    const matchesStatus =
      filtroStatus === 'Todos os status' ||
      (filtroStatus === 'Ativo' && user.status === 'ativo') ||
      (filtroStatus === 'Inativo' && user.status === 'inativo');
    return matchesBusca && matchesTipo && matchesStatus;
  });

  const handleSaveStudent = () => {
    setShowNewStudent(false);
    fetchUsers();
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header />
      <div className="flex flex-1">
        {/* MENU LATERAL */}
        <aside className="w-60 bg-white border-r border-gray-100 min-h-full pt-8">
          <nav className="flex flex-col gap-1">
            <a href="#" className="flex items-center px-8 py-3 font-medium text-gray-700 hover:bg-purple-50 transition">
              <span className="mr-3">
                <svg width="20" height="20" fill="none" className="inline-block text-gray-400" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" d="M3 13.5C3 9.35786 6.35786 6 10.5 6H13.5C17.6421 6 21 9.35786 21 13.5V19.5C21 20.3284 20.3284 21 19.5 21H4.5C3.67157 21 3 20.3284 3 19.5V13.5Z"/></svg>
              </span>
              Dashboard
            </a>
            <a href="#" className="flex items-center px-8 py-3 font-medium text-purple-700 bg-purple-100 rounded-l-lg">
              <span className="mr-3">
                <svg width="20" height="20" fill="none" className="inline-block text-purple-500" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12ZM21 20C21 16.134 16.4183 14 12 14C7.58172 14 3 16.134 3 20"/></svg>
              </span>
              Usuários
            </a>
            <a href="#" className="flex items-center px-8 py-3 font-medium text-gray-700 hover:bg-purple-50 transition">
              <span className="mr-3">
                <svg width="20" height="20" fill="none" className="inline-block text-gray-400" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" d="M7 7H17M7 12H17M7 17H13"/></svg>
              </span>
              Relatórios
            </a>
            <a href="#" className="flex items-center px-8 py-3 font-medium text-gray-700 hover:bg-purple-50 transition">
              <span className="mr-3">
                <svg width="20" height="20" fill="none" className="inline-block text-gray-400" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" d="M12 15V12M12 9H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/></svg>
              </span>
              Configurações
            </a>
          </nav>
        </aside>

        <main className="flex-1 p-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">Gerenciamento de Usuários</h2>
              <div className="flex gap-3">
                <button
                  className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                  onClick={() => setShowNewStudent(true)}
                >
                  + Novo Estudante
                </button>
                <button className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-2 rounded-lg shadow transition">
                  + Novo Professor
                </button>
              </div>
            </div>

            {/* FILTROS DE BUSCA */}
            <div className="flex flex-col md:flex-row items-center gap-3 mb-7">
              <input
                type="text"
                placeholder="Buscar usuários..."
                className="flex-1 px-4 py-2 rounded border border-gray-200 bg-gray-50"
                value={busca}
                onChange={e => setBusca(e.target.value)}
              />
              <select
                className="px-3 py-2 rounded border border-gray-200 bg-gray-50"
                value={filtroTipo}
                onChange={e => setFiltroTipo(e.target.value)}
              >
                <option>Todos os tipos</option>
                {tiposUsuario.map(tipo => (
                  <option key={tipo}>{tipo}</option>
                ))}
              </select>
              <select
                className="px-3 py-2 rounded border border-gray-200 bg-gray-50"
                value={filtroStatus}
                onChange={e => setFiltroStatus(e.target.value)}
              >
                <option>Todos os status</option>
                <option>Ativo</option>
                <option>Inativo</option>
              </select>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-100 px-0 md:px-4 py-3">
              <table className="w-full min-w-max divide-y divide-gray-100">
                <thead>
                  <tr className="text-gray-400 text-sm">
                    <th className="font-semibold text-left p-3">Nome</th>
                    <th className="font-semibold text-left p-3">Email</th>
                    <th className="font-semibold text-left p-3">Tipo</th>
                    <th className="font-semibold text-left p-3">Status</th>
                    <th className="font-semibold text-left p-3">Último Acesso</th>
                    <th className="font-semibold text-left p-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingUsers ? (
                    <tr>
                      <td colSpan={6}>
                        <div className="text-center text-gray-400 py-10">Carregando usuários...</div>
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6}>
                        <div className="text-center text-gray-400 py-10">Nenhum usuário encontrado.</div>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td className="p-3">{user.nome}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.tipo || "Estudante"}</td>
                        <td className="p-3 capitalize">{user.status || "ativo"}</td>
                        <td className="p-3">{user.ultimoAcesso ? new Date(user.ultimoAcesso).toLocaleString() : "-"}</td>
                        <td className="p-3">
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <div className="flex justify-between items-center py-2 px-4">
                <span className="text-xs text-gray-400">
                  Mostrando {filteredUsers.length} de {users.length} usuários
                </span>
                <div className="flex gap-1">
                  <button className="rounded px-3 py-1 text-sm text-gray-500 border border-gray-200 bg-gray-50" disabled>Anterior</button>
                  <button className="rounded px-3 py-1 text-sm text-white bg-purple-700">1</button>
                  <button className="rounded px-3 py-1 text-sm text-gray-500 border border-gray-200 bg-gray-50" disabled>Próximo</button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <NewStudent open={showNewStudent} onClose={() => setShowNewStudent(false)} onSave={handleSaveStudent} />
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;