interface ISectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children, ...props }: ISectionProps) => {
  return (
    <section {...props}>
      <h3 className="text-app-250 text-sm">{title}</h3>
      {children}
    </section>
  );
};

export default Section;
