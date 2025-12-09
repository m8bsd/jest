const sequelize = require('../middleware/sequelize');
const {
    DataTypes
} = require('sequelize');


const Comment = sequelize.define("Comment", {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Comment;