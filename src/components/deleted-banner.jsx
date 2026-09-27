import { formatDateTime } from '@/lib/format';

/**
 * @param {{ deletedAt: string | null | undefined, text: string }} props
 */
export function DeletedBanner({ deletedAt, text }) {
  if (!deletedAt) return null;

  return (
    <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      {text} <span className="font-medium">{formatDateTime(deletedAt)}</span>. Tiklash mumkin.
    </div>
  );
}
