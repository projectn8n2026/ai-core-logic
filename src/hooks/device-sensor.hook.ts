/**
 * NEXUS DEVICE SENSOR - Hardware Awareness Hook
 * Monitora in tempo reale la dimensione dello schermo.
 * Cruciale per switchare tra 'Mobile Activity' e 'Desktop Analytics'.
 */

export const DEVICE_LOGIC = {
  BREAKPOINT: 768, // Il confine tra Tablet/Desktop e Smartphone
  TARGET_STATE: "isMobile (boolean)"
};
