/**
 * Node Modules
 */
import Image from "next/image";

interface IContentProps {
  name: string;
  role: string;
  imagePath: string;
  startDate: string;
  endDate?: string;
  responsibilities?: string[];
  isLast?: boolean;
}

const parseYear = (dateStr?: string) => {
  if (!dateStr) return null;
  if (/^\d{4}$/.test(dateStr.trim())) return dateStr.trim();
  const year = new Date(dateStr).getFullYear();
  return isNaN(year) ? dateStr : String(year);
};

const Content = ({
  name,
  role,
  imagePath,
  startDate,
  endDate,
  responsibilities,
  isLast = false,
}: IContentProps) => {
  const startYear = parseYear(startDate);
  const endYear = parseYear(endDate);
  const dateRange = endYear
    ? `${startYear} — ${endYear}`
    : startDate === "2025" && !endDate
      ? `${startYear} — Present`
      : `${startYear}`;

  return (
    <li className="relative flex gap-4 pb-7 last:pb-2">
      {/* Vertical line connector */}
      {!isLast && (
        <span
          className="bg-border absolute top-11 bottom-0 left-5 w-px"
          aria-hidden="true"
        />
      )}

      {/* Logo Node */}
      <div className="border-border bg-surface relative z-10 flex size-10 shrink-0 items-center justify-center rounded-md border p-1 shadow-xs">
        <div className="bg-sunken relative size-full overflow-hidden rounded-xs">
          <Image
            src={imagePath}
            alt={name}
            fill
            sizes="40px"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1 space-y-2 pt-0.5">
        <header className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
          <div className="flex flex-wrap items-baseline gap-1.5">
            <h3 className="text-foreground text-base font-medium">{name}</h3>
            <span className="text-accent font-mono text-xs">as {role}</span>
          </div>
          <span className="text-muted shrink-0 font-mono text-xs">
            {dateRange}
          </span>
        </header>

        {responsibilities && responsibilities.length > 0 && (
          <div className="space-y-1 pt-1">
            <p className="text-faint font-mono text-xs font-medium tracking-wider uppercase">
              Responsibilities:
            </p>
            <ul className="text-muted space-y-1 text-sm leading-relaxed">
              {responsibilities.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-accent bg-accent/70 mt-1.5 size-1.5 shrink-0 rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </li>
  );
};

export default Content;
