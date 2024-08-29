import express from 'express';

import { textGenerator } from '../controllers/home.controller.js';

const router = express.Router();

router.get("/textLoader", textGenerator);

export default router;