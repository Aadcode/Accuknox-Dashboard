import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { datatom } from "../recoil";

interface WidgetModalProps {
  category: string;
  onClose: () => void;
}

const WidgetModal: React.FC<WidgetModalProps> = ({ category, onClose }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [data, setData] = useRecoilState(datatom);

  const handleSave = () => {
    if (name.trim() && text.trim()) {
      const updatedData = data.map((section: any) => {
        if (section.name === category) {
          return {
            ...section,
            widgets: [
              ...section.widgets,
              { name, text }, // Omit the ID
            ],
          };
        }
        return section;
      });

      setData(updatedData);

      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-xl">
      <div className="bg-white p-4 rounded shadow-lg w-1/3 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Widget</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Widget Name
          </label>
          <input
            type="text"
            placeholder="Widget Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2  text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Widget Text
          </label>
          <input
            type="text"
            placeholder="Widget Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetModal;
