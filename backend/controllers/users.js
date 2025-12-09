const User = require('../models/User');
const Post = require('../models/Post');
const {
    json
} = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PasswordValidator = require('password-validator');

const passwordSchema = new PasswordValidator();
passwordSchema
    .is().min(8)
    .is().max(15)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces();


// Create an account
exports.signup = (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((user) => {
            if (user) {
                return res.status(401).json({
                    message: 'Cette adresse email est déjà utilisée !'
                })
            }
            if (!passwordSchema.validate(req.body.password)) {
                return res.status(400).json({
                    message: 'Le mot de passe doit contenir une majuscule, une minuscule, un symbole et un chiffre. Sa longueur doit être entre 8 et 15 caractères'
                });
            }
            bcrypt
                .hash(req.body.password, 10)
                .then((hash) => {
                    User.create({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            department: req.body.department,
                            email: req.body.email,
                            password: hash
                        })
                        .then((user) => res.status(201).json({
                            message: 'Utilisateur créé !',
                            firstName: user.firstName,
                            lastName: user.lastName,
                            department: user.department,
                            email: user.email,
                            userId: user.id,
                            isAdmin: user.isAdmin,
                            token: jwt.sign({
                                    userId: user.id,
                                    isAdmin: user.isAdmin
                                },
                                process.env.TOKEN_KEY, {
                                    expiresIn: "24h"
                                }
                            )
                        }))
                        .catch((error) => res.status(400).json({
                            error
                        }));
                });
        })
        .catch((error) => res.status(500).json({
            error
        }));
};

// Login to an account
exports.login = (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur introuvable !'
                })
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Mot de passe incorrect !'
                        })
                    }
                    res.status(200).json({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        department: user.department,
                        email: user.email,
                        userId: user.id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign({
                                userId: user.id,
                                isAdmin: user.isAdmin
                            },
                            process.env.TOKEN_KEY, {
                                expiresIn: "24h"
                            }
                        )
                    })
                })
                .catch(error => res.status(401).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};

// Get all accounts
exports.getAllUsers = (req, res) => {
    User.findAll({
            //include: [Post]
        })
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => res.status(404).json({
            error
        }));
};

// Get an account
exports.getOneUser = (req, res) => {
    User.findOne({
            where: {
                id: req.params.id
            },
        })
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => res.status(404).json({
            error: "Utilisateur introuvable !"
        }));
};

// Update an account
exports.modifyUser = (req, res) => {
    console.log(req.params.id);
    User.findOne({
            where: {
                id: req.params.id
            },
        })
        .then(user => {
            if (user.id === req.token.userId) {
                bcrypt
                    .hash(req.body.password, 10)
                    .then((hash) => {
                        User.update({
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                department: req.body.department,
                                email: req.body.email,
                                password: hash
                            }, {
                                where: {
                                    id: req.params.id
                                }
                            })
                            .then((user) => res.status(200).json({
                                message: "Votre profil a bien été modifié !",
                                firstName: user.firstName,
                                lastName: user.lastName,
                                department: user.department,
                                email: user.email,
                                userId: user.id,
                                isAdmin: user.isAdmin,
                                token: jwt.sign({
                                        userId: user.id,
                                        isAdmin: user.isAdmin
                                    },
                                    process.env.TOKEN_KEY, {
                                        expiresIn: "24h"
                                    }
                                )
                            }))
                            .catch(error => res.status(400).json({
                                error
                            }));
                    })

            } else {
                res.status(401).json({
                    error: "Vous ne disposez pas des droits pour modifier ce post !"
                });
            }
        })
        .catch(error => res.status(404).json({
            error: "Utilisateur introuvable !"
        }));
};

// Delete an account
exports.deleteAccount = (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(200).json({
            message: "Votre compte a bien été supprimé !"
        }))
        .catch(error => res.status(400).json({
            error
        }));
};