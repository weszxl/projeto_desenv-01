import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const HomePage = () => {
  const flashcards = [
    { image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTe930RYtIMySmrb9qOc0czMjAK_MD3qR8NvZNpD2JQmEu-wpHHPEFbPI9NoUOT", title: "Título de flashcard com link 1", content: "escrever alguma coisa sobre algum serviço 1" },
    { image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTe930RYtIMySmrb9qOc0czMjAK_MD3qR8NvZNpD2JQmEu-wpHHPEFbPI9NoUOT", title: "Título de flashcard com link 2", content: "escrever alguma coisa sobre algum serviço 2" },
    { image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTe930RYtIMySmrb9qOc0czMjAK_MD3qR8NvZNpD2JQmEu-wpHHPEFbPI9NoUOT", title: "Título de flashcard com link 3", content: "escrever alguma coisa sobre algum serviço 3" },
    { image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTe930RYtIMySmrb9qOc0czMjAK_MD3qR8NvZNpD2JQmEu-wpHHPEFbPI9NoUOT", title: "Título de flashcard com link 3", content: "escrever alguma coisa sobre algum serviço 3" },
  ];
  const usageItems = [
    { icon: '💲', title: "MODO DE USO OU SLA", description: "Um monte de informação sobre o uso da plataforma e mais alguma coisa." },
    { icon: '⏰', title: "MODO DE USO OU SLA", description: "Um monte de informação sobre o uso da plataforma e mais alguma coisa." },
    { icon: '➕', title: "MODO DE USO OU SLA", description: "Um monte de informação sobre o uso da plataforma e mais alguma coisa." }
  ];

  const faqItems = [
    { question: "EXEMPLO 1", answer: "Aqui está a resposta detalhada para o Exemplo 1. Pode ser um texto mais longo explicando a dúvida." },
    { question: "EXEMPLO 2", answer: "Detalhes adicionais sobre o Exemplo 2. Clique para saber mais!" },
    { question: "EXEMPLO 3", answer: "Informações completas sobre o Exemplo 3. Tente clicar para ver mais!" },
    { question: "EXEMPLO 4", answer: "Mais detalhes sobre o Exemplo 4." },
    { question: "EXEMPLO 5", answer: "A resposta final para o Exemplo 5." },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />

      <main>
        <section className="py-12 px-6 bg-cyan-200">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-8 leading-tight">
              O <strong className='font semibold'>Nome Dramático</strong> alguma coisa sla o que,<br />
              <span className="text-gray-800">não sei o que lá mais palavras.</span>
            </h1>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              {flashcards.map((card, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {card.image && (
                    <img
                      src={card.image}
                      alt={`Imagem do flashcard ${index + 1}`}
                      className="w-3/4 sm:w-2/3 md:w-full h-auto mb-2 rounded object-cover"
                      style={{
                        maxWidth: '120px',
                        maxHeight: '120px'
                      }}
                    />
                  )}
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 text-left">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 text-left">{card.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-6 bg-blue-100">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">USO DA PLATAFORMA</h2>
            <div className="inline-block bg-blue-700 text-white text-xl font-semibold py-2 px-8 rounded-full mb-12 shadow-md">
              USO PLATAF
            </div>

            <div className="flex flex-col md:flex-row items-start md:space-x-8">

              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <div className="relative pt-[63.5%] bg-gray-200 rounded-lg shadow-md overflow-hidden">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <div className="space-y-6">
                  {usageItems.map((item, index) => (
                    <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex-shrink-0 w-10 h-10 mr-4 flex items-center justify-center bg-blue-500 rounded-full text-white text-2xl font-bold">
                        {item.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">{item.title}</h3>
                        <p className="text-gray-700 leading-snug">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold text-gray-800 text-left mb-6">Ainda com dúvidas?</h2>
            </div>

            <div className="w-full md:w-1/2 md:pl-8">
              <div className="space-y-4 mb-8">
                {faqItems.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-4 cursor-pointer" onClick={() => toggleDropdown(index)}>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-800 font-semibold">{item.question}</p>
                      <span>{openIndex === index ? '▲' : '▼'}</span>
                    </div>
                    {openIndex === index && (
                      <div className="mt-2 text-gray-600">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-lg text-gray-700 mb-4">
                Have more questions? Contact us at{" "}
                <a
                  href="https://L1NK-LINK4DO.com.br"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://L1NK-LINK4DO.com.br
                </a>
              </p>
              <p className="text-lg text-gray-700">
                Você é um estudante?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Acesse suas instruções aqui
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;