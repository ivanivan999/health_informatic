// src/components/ChatContainer.jsx - Updated
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import AudioPlayer from './AudioPlayer';
import { sendMessage } from '../api/chat';
import './ChatContainer.css';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    
    // Add user message with timestamp
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: text,
      timestamp: new Date()
    }]);
    
    setLoading(true);
    try {
      // Send to API and get response
      const response = await sendMessage(text);
      
      // Add assistant message
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.message,
        formattedResponse: response.formatted_response,
        timestamp: new Date()
      }]);
      
      // Set audio URL for playback if available
      if (response.audio_url) {
        setTimeout(() => {
          setCurrentAudio(`http://localhost:8000${response.audio_url}`);
        }, 500);
      }
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request.',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = async (audioBlob) => {
    // Add voice message UI indicator
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: '🎤 Voice message...',
      isProcessing: true,
      timestamp: new Date()
    }]);
    
    setLoading(true);
    
    try {
      const transcription = "This is a simulated voice message";
      
      // Update the message with the transcription
      setMessages(prev => prev.map((msg, i) => 
        i === prev.length - 1 ? { ...msg, content: transcription, isProcessing: false } : msg
      ));
      
      // Now process like a regular message
      const response = await sendMessage(transcription);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.message,
        formattedResponse: response.formatted_response,
        timestamp: new Date()
      }]);
      
      if (response.audio_url) {
        setTimeout(() => {
          setCurrentAudio(`http://localhost:8000${response.audio_url}`);
        }, 1000);
      }
    } catch (error) {
      console.error('Error processing voice input:', error);
      setMessages(prev => prev.map((msg, i) => 
        i === prev.length - 1 ? { ...msg, content: "Voice processing failed", isProcessing: false } : msg
      ));
    } finally {
      setLoading(false);
    }
  };

  // Handle prompt card clicks
  const handlePromptClick = (promptText) => {
    handleSendMessage(promptText);
  };

  return (
    <div className="chatgpt-container">
      {/* Main chat area */}
      <div className="chat-main">
        {messages.length === 0 ? (
          // Initial empty state
          <div className="chat-empty-state">
            <div className="empty-state-content">
              <h1>Health Informatics AI</h1>
              <p>Ask me about patient data and medical information</p>
              <div className="example-prompts">
                <div 
                  className="prompt-card"
                  onClick={() => handlePromptClick("Show me treatment history for patient 132")}
                >
                  <span>Show me treatment history for patient 132</span>
                </div>
                <div 
                  className="prompt-card"
                  onClick={() => handlePromptClick("What are the pathology results?")}
                >
                  <span>What are the pathology results?</span>
                </div>
                <div 
                  className="prompt-card"
                  onClick={() => handlePromptClick("Get patient registration details")}
                >
                  <span>Get patient registration details</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Messages area
          <div className="chat-messages-area">
            <div className="messages-container">
              {messages.map((msg, index) => (
                <ChatMessage 
                  key={index}
                  role={msg.role}
                  content={msg.content}
                  formattedResponse={msg.formattedResponse}
                  isProcessing={msg.isProcessing}
                  timestamp={msg.timestamp}
                />
              ))}
              {loading && (
                <div className="message-wrapper assistant">
                  <div className="message-content assistant">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>
      
      {/* Fixed input area */}
      <div className="chat-input-area">
        <div className="input-container">
          {currentAudio && (
            <div className="audio-player-wrapper">
              <AudioPlayer src={currentAudio} autoPlay={true} />
            </div>
          )}
          <ChatInput 
            onSendMessage={handleSendMessage} 
            onVoiceInput={handleVoiceInput}
            disabled={loading} 
          />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;