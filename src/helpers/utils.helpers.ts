import dayjs from 'dayjs';

export function formatStringDateForDisplay(date?: string): string {
  return dayjs(date).format('DD/MM/YYYY');
}

export function formatStringDateForDisplayWithTime(date?: string): string {
  return dayjs(date).format('DD/MM/YYYY HH:mm');
}

export function convertDateToISOString(date?: Date): string {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
}

export function convertISOStringToDate(date?: string): Date {
  return dayjs(date).toDate();
}

export function convertDateToString(date?: Date): string {
  return dayjs(date).format('YYYY-MM-DD');
}

export function convertISOStringToString(date?: string): string {
  return dayjs(date).format('YYYY-MM-DD');
}
