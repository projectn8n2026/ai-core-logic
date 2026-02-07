/**
 * NEXUS USER PROFILING - Logica di configurazione Digital Twin
 * Estratto da: RegistrationModal.tsx
 */

import { z } from "zod";

// 1. SCHEMA DI PROFILAZIONE (Le fondamenta del Digital Twin)
export const registrationSchema = z.object({
  name: z.string()
    .min(2, "Il nome deve avere almeno 2 caratteri")
    .max(50, "Il nome non può superare 50 caratteri"),
  
  healthGoal: z.string()
    .min(1, "Seleziona un obiettivo"),
  
  telegramUsername: z.string()
    .min(3, "L'username deve avere almeno 3 caratteri")
    .max(32, "L'username non può superare 32 caratteri")
    .regex(/^[a-zA-Z0-9_]+$/, "Solo lettere, numeri e underscore"),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

// 2. MAPPATURA OBIETTIVI (Per la Personalità Dinamica)
// Questi valori devono corrispondere alle opzioni del database/n8n
export const HEALTH_GOALS = {
  WEIGHT_LOSS: "weight_loss",
  MUSCLE_GAIN: "muscle_gain",
  BETTER_SLEEP: "better_sleep",
  STRESS_REDUCTION: "stress_reduction",
  GENERAL_WELLNESS: "general_wellness",
  NUTRITION: "nutrition"
} as const;
