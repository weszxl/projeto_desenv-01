import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

const HomePage = () => {
  // informações para flashcards
  const flashcards = [
    { title: "Título de flashcard com link", content: "escrever alguma coisa sobre algum serviço" },
    { title: "Título de flashcard com link", content: "escrever alguma coisa sobre algum serviço" },
    { title: "Título de flashcard com link", content: "escrever alguma coisa sobre algum serviço" },
  ];

  // informação para uso da plataforma
  const usageItems = [
    "MODO DE USO OU SLA - Um monte de informação sobre o uso da plataforma e mais alguma coisa.",
    "MODO DE USO OU SLA - Um monte de informação sobre o uso da plataforma e mais alguma coisa.",
    "MODO DE USO OU SLA - Um monte de informação sobre o uso da plataforma e mais alguma coisa."
  ];

  // informação de FAQ (dúvidas)
  const examples = ["EXEMPLO 1", "EXEMPLO 2", "EXEMPLO 3", "EXEMPLO 4", "EXEMPLO 5"];

  return (
    <>
      {/* HEADER (COMPONENT) */}    
      <Header />
      
      <main>
        {/* FLASHCARDS */}
        <section className="py-12 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">
              O NOME-DRAMÁTICO alguma coisa SLA O QUE,<br />
              <span className="text-blue-600">não sei o que lá mais palavras.</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {flashcards.map((card, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
                  <p className="text-gray-600">{card.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* USO DA PLATAFORM */}
        <section className="py-12 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">USO DA PLATAFORMA</h2>
            <h3 className="text-xl text-blue-600 font-semibold mb-8">USO PLATAF</h3>
            
            <div className="space-y-4">
              {usageItems.map((item, index) => (
                <div key={index} className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="mt-1 h-5 w-5 text-blue-600 rounded" 
                    defaultChecked 
                    disabled
                  />
                  <p className="ml-3 text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ (DÚVIDAS) */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ainda com dúvidas?</h2>
            
            <div className="mb-8">
              {examples.map((example, index) => (
                <p key={index} className="text-gray-700 mb-2">{example}</p>
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
        </section>
      </main>
      
      {/* FOOTER (COMPONENT) */}
      <Footer />
    </>
  );
};

export default HomePage;