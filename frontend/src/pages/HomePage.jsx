import { useState } from 'react';
import LoginModal from '../components/LoginModal';

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);

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
            onClick={() => setShowLogin(true)}
            className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition"
          >
            Fazer login
          </button>
        </nav>
      </div>
    </header>

      {/* Bem vindo Section */}
    <section id="bemvindo" className="py-20">
      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 items-center gap-12 px-6">
        <div>
        <img 
          src="./icons/image1.svg" 
          alt="image1" 
          className="h-8 w-8" />
        </div>
          <div className="bg-gray-100 p-8 rounded-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              LOREM IPSUM DOLOR SIT AMET
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod cumque quia culpa animi dolorum ut cupiditate, beatae tempore accusantium, mollitia, dolore fuga totam perferendis? Suscipit, laboriosam temporibus? Eaque, quos nulla?
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non enim ullam corporis nostrum id consequatur rem debitis eum, ipsum porro error adipisci tempora, architecto ad, nam officiis ea sed nobis?
            </p>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ducimus commodi ipsam enim inventore quasi ad similique quis repellendus veritatis officiis rem ab cum dignissimos, eos facilis temporibus excepturi perferendis.
            </p>
          </div>
        </div>
      </section>

      {/* Bem Vindo 2 */}
      <section id="bemvindo2" className="py-20">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 items-center gap-12 px-6">
          <div className="bg-gray-100 p-8 rounded-2xl order-2 lg:order-1">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              LOREM IPSUM DOLOR SIT AMET
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod cumque quia culpa animi dolorum ut cupiditate, beatae tempore accusantium, mollitia, dolore fuga totam perferendis? Suscipit, laboriosam temporibus? Eaque, quos nulla?
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non enim ullam corporis nostrum id consequatur rem debitis eum, ipsum porro error adipisci tempora, architecto ad, nam officiis ea sed nobis?
            </p>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ducimus commodi ipsam enim inventore quasi ad similique quis repellendus veritatis officiis rem ab cum dignissimos, eos facilis temporibus excepturi perferendis.
            </p>
        </div>

        <div className="flex justify-end order-1 lg:order-2">
          <img 
            src="./icons/image2.svg" 
            alt="image2" 
            className="h-8 w-8"
          />
        </div>
  </div>

      </section>

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

      {/* LoginModal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default HomePage;



