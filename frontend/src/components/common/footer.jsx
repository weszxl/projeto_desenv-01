import React from 'react';

const Footer = () => {
  const links = [
    { label: "FAQ", href: "#" },
    { label: "Report Vulnerability", href: "#" },
    { label: "Privacy Statement", href: "#" },
    { label: "Terms Of Use", href: "#" }
  ];

  return (
    <footer className="bg-gray-800 text-white py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.href}
              className="text-gray-300 hover:text-white transition"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;