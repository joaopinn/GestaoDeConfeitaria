// utils/dateHelper.js
// Helper simples para normalizar intervalo de datas (início do dia / fim do dia).
function toStartOfDay(date) {
  const d = new Date(date);
  d.setHours(0,0,0,0);
  return d;
}

function toEndOfDay(date) {
  const d = new Date(date);
  d.setHours(23,59,59,999);
  return d;
}

/**
 * Gera { dataInicio, dataFim } a partir de strings ISO (ou Date).
 * Espera início e fim; se faltar, lança erro (controle no controller).
 */
function parseRange(inicio, fim) {
  if (!inicio || !fim) throw new Error('Parâmetros inicio e fim são obrigatórios.');

  const dataInicio = toStartOfDay(new Date(inicio));
  const dataFim = toEndOfDay(new Date(fim));

  if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
    throw new Error('Datas inválidas.');
  }
  if (dataInicio > dataFim) {
    throw new Error('dataInicio não pode ser maior que dataFim.');
  }

  return { dataInicio, dataFim };
}

module.exports = {
  parseRange,
  toStartOfDay,
  toEndOfDay
};
