import express from "express";
import { Register } from "../controller/auth.js";
import { login } from "../controller/auth.js";

const AuthRouter=express.Router();

AuthRouter.post("/api/register",Register);
AuthRouter.post("/api/login",login);
export default AuthRouter;