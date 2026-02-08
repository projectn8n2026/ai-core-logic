/**
 * NEXUS DEVICE CONTEXT - Gestione Responsive
 * Estratto da: useIsMobile.tsx
 */

export const BREAKPOINTS = {
  MOBILE: 768,
};

// Logica di controllo (utilizzabile anche in vanilla JS o altre piattaforme)
export const checkIsMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < BREAKPOINTS.MOBILE;
};
