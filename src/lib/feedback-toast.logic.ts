/**
 * NEXUS FEEDBACK TOAST - Sistema Nervoso UI
 * Gestisce la visualizzazione dei messaggi di stato.
 * Cruciale per confermare le azioni AI "invisibili".
 */

export const NOTIFICATION_SYSTEM = {
  LIMIT: 1, // Focus massimo: una sola notifica alla volta per non distrarre
  CLEANUP_DELAY: 1000000, // Persistenza lunga per debug o notifiche critiche
  ACTIONS: ["ADD", "UPDATE", "DISMISS", "REMOVE"]
};
