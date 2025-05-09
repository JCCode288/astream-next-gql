export default function capitalize(sentences: string) {
   if (!sentences || typeof sentences !== "string") return sentences;

   sentences = sentences.trim();

   let capitalized = "";
   let prev = "";

   for (let i = 0; i < sentences.length; i++) {
      let char = sentences[i];

      if (i === 0 || prev === " " || prev === "-") {
         char = char.toUpperCase();
      }

      capitalized += char;
      prev = char;
   }

   return capitalized;
}
