const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')

router.get('/user',userController.getUsers);
router.post('/user/login',userController.logInUser);
router.post('/user/signup',userController.signUpUser);

module.exports = router;