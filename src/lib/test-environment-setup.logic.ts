/**
 * NEXUS TEST ENVIRONMENT SETUP
 * Configurazione dei Mock globali.
 * Essenziale per testare i componenti che dipendono dal browser (come il rilevamento Mobile).
 */

// Simula le API del browser che non esistono nell'ambiente di test (Node.js)
export const mockBrowserAPIs = () => {
  console.log("Mocking matchMedia for responsive UI testing...");
};
