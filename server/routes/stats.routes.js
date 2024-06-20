import express from 'express';
import { recordStats } from '../controllers/userStats.controller.js';

const router = express.Router();

router.post("/recordStats", recordStats);

export default router;