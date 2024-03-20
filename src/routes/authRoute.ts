import express from 'express';
import { changeUsername, createUser, loginUser } from '../controllers/authCtrl';
import isCurrentUserValid from '../middleware/isCurrentUserValid';

const router = express.Router();

router.post('/signup', createUser);

router.post('/login', loginUser);

router.post('/user/:id', isCurrentUserValid, changeUsername);

export default router;
