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
