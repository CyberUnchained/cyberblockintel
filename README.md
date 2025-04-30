# BlockIntelAI - Cybersecurity Intelligence Platform

A modern, cyberpunk-themed cybersecurity intelligence platform built with React and FastAPI, featuring AI-powered threat analysis and real-time monitoring.

![BlockIntelAI Dashboard](./docs/dashboard.png)

## 🚀 Features

- *Real-time Threat Monitoring Dashboard*
  - Interactive threat severity distribution charts
  - Timeline analysis of threats
  - Category-based threat analysis
  - Recent activity feed with real-time updates

- *AI-Powered Chat Assistant*
  - Natural language threat analysis
  - Context-aware responses
  - Threat mitigation recommendations
  - Integration with threat data

- *User Authentication*
  - Firebase Google Authentication
  - Secure email/password login
  - Protected routes
  - User profile management

- *Threat Analysis*
  - Upload and analyze threat data
  - Blockchain-based verification
  - Severity assessment
  - Attack vector analysis

## 🛠 Technology Stack

### Frontend
- *Framework:* React 18.2.0 with Vite
- *State Management:* React Context
- *Routing:* React Router DOM 6.22.1
- *HTTP Client:* Axios 1.6.7
- *Animations:* Framer Motion 11.0.5
- *UI Components:*
  - Lucide React (Icons)
  - Radix UI Components
  - Custom CSS Modules
- *Authentication:* Firebase Auth

### Backend
- *Framework:* FastAPI
- *Database:* PostgreSQL
- *AI Integration:* Groq API
- *Authentication:* Firebase Admin SDK
- *API Documentation:* OpenAPI/Swagger

## 🎨 Design System

- *Theme:* Cyberpunk-inspired dark mode
- *Color Palette:*
  - Primary: #3b82f6 (Blue)
  - Critical: #ef4444 (Red)
  - High: #f97316 (Orange)
  - Medium: #eab308 (Yellow)
  - Low: #22c55e (Green)
  - Background: #111827
  - Surface: #1f2937

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8 or higher
- Firebase account
- Groq API key

### Frontend Setup

1. Navigate to the frontend directory:
   bash
   cd frontend
   

2. Install dependencies:
   bash
   npm install
   

3. Create a .env file:
   env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   

4. Start the development server:
   bash
   npm run dev
   

### Backend Setup

1. Navigate to the backend directory:
   bash
   cd backend
   

2. Create and activate virtual environment:
   bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   

3. Install dependencies:
   bash
   pip install -r requirements.txt
   

4. Create a .env file:
   env
   DATABASE_URL=your_database_url
   GROQ_API_KEY=your_groq_api_key
   FIREBASE_ADMIN_SDK_PATH=path_to_firebase_admin_sdk.json
   

5. Start the backend server:
   bash
   uvicorn app.main:app --reload


## 🔐 Security Features

- Firebase Authentication integration
- Protected API endpoints
- CORS configuration
- Environment variable management
- API key validation
- Error handling and logging

## 🧪 Testing

### Frontend Tests
bash
cd frontend
npm test


### Backend Tests
bash
cd backend
pytest


## 📚 API Documentation

Once the backend is running, access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

This project is also deployed in aws cloud. you can check it out in:http://ec2-51-20-181-99.eu-north-1.compute.amazonaws.com:3000

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
thi
