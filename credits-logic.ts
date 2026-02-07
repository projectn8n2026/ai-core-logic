/**
 * NEXUS CORE LOGIC - Gestione Crediti (Cervello)
 * Estratto da: credit-wallet.tsx
 */

// 1. LOGICA DELLE DATE (Il "Cervello" del tempo)
export const formatTransactionDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 1) return 'Ora';
  if (hours < 24) return `${hours}h fa`;
  if (days === 1) return 'Ieri';
  if (days < 7) return `${days} giorni fa`;
  return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
};

// 2. LOGICA DI VALIDAZIONE (Controlla se l'utente può spendere)
export const canAffordAction = (balance: number, cost: number): boolean => {
  return balance >= cost;
};

// 3. LOGICA DI FILTRO (Prende solo le ultime transazioni)
export const getRecentTransactions = (transactions: any[], limit: number = 8) => {
  return transactions.slice(0, limit);
};
