import { Router } from 'express';
import userController from '../Controllers/user.controller.js';


const router = Router();


router.post('/registerUser', userController.registerUser);


export default router;