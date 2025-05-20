import { Router } from "express";
import { asyncHandler } from "../Utils/Error/async-handler.js";
import { login, register } from "./auth.service.js";

const router = Router();

router.post("/signup", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;
