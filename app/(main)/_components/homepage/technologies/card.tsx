/**
 * Types
 */
import type { Icon } from "@tabler/icons-react";

interface ICardProps {
  name: string;
  icon: Icon;
}

const Card = ({ name, icon }: ICardProps) => {
  const Icon = icon;
  return (
    <div className="border-app-200 group to-app-150/10 from-app-150/5 flex size-fit cursor-alias items-center justify-center gap-1.5 rounded-sm border bg-radial py-1 pr-3 pl-2 *:transition-all *:duration-300 *:ease-in-out *:group-hover:scale-105">
      <Icon className="size-7" stroke={1} />
      <span className="">{name}</span>
    </div>
  );
};

export default Card;
