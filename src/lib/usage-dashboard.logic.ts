/**
 * NEXUS USAGE DASHBOARD - Il Centro di Comando Utente
 * Gestisce la visualizzazione dei Crediti AI e della Streak (Costanza).
 */

export const USAGE_LOGIC = {
  LEVELS: {
    SUCCESS: "> 50% crediti",
    WARNING: "20% - 50% crediti",
    DANGER: "< 20% crediti (Trigger Alert Upgrade)"
  },
  GAMIFICATION: "Streak counter (flame animation) per incentivare l'uso quotidiano",
  ACTIONS: "Refetch manuale per sincronizzazione istantanea con n8n/Baserow"
};
