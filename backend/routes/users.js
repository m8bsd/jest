const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const usersCtrl = require('../controllers/users');


router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/', usersCtrl.getAllUsers);
router.get('/:id', usersCtrl.getOneUser);
router.put('/:id', auth, usersCtrl.modifyUser);
router.delete('/:id', usersCtrl.deleteAccount);


module.exports = router;