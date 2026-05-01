/**
 * Fallback estimate for yearly energy output per solar panel.
 * Based on a typical 400W panel operating at Tunisia's average solar irradiance
 * (~5.5 peak sun-hours/day), yielding roughly 400 kWh/panel/year.
 * This value is only used when the Google Solar API does not return per-panel data.
 */
export const FALLBACK_KWH_PER_PANEL_PER_YEAR = 400
