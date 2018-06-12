var express = require('express');
var router = express.Router();

var ctrlUsers = require('../controllers/users');

router.post('/register', ctrlUsers.registerUser);
router.post('/login', ctrlUsers.loginUser);

module.exports = router;
