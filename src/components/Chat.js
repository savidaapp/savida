import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Message from './Message';

function Chat() {
  const [messages, setMessages] = useState([
    {
      text: '¡Hola! Soy **Savida**, tu coach personal. ¿En qué área te gustaría mejorar hoy?\n\n1. Salud\n2. Productividad\n3. Relaciones laborales',
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
            'Eres Savida, un coach personal basado en inteligencia artificial. Responde usando formato Markdown para negritas, listas y otros formatos.',
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
      scrollToBottom();
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-logo">Savida</h1>
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
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
