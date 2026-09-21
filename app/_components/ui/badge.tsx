const Badge = ({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) => {
  return (
    <span
      className={`border-border/70 bg-sunken/90 text-accent inline-flex items-center rounded-xs border px-2 py-0.5 font-mono text-xs ${className}`}
    >
      {name}
    </span>
  );
};

export default Badge;
