// Mejoras en Chat.js
import React, { useState, useEffect, useRef } from 'react';
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

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatText = (text) => {
    // Permitir formatos básicos: negritas, viñetas, y numeración
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n- /g, '<li>')
      .replace(/\n\d+\. /g, '<li>')
      .replace(/\n/g, '<br>');

    return formattedText;
  };

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
          <Message
            key={index}
            text={formatText(msg.text)}
            sender={msg.sender}
          />
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