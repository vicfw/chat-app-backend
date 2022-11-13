import express from 'express';

const { addMessage, getMessages } = require('../controllers/messageController');
const router = express.Router();

router.post('/addmsg/', addMessage);
router.post('/getmsg/', getMessages);

export default router;
