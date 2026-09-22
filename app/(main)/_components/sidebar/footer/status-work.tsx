const StatusWork = ({ isAvailable = true }: { isAvailable?: boolean }) => {
  return (
    <div
      className={`border-border bg-surface/80 hidden w-full items-center gap-2.5 rounded-sm border px-3 py-2 md:flex ${
        !isAvailable ? "opacity-60" : ""
      }`}
    >
      <span className="relative flex size-2">
        {isAvailable && (
          <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
        )}
        <span
          className={`relative inline-flex size-2 rounded-full ${
            isAvailable ? "bg-accent" : "bg-dim"
          }`}
        />
      </span>
      <span className="text-muted font-mono text-xs tracking-wider uppercase">
        {isAvailable ? "Available for Work" : "Currently Engaged"}
      </span>
    </div>
  );
};

export default StatusWork;
