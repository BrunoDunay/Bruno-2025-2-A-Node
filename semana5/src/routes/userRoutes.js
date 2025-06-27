import express from 'express';
import { logger } from '../middlewares/logger.js';
import { getUsers, addUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', logger, getUsers);
router.post('/users', logger, addUser);

export default router;