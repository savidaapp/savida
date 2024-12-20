import React from 'react';
import { FaRobot, FaUser } from 'react-icons/fa';

function Message({ text, sender }) {
  return (
    <div className={`message ${sender}`}>
      <div className="message-icon">
        {sender === 'user' ? <FaUser /> : <FaRobot />}
      </div>
      <p>{text}</p>
    </div>
  );
}

export default Message;
