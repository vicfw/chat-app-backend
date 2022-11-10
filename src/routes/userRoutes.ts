import express from 'express';
import {
  getAllUsersController,
  loginController,
  registerController,
  setAvatarController,
} from '../controllers/userController';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/setAvatar/:id', setAvatarController);
router.get('/allusers/:id', getAllUsersController);

export default router;
