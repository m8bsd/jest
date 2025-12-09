const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const fs = require('fs-extra');
const {
    json
} = require('body-parser');


// POSTS

// Create a Post
exports.createPost = (req, res) => {
    const postObject = req.file ? {
        content: req.body.content,
        image: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
    } : {
        content: req.body.content
    };
    Post.create({
            ...postObject,
            UserId: req.token.userId
        })
        .then(() => res.status(201).json({
            message: 'Votre post a bien été publié !'
        }))
        .catch((error) => res.status(400).json({
            error
        }));
};

// Read all posts
exports.getAllPosts = (req, res) => {
    Post.findAll({
            include: [
                User
            ],
            order: [
                ['updatedAt', 'DESC']
            ]
        })
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => res.status(404).json({
            error
        }));
};

// Read one post
exports.getOnePost = (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            include: [
                User,
                {
                    model: Comment,
                    include: User,
                },
            ],
            order: [
                [{
                    model: Comment
                }, "updatedAt", "ASC"]
            ],
        })
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => res.status(404).json({
            error: "Post introuvable !"
        }));
};

// Update a post
exports.updatePost = (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(post => {
            if (post.UserId === req.token.userId) {
                const postObject = req.file ? {
                    content: req.body.content,
                    image: `${req.protocol}://${req.get("host")}/images/${
                        req.file.filename
                      }`,
                } : {
                    content: req.body.content
                };
                if (req.file) {
                    if (post.image != null) {
                        const filename = post.image.split("/images/")[1];
                        fs.unlink(`./images/${filename}`, () => {
                            Post.update({
                                    ...postObject,
                                    UserId: req.body.userId
                                }, {
                                    where: {
                                        id: req.params.id
                                    }
                                })
                                .then(() => res.status(200).json({
                                    message: 'Votre post a bien été modifié !'
                                }))
                                .catch(error => res.status(400).json({
                                    error
                                }));
                        })

                    } else {
                        Post.update({
                                ...postObject,
                                UserId: req.body.userId
                            }, {
                                where: {
                                    id: req.params.id
                                }
                            })
                            .then(() => res.status(200).json({
                                message: 'Votre post a bien été modifié !'
                            }))
                            .catch(error => res.status(400).json({
                                error
                            }));
                    }

                } else {
                    Post.update({
                            ...postObject,
                            UserId: req.body.userId
                        }, {
                            where: {
                                id: req.params.id
                            }
                        })
                        .then(() => res.status(200).json({
                            message: 'Votre post a bien été modifié !'
                        }))
                        .catch(error => res.status(400).json({
                            error
                        }));

                }
            } else {
                res.status(401).json({
                    error: "Vous ne disposez pas des droits pour modifier ce post !"
                });
            }
        })
        .catch(error => res.status(404).json({
            error: "Post introuvable !"
        }));
};

// Delete a post
exports.deletePost = (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((post) => {
            if (post.UserId === req.token.userId || req.token.isAdmin === true) {
                if (post.image) {
                    const filename = post.image.split("/images/")[1];
                    fs.unlink(`./images/${filename}`, () => {
                        Post.destroy({
                                where: {
                                    id: post.id
                                }
                            })
                            .then(() => res.status(200).json({
                                message: "Votre post a bien été supprimé !"
                            }))
                            .catch(error => res.status(400).json({
                                error
                            }));
                    })
                } else {
                    Post.destroy({
                            where: {
                                id: post.id
                            }
                        })
                        .then(() => res.status(200).json({
                            message: "Votre post a bien été supprimé !"
                        }))
                        .catch(error => res.status(400).json({
                            error
                        }));
                }
            } else {
                res.status(401).json({
                    error: "Vous ne disposez pas des droits pour supprimer ce post !"
                });
            }
        })
        .catch(error => res.status(500).json({
            error
        }));
};


// COMMENTS

// Add a comment to a post
exports.commentPost = (req, res) => {
    Comment.create({
            content: req.body.content,
            PostId: req.params.id,
            UserId: req.token.userId
        })
        .then(() => res.status(201).json({
            message: "Votre commentaire a bien été ajouté !"
        }))
        .catch((error) => res.status(400).json({
            error
        }));
};

// Read all comments
exports.getAllComments = (req, res) => {
    Comment.findAll({
            where: {
                PostId: req.params.id
            },
            include: [User]
        })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(404).json({
            error
        }));
};

// Read one comment
exports.getOneComment = (req, res) => {
    Comment.findOne({
            where: {
                id: req.params.id
            },
            include: [User]
        })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({
            error
        }));
}

// Update a comment on a post
exports.updateComment = (req, res) => {
    Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((comment) => {
            if (comment.UserId === req.token.userId) {
                Comment.update({
                        content: req.body.content,
                        UserId: req.token.id,
                    }, {
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(() => res.status(200).json({
                        message: 'Votre commentaire a bien été modifié !'
                    }))
                    .catch(error => res.status(400).json({
                        error
                    }));
            } else {
                res.status(401).json({
                    error: "Vous ne disposez pas des droits pour modifier ce commentaire !"
                })
            }
        })
        .catch(error => res.status(404).json({
            error
        }));
};

// Delete a comment on a post
exports.deleteComment = (req, res) => {
    Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((comment) => {
            if (comment.UserId === req.token.userId || req.token.isAdmin === true) {
                Comment.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(() => res.status(200).json({
                        message: 'Votre commentaire a bien été supprimé !'
                    }))
                    .catch(error => res.status(400).json({
                        error
                    }));
            } else {
                res.status(401).json({
                    error: "Vous ne disposez pas des droits pour supprimer ce post !"
                });
            }
        })
        .catch((error) => res.status(500).json({
            error
        }));
};