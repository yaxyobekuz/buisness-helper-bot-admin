import { formatDate } from '@/lib/format';

/**
 * Oxirgi 30 kundagi arizalar — oddiy SVG ustunli grafik.
 *
 * @param {{ data: { date: string, count: number }[] }} props
 */
export function DailyChart({ data }) {
  const max = Math.max(1, ...data.map((item) => item.count));
  const width = 100;
  const height = 32;
  const gap = 0.6;
  const barWidth = data.length ? width / data.length - gap : 0;

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-semibold text-slate-900">Oxirgi 30 kun</h2>
        <p className="text-sm text-slate-500">
          Jami {data.reduce((sum, item) => sum + item.count, 0)} ta ariza
        </p>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-32 w-full"
        role="img"
        aria-label="Kunlik arizalar grafigi"
      >
        {data.map((item, index) => {
          const barHeight = (item.count / max) * (height - 2);

          return (
            <rect
              key={item.date}
              x={index * (barWidth + gap)}
              y={height - barHeight}
              width={barWidth}
              height={Math.max(barHeight, item.count > 0 ? 1 : 0.4)}
              rx="0.6"
              className={item.count > 0 ? 'fill-brand-600' : 'fill-slate-200'}
            >
              <title>{`${item.date}: ${item.count} ta`}</title>
            </rect>
          );
        })}
      </svg>

      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>{formatDate(data[0]?.date)}</span>
        <span>{formatDate(data[data.length - 1]?.date)}</span>
      </div>
    </div>
  );
}
