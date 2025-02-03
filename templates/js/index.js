const email = document.getElementById("email");
const passApp = document.getElementById("passApp");

const form = document.getElementById("form");
const date = document.getElementById("data");

// Formatar data para o padrão YYYY-MM-DD
function formateDate(date) {
   const year = date.getFullYear();
   const month = (date.getMonth() + 1).toString().padStart(2, "0");
   const day = date.getDate().toString().padStart(2, "0");
   return `${year}-${month}-${day}`;
}

date.value = formateDate(new Date());

function handleSubmit(e) {
   e.preventDefault();

   // Coletando os dados do formulário
   const formData = new FormData(e.target);
   const formProps = Object.fromEntries(formData.entries());

   // Adicionando os valores de e-mail e senha de app
   formProps.email = email.value;
   formProps.passApp = passApp.value;

   console.log(formProps);

   // Verificando os checkboxes
   const entradaChecked = document.getElementById("entrada").checked;
   const intervaloChecked = document.getElementById("intervalo").checked;
   const retornoChecked = document.getElementById("retorno").checked;
   const saidaChecked = document.getElementById("saida").checked;

   const data = {
      userInfo: {
         nome_funcionario: formProps.nome_funcionario,
         email: formProps.email,
         passApp: formProps.passApp,
         empresa: formProps.empresa,
         to: "suporteti@faculesteead.com.br",
         justificativa: formProps.justificativa,
      },
      timeInfo: {
         data: formProps.data,
         entrada: entradaChecked,
         entradaTime: formProps.entrada_time,
         intervalo: intervaloChecked,
         intervaloTime: formProps.intervalo_time,
         retorno: retornoChecked,
         retornoTime: formProps.retorno_time,
         saida: saidaChecked,
         saidaTime: formProps.saida_time,
      },
   };

   console.log(data);

   // Enviando os dados via Axios
   axios
      .post("http://localhost:3000/email",  data )
      .then((response) => {
         alert("Formulário enviado com sucesso!");
         console.log(response.data);
      })
      .catch((error) => {
         alert("Erro ao enviar o formulário.");
         console.error(error); // Log do erro
      });
}

// Adicionando o evento de envio do formulário
form.addEventListener("submit", handleSubmit);
