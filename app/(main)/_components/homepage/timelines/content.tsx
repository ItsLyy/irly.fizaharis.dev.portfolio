import Image from "next/image";

interface IContentProps {
  name: string;
  role: string;
  imagePath: string;
  startDate: string;
  endDate?: string;
  responsibilities?: string[];
  className?: string;
}

const Content = ({
  name,
  role,
  imagePath,
  startDate,
  endDate,
  responsibilities,
  className = "",
}: IContentProps) => {
  const startMilisecond = +new Date(startDate);
  const endMilisecond = endDate ? +new Date(endDate) : 0;
  return (
    <li className={`border-app-300 relative border-l pb-8 pl-16 ${className}`}>
      <div className="bg-app-500 border-app-300 absolute -left-5 rounded-sm border p-1">
        <div className="bg-app-300 relative size-12 overflow-hidden rounded-xs">
          <Image
            src={imagePath}
            alt={name}
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="space-y-2">
        <header className="flex flex-col pt-1">
          <h4 className="text-xl font-medium">
            {name}{" "}
            <span className="text-app-400 text-base font-normal">
              as {role}
            </span>
          </h4>
          <span className="text-app-300 text-sm">
            {new Date(startMilisecond).getFullYear()}
            {(endDate ||
              new Date(startMilisecond).getFullYear() ==
                new Date(endMilisecond).getFullYear()) &&
              " - " +
                (endMilisecond >= +new Date()
                  ? "Present"
                  : new Date(endMilisecond).getFullYear())}
          </span>
        </header>
        {responsibilities && (
          <div>
            <h5 className="text-app-400 pb-0.5">Responsibility: </h5>
            <ul className="text-app-250 list-inside list-disc text-sm">
              {responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </li>
  );
};

export default Content;
