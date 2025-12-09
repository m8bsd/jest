# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-12-03

### Added

- Root-level development dependencies:
  - Prettier with sort-imports plugin for code formatting
- Configuration files:
  - `.prettierrc` for code formatting configuration
  - `.gitignore` for version control exclusions

## [1.0.0] - 2021-07-03

### Added

- Initial project setup with monorepo structure (backend + frontend)
- Backend dependencies:
  - Express.js for API server
  - Sequelize ORM with MySQL2
  - JWT authentication with jsonwebtoken
  - Password validation with password-validator
  - File uploads with multer
  - Environment configuration with dotenv
  - Development tool: nodemon
- Frontend dependencies:
  - Vue 3 with Vue Router and Vuex
  - Vue CLI tools (babel, eslint)
  - ESLint with Vue plugin support
- Project structure:
  - `backend/` - Node.js/Express API server
  - `frontend/` - Vue 3 SPA application
  - `backend/controllers/` - API controllers (posts, users)
  - `backend/models/` - Sequelize models (User, Post, Comment)
  - `backend/routes/` - Express routes
  - `backend/middleware/` - Auth, multer, sequelize configuration
  - `frontend/src/components/` - Vue components
  - `frontend/src/views/` - Application views
  - `frontend/src/store/` - Vuex store
