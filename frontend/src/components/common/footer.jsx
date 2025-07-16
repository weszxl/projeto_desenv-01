import React from "react";

const Footer = () => {
  const links = [
    { label: "FAQ", href: "#" },
    { label: "Report Vulnerability", href: "#" },
    { label: "Privacy Statement", href: "#" },
    { label: "Terms Of Use", href: "#" },
  ];

  return (
    <footer className="bg-[#F5F4ED] text-gray-200 py-14 px-6 md:px-12">
      <div className="w-10/12 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <img
              src="/logoteste.png"
              alt="Logo"
              className="w-36 h-auto object-contain"
            />
          </div>

          <div className="flex space-x-6">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <hr className="border-gray-300" />

        <div className="flex justify-between items-center mt-8">
          <div>
            <img
              src="/logoteste.png"
              alt="Logo"
              className="w-36 h-auto object-contain"
            />
          </div>
          
          <div className="flex space-x-4">
            <a href="#" aria-label="Social Media 1">
              <div className="w-8 h-8 bg-gray-300 rounded-md hover:bg-gray-400 transition">
                <img
                  src="/icons/footer/footer-linkedln.png"
                  alt="Facebook Placeholder"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </a>
            <a href="#" aria-label="Social Media 2">
              <div className="w-8 h-8 bg-gray-300 rounded-md hover:bg-gray-400 transition">
                <img
                  src="/icons/footer/footer-facebook.png"
                  alt="Facebook Placeholder"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </a>
            <a href="#" aria-label="Social Media 3">
              <div className="w-8 h-8 bg-gray-300 rounded-md hover:bg-gray-400 transition">
                <img
                  src="/icons/footer/footer-instagram.png"
                  alt="Instagram Placeholder"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
