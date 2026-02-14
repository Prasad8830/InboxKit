# InboxKit - Real-Time Collaborative Pixel Grid

A full-stack real-time web application where multiple users can collaborate on a shared 20x20 pixel grid. Users can claim tiles in real-time, and changes are instantly synchronized across all connected clients using WebSocket technology.

## 📋 Tech Stack

### Frontend
- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Real-Time**: Socket.io-client 4.8.3
- **Icons**: lucide-react 0.468.0
- **Runtime**: Node.js

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.18.2
- **Real-Time**: Socket.io 4.7.2
- **Database**: MongoDB Atlas with Mongoose 7.5.0
- **Architecture**: MVC

## 📁 Project Structure

```
InboxKit/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── Tile.js              # MongoDB Tile schema
│   │   ├── services/
│   │   │   └── tileService.js       # Business logic for tile operations
│   │   ├── controllers/
│   │   │   └── tileController.js    # Request handlers
│   │   ├── routes/
│   │   │   └── tiles.js             # Express route
│   │   ├── middleware/
│   │   │   └── errorHandler.js      # Error handling
│   │   └── server.js                # Main Express app setup
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example
│      
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx             # Main application page
│   │   │   ├── layout.tsx           # Root layout
│   │   │   ├── globals.css         
│   │   │   └── favicon.ico
│   │   ├── components/
│   │   │   ├── Header.tsx           # Navigation header
│   │   │   ├── Grid.tsx             # 20x20 interactive tile grid
│   │   │   └── WelcomePage.tsx      
│   │   └── hooks/
│   │      └── useSocket.ts         # Socket.io connection hook
│   ├── public/
│   │   └── gaming-image.png         
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.mjs
│   ├── next.config.js
│   └── .env.example                   
│
└── README.md                
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or higher
- **npm** 9.0 or higher
- **MongoDB Atlas Account** (free tier available)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd InboxKit
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env and add your MongoDB connection string
   npm run dev
   ```
   The backend will start on `http://localhost:4000`

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   # .env.local is pre-configured for localhost:4000
   npm run dev
   ```
   The frontend will start on `http://localhost:3000`

## 🔧 Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tileboard
PORT=4000
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

## 📡 API Endpoints

GET /api/tiles
```
Response: Array of all 400 tiles with their current state
```