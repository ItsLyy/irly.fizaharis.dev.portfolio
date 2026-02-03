const StatusWork = ({ isAvailable }: { isAvailable?: boolean }) => {
  return (
    <div
      className={`bg-app-400/20 border-app-400 hidden w-full items-center gap-4 rounded-sm border px-4 py-3 md:flex ${!isAvailable && "opacity-60"}`}
    >
      <div className="bg-app-400 shadow-app-400 size-fit animate-pulse rounded-full p-1 shadow-[0_0_10px_0.5px]" />
      <span className="text-app-400 text-sm">
        {isAvailable ? "Available for Work" : "Not Available"}
      </span>
    </div>
  );
};

export default StatusWork;
