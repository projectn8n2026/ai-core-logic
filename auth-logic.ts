/**
 * NEXUS AUTH LOGIC - Validazione e Schemi Accesso
 * Estratto da: AuthForm.tsx
 */

import { z } from "zod";

// 1. SCHEMA DI VALIDAZIONE (La legge del sistema)
export const authSchema = z.object({
  email: z.string().email("Inserisci un'email valida"),
  password: z.string().min(6, "La password deve avere almeno 6 caratteri"),
  telegramCode: z.string().optional(), // Il ponte per il Digital Twin
});

export type AuthFormData = z.infer<typeof authSchema>;

// 2. LOGICA DI MAPPATURA UTENTE
// Questa funzione prepara i dati per essere inviati al webhook di registrazione n8n
export const prepareAuthPayload = (data: AuthFormData, mode: "login" | "register") => {
  return {
    ...data,
    action: mode,
    timestamp: new Date().toISOString(),
    source: "web-ui"
  };
};
