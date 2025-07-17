import axios from 'axios';

// Vercel automatically handles API routes
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api/v1'  // Vercel will route this to your FastAPI
  : 'http://localhost:8000/api/v1';

console.log('API Base URL:', API_BASE_URL);

export const sendMessage = async (message, audioEnabled = false) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat/send`, {
      message: message,
      audio_enabled: audioEnabled
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000 // 30 second timeout for Vercel functions
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};