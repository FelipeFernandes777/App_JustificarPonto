import { formatedDate } from "../utils/formatedDate.js";
import { getGreeting } from "../utils/getGreeting.js";
import transporter from "../config/transport.config.js";
import { selectHighSchool } from "./../utils/selectHighSchool.js";

export async function sendEmailsSevices(t) {
   try {
      console.log("Dados recebidos:", t);

      // Verifica se os dados foram enviados corretamente
      if (!t || !t.userInfo || !t.timeInfo) {
         throw new Error(
            "Estrutura dos dados inválida. Certifique-se de que userInfo e timeInfo estão presentes."
         );
      }

      const { userInfo, timeInfo } = t;
      console.log(timeInfo.data);

      const formatedText = `
<!DOCTYPE html>
<html>
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Registro de Ponto</title>
      <style>
         body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #f4f4f4;
         }
         .container {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
         }
         .title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
         }
         .info {
            margin-bottom: 8px;
         }

         .info_content {
            width: 100%;
            height: 100%;
         }
         .info_checkbox {
            width: 100%;
            font-weight: bold;
            display: flex;
            gap: 10px;
            justify-content: space-between;
         }

         .info_option{
            width: 90px;
         }
         .space {
            width: 120px;
         }
      </style>
   </head>
   <body>
      <div class="container">
         <div class="title">${getGreeting()}</div>
         <div class="info">Data: ${formatedDate(timeInfo.data)}</div>
         <div class="info">
            Nome do Funcionário: ${userInfo.nome_funcionario}
         </div>
         <div class="info">Empresa: ${userInfo.empresa}</div>

         <div class="info_content">
            <div class="info_checkbox">
               <span class="info_option">${
                  timeInfo.entrada ? "( X )" : "( )"
               } Entrada: </span>
               <div class="space"> </div>
               <span>Horário: ${timeInfo.entradaTime} </span>
            </div>
            <div class="info_checkbox">
               <span class="info_option">${
                  timeInfo.intervalo ? "( X )" : "( )"
               } Intervalo: </span>
               <div class="space"> </div>
               <span>Horário: ${timeInfo.intervaloTime}</span>
            </div>
            <div class="info_checkbox">
               <span class="info_option">${
                  timeInfo.retorno ? "( X )" : "( )"
               } Retorno: </span>
               <div class="space"> </div>
               <span>Horário: ${timeInfo.retornoTime}</span>
            </div>
            <div class="info_checkbox">
               <span class="info_option">${
                  timeInfo.saida ? "( X )" : "( )"
               } Saída:</span>
               <div class="space"> </div>
               <span> Horário: ${timeInfo.saidaTime}</span>
            </div>
         </div>

         <div class="info">
            <strong>Justificativa:</strong> ${userInfo.justificativa}
         </div>
      </div>
   </body>
</html>
      `;

      const emailModel = {
         from: `${userInfo.nome_funcionario} <${userInfo.email}>`,
         // to: selectHighSchool(userInfo.to),
         to: "felipe524.fernandes@gmail.com",
         subject: "Justificativa de Ponto",
         text: formatedText,
         html: formatedText,
      };

      const sender = transporter(userInfo);
      const info = await sender.sendMail(emailModel);

      return {
         message: "E-mail enviado com sucesso!",
         status: "success",
         email: info,
      };
   } catch (error) {
      console.error("Erro no serviço de e-mail:", error.message);
      return { error: error.message, message: "Erro ao enviar e-mail" };
   }
}
