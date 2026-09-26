import { Icon } from './icons';

/**
 * @param {{ label: string, value: number | string, icon?: string, hint?: string }} props
 */
export function StatCard({ label, value, icon = 'document', hint }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
          {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
          <Icon name={icon} className="size-5" />
        </div>
      </div>
    </div>
  );
}
