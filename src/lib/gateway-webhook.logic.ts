/**
 * NEXUS GATEWAY LOGIC - Invio dati a n8n Webhook
 * Estratto da: QuickActionCommand.tsx
 */

// 1. CONFIGURAZIONE WEBHOOK
export interface WebhookPayload {
  query: string; // Il testo inserito dall'utente o trascritto da Whisper
  context?: {
    source: "web_dashboard";
    timestamp: string;
    userId?: string;
  };
}

// 2. FUNZIONE CORE DI INVIO (Il "Tubo" verso n8n)
export const sendToAiEngine = async (webhookUrl: string, query: string) => {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      query: query.trim(),
      timestamp: new Date().toISOString()
    }),
  });

  if (!response.ok) {
    throw new Error(`n8n Gateway Error: ${response.status}`);
  }

  return await response.json();
};

// 3. LOGICA WHISPER (Placeholder per strategia Zero-Costo)
// Da implementare secondo le note [2025-12-17]
export const handleVoiceTranscription = () => {
  console.log("Integrazione Whisper richiesta per strategia Zero-Costo");
  // TODO: Collegare OpenAI Whisper API o Faster-Whisper locale via n8n
};
