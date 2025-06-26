import React from "react";

const Footer = () => {
  const links = [
    { label: "FAQ", href: "#" },
    { label: "Report Vulnerability", href: "#" },
    { label: "Privacy Statement", href: "#" },
    { label: "Terms Of Use", href: "#" },
  ];

  return (
    <footer className="bg-gray-800 text-white py-4 px-6">
      <div className="flex items-center">
        <div className="mr-auto">
          <img
            src="/logoteste.png"
            alt="Logo"
            className="w-32 h-32 object-contain"
          />
        </div>

        <div className="flex flex-col items-end space-y-4">
          <div className="flex space-x-6">
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

          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-300 hover:text-white transition"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.23 8.98h4.53V24H.23V8.98zm6.55 0h4.35v2.16h.06c.61-1.15 2.12-2.36 4.36-2.36 4.67 0 5.53 3.07 5.53 7.06V24h-4.53v-7.58c0-1.8-.03-4.11-2.5-4.11-2.5 0-2.88 1.95-2.88 3.96V24H6.78V8.98z" />
              </svg>
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-300 hover:text-white transition"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.918.001c-1.504 0-1.796.716-1.796 1.765v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-300 hover:text-white transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37a4 4 0 11-4.73-4.73 4 4 0 014.73 4.73z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
