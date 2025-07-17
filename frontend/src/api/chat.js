import axios from 'axios';

// Use environment variable or default to relative path for Vercel
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

console.log('Environment:', import.meta.env.MODE);
console.log('API Base URL:', API_BASE_URL);

export const sendMessage = async (message, audioEnabled = false) => {
  try {
    console.log('Sending request to:', `${API_BASE_URL}/chat/send`);
    
    const response = await axios.post(`${API_BASE_URL}/chat/send`, {
      message: message,
      audio_enabled: audioEnabled
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000 // 30 second timeout for Vercel functions
    });

    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    console.error('Request config:', error.config);
    throw error;
  }
};