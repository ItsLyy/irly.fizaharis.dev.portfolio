const CardProjectSkeleton = () => {
  return (
    <div className="border-app-300 group w-full cursor-pointer overflow-hidden rounded-md border-[0.5px] shadow-[0_0_10px_.5px] shadow-black/10">
      <div className="bg-app-300 aspect-video w-full animate-pulse"></div>
      <div className="space-y-2 pt-2 pr-3 pb-3 pl-2">
        <div className="flex items-center justify-between">
          <span className="bg-app-300 animate-pulse rounded-full px-20 py-2 text-base"></span>
          <div className="bg-app-300 animate-pulse rounded-full p-2" />
        </div>
        <div className="flex gap-2">
          <div className="bg-app-300 animate-pulse rounded-full p-2" />
          <div className="flex flex-wrap gap-1">
            <div className="bg-app-300 animate-pulse rounded-md px-4 py-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProjectSkeleton;
