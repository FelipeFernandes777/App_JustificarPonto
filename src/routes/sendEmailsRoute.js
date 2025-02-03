import sendEmailsController from "../controller/sendEmailsController.js";
import { Router } from "express";

const route = Router();
const emailController = sendEmailsController();

route.post("/", emailController.sendEmail).get("/", emailController.getEmails);

export { route };
