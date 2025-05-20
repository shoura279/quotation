import { connectDB } from "./DB/connection.js";
import { globalErrorHandler } from "./Utils/Error/global-error.js";
import authRouter from "./auth/auth.controller.js";
function bootstrap(app, express) {
  app.use(express.json());
  app.use("/auth", authRouter);
  
  connectDB();
  app.use(globalErrorHandler);
}

export default bootstrap;
