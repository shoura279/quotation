import { connectDB } from "./DB/connection.js";
import { globalErrorHandler } from "./Utils/Error/global-error.js";
import authRouter from "./auth/auth.controller.js";
import quotationRouter from "./Quotation/quotation.controller.js";
import expensesRouter from "./Expenses/expenses.controller.js";
export function bootstrap(app, express) {
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/quotation", quotationRouter);
  app.use("/expense", expensesRouter);

  connectDB();
  app.use(globalErrorHandler);
}

export default bootstrap;
