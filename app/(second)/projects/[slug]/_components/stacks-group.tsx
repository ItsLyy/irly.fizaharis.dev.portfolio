/**
 * Custom Modules
 */
import StackBadge from "@/app/_components/ui/stack-badge";

const StacksGroup = ({ stacks }: { stacks: string[] }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {stacks.map((stack, index) => (
        <StackBadge
          key={index}
          name={stack}
          className="h-fit rounded-sm! px-2! text-sm! leading-tight!"
        />
      ))}
    </div>
  );
};

export default StacksGroup;
