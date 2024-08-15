import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { datatom } from "../recoil";

interface Widget {
  id: number;
  name: string;
  text: string;
  isChecked?: boolean;
}

interface Section {
  name: string;
  widgets: Widget[];
}

interface DrawerProps {
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ onClose }) => {
  const [data, setData] = useRecoilState<Section[]>(datatom); // Correctly type the data
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [checkedWidgets, setCheckedWidgets] = useState<Set<string>>(new Set());

  useEffect(() => {
    const initialCheckedWidgets = new Set<string>();
    data.forEach((section) =>
      section.widgets.forEach((widget) =>
        widget.isChecked ? initialCheckedWidgets.add(widget.name) : null
      )
    );
    setCheckedWidgets(initialCheckedWidgets);
  }, [data]);

  const handleSectionClick = (sectionName: string) => {
    setSelectedSection(sectionName === selectedSection ? null : sectionName);
  };

  const handleCheckbox = (widgetName: string) => {
    setCheckedWidgets((prevCheckedWidgets) => {
      const newCheckedWidgets = new Set(prevCheckedWidgets);
      if (newCheckedWidgets.has(widgetName)) {
        newCheckedWidgets.delete(widgetName);
      } else {
        newCheckedWidgets.add(widgetName);
      }
      return newCheckedWidgets;
    });
  };

  const handleConfirm = () => {
    const updatedData = data.map((section) => ({
      ...section,
      widgets: section.widgets.map((widget) => ({
        ...widget,
        isChecked: checkedWidgets.has(widget.name),
      })),
    }));
    setData(updatedData);
    onClose();
  };

  return (
    <div className="fixed top-0 right-0 w-1/2 h-screen bg-white border-l-2 border-gray-300 shadow-lg z-50 flex flex-col justify-between">
      <div className="flex-1 overflow-y-auto p-5">
        <div className="flex justify-between items-center p-3 border-b border-gray-200">
          <div className="text-xl font-bold">Drawer</div>
          <button
            className="text-2xl text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="flex gap-1 px-3 w-full">
          {data.map((section) => (
            <div key={section.name} className="w-full">
              <div
                className={`cursor-pointer font-semibold p-2 hover:text-gray-600 transition duration-300 ease-in-out ${
                  selectedSection === section.name
                    ? "underline text-purple-600"
                    : ""
                }`}
                onClick={() => handleSectionClick(section.name)}
              >
                {section.name.split(" ")[0]}
              </div>
            </div>
          ))}
        </div>

        {selectedSection && (
          <div className="w-full p-3">
            {data
              .find((section) => section.name === selectedSection)
              ?.widgets.map((widget) => (
                <div
                  key={widget.name}
                  className="p-2 my-1 border border-gray-300 flex gap-1 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={checkedWidgets.has(widget.name)}
                    onChange={() => handleCheckbox(widget.name)}
                  />
                  {widget.name}
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 p-3 bg-gray-100 border-t border-gray-200">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded transition duration-300 ease-in-out"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Drawer;
