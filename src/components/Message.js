import React from 'react';
import { FaUser } from 'react-icons/fa';
import { MdOutlineBubbleChart } from "react-icons/md";



function Message({ text, sender }) {
  return (
    <div className={`message ${sender}`}>
      <div className="message-icon">
        {sender === 'user' ? <FaUser /> : <MdOutlineBubbleChart />}
      </div>
      <p>{text}</p>
    </div>
  );
}

export default Message;
