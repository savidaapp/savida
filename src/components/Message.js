import React from 'react';
import { FaUser } from 'react-icons/fa';
import { VscRobot } from 'react-icons/vsc';
import ReactMarkdown from 'react-markdown';

function Message({ text, sender }) {
  return (
    <div className={`message ${sender}`}>
      <div className="message-icon">
        {sender === 'user' ? <FaUser /> : <VscRobot />}
      </div>
      {/* Renderizar texto con formato Markdown */}
      <div className="message-content">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Message;
