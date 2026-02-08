/**
 * NEXUS NOTIFICATION STREAM - Gestione Feedback UI
 * Gestisce la coda di messaggi/errori provenienti dai flussi n8n.
 */

// Configurazione della "coda" di messaggi
export const NOTIFICATION_CONFIG = {
  LIMIT: 1, // Mostra solo l'ultimo messaggio importante per evitare rumore
  REMOVE_DELAY: 5000, // Tempo standard di visibilità
};

// Logica di gestione stato (semplificata per il magazzino)
export const toastActionTypes = {
  ADD: "ADD_TOAST",
  DISMISS: "DISMISS_TOAST",
  REMOVE: "REMOVE_TOAST",
} as const;
