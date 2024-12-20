import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function MenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="menu-toggle">
      <button className="menu-button" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      {isOpen && (
        <ul className="menu-list">
          <li>
            <a href="https://savidaapp.com/" target="_blank" rel="noopener noreferrer">
              Inicio
            </a>
          </li>
          <li>
            <a href="https://savidaapp.com/blog" target="_blank" rel="noopener noreferrer">
              Blog
            </a>
          </li>
          <li>
            <a href="https://savidaapp.com/faq" target="_blank" rel="noopener noreferrer">
              FAQ
            </a>
          </li>
          <li>
            <a href="https://savidaapp.com/contactos" target="_blank" rel="noopener noreferrer">
              Contactos
            </a>
          </li>
          <li>
            <a href="https://savidaapp.com/privacidad" target="_blank" rel="noopener noreferrer">
              Privacidad
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default MenuToggle;
