/**
 * Date utility functions
 * Provides consistent date formatting across the application
 */

/**
 * Formats a date as a relative time string (e.g., "hace 2 horas")
 */
export function formatDistanceToNow(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  const intervals = [
    { label: 'año', labelPlural: 'años', seconds: 31536000 },
    { label: 'mes', labelPlural: 'meses', seconds: 2592000 },
    { label: 'día', labelPlural: 'días', seconds: 86400 },
    { label: 'hora', labelPlural: 'horas', seconds: 3600 },
    { label: 'minuto', labelPlural: 'minutos', seconds: 60 },
    { label: 'segundo', labelPlural: 'segundos', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `hace ${count} ${count !== 1 ? interval.labelPlural : interval.label}`;
    }
  }

  return 'ahora mismo';
}

/**
 * Formats a date as a localized date string
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('es-MX', options || {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Formats a date as a localized datetime string
 */
export function formatDateTime(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('es-MX', options || {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Checks if a date is today
 */
export function isToday(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Checks if a date is yesterday
 */
export function isYesterday(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  );
}