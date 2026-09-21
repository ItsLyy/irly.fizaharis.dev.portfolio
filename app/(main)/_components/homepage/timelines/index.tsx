/**
 * Custom Modules
 */
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

interface ITimelinesProps {
  title: string;
  badge?: string;
  datas: IContentProps[];
}

const Timelines = ({ title, badge, datas }: ITimelinesProps) => {
  return (
    <Section title={title} badge={badge}>
      <ul className="flex flex-col pt-1">
        {datas.map((data, index) => (
          <Content
            key={data.name + index}
            {...data}
            isLast={index === datas.length - 1}
          />
        ))}
      </ul>
    </Section>
  );
};

export default Timelines;
