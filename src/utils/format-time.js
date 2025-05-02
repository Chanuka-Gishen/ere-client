import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export const fDate = (date, newFormat) => {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '-';
};

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export const fDateYearMonthFormat = (formatDate) => {
  const date = new Date(formatDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const getDaysDifference = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const diffTime = Math.abs(d2 - d1);

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
