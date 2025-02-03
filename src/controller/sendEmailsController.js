import { sendEmailsSevices } from "../services/sendEmailsSenvice.js";

export default function sendEmailsController() {
   function getEmails(req, res) {
      try {
         const data = [
            { id: 1, email: "test1@gmail.com" },
            { id: 2, email: "test2@gmail.com" },
         ];

         res.status(200).send({
            data: data,
            status: "success", // Corrigido de "sucess" para "success"
            statusCode: 200, // Definido explicitamente
         });
      } catch (error) {
         res.status(500).send({
            message: error.message,
            status: "error",
            statusCode: 500,
         });
      }
   }

   async function sendEmail(req, res) {
      try {
         const data = req.body;

         if (!data || Object.keys(data).length === 0) {
            return res.status(400).send({
               message: "Corpo da requisição vazio",
               status: "error",
               statusCode: 400,
            });
         }

         const emailResponse = await sendEmailsSevices(data);

         return res.status(200).send({
            message: "E-mail enviado com sucesso",
            status: "success",
            email: emailResponse,
            statusCode: 200,
         });
      } catch (error) {
         res.status(400).send({
            message: "Erro ao enviar e-mail",
            status: "error",
            statusCode: 400,
            error: error.message,
            where: "Controller",
         });
      }
   }

   return {
      getEmails,
      sendEmail,
   };
}
