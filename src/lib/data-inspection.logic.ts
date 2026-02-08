/**
 * NEXUS DATA INSPECTION LOGIC - Gestione e Formattazione Dati Baserow
 * Estratto da: UniversalBaserowTable.tsx
 */

// 1. FORMATTAZIONE DINAMICA (Per rendere leggibili i dati grezzi del DB)
export const formatBaserowKey = (key: string): string => {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

// 2. LOGICA DI FILTRO (Essenziale per la ricerca nel "User_Memory")
export const filterDataRows = (data: any[], query: string) => {
  if (!query.trim()) return data;
  const lowerQuery = query.toLowerCase();
  return data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(lowerQuery)
    )
  );
};

// 3. SCHEMA DI RECUPERO (Il ponte verso i Webhook di n8n)
export interface TableFetchConfig {
  webhookUrl: string;
  method: "GET"; // Per leggere i record
  expectedFormat: "Array<Record<string, unknown>>";
}
