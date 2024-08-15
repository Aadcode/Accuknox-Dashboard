import AddWidget from "./AddWidget";
import Card from "./Card";

interface Widget {
  id: number;
  name: string;
  text: string;
}

interface SectionProps {
  Eachsection: { name: string; widgets: Array<Widget> };
}

const Section = ({ Eachsection }: SectionProps) => {
  return (
    <div className="flex flex-col gap-4 p-5 bg-widgetbg rounded-lg shadow-md m-2">
      <div className="text-lg font-semibold">{Eachsection.name}</div>
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {Eachsection.widgets.map((widget) => (
            <div key={widget.id} className="flex-shrink-0 p-2 ">
              <Card
                name={widget.name}
                description={widget.text}
                category={Eachsection.name}
              />
            </div>
          ))}
          <div className="p-2 ">
            <AddWidget category={Eachsection.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
