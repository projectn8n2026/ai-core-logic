/**
 * NEXUS MONETIZATION ENGINE - Logica Prezzi e Crediti
 * Gestisce il calcolo dinamico degli sconti e l'assegnazione dei Token AI.
 */

export const PRICING_LOGIC = {
  ANNUAL_DISCOUNT: 0.20, // 20% di sconto per impegno a lungo termine
  CURRENCY: "EUR",
  MAPPING: {
    MONTHLY: (price: number) => price,
    ANNUAL: (price: number) => Math.round(price * 12 * 0.8)
  }
};
