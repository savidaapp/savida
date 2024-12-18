// Mejoras en Chat.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Message from './Message';
import ReactMarkdown from 'react-markdown';

function Chat() {
  const [messages, setMessages] = useState([
    {
      text: '¡Hola! Soy Savida, tu coach personal. ¿En qué área te gustaría mejorar hoy?',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    try {
      const formattedMessages = [
        {
          role: 'system',
          content:
            'Eres Savida, un coach personal basado en inteligencia artificial que ayuda a los usuarios a mejorar su vida diaria y laboral. Responde siempre de manera amigable, motivadora y estructurada.',
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
    } finally {
      scrollToBottom(); // Asegurar el auto scroll siempre después de enviar
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}`}
          >
            <div className="sender-label">{msg.sender === 'user' ? 'Tú' : 'Savida'}</div>
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? handleSend() : null)}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}

export default Chat;