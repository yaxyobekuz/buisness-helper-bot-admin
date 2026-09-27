const dateFormatter = new Intl.DateTimeFormat('uz-UZ', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const dateTimeFormatter = new Intl.DateTimeFormat('uz-UZ', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export function formatDate(value) {
  return value ? dateFormatter.format(new Date(value)) : '—';
}

export function formatDateTime(value) {
  return value ? dateTimeFormatter.format(new Date(value)) : '—';
}

export function formatPhone(phone) {
  if (!phone) return '—';

  const match = /^\+998(\d{2})(\d{3})(\d{2})(\d{2})$/.exec(phone);

  return match ? `+998 ${match[1]} ${match[2]} ${match[3]} ${match[4]}` : phone;
}
