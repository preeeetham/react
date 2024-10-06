import express from "express";
const router = express.Router();
import { loginUser, registerUser,getUser, } from '../controllers/userController.js';
import { googleAuth,googleAuthCallback } from '../controllers/googleController.js';
import { githubAuth,githubAuthCallback } from '../controllers/githubController.js';
import requireAuth from '../middleware/auth.js';


router.post("/login",loginUser);
router.post("/register",registerUser);
router.get("/getuser", requireAuth, getUser);

router.post("/auth/google",googleAuth);
router.post("/auth/google/callback",googleAuthCallback);

router.post("/auth/github",githubAuth);
router.post("/auth/github/callback",githubAuthCallback);


export default router;