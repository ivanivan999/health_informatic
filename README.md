# Health Informatics AI Bot

A full-stack AI-powered healthcare assistant application that enables natural language queries about patient data using Google's Gemini AI and advanced SQL database interaction.

## 🏥 Overview

The Health Informatics AI Bot is an intelligent healthcare assistant that allows healthcare professionals to query patient information using natural language. The system automatically converts user questions into SQL queries, executes them against a MySQL database, and returns formatted results with both text and audio responses.

## ✨ Features

- **Natural Language Processing**: Ask questions about patient data in plain English
- **Intelligent SQL Generation**: Automatically converts natural language to SQL queries using Google Gemini AI
- **Multi-format Responses**: Get results in text, HTML tables, and audio format
- **Voice Interaction**: Record voice queries and receive spoken responses
- **Patient-Specific Queries**: Focused queries for specific patient information
- **Data Validation**: Built-in SQL query validation and error checking
- **Responsive UI**: Modern React-based frontend with chat interface

## 🏗️ Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with Python 3.12+
- **AI Integration**: Google Gemini 2.0 Flash model via LangChain
- **Database**: MySQL with LangGraph for query orchestration
- **Audio Processing**: AWS Polly for text-to-speech synthesis
- **API Structure**: RESTful endpoints with async support

### Frontend (React + Vite)
- **Framework**: React 19 with Vite build tool
- **UI Components**: Custom chat interface with audio player
- **API Communication**: Axios for HTTP requests
- **Audio Recording**: RecordRTC for voice input
- **Styling**: CSS modules with responsive design

### Database
- **Type**: MySQL (AWS RDS)
- **Connection**: PyMySQL with SQLAlchemy
- **Security**: Parameterized queries to prevent SQL injection

## 📁 Project Structure

```
health_informatic/
├── backend/                    # FastAPI backend application
│   ├── app/
│   │   ├── core/              # Configuration and security
│   │   ├── models/            # Pydantic models
│   │   ├── routers/           # API route handlers
│   │   ├── services/          # Business logic services
│   │   └── main.py           # FastAPI application entry point
│   ├── audio/                 # Audio file storage
│   └── requirements.txt       # Python dependencies
├── frontend/                  # React frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── services/          # API and audio services
│   │   ├── styles/           # CSS stylesheets
│   │   └── App.jsx           # Main React component
│   ├── package.json          # Node.js dependencies
│   └── vite.config.js        # Vite configuration
└── streamlit_with_gemini.py   # Alternative Streamlit interface
```

## 🚀 Getting Started

### Prerequisites

- Python 3.12+
- Node.js 18+
- MySQL database access
- Google API key for Gemini AI
- AWS credentials for Polly (optional, for audio features)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables**:
   Create a `.env` file in the backend directory:
   ```env
   # Database Configuration
   DATABASE_URL=mysql+pymysql://username:password@host:port/database

   # Google AI Configuration
   GOOGLE_API_KEY=your_google_api_key_here

   # AWS Configuration (optional)
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=us-east-1

   # Application Configuration
   PROJECT_NAME="Health Informatics AI"
   API_V1_STR="/api/v1"
   DEFAULT_PATIENT_ID=your_default_patient_id
   ```

4. **Start the backend server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

### Alternative Streamlit Interface

For a simpler interface, you can use the Streamlit version:

```bash
streamlit run streamlit_with_gemini.py
```

## 🔧 Configuration

### Database Configuration

The application connects to a MySQL database containing patient information. Update the database credentials in your environment configuration:

```python
# In database_agent.py (for development only)
host = 'your-database-host'
port = 3306
user = 'your-username'
password = 'your-password'
database = 'your-database-name'
```

### AI Model Configuration

The system uses Google's Gemini 2.0 Flash model. You can modify the model settings in the `DatabaseAgent` class:

```python
llm = ChatGoogleGenerativeAI(
    model='gemini-2.0-flash',
    verbose=True,
    temperature=0,
    google_api_key=self.gemini_key
)
```

## 📊 Key Components

### DatabaseAgent Class

The core component that handles:
- Natural language query interpretation
- SQL query generation and validation
- Database schema introspection
- Result formatting (text and HTML)
- Error handling and recovery

### Query Processing Pipeline

1. **Query Type Determination**: Classifies if the query is patient-related
2. **Schema Retrieval**: Gets relevant database table information
3. **SQL Generation**: Converts natural language to SQL
4. **Query Validation**: Checks for common SQL mistakes
5. **Execution**: Runs the validated query
6. **Formatting**: Converts results to user-friendly format

## 🛡️ Security Features

- **SQL Injection Prevention**: Parameterized queries and input validation
- **Database Access Control**: Read-only operations only
- **CORS Configuration**: Proper cross-origin request handling
- **Error Handling**: Graceful error responses without exposing sensitive data

## 🎯 Usage Examples

### Text Queries
- "What is the patient's current treatment plan?"
- "Show me the latest lab results"
- "What medications is the patient currently taking?"
- "When was the last appointment?"

### Voice Queries
- Record your question using the microphone button
- Receive both text and audio responses
- Support for various accents and speaking styles

## 🔄 API Endpoints

### Chat Endpoint
```
POST /api/v1/chat/send
```

**Request Body**:
```json
{
  "message": "What is the patient's blood pressure?",
  "patient_id": "12345"
}
```

**Response**:
```json
{
  "response": "Patient's latest blood pressure reading is 120/80 mmHg",
  "has_table": true,
  "table_html": "<table>...</table>",
  "audio_url": "/audio/response.mp3",
  "timestamp": "2025-07-05T10:30:00Z"
}
```

## 🧪 Development

### Running Tests
```bash
# Backend tests
cd backend
python -m pytest

# Frontend tests
cd frontend
npm test
```

### Code Style
- **Backend**: Follows PEP 8 with Black formatter
- **Frontend**: ESLint configuration for React best practices

## 📚 Dependencies

### Backend Key Dependencies
- `fastapi`: Web framework
- `langchain-google-genai`: Google AI integration
- `langgraph`: Query orchestration
- `pymysql`: MySQL database connector
- `boto3`: AWS services integration
- `pandas`: Data manipulation
- `tabulate`: Table formatting

### Frontend Key Dependencies
- `react`: UI framework
- `axios`: HTTP client
- `recordrtc`: Audio recording
- `react-markdown`: Markdown rendering

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify database credentials and network connectivity
   - Check if MySQL server is running

2. **Google API Key Issues**
   - Ensure API key is valid and has Gemini API access
   - Check quota limits

3. **Audio Features Not Working**
   - Verify AWS credentials for Polly service
   - Check browser microphone permissions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Note**: This application is designed for educational and demonstration purposes. Ensure proper security measures and compliance with healthcare regulations before using in production environments.