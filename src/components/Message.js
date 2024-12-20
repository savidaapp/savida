import React from 'react';
import { MdOutlineBubbleChart } from "react-icons/md";
import ReactMarkdown from 'react-markdown';

function Message({ text, sender }) {
  return (
    <div className={`message ${sender}`}>
      <div className="message-icon">
        {sender === 'user' ? <FaUser /> : <MdOutlineBubbleChart />}
      </div>
      <div className="message-content">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Message;
