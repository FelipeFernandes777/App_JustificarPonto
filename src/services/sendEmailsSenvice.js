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
         ${getGreeting()}

         Data: ${formatedDate(timeInfo.data)}
         Nome do Funcionário: ${userInfo.nome_funcionario}
         Empresa: ${userInfo.empresa}

         ${timeInfo.entrada ? "( X )" : "( )"} Entrada: Horário: ${
         timeInfo.entradaTime
      }
         ${timeInfo.intervalo ? "( X )" : "( )"} Intervalo: Horário: ${
         timeInfo.intervaloTime
      }
         ${timeInfo.retorno ? "( X )" : "( )"} Retorno: Horário: ${
         timeInfo.retornoTime
      }
         ${timeInfo.saida ? "( X )" : "( )"} Saída: Horário: ${
         timeInfo.saidaTime
      }

         Justificativa: ${userInfo.justificativa}
      `;

      const emailModel = {
         from: `${userInfo.nome_funcionario} <${userInfo.email}>`,
         to: selectHighSchool(userInfo.to),
         subject: "Justificativa de Ponto",
         text: formatedText,
         html: `<pre>${formatedText}</pre>`,
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
