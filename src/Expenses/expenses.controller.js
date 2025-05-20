import { Router } from "express";
import { isAuthenticate } from "../Middleware/authorization.js";
import { asyncHandler } from "../Utils/Error/async-handler.js";
import * as expenseService from "./expenses.service.js";

const router = Router();

router.post("/", isAuthenticate, asyncHandler(expenseService.addExpense));
router.get("/", isAuthenticate, asyncHandler(expenseService.getExpenses));
router.delete(
  "/:id",
  isAuthenticate,
  asyncHandler(expenseService.deleteExpense)
);
export default router;
