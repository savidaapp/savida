import React from 'react';
import { FaUser } from 'react-icons/fa';
import { VscRobot } from "react-icons/vsc";


function Message({ text, sender }) {
  return (
    <div className={`message ${sender}`}>
      <div className="message-icon">
        {sender === 'user' ? <FaUser /> : <VscRobot />}
      </div>
      <p>{text}</p>
    </div>
  );
}

export default Message;
