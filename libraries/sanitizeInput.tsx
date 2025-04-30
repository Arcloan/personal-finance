export function cleanInput(input : string) {
  // Rimuove tutto ciò che sembra un tag HTML
  let cleaned = input.replace(/<\/?[^>]+(>|$)/g, "");
  
  // Rimuove caratteri potenzialmente pericolosi
  cleaned = cleaned.replace(/[<>{}]/g, "");
  
  return cleaned;
}