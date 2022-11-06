import express from 'express';
import { registerController } from '../controllers/userController';

const router = express.Router();

router.post('/', registerController);
router.get('/', (req, res) => {
  res.send('hello');
});

export default router;
