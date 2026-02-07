/**
 * NEXUS STYLE ORCHESTRATOR - Gestione Dinamica Interfaccia
 * Unisce la logica condizionale (clsx) con la risoluzione dei conflitti CSS (twMerge).
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Funzione Utility Universale
 * Essenziale per:
 * 1. Cambiare i colori della Dashboard in base ai KPI (Performance Manager).
 * 2. Gestire gli stati di errore nei nodi HTTP.
 * 3. Adattare i componenti al "Device Context".
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
