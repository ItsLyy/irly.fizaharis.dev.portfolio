/**
 * Custom Modules
 */
import Card from "@/app/_components/ui/card";

const CardProjectSkeleton = () => {
  return (
    <Card hover={false} aria-hidden="true">
      <div className="bg-sunken aspect-video w-full animate-pulse"></div>
      <div className="space-y-2 pt-2 pr-3 pb-3 pl-2">
        <div className="flex items-center justify-between">
          <span className="bg-sunken animate-pulse rounded-full px-20 py-2 text-base"></span>
          <div className="bg-sunken animate-pulse rounded-full p-2" />
        </div>
        <div className="flex gap-2">
          <div className="bg-sunken animate-pulse rounded-full p-2" />
          <div className="flex flex-wrap gap-1">
            <div className="bg-sunken animate-pulse rounded-md px-4 py-2" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardProjectSkeleton;
