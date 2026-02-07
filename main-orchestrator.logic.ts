/**
 * NEXUS MAIN ORCHESTRATOR
 * Il punto di ingresso della WebUI che collega i componenti 
 * al motore di automazione (n8n).
 */

export const APP_STATE = {
  CONNECTION: "dynamic_webhook_mapping",
  PRIMARY_ACTION: "data_fetching",
  SECONDARY_ACTION: "ai_command_palette"
};
