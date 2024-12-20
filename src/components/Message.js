import React from 'react';
import { MdOutlineBubbleChart } from "react-icons/md";
import { VscRobot } from "react-icons/vsc";


function Message({ text, sender }) {
  return (
    <div className={`message ${sender}`}>
      <div className="message-icon">
        {sender === 'user' ? <MdOutlineBubbleChart /> : <VscRobot />}
      </div>
      <p>{text}</p>
    </div>
  );
}

export default Message;
