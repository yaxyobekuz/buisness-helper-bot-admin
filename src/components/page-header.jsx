/**
 * @param {{ title: string, children?: React.ReactNode }} props
 */
export function PageHeader({ title, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
      {children ? <div className="flex items-center gap-2">{children}</div> : null}
    </div>
  );
}
