/**
 * Currency and number formatting utilities
 */

/**
 * Format a number as Mexican Pesos currency
 * @param amount - The amount to format
 * @param includeDecimals - Whether to include decimal places (default: false for consistency with existing usage)
 * @returns Formatted currency string (e.g., "$12,345 MXN" or "$12,345.67 MXN")
 */
export const formatCurrency = (amount: number, includeDecimals = false): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  }).format(amount);
};

/**
 * Format a number with thousand separators
 * @param value - The number to format
 * @returns Formatted number string (e.g., "12,345")
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('es-MX').format(value);
};

/**
 * Format a percentage
 * @param value - The percentage value (e.g., 0.15 for 15%)
 * @param decimals - Number of decimal places to show
 * @returns Formatted percentage string (e.g., "15%")
 */
export const formatPercentage = (value: number, decimals: number = 0): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

/**
 * Format a compact number for display in small spaces
 * @param value - The number to format
 * @returns Formatted compact string (e.g., "1.2M")
 */
export const formatCompactNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
};