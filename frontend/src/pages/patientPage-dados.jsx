import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
// import { api } from '../api/axiosConfig'; 

const PatientPageDados = () => {
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formPessoal, setFormPessoal] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    nascimento: '',
    cep: '',
    sobre: ''
  });

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleChangePessoal = (e) => {
    setFormPessoal({ ...formPessoal, [e.target.name]: e.target.value });
  };

  const handleCancelarPessoal = () => {
    setFormPessoal({
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      nascimento: '',
      cep: '',
      sobre: ''
    });
    setFoto(null);
    setPreview(null);
  };

  const handleSubmitPessoal = (e) => {
    e.preventDefault();
    // integração
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header />
      <main className="flex-grow py-10 px-2">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Editar Dados do Paciente</h1>
          <p className="text-gray-600 mb-6">Atualize suas informações pessoais</p>
          <div className="bg-white rounded-lg shadow px-5 py-7">
            <div className="flex border-b mb-8">
              <button
                className={`py-2 px-6 font-medium focus:outline-none border-b-2 border-purple-600 text-purple-700`}
                disabled
              >
                Dados Pessoais
              </button>
            </div>

            {/* DADOS PESSOAIS */}
            <form className="flex flex-col items-center" onSubmit={handleSubmitPessoal}>
              <div className="flex flex-col items-center mb-8 w-full">
                <div className="relative">
                  <label htmlFor="foto-upload" className="cursor-pointer">
                    <div className="w-28 h-28 rounded-full bg-gray-100 border-2 border-gray-200 flex flex-col items-center justify-center overflow-hidden">
                      {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.672 2-1.5S13.104 8 12 8s-2 .672-2 1.5S10.896 11 12 11zm0 0v3M6.75 17.25h10.5a2.25 2.25 0 002.25-2.25V8.25A2.25 2.25 0 0017.25 6h-10.5A2.25 2.25 0 004.5 8.25v6.75a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                          <span className="text-gray-400 text-sm">Foto</span>
                        </div>
                      )}
                    </div>
                    <span className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-1 border-2 border-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </label>
                  <input
                    id="foto-upload"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleFotoChange}
                  />
                </div>
                <span className="text-xs text-gray-400 mt-2">
                  Clique para alterar a foto do perfil<br />
                  Formatos aceitos: JPG, PNG (máx. 5MB)
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
                  <input type="text" name="nome" value={formPessoal.nome} onChange={handleChangePessoal} className="w-full border rounded px-4 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" name="email" value={formPessoal.email} onChange={handleChangePessoal} className="w-full border rounded px-4 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone/Contato *</label>
                  <input type="tel" name="telefone" value={formPessoal.telefone} onChange={handleChangePessoal} className="w-full border rounded px-4 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CPF *</label>
                  <input type="text" name="cpf" value={formPessoal.cpf} onChange={handleChangePessoal} className="w-full border rounded px-4 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento *</label>
                  <input type="date" name="nascimento" value={formPessoal.nascimento} onChange={handleChangePessoal} className="w-full border rounded px-4 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CEP *</label>
                  <input type="text" name="cep" value={formPessoal.cep} onChange={handleChangePessoal} className="w-full border rounded px-4 py-2" required />
                </div>
              </div>
              <div className="w-full mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sobre Mim</label>
                <textarea name="sobre" value={formPessoal.sobre} onChange={handleChangePessoal} className="w-full border rounded px-4 py-2 min-h-[64px]" />
              </div>
              <div className="flex flex-col md:flex-row w-full gap-3">
                <button type="submit" className="flex-1 py-2 rounded bg-purple-700 text-white font-semibold hover:bg-purple-800 transition mb-2 md:mb-0">Salvar Alterações</button>
                <button type="button" className="flex-1 py-2 rounded border border-gray-300 text-gray-500 font-semibold hover:bg-gray-50 transition" onClick={handleCancelarPessoal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientPageDados;