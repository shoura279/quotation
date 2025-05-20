import express from "express";
import dotenv from "dotenv";
import { bootstrap } from "./src/bootstrap.js";
const app = express();
dotenv.config();
const port = 3000;
bootstrap(app, express);
app.listen(port, () => console.log(`server is listening on port`, port));
