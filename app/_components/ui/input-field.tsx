interface IInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
}

const InputField = ({
  label,
  id,
  className = "",
  ...props
}: IInputFieldProps) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          className="text-muted font-mono text-xs tracking-wider uppercase"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`border-border bg-surface/70 text-foreground placeholder:text-dim focus:border-accent focus:ring-accent/30 w-full rounded-sm border px-3.5 py-2.5 text-sm transition-colors duration-200 focus:ring-1 focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
};

export default InputField;
