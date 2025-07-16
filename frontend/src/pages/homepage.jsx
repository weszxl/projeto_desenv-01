import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

import Header from '../components/common/header';
import Footer from '../components/common/footer';

const HomePage = () => {
  // const flashcards = [
  //   { image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTe930RYtIMySmrb9qOc0czMjAK_MD3qR8NvZNpD2JQmEu-wpHHPEFbPI9NoUOT", title: "Serviço 1", content: "Descrição detalhada do nosso primeiro serviço. Foco na qualidade e inovação." },
  //   { image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTe930RYtIMySmrb9qOc0czMjAK_MD3qR8NvZNpD2JQmEu-wpHHPEFbPI9NoUOT", title: "Serviço 2", content: "Nosso segundo serviço oferece suporte completo e resultados garantidos." },
  //   { image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTe930RYtIMySmrb9qOc0czMjAK_MD3qR8NvZNpD2JQmEu-wpHHPEFbPI9NoUOT", title: "Serviço 3", content: "Conheça nosso terceiro serviço, pensado para suas necessidades específicas." },
  // ];
  // const usageItems = [
  //   { icon: '💲', title: "MODO DE USO OU SLA", description: "Um monte de informação sobre o uso da plataforma e mais alguma coisa." },
  //   { icon: '⏰', title: "MODO DE USO OU SLA", description: "Um monte de informação sobre o uso da plataforma e mais alguma coisa." },
  //   { icon: '➕', title: "MODO DE USO OU SLA", description: "Um monte de informação sobre o uso da plataforma e mais alguma coisa." }
  // ];

  const faqItems = [
      {
        question: "A consulta é realmente gratuita?",
        answer: "Sim, todas as consultas realizadas na plataforma são 100% gratuitas. Nosso objetivo é oferecer cuidado acessível enquanto proporcionamos experiência prática para os estudantes."
      },
      {
        question: "Quem são os estudantes que realizam o atendimento?",
        answer: "São alunos devidamente matriculados em suas instituições. Todos os alunos são supervisionados por professores responsáveis."
      },
      {
        question: "Meus dados e conversas são confidenciais?",
        answer: "Absolutamente. A plataforma segue rigorosas políticas de privacidade e segurança. As informações da consulta são confidenciais e protegidas, acessíveis apenas por você, pelo estudante e pelo professor supervisor."
      },
      {
        question: "Como faço para agendar uma consulta?",
        answer: "Após se cadastrar, você pode selecionar o dia de preferência para a consulta e vizualizar os horários e estudantes disponíveis para aquele dia, escolhendo o que melhor se encaixa para você. A confirmação é feita com apenas alguns cliques."
      },
      {
        question: "Posso escolher o estudante que vai me atender?",
        answer: "Sim. Você tem a liberdade de visualizar os horários disponíveis e agendar com o estudante de sua preferência, de acordo com a disponibilidade de cada um."
      },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />

      <main>

        {/* SEÇÃO INICIAL / CARDS */}
        <section className="py-20 px-6 min-h-[86vh] flex items-start bg-gradient-to-r from-[#10ffbf] to-[#56f6e8]">
            <div className="max-w-5xl mx-auto text-center w-full">
                <h1 className="text-5xl md:text-6xl text-gray-800 mb-32 leading-tight">
                    <span className="font-normal">Conectando</span>{' '}
                    <span className="font-bold">Futuros Profissionais</span>{' '}
                    <span className="font-normal">a quem</span>{' '}
                    <span className="font-bold">Precisa.</span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
                    {/* CARD 1 */}
                    <a href="#" className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6 w-full max-w-sm flex flex-col text-left">
                        <div className="w-full h-48 mb-6 bg-gray-100 rounded-lg">
                            <img src="/icons/homePage/icon-card_2.png" className="w-full h-full object-cover rounded-lg" alt="Paciente" />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Saiba seu papel como paciente</h3>
                                <p className="text-sm text-gray-500 mt-1">Ajude na formação de um futuro profissional.</p>
                            </div>
                            <ArrowRight className="text-gray-400 ml-4 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                        </div>
                    </a>

                    {/* CARD 2 */}
                    <a href="#" className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6 w-full max-w-sm flex flex-col text-left">
                        <div className="w-full h-48 mb-6 bg-gray-100 rounded-lg">
                            <img src="/icons/homePage/icon-card_1.png" className="w-full h-full object-cover rounded-lg" alt="Paciente" />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Quem realiza seu atendimento?</h3>
                                <p className="text-sm text-gray-500 mt-1">Estudantes dedicados sob a supervisão de professores.</p>
                            </div>
                            <ArrowRight className="text-gray-400 ml-4 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                        </div>
                    </a>

                    {/* CARD 3 */}
                    <a href="#" className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6 w-full max-w-sm flex flex-col text-left">
                        <div className="w-full h-48 mb-6 bg-gray-100 rounded-lg">
                            <img src="/icons/homePage/icon-card_3.png" className="w-full h-full object-cover rounded-lg" alt="Paciente" />
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Nossa Missão</h3>
                                <p className="text-sm text-gray-500 mt-1">Tornar o cuidado e o aprendizado mais acessíveis para todos.</p>
                            </div>
                            <ArrowRight className="text-gray-400 ml-4 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                        </div>
                    </a>
                </div>
            </div>
        </section>

        {/* SEÇÃO DE USO */}
        <section className="py-20 px-6 bg-blue-100 flex items-start justify-center min-h-[95vh]">
            <div className="max-w-6xl mx-auto text-center w-full">
                <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Como nossa plataforma funciona</h2>
                
                <div className="inline-block bg-blue-700 text-white text-5xl font-semibold py-4 px-10 rounded-xl mb-16 shadow-md">
                    SIMPLES E RÁPIDO
                </div>

                <div className="flex flex-col md:flex-row gap-12 md:gap-16">

                    <div className="w-full md:w-3/8">
                        <div className="relative pt-[90%] bg-gray-200 rounded-lg shadow-md overflow-hidden flex items-center justify-center">
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-5/8 flex">
                        <div className="flex flex-col justify-between h-full w-full">
                            <div className="flex items-start gap-4 text-left">
                                <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <img src="/icons/icon-register.png" className="w-full h-full object-cover rounded-lg" alt="Paciente" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">Cadastre-se Gratuitamente</h3>
                                    <p className="text-lg text-gray-700 mt-1">Crie sua conta em poucos minutos para ter acesso completo a nossa plataforma.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 text-left">
                                <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <img src="/icons/homePage/icon-calendar.png" className="w-full h-full object-cover rounded-lg" alt="Paciente" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">Encontre um Horário</h3>
                                    <p className="text-lg text-gray-700 mt-1">Navegue pela agenda dos estudantes, escolha a data e o horário ideais e confirme sua consulta com apenas um clique.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 text-left">
                                <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <img src="/icons/homePage/icon-teleconsult.png" className="w-full h-full object-cover rounded-lg" alt="Paciente" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">Participe da Consulta Online</h3>
                                    <p className="text-lg text-gray-700 mt-1">No dia marcado, acesse o link da sua consulta e receba o atendimento de um estudante.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* SEÇÃO FAQ */}
        <section className="py-20 px-6 bg-[#F8F9F9]">
            <div className="w-4/5 mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="w-full md:w-2/5">
                    <h2 className="text-5xl font-bold text-gray-800 text-right pr-8">Ainda com dúvidas?</h2>
                </div>

                <div className="w-full md:w-3/5">
                    <div className="border-t border-gray-200">
                        {faqItems.map((item, index) => (
                            <div key={index} className="border-b border-gray-200">
                                <button
                                    onClick={() => toggleDropdown(index)}
                                    className="w-full flex justify-between items-center py-4 text-left"
                                >
                                    <span className="text-xl text-gray-800">{item.question}</span>
                                    <ChevronDown
                                        className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                
                                <div
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                        openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                                >
                                    <div className="pb-4 pr-8 pt-2 text-gray-600">
                                        <p>{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-left text-base text-gray-600 space-y-2">
                        <p>
                            Tem mais alguma pergunta? Confira nosso FAQ completo{' '}
                            <a href="#" className="text-blue-600 font-semibold hover:underline">
                                aqui
                            </a>
                            .
                        </p>
                        <p>
                            Você é um estudante?{' '}
                            <a href="#" className="text-blue-600 font-semibold hover:underline">
                                Acesse suas instruções aqui
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default HomePage;