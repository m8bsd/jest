# Internal Social Network - GROUPOMANIA

A modern social network application built as a monorepo with a robust backend API and an interactive Vue.js frontend.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [License](#license)

## 📖 Overview

This project is an internal social network platform that allows users to:
- Create an account and authenticate securely
- Post updates and comments
- Browse other users' profiles
- Upload profile images
- Manage their posts and comments

## 🏗️ Project Structure

```
internal-social-network/
├── backend/                 # Express.js API server
│   ├── controllers/        # Route controllers
│   ├── models/             # Sequelize ORM models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth, multer, sequelize config
│   ├── images/             # User uploads
│   ├── app.js              # Express app setup
│   ├── server.js           # Server entry point
│   └── package.json        # Backend dependencies
├── frontend/               # Vue.js SPA
│   ├── src/
│   │   ├── components/     # Vue components
│   │   ├── views/          # Page views
│   │   ├── store/          # Vuex state management
│   │   ├── router/         # Vue Router config
│   │   ├── assets/         # Static assets
│   │   ├── App.vue         # Root component
│   │   └── main.js         # Entry point
│   ├── public/             # Public assets
│   └── package.json        # Frontend dependencies
├── .gitignore              # Git ignore rules
├── .prettierrc              # Prettier config
├── CHANGELOG.md            # Version history
└── package.json            # Root dependencies
```

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js** - REST API server
- **Sequelize** - ORM for database management
- **MySQL** - Relational database
- **JWT (jsonwebtoken)** - Secure authentication
- **bcrypt** - Password hashing
- **multer** - File upload handling
- **dotenv** - Environment variables

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router 4** - Client-side routing
- **Vuex 4** - State management
- **Babel** - JavaScript transpilation
- **ESLint** - Code quality

### Development Tools
- **Prettier** - Code formatting
- **prettier-plugin-sort-imports** - Organized imports
- **nodemon** - Auto-reload development server

## 📦 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v12 or higher)
- **npm** or **yarn**
- **MySQL** (v5.7 or higher)

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/MarcHamacek/internal-social-network.git
cd internal-social-network
```

### 2. Install root dependencies

```bash
npm install
```

This installs shared dev dependencies (Prettier, etc.)

### 3. Install backend dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` folder:

```env
# Database Configuration
DB_NAME=your_database_name
DB_USER=your_username
DB_PW=your_password
DB_HOST=localhost

# Security
TOKEN_KEY=your_secret_jwt_key_here

# Server
PORT=3000
NODE_ENV=development
```

**Important:** Never commit `.env` files to version control!

### Prettier Configuration

The `.prettierrc` file at the root configures code formatting for both backend and frontend:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["@trivago/prettier-plugin-sort-imports"],
  "importOrder": [
    "^react$",
    "^next",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^[./]"
  ],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}
```

## 🚀 Running the Application

### Start Backend

```bash
cd backend
npm install  # if not already done
node server
```

The API will be available at `http://localhost:3000`

### Start Frontend

In a new terminal:

```bash
cd frontend
npm install  # if not already done
npm run serve
```

The frontend will be available at `http://localhost:8080`

## 📝 Available Scripts

### Backend

```bash
node server              # Start server
nodemon server.js        # Start with auto-reload
```

### Frontend

```bash
npm run serve            # Start development server
npm run build            # Build for production
npm run lint             # Run ESLint
```

## ✨ Features

- ✅ User authentication with JWT
- ✅ Secure password hashing with bcrypt
- ✅ Create, read, update, delete posts
- ✅ Comment on posts
- ✅ User profiles with avatar uploads
- ✅ Responsive Vue.js interface
- ✅ Real-time state management with Vuex

## 📄 License

ISC

## 👤 Author

Marc Hamacek

---

For detailed version history, see [CHANGELOG.md](./CHANGELOG.md)
