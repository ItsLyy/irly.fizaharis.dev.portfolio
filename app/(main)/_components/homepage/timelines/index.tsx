import Section from "../section";
import Content from "./content";

interface ITimelinesProps {
  title: string;
  datas: IContentProps[];
}

interface IContentProps {
  name: string;
  role: string;
  imagePath: string;
  startDate: string;
  endDate?: string;
  responsibilities?: string[];
}

const Timelines = ({ title, datas }: ITimelinesProps) => {
  return (
    <Section title={title}>
      <ul className="ml-8 flex flex-col">
        {datas.map((data, index) => (
          <Content
            key={index}
            {...data}
            className={
              index === 0
                ? "pt-6"
                : index === datas.length - 1
                  ? "border-l-0 pb-4!"
                  : ""
            }
          />
        ))}
      </ul>
    </Section>
  );
};

export default Timelines;
