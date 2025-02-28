import { Router } from 'express';
import userController from '../Controllers/user.controller.js';


const router = Router();


router.get('/registerUser', userController.registerUser);


export default router;