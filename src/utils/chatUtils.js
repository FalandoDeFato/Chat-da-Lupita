// Função para gerar IDs únicos para conversas
// O ID é composto por:
// - "c_" no início para indicar que é uma conversa
// - timestamp atual convertido para base 36
// - + um trecho aleatório também em base 36 para reduzir chance de colisão
export function gerarId() {
  return (
    "c_" +
    Date.now().toString(36) + // timestamp em base 36
    Math.random().toString(36).slice(2, 8) // parte aleatória
  );
}

// Função que transforma uma data em um texto estilo "x tempo atrás"
// útil para mostrar o tempo de atualização de cada conversa
export function timeAgo(date) {
  // calcula quantos segundos passaram desde a data enviada
  const seg = Math.floor((Date.now() - date.getTime()) / 1000);

  // menos de 10 segundos → "agora"
  if (seg < 10) return "agora";

  // menos de 1 minuto → segundos
  if (seg < 60) return `${seg}s atrás`;

  // converte para minutos
  const min = Math.floor(seg / 60);
  if (min < 60) return `${min}min atrás`;

  // converte para horas
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h atrás`;

  // converte para dias
  const d = Math.floor(h / 24);
  return `${d}d atrás`;
}
