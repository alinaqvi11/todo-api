import express from 'express'
const router = express.Router()
import userController from '../controller/userController';


router.get('/user',userController.getUsers);
router.post('/user/login',userController.logInUser);
router.post('/user/signup',userController.addUser);

export default router;