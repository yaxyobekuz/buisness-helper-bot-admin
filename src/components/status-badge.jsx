const STYLES = {
  Yangi: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  Jarayonda: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Tugallangan: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
};

/**
 * @param {{ status: string }} props
 */
export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset whitespace-nowrap ${
        STYLES[status] ?? 'bg-slate-100 text-slate-600 ring-slate-500/20'
      }`}
    >
      {status}
    </span>
  );
}
