/**
 * NEXUS BILLING TOGGLE - Logica di Conversione Prezzi
 * Gestisce lo switch tra i periodi di fatturazione.
 */

export const BILLING_PERIODS = {
  MONTHLY: "monthly",
  ANNUAL: "annual",
};

// Logica per il calcolo dello sconto (da integrare poi in n8n)
export const calculateAnnualDiscount = (monthlyPrice: number) => {
  return (monthlyPrice * 12) * 0.8; // Esempio: sconto del 20%
};
