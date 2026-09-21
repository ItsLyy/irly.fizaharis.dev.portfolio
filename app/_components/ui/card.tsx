interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = ({
  hover = true,
  className = "",
  children,
  ...props
}: ICardProps) => {
  return (
    <div
      className={`border-border bg-surface w-full overflow-hidden rounded-md border ${hover ? "hover:border-border-strong transition-all duration-300 ease-out hover:-translate-y-0.5" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
