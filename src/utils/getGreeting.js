export function getGreeting() {
   const currentHour = new Date().getHours(); // Obtém a hora atual

   if (currentHour >= 6 && currentHour < 12) {
      return "Bom dia";
   } else if (currentHour >= 12 && currentHour < 18) {
      return "Boa tarde";
   } else {
      return "Boa noite";
   }
}
