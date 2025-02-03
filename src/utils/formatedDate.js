export function formatedDate(dateString) {
   if (!dateString || typeof dateString !== "string") return "Data inválida";

   const date = dateString.split("-");
   if (date.length !== 3) return "Formato inválido";

   const [year, month, day] = date;
   return `${day}/${month}/${year}`;
}
