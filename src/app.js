import express from "express";
import { setConfigServer } from "./utils/setConfigServer.js";
import { route } from "./routes/sendEmailsRoute.js";
import { corsConfiguration } from "./config/cors.config.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/email", route);
// app.use(corsConfiguration());

//set config server
setConfigServer();

export default app;
