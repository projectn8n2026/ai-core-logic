/**
 * NEXUS STYLE MERGER - Logica di Coerenza Visiva
 * Unisce classi Tailwind condizionali risolvendo i conflitti di stile.
 * Essenziale per la "Personalità Dinamica" della Dashboard.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Funzione cn:
 * 1. clsx: Permette logica condizionale (es. "se crediti < 0, usa rosso").
 * 2. twMerge: Evita conflitti (es. se un componente ha 'p-4' ma riceve 'p-2', vince l'ultimo).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
