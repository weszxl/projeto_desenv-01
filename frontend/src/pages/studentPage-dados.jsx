import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import WarningCompleteProfileStudent from '../components/warningCompleteProfileStudent';
import { api } from '../api/axiosConfig';

// formatação
const formatPhone = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
    .slice(0, 15);
};

const formatCPF = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1.$2')
    .slice(0, 14);
};

const formatCEP = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d{1,3})$/, '$1-$2')
    .slice(0, 9);
};

const formatDateBR = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .slice(0, 10);
};

const isoToBR = (isoDate) => {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const brToISO = (dateBR) => {
  if (!dateBR) return '';
  const [day, month, year] = dateBR.split('/');
  if (!day || !month || !year) return '';
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const StudentPageDados = () => {
  const [selectedTab, setSelectedTab] = useState('pessoais');

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

  // form dados acadêmicos
  const [comprovante, setComprovante] = useState(null);
  const [comprovantePreview, setComprovantePreview] = useState(null);
  const [formAcademico, setFormAcademico] = useState({
    curso: '',
    instituicao: '',
    periodo: '',
    matricula: '',
    situacao: 'Ativo',
    ingresso: '',
    previsaoConclusao: '',
    observacoes: ''
  });

  // form disponibilidade
  const [data, setData] = useState('');
  const [horaInicial, setHoraInicial] = useState('');

  const [msg, setMsg] = useState(null);
  const [msgTipo, setMsgTipo] = useState(''); 
  const [loading, setLoading] = useState(true);

  const [openWarningProfile, setOpenWarningProfile] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(true); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/student/profile');
        setFormPessoal({
          nome: data.nome || '',
          email: data.email || '',
          telefone: formatPhone(data.phone || ''),
          cpf: formatCPF(data.cpf || ''),
          nascimento: isoToBR(data.birth_date) || '',
          cep: formatCEP(data.cep || ''),
          sobre: data.about_me || ''
        });
        setFormAcademico({
          curso: data.course_name || '',
          instituicao: data.institution || '',
          periodo: data.semester || '',
          matricula: data.register_number || '',
          situacao: data.academic_status === 'locked' ? 'Trancado' : 'Ativo',
          ingresso: data.start_date || '',
          previsaoConclusao: data.end_date || '',
          observacoes: ''
        });
        if (data.photo_url) setPreview(data.photo_url);
        if (data.enrolment_url) setComprovantePreview(data.enrolment_url);
        setProfileCompleted(!!data.profile_completed);
      } catch (error) {
        setMsg('Não foi possível carregar os dados.');
        setMsgTipo('erro');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleTabChange = (tab) => setSelectedTab(tab);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // comprovante de matrícula
  const handleComprovanteChange = (e) => {
    const file = e.target.files[0];
    setComprovante(file);
    if (file) setComprovantePreview(URL.createObjectURL(file));
  };

  // dados pessoais
  const handleChangePessoal = (e) => {
    let { name, value } = e.target;
    if (name === 'telefone') value = formatPhone(value);
    if (name === 'cpf') value = formatCPF(value);
    if (name === 'cep') value = formatCEP(value);
    if (name === 'nascimento') value = formatDateBR(value);
    setFormPessoal({ ...formPessoal, [name]: value });
  };

  // dados acadêmicos
  const handleChangeAcademico = (e) => {
    setFormAcademico({ ...formAcademico, [e.target.name]: e.target.value });
  };

  const handleCancelarPessoal = () => {
    window.location.reload();
  };

  const handleCancelarAcademico = () => {
    window.location.reload();
  };

  const handleSubmitPessoal = async (e) => {
    e.preventDefault();
    setMsg(null);
    setMsgTipo('');
    try {
      const payload = {
        phone: formPessoal.telefone.replace(/\D/g, ''),
        birth_date: brToISO(formPessoal.nascimento),
        cep: formPessoal.cep.replace(/\D/g, ''),
        about_me: formPessoal.sobre,
        photo_url: preview || '',
      };
      await api.put('/student/profile', payload);
      setMsg('Dados atualizados!');
      setMsgTipo('sucesso');
    } catch (err) {
      setMsg('Erro ao atualizar dados!');
      setMsgTipo('erro');
    }
  };

  const handleSubmitAcademico = async (e) => {
    e.preventDefault();
    setMsg(null);
    setMsgTipo('');
    try {
      const payload = {
        course_name: formAcademico.curso,
        institution: formAcademico.instituicao,
        semester: formAcademico.periodo,
        register_number: formAcademico.matricula,
        academic_status: formAcademico.situacao === 'Trancado' ? 'locked' : 'active',
        start_date: formAcademico.ingresso,
        end_date: formAcademico.previsaoConclusao,
        enrolment_url: comprovantePreview || ''
      };
      await api.put('/student/profile', payload);
      setMsg('Dados acadêmicos atualizados!');
      setMsgTipo('sucesso');
    } catch (err) {
      setMsg('Erro ao atualizar dados acadêmicos.');
      setMsgTipo('erro');
    }
  };

  // adicionar horário
  const handleDisponibilidadeSubmit = (e) => {
    e.preventDefault();
    // integração futura para horários
  };
  const handleDisponibilidadeCancelar = () => {
    setData('');
    setHoraInicial('');
  };

  // horário com base na hora inicial 
  const calcularHoraFinal = (horaInicial) => {
    if (!horaInicial) return '';
    const [hora, minuto] = horaInicial.split(':').map(Number);
    const date = new Date();
    date.setHours(hora);
    date.setMinutes(minuto);
    date.setMinutes(date.getMinutes() + 60);
    return date.toTimeString().slice(0,5);
  };
  const horaFinal = calcularHoraFinal(horaInicial);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-blue-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <span className="text-lg text-gray-600">Carregando dados...</span>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header />
      <main className="flex-grow py-10 px-2">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Editar Dados do Estudante</h1>
          <p className="text-gray-600 mb-6">Atualize as informações pessoais e acadêmicas do estudante</p>
          {msg && (
            <div className={`mb-4 p-3 rounded text-center ${msgTipo === 'erro' ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'}`}>
              {msg}
            </div>
          )}
          <div className="bg-white rounded-lg shadow px-5 py-7">
            {/* TABS */}
            <div className="flex border-b mb-8">
              <button
                className={`py-2 px-6 font-medium focus:outline-none ${
                  selectedTab === 'pessoais'
                    ? 'border-b-2 border-purple-600 text-purple-700'
                    : 'text-gray-600'
                }`}
                onClick={() => handleTabChange('pessoais')}
              >
                Dados Pessoais
              </button>
              <button
                className={`py-2 px-6 font-medium focus:outline-none ${
                  selectedTab === 'academicos'
                    ? 'border-b-2 border-purple-600 text-purple-700'
                    : 'text-gray-600'
                }`}
                onClick={() => handleTabChange('academicos')}
              >
                Dados Acadêmicos
              </button>
              <button
                className={`py-2 px-6 font-medium focus:outline-none ${
                  selectedTab === 'disponibilidade'
                    ? 'border-b-2 border-purple-600 text-purple-700'
                    : 'text-gray-600'
                }`}
                onClick={() => handleTabChange('disponibilidade')}
              >
                Disponibilidade
              </button>
            </div>

            {/* DADOS PESSOAIS */}
            {selectedTab === 'pessoais' && (
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
                    <input type="tel" name="telefone" value={formPessoal.telefone} onChange={handleChangePessoal} className="w-full border rounded px-4 py-2" required maxLength={15}/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CPF *</label>
                    <input type="text" name="cpf" value={formPessoal.cpf} onChange={handleChangePessoal} className="w-full border rounded px-4 py-2" required maxLength={14}/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento *</label>
                    <input type="text" name="nascimento" value={formPessoal.nascimento} onChange={handleChangePessoal} className="w-full border rounded px-4 py-2" required maxLength={10} placeholder="dd/mm/aaaa"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CEP *</label>
                    <input type="text" name="cep" value={formPessoal.cep} onChange={handleChangePessoal} className="w-full border rounded px-4 py-2" required maxLength={9}/>
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
            )}

            {/* DADOS ACADÊMICOS */}
            {selectedTab === 'academicos' && (
              <form className="flex flex-col items-center" onSubmit={handleSubmitAcademico}>
                <div className="flex flex-col items-center mb-6 w-full">
                  <div className="relative">
                    <label htmlFor="comprovante-upload" className="cursor-pointer">
                      <div className="w-40 h-20 rounded-lg bg-gray-100 border-2 border-gray-200 flex flex-col items-center justify-center overflow-hidden">
                        {comprovantePreview ? (
                          <span className="text-green-600 font-semibold text-sm">Arquivo selecionado</span>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11v6m0 0v-6m0 6h6m-6 0H6M12 11V5m0 6l4-4m-4 4L8 7"/>
                            </svg>
                            <span className="text-gray-400 text-xs text-center">Comprovante de matrícula</span>
                            <span className="text-gray-400 text-xs text-center">PDF, JPG, PNG (máx. 5MB)</span>
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
                      id="comprovante-upload"
                      type="file"
                      accept="application/pdf,image/png,image/jpeg"
                      className="hidden"
                      onChange={handleComprovanteChange}
                    />
                  </div>
                  <span className="text-xs text-gray-400 mt-2">
                    Clique para anexar o comprovante de matrícula
                  </span>
                  {comprovante && (
                    <span className="text-xs text-green-600 mt-1">{comprovante.name}</span>
                  )}
                </div>

                <div className="w-full mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instituição de Ensino *</label>
                  <input type="text" name="instituicao" value={formAcademico.instituicao} onChange={handleChangeAcademico} placeholder="Digite o nome da instituição" className="w-full border rounded px-4 py-2" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Curso *</label>
                    <input type="text" name="curso" value={formAcademico.curso} onChange={handleChangeAcademico} placeholder="Digite o nome do curso" className="w-full border rounded px-4 py-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Situação Acadêmica *</label>
                    <select name="situacao" value={formAcademico.situacao} onChange={handleChangeAcademico} className="w-full border rounded px-4 py-2 bg-gray-50" required>
                      <option value="Ativo">Ativo</option>
                      <option value="Trancado">Trancado</option>
                      <option value="Formado">Formado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Período/Semestre Atual *</label>
                    <input type="text" name="periodo" value={formAcademico.periodo} onChange={handleChangeAcademico} placeholder="Ex: 5º semestre" className="w-full border rounded px-4 py-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número de Matrícula *</label>
                    <input type="text" name="matricula" value={formAcademico.matricula} onChange={handleChangeAcademico} placeholder="Digite o número de matrícula" className="w-full border rounded px-4 py-2" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data de Ingresso *</label>
                    <input type="date" name="ingresso" value={formAcademico.ingresso} onChange={handleChangeAcademico} className="w-full border rounded px-4 py-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Previsão de Conclusão *</label>
                    <input type="date" name="previsaoConclusao" value={formAcademico.previsaoConclusao} onChange={handleChangeAcademico} className="w-full border rounded px-4 py-2" required />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row w-full gap-3">
                  <button type="submit" className="flex-1 py-2 rounded bg-purple-700 text-white font-semibold hover:bg-purple-800 transition mb-2 md:mb-0">Salvar Alterações</button>
                  <button type="button" className="flex-1 py-2 rounded border border-gray-300 text-gray-500 font-semibold hover:bg-gray-50 transition" onClick={handleCancelarAcademico}>Cancelar</button>
                </div>
              </form>
            )}

            {/* DISPONIBILIDADE */}
            {selectedTab === 'disponibilidade' && (
              <div>
                <form
                  className="flex flex-col items-center"
                  id="form-disponibilidade"
                  onSubmit={handleDisponibilidadeSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data *</label>
                      <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="w-full border rounded px-4 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Horário Inicial *</label>
                      <input
                        type="time"
                        value={horaInicial}
                        onChange={(e) => setHoraInicial(e.target.value)}
                        className="w-full border rounded px-4 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Horário Final</label>
                      <input
                        type="time"
                        value={horaFinal}
                        readOnly
                        className="w-full border rounded px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row w-full gap-3">
                    <button
                      type="button"
                      className="flex-1 py-2 rounded bg-purple-700 text-white font-semibold hover:bg-purple-800 transition mb-2 md:mb-0"
                      onClick={() => {
                        if (profileCompleted) {
                          document.getElementById('form-disponibilidade').requestSubmit();
                        } else {
                          setOpenWarningProfile(true);
                        }
                      }}
                    >
                      Adicionar Horário
                    </button>
                    <button
                      type="button"
                      className="flex-1 py-2 rounded border border-gray-300 text-gray-500 font-semibold hover:bg-gray-50 transition"
                      onClick={handleDisponibilidadeCancelar}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>

                {/* Modal de aviso de perfil incompleto */}
                <WarningCompleteProfileStudent
                  open={openWarningProfile}
                  onClose={() => setOpenWarningProfile(false)}
                  onGoToProfile={() => {
                    setOpenWarningProfile(false);
                    setSelectedTab('pessoais');
                  }}

                />              
                {/* SEUS HORÁRIOS - INTEGRAÇÃO*/}

                <div className="mt-10">
                  <h2 className="font-semibold text-lg text-gray-800 mb-2">Seus Horários</h2>
                  <div className="rounded-md border bg-gray-50 px-6 py-4 shadow-sm text-gray-400">
                    Seus horários cadastrados aparecerão aqui.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentPageDados;