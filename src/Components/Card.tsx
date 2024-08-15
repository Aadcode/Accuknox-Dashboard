import { ImCancelCircle } from "react-icons/im";
import { useRecoilState } from "recoil";
import { datatom } from "../recoil";

interface cardprops {
  name: string;
  description: string;
  category: string; // Added category to locate the correct section
}

const Card = ({ name, description, category }: cardprops) => {
  const [data, setdata] = useRecoilState(datatom);

  function handleremove() {
    const updatedData = data.map((section: any) => {
      if (section.name === category) {
        return {
          ...section,
          widgets: section.widgets.filter(
            (widget: any) => widget.name !== name
          ),
        };
      }
      return section;
    });

    setdata(updatedData);
  }

  return (
    <div className="rounded-xl p-7 bg-white">
      <div
        onClick={handleremove}
        className="flex justify-end cursor-pointer text-red-500 hover:text-red-700"
      >
        <ImCancelCircle size={20} />
      </div>
      <div className="py-2 text-xl font-medium w-auto text-gray-700">
        {name}
      </div>
      <div className="py-2 text-lg text-gray-600">{description}</div>
    </div>
  );
};

export default Card;
