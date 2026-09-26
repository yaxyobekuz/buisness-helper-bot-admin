import { Icon } from './icons';

/**
 * @param {{ title: string, description?: string, icon?: string }} props
 */
export function EmptyState({ title, description, icon = 'inbox' }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Icon name={icon} className="size-6" />
      </div>
      <p className="mt-4 font-medium text-slate-900">{title}</p>
      {description ? <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p> : null}
    </div>
  );
}
