/**
 * NEXUS USER STATS BRIDGE - Il Traduttore dei Dati
 * Converte la risposta grezza di n8n nel formato richiesto dalla Dashboard.
 * Gestisce il fallback (dati mock) se il webhook non risponde.
 */

export const DATA_MAPPING = {
  FROM_N8N: ["tier", "used", "total", "streak"],
  TO_WEBUI: ["tier_name", "credits_used", "credits_max", "streak_days"]
};
