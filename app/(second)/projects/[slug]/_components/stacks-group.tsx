/**
 * Custom Modules
 */
import Badge from "@/app/_components/ui/badge";

const StacksGroup = ({ stacks }: { stacks: string[] }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {stacks.map((stack, index) => (
        <Badge key={index} name={stack} className="px-2.5 py-1 text-xs" />
      ))}
    </div>
  );
};

export default StacksGroup;
