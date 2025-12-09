const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

// Import de la Base de données
const sequelize = require('./middleware/sequelize');

// Test d'authentification
sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Connection to database failed'));

// Configure et autorise les accès extérieurs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// Users Routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// Posts Routes
const postRoutes = require('./routes/posts');
app.use('/posts', postRoutes);


// Stockage Multer
app.use("/images", express.static(path.join(__dirname, "images")));


// Exportation de l'application
module.exports = app;