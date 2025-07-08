import React, { useState, useEffect } from 'react';
import { api } from '../api/axiosConfig';

import NewStudent from '../components/professors/newStudent';
import Header from "../components/common/header";
import Footer from "../components/common/footer";

const ProfessorPage = () => {
  const [students, setStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const res = await api.get('/users/professor/students');
        setStudents(res.data);
      } catch (err) {
        setStudents([]);
      }
      setLoading(false);
    };
    fetchStudents();
  }, [reload]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-start py-10 px-4">
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-purple-700 mb-6">Meus Alunos</h2>
          <button
            className="mb-6 px-4 py-2 rounded bg-purple-700 text-white font-semibold hover:bg-purple-800 transition"
            onClick={() => setModalOpen(true)}
          >
            Cadastrar Novo Estudante
          </button>
          <NewStudent
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={() => setReload(r => !r)}
          />
          {loading ? (
            <p>Carregando...</p>
          ) : students.length === 0 ? (
            <p>Nenhum estudante cadastrado ainda.</p>
          ) : (
            <ul className="space-y-3">
              {students.map((s) => (
                <li key={s.id} className="border rounded px-4 py-2 shadow">
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-sm text-gray-600">{s.email}</div>
                  {s.cpf && <div className="text-xs text-gray-400">CPF: {s.cpf}</div>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfessorPage;