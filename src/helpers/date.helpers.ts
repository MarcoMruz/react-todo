import dayjs from 'dayjs';

export function formatStringDateForDisplay(date?: string): string {
  return dayjs(date).format('DD/MM/YYYY');
}

export function formatStringDateForDisplayWithTime(date?: string): string {
  return dayjs(date).format('DD/MM/YYYY HH:mm');
}

export function convertDatetimeLocalToISOString(date?: string): string {
  return dayjs(date).toISOString();
}

export function convertISOStringToDate(date?: string): Date {
  return dayjs(date).toDate();
}

export function convertDateNumberToString(date?: number): string {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
}

export function convertISOStringToDatetimeLocal(date?: string): string {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
}

export function convertISOStringToString(date?: string): string {
  return dayjs(date).format('YYYY-MM-DD');
}
