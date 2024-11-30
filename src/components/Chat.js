// src/components/Chat.js

import React, { useState } from 'react';
import axios from 'axios';
import Message from './Message';

function Chat() {
  const [messages, setMessages] = useState([
    {
      text: '¡Hola! Soy Savida, tu coach personal. ¿En qué área te gustaría mejorar hoy?',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Añadir el nuevo mensaje del usuario al estado
    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    try {
      // Preparar los mensajes para enviarlos a la API
      const formattedMessages = [
        {
          role: 'system',
          content:
            'Eres Savida, un coach personal basado en inteligencia artificial que ayuda a los usuarios a mejorar su vida diaria y laboral. Tu función principal es brindar consejos prácticos, soluciones rápidas y guías claras en las áreas de productividad, bienestar, comunicación, finanzas personales y metas personales. Responde siempre de manera amigable, motivadora y directa. Utiliza un enfoque estructurado que incluya un consejo, una acción concreta y una referencia a un experto o técnica reconocida.',
        },
        ...newMessages.map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        })),
      ];

      const response = await axios.post(
        process.env.REACT_APP_API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: formattedMessages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const botMessage = response.data.choices[0].message.content;
      setMessages([...newMessages, { text: botMessage, sender: 'bot' }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        {
          text: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.',
          sender: 'bot',
        },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => (e.key === 'Enter' ? handleSend() : null)}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}

export default Chat;
