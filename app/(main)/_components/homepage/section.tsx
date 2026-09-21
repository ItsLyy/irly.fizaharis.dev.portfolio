interface ISectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  badge?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

const Section = ({
  title,
  badge,
  action,
  children,
  className = "",
  ...props
}: ISectionProps) => {
  return (
    <section className={`space-y-3.5 ${className}`} {...props}>
      <div className="border-border/60 flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase">
          {badge && <span className="text-accent">{badge}</span>}
          <h2 className="text-faint">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
};

export default Section;
