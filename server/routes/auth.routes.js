import express from 'express';
import { registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register-user", registerUser);

export default router;