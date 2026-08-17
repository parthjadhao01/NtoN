import { Router } from "express";
import rateLimit from "express-rate-limit";
import { signup, login, refresh, logout } from "../controllers/auth.controllers";

const authRouter = Router();

const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many attempts, please try again later" }
});

authRouter.post("/signup", authRateLimiter, signup)
authRouter.post("/login", authRateLimiter, login)
authRouter.post("/refresh", refresh)
authRouter.post("/logout", logout)


export default authRouter;