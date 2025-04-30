# BlockIntelAI - Cybersecurity Intelligence Platform

A modern, cyberpunk-themed cybersecurity intelligence platform built with React and FastAPI, featuring AI-powered threat analysis and blockchain-based threat verification system.

##Team Name: CyberUnchained

## Team members
   1.Siddharth S
   2.San hariharan
   3.Sanjaykumar DK
   4.Raghavan V


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

- *Blockchain-Based Threat Verification*
  - Immutable threat records on Ethereum blockchain
  - Smart contract-based verification system
  - Decentralized threat data storage
  - Real-time blockchain synchronization
  - Automated threat validation
  - Consensus-based threat scoring

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

### Blockchain Infrastructure (Coming Soon)
- *Network:* Ethereum (Primary) / Polygon (Layer 2)
- *Smart Contracts:* Solidity 0.8.x
- *Development Framework:* Hardhat
- *Web3 Integration:*
  - ethers.js
  - Web3.js
  - Wagmi Hooks
- *Contract Security:*
  - OpenZeppelin Contracts
  - Slither Analyzer
- *Testing:*
  - Hardhat Test
  - Chai
  - Ethers
- *Deployment:*
  - Infura/Alchemy Provider
  - Hardware Wallet Support
  - Multi-signature Deployment

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
   

### Blockchain Setup (Coming Soon)

1. Install Hardhat and dependencies:
   bash
   npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
   

2. Configure network settings in hardhat.config.js:
   javascript
   module.exports = {
     networks: {
       hardhat: {},
       ethereum: {
         url: process.env.ETH_NODE_URL,
         accounts: [process.env.PRIVATE_KEY]
       },
       polygon: {
         url: process.env.POLYGON_NODE_URL,
         accounts: [process.env.PRIVATE_KEY]
       }
     }
   };
   

3. Deploy contracts:
   bash
   npx hardhat run scripts/deploy.js --network <network-name>
   

4. Update environment variables:
   env
   VITE_CONTRACT_ADDRESS=your_contract_address
   VITE_WEB3_PROVIDER_URL=your_provider_url
   

## 📁 Project Structure


blockintelai/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── styles/         # Global styles and CSS modules
│   │   ├── context/        # React context providers
│   │   └── config/         # Configuration files
│   └── public/             # Static assets
├── backend/
│   ├── app/
│   │   ├── api/           # API endpoints
│   │   ├── core/          # Core functionality
│   │   ├── models/        # Database models
│   │   ├── schemas/       # Pydantic schemas
│   │   └── services/      # Business logic
│   └── tests/             # Backend tests
└── docs/                  # Documentation


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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Firebase](https://firebase.google.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Radix UI](https://www.radix-ui.com/)

## 🔗 Blockchain Architecture

### Smart Contracts
1. *ThreatRegistry.sol*
   - Core contract for threat registration
   - Threat data structure and mapping
   - Access control and permissions
   - Event emission for frontend updates

2. *ThreatVerification.sol*
   - Verification logic and consensus
   - Staking mechanism for validators
   - Reputation system
   - Automated scoring algorithm

3. *ThreatGovernance.sol*
   - Protocol upgrades and parameters
   - Community voting mechanism
   - Emergency pause functionality
   - Treasury management

### Threat Data Flow
1. *Submission*
   - Threat data is analyzed by AI
   - Metadata is generated and formatted
   - Data is encrypted if necessary
   - Transaction is prepared with gas optimization

2. *Verification*
   - Smart contract validates data format
   - Consensus mechanism triggers
   - Validators review and stake
   - Automated checks run

3. *Storage*
   - Core data stored on-chain
   - Large datasets use IPFS with hash reference
   - Merkle trees for data integrity
   - Event logs for frontend sync

4. *Retrieval*
   - Real-time blockchain listening
   - Event filtering and processing
   - Cache layer for quick access
   - Fallback to IPFS when needed

## 💡 Blockchain Features

### Threat Verification
- Multi-signature verification process
- Stake-weighted consensus mechanism
- Automated validation checks
- Reputation-based validator selection

### Data Security
- On-chain access control
- Encrypted sensitive data
- Permissioned write access
- Public read transparency

### Performance
- Gas-optimized contracts
- Layer 2 scaling solution
- Efficient data structures
- Batch processing support

### Integration
- Web3 wallet connection
- Transaction monitoring
- Event subscription system
- Blockchain sync status


## 📝 Smart Contract Documentation

Once deployed, access the smart contract documentation and interaction guide at:
- Contract Address: [Etherscan Link]
- Technical Documentation: /docs/contracts/
- API Reference: /docs/contracts/api.md
