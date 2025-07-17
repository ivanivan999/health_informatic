# Health Informatics AI Bot

A full-stack AI-powered healthcare assistant application that enables natural language queries about patient data using Google's Gemini AI and advanced SQL database interaction with voice capabilities.

## 🏥 Overview

The Health Informatics AI Bot is an intelligent healthcare assistant that allows healthcare professionals to query patient information using natural language. The system automatically converts user questions into SQL queries, executes them against a MySQL database, and returns formatted results with both text and audio responses. The application features a modern ChatGPT-style interface with voice interaction capabilities.

## ✨ Features

- **Natural Language Processing**: Ask questions about patient data in plain English
- **Intelligent SQL Generation**: Automatically converts natural language to SQL queries using Google Gemini 2.5 Flash
- **Multi-format Responses**: Get results in text, HTML tables, and audio format
- **Voice Interaction**: Record voice queries and receive spoken responses using AWS Polly
- **Patient-Specific Queries**: Focused queries for specific patient information (default: Patient 143)
- **Data Validation**: Built-in SQL query validation and error checking with LangGraph
- **Responsive UI**: Modern ChatGPT-style interface with React
- **Smart Routing**: Handles greetings, patient queries, and general questions intelligently
- **Table Visualization**: Advanced table modal with patient cards and detailed views

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with Python 3.12+
- **AI Integration**: Google Gemini 2.5 Flash model via LangChain
- **Database**: MySQL with LangGraph for query orchestration
- **Audio Processing**: 
  - AWS Polly for text-to-speech synthesis
  - Google Gemini for speech-to-text transcription
- **API Structure**: RESTful endpoints with async support
- **Deployment**: Vercel-ready with production configuration

### Frontend (React + Vite)
- **Framework**: React 19 with Vite build tool
- **UI Components**: 
  - ChatGPT-style chat interface
  - Advanced table modals with patient cards
  - Voice recording with visual indicators
  - Audio player with auto-play
- **API Communication**: Axios for HTTP requests
- **Audio Recording**: RecordRTC for voice input
- **Styling**: CSS modules with responsive design and ChatGPT-inspired styling

### Database Integration
- **Type**: MySQL with PyMySQL connector
- **Agent**: Custom [`DatabaseAgent`](backend/app/services/database_agent.py) class using LangGraph
- **Security**: Parameterized queries to prevent SQL injection
- **Tables**: Supports patients_treatment, patients_registration, pathology_reports

## 📁 Project Structure

```
health_informatic/
├── api/
│   └── index.py                # Vercel deployment entry point
├── backend/                    # FastAPI backend application
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py       # Environment configuration
│   │   │   └── security.py     # Security utilities
│   │   ├── models/
│   │   │   └── chat.py         # Pydantic models for API
│   │   ├── routers/
│   │   │   └── chat.py         # Chat API endpoints
│   │   ├── services/
│   │   │   ├── database_agent.py    # Core LangGraph agent
│   │   │   └── llm_utilities.py     # AI utility functions
│   │   └── main.py             # FastAPI application entry point
│   ├── audio/                  # Generated audio file storage
│   └── requirements.txt        # Python dependencies
├── frontend/                   # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatContainer.jsx    # Main chat interface
│   │   │   ├── ChatInput.jsx        # Voice/text input component
│   │   │   ├── ChatMessage.jsx      # Message display component
│   │   │   ├── FormattedResponse.jsx # Table/data formatting
│   │   │   ├── TableModal.jsx       # Advanced table viewer
│   │   │   └── AudioPlayer.jsx      # Audio playback component
│   │   ├── services/
│   │   │   ├── audioService.js      # Voice recording service
│   │   │   └── api/
│   │   │       └── chat.js          # API communication
│   │   ├── styles/
│   │   │   ├── main.css            # Main application styles
│   │   │   └── chat.css            # Chat-specific styles
│   │   └── App.jsx                 # Main React component
│   ├── package.json               # Node.js dependencies
│   └── vite.config.js             # Vite configuration
├── vercel.json                    # Vercel deployment configuration
└── package.json                  # Root package.json for build scripts
```

## 🚀 Getting Started

### Prerequisites

- Python 3.12+
- Node.js 18+
- MySQL database access
- Google API key for Gemini AI
- AWS credentials for Polly (for audio features)

### Environment Configuration

Create a `.env` file in the [`backend`](backend) directory using [`backend/.env.example`](backend/.env.example) as a template:

```env
# Google AI Configuration
GOOGLE_API_KEY=your_google_api_key_here

# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_key_here
AWS_REGION=ca-central-1

# Database Configuration
DATABASE_HOST=your_database_host_here
DATABASE_PORT=3306
DATABASE_USER=your_database_user_here
DATABASE_PASSWORD=your_database_password_here
DATABASE_NAME=your_database_name_here

# Application Configuration
DEFAULT_PATIENT_ID=143
```

### Quick Start (Development)

1. **Install dependencies and start development servers**:
   ```bash
   # Install frontend dependencies and start dev server
   npm run dev
   
   # In a new terminal, start backend
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Access the application**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run start
```

### Deployment to Vercel

The project is configured for Vercel deployment with [`vercel.json`](vercel.json):

```bash
# Deploy to Vercel
vercel --prod
```

## 🔧 Key Components

### DatabaseAgent Class

The core [`DatabaseAgent`](backend/app/services/database_agent.py) handles the complete query processing pipeline:

- **Query Classification**: Determines if query is greeting, patient data, or other
- **Schema Introspection**: Analyzes database structure dynamically
- **SQL Generation**: Uses Gemini 2.5 Flash for natural language to SQL conversion
- **Query Validation**: Multi-step validation process
- **Result Formatting**: Converts raw data to user-friendly JSON with summaries
- **Error Recovery**: Graceful handling of edge cases

### Query Processing Pipeline

1. **Query Type Determination**: Routes to appropriate handler
2. **Table Selection**: Identifies relevant database tables
3. **Schema Analysis**: Extracts column information
4. **SQL Generation**: Creates validated SQL queries
5. **Execution**: Runs queries with error handling
6. **Formatting**: Produces structured responses with summaries

### Frontend Components

- **[`ChatContainer`](frontend/src/components/ChatContainer.jsx)**: Main interface with ChatGPT-style layout
- **[`ChatInput`](frontend/src/components/ChatInput.jsx)**: Voice/text input with recording indicators
- **[`FormattedResponse`](frontend/src/components/FormattedResponse.jsx)**: Handles table data with summary-first approach
- **[`TableModal`](frontend/src/components/TableModal.jsx)**: Advanced patient data visualization
- **[`AudioPlayer`](frontend/src/components/AudioPlayer.jsx)**: Auto-playing audio responses

## 🛡️ Security Features

- **SQL Injection Prevention**: Parameterized queries and input validation
- **Database Access Control**: Read-only operations only
- **CORS Configuration**: Proper cross-origin request handling for Vercel
- **Error Handling**: Graceful error responses without exposing sensitive data
- **Environment Variables**: Secure configuration management

## 🎯 Usage Examples

### Supported Query Types

**Patient Information Queries:**
- "Show me treatment history for patient 132"
- "What are the pathology results?"
- "Get patient registration details"
- "What medications is the patient taking?"

**Greeting and Help:**
- "Hello" / "Hi" / "Good morning"
- "What can you do?"
- "Help me"

**Voice Queries:**
- Click microphone button to record
- Automatic transcription with Gemini
- Audio responses with AWS Polly

## 🔄 API Endpoints

### Chat Endpoints

```
POST /api/v1/chat/send
```
**Request Body**:
```json
{
  "message": "Show me patient treatment history"
}
```

**Response**:
```json
{
  "message": "Raw response text",
  "formatted_response": {
    "type": "table_data",
    "summary": "I found 24 treatment records...",
    "data": [...],
    "key_insights": [...],
    "record_count": 24
  },
  "audio_url": "/api/v1/chat/audio/temp_audio_output_123.mp3"
}
```

```
POST /api/v1/chat/transcribe
```
Upload audio file for transcription using Gemini AI.

```
GET /api/v1/chat/audio/{filename}
```
Retrieve generated audio files.

## 🧪 Development

### Build Scripts

```bash
# Root package.json scripts
npm run build      # Build frontend for production
npm run dev        # Start frontend development server
npm run start      # Preview production build

# Frontend specific
cd frontend
npm run dev        # Vite dev server
npm run build      # Production build
npm run preview    # Preview build
```

### Code Style
- **Backend**: Python with FastAPI best practices
- **Frontend**: React 19 with modern hooks and functional components
- **Styling**: CSS modules with ChatGPT-inspired design

## 📚 Key Dependencies

### Backend Dependencies
- `fastapi>=0.104.0`: Web framework
- `langchain-google-genai>=0.0.3`: Google AI integration
- `langgraph>=0.0.17`: Query orchestration and state management
- `pymysql>=1.1.0`: MySQL database connector
- `boto3>=1.28.0`: AWS services integration
- `pydantic>=2.4.2`: Data validation

### Frontend Dependencies
- `react`: ^19.1.0 - UI framework
- `axios`: ^1.10.0 - HTTP client
- `recordrtc`: ^5.6.2 - Audio recording
- `react-markdown`: ^10.1.0 - Markdown rendering
- `vite`: ^7.0.0 - Build tool

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify database credentials in [`backend/app/core/config.py`](backend/app/core/config.py)
   - Check if MySQL server is accessible

2. **Google API Key Issues**
   - Ensure API key has Gemini AI access enabled
   - Check quota limits in Google Cloud Console

3. **Audio Features Not Working**
   - Verify AWS credentials for Polly service
   - Check browser microphone permissions
   - Ensure audio directory exists in backend

4. **Vercel Deployment Issues**
   - Check environment variables are set in Vercel dashboard
   - Verify [`vercel.json`](vercel.json) configuration

## 📦 Deployment

### Vercel Configuration

The project includes [`vercel.json`](vercel.json) for seamless deployment:
- Frontend built with Vite and served statically
- Backend runs as Vercel Functions
- API routes automatically configured
- Environment variables managed through Vercel dashboard

### Environment Variables for Production

Set these in your Vercel dashboard:
- `GOOGLE_API_KEY`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `DATABASE_HOST`
- `DATABASE_USER`
- `DATABASE_PASSWORD`
- `DATABASE_NAME`

## 📄 License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

---

**Note**: This application is designed for educational and demonstration purposes in health informatics. Ensure proper security measures and compliance with healthcare regulations (HIPAA, etc.) before using in production environments.