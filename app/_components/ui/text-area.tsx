interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id?: string;
}

const TextArea = ({ label, id, className = "", ...props }: ITextAreaProps) => {
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
      <textarea
        id={id}
        className={`border-border bg-surface/70 text-foreground placeholder:text-dim focus:border-accent focus:ring-accent/30 min-h-32 w-full resize-y rounded-sm border px-3.5 py-2.5 text-sm transition-colors duration-200 focus:ring-1 focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
};

export default TextArea;
