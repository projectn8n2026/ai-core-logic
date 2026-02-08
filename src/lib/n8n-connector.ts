/**
 * NEXUS CORE LOGIC - Connettore Universale n8n
 * Questo file gestisce la comunicazione tra l'interfaccia e i tuoi workflow.
 */

export const sendToN8n = async (webhookUrl: string, payload: any) => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
        source: "Nexus Core"
      }),
    });

    if (!response.ok) {
      throw new Error(`Errore n8n: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };

  } catch (error) {
    // Sistema di isolamento errore: logga ma non rompe l'app
    console.error("DEBUG NEXUS CORE [n8n-connector]:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Errore sconosciuto" 
    };
  }
};
