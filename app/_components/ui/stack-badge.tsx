const StackBadge = ({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) => {
  return (
    <span
      className={`bg-app-300 text-app-400 rounded-md px-2 text-xs ${className}`}
    >
      {name}
    </span>
  );
};

export default StackBadge;
