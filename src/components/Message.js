import React from 'react';
import { VscRobot } from 'react-icons/vsc'; // Correcto
import { FaUser } from 'react-icons/fa';

function Message({ text, sender }) {
  return (
    <div className={`message ${sender}`}>
      <div className="message-icon">
        {sender === 'user' ? <FaUser /> : <VscRobot />} {/* Icono de robot */}
      </div>
      <p>{text}</p>
    </div>
  );
}

export default Message;
