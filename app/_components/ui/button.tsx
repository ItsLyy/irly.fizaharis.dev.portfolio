type ButtonVariant = "primary" | "outline" | "icon";

export const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-accent px-4 py-2.5 text-sm font-medium text-ink transition-all duration-200 ease-out hover:bg-accent/90 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60",
  outline:
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-border bg-surface/80 px-4 py-2.5 text-sm font-medium text-muted transition-all duration-200 ease-out hover:border-border-strong hover:bg-surface hover:text-foreground hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60",
  icon: "inline-flex size-10 cursor-pointer items-center justify-center rounded-sm border border-border bg-surface/80 text-muted transition-all duration-200 ease-out hover:border-accent hover:text-accent hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = ({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${buttonStyles[variant]} ${className}`}
      {...props}
    />
  );
};

export default Button;
export type { ButtonVariant };
