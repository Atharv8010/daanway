// import React, { useState, useRef, useEffect } from 'react';
// import { searchFAQ } from '../../utils/faqData';
// import './Chatbot.css';

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       type: 'bot',
//       text: 'Hello! I am DaanWay assistant. How can I help you today?',
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     }
//   ]);
//   const [input, setInput] = useState('');
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userMessage = {
//       type: 'user',
//       text: input,
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };

//     setMessages(prev => [...prev, userMessage]);

//     setTimeout(() => {
//       const botResponse = {
//         type: 'bot',
//         text: searchFAQ(input),
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       };
//       setMessages(prev => [...prev, botResponse]);
//     }, 500);

//     setInput('');
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSend();
//     }
//   };

//   const quickQuestions = [
//     'How to donate?',
//     'What can I donate?',
//     'Medicine donation',
//     'Track my donation',
//     'Nearby NGOs'
//   ];

//   const handleQuickQuestion = (question) => {
//     setInput(question);
//   };

//   return (
//     <>
//       <button 
//         className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? '✕' : '💬'}
//       </button>

//       <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
//         <div className="chatbot-header">
//           <div className="chatbot-header-content">
//             <span className="chatbot-icon">🤖</span>
//             <div>
//               <h3>DaanWay Assistant</h3>
//               <p className="chatbot-status">
//                 <span className="status-dot"></span>
//                 Online
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="chatbot-messages">
//           {messages.map((message, index) => (
//             <div key={index} className={`message ${message.type}`}>
//               <div className="message-content">
//                 <p>{message.text}</p>
//                 <span className="message-time">{message.time}</span>
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {messages.length === 1 && (
//           <div className="quick-questions">
//             <p className="quick-questions-title">Quick Questions:</p>
//             {quickQuestions.map((question, index) => (
//               <button
//                 key={index}
//                 className="quick-question-btn"
//                 onClick={() => handleQuickQuestion(question)}
//               >
//                 {question}
//               </button>
//             ))}
//           </div>
//         )}

//         <div className="chatbot-input">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Type your question..."
//           />
//           <button onClick={handleSend} className="send-button">
//             ➤
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Chatbot;

import React, { useState, useRef, useEffect } from 'react';
import { searchFAQ } from '../../utils/faqData';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! I am DaanWay assistant. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: searchFAQ(input),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickQuestions = [
    'How to donate?',
    'What can I donate?',
    'Medicine donation',
    'Track my donation',
    'Nearby NGOs'
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 9999 }}>
      {/* Animated Chatbot Icon */}
      <div className="chatbot-icon" onClick={handleToggle}>
        {/* Sparkle effects */}
        <div className="chatbot-sparkle"></div>
        <div className="chatbot-sparkle"></div>
        <div className="chatbot-sparkle"></div>
        <div className="chatbot-sparkle"></div>
        
        {/* Robot SVG Icon */}
        <svg className="chatbot-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C10.9 2 10 2.9 10 4V5H7C5.9 5 5 5.9 5 7V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V7C19 5.9 18.1 5 17 5H14V4C14 2.9 13.1 2 12 2Z" fill="white"/>
          <circle className="chatbot-eye" cx="9" cy="11" r="1.5" fill="#6366f1"/>
          <circle className="chatbot-eye" cx="15" cy="11" r="1.5" fill="#6366f1"/>
          <path d="M9 15C9 15 10 16 12 16C14 16 15 15 15 15" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>

        {/* Unread Badge */}
        {unreadCount > 0 && !isOpen && (
          <div className="chatbot-badge">{unreadCount}</div>
        )}

        {/* Tooltip */}
        <div className="chatbot-tooltip">Chat with us!</div>

        {/* Preview Card */}
        <div className="chatbot-preview">
          <div className="chatbot-preview-text">
            Need help with donations?
          </div>
          <div className="chatbot-preview-subtext">
            <div className="chatbot-typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>We're here to help</span>
          </div>
        </div>
      </div>

      {/* Chatbot Window */}
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <span className="chatbot-header-icon">🤖</span>
            <div>
              <h3>DaanWay Assistant</h3>
              <p className="chatbot-status">
                <span className="status-dot"></span>
                Online
              </p>
            </div>
          </div>
          <button className="chatbot-close" onClick={handleToggle}>✕</button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="quick-questions">
            <p className="quick-questions-title">Quick Questions:</p>
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="quick-question-btn"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
          />
          <button onClick={handleSend} className="send-button">
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;