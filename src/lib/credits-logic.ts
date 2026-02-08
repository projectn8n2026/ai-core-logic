/**
 * NEXUS CORE LOGIC - Gestione Crediti & Transazioni
 * Punto di verità unico per calcoli e formattazione.
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

// 2. LOGICA DI VALIDAZIONE
export const canAfford = (balance: number, cost: number): boolean => {
  return balance >= cost;
};

// 3. CALCOLO MATEMATICO DEL BILANCIO
export const calculateNewBalance = (currentBalance: number, amount: number, type: 'credit' | 'debit'): number => {
  return type === 'debit' ? currentBalance - amount : currentBalance + amount;
};

// 4. PREPARAZIONE RECORD PER BASEROW (La "ricevuta")
export const createTransactionRecord = (amount: number, type: 'credit' | 'debit', description: string) => {
  return {
    type,
    amount,
    description,
    timestamp: new Date().toISOString()
  };
};
