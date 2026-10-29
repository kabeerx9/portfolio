import type { Contributions } from '@/lib/github';

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
const OPACITY = [0, 0.3, 0.5, 0.75, 1];

export function ContributionGraph({ data, profileUrl }: { data: Contributions; profileUrl: string }) {
  const width = data.weeks.length * STEP - GAP;
  const height = 7 * STEP - GAP;

  return (
    <figure>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`${data.total.toLocaleString('en-US')} GitHub contributions in the last year`}
      >
        {data.weeks.map((week, x) =>
          week.map((day, y) =>
            day && (
              <rect
                key={day.date}
                x={x * STEP}
                y={y * STEP}
                width={CELL}
                height={CELL}
                rx={2}
                className={day.level === 0 ? 'fill-tile' : 'fill-live'}
                fillOpacity={day.level === 0 ? 1 : OPACITY[day.level]}
              >
                <title>{`${day.count === 0 ? 'No' : day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}</title>
              </rect>
            ),
          ),
        )}
      </svg>
      <figcaption className="mt-4 flex items-center justify-between font-mono text-xs text-faint">
        <a href={profileUrl} target="_blank" rel="noreferrer" className="link">
          {data.total.toLocaleString('en-US')} contributions in the last year
        </a>
        <span className="flex items-center gap-1.5" aria-hidden>
          Less
          {OPACITY.map((o, i) => (
            <span
              key={i}
              className={`h-2.5 w-2.5 rounded-[2px] ${i === 0 ? 'bg-tile' : 'bg-live'}`}
              style={i === 0 ? undefined : { opacity: o }}
            />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}
