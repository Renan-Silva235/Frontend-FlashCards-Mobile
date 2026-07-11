export function getLanguageCode(language) {
   switch (language) {
     case "English":
       return "en-US";

     case "Spanish":
       return "es-ES";

     case "Turkish":
       return "tr-TR";

     default:
       return "en-US";
   }
 }