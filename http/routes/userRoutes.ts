import express from 'express'
const router = express.Router()
import userController from '../controllers/userController';


router.get('/user',userController.getUsers);
router.post('/user/login',userController.getUser);
router.post('/user/signup',userController.addUser);

export default router;