import { useState } from "react";
import WidgetModal from "./WidgetModal";

const AddWidget = ({ category }: any) => {
  const [ismodalopen, setmodalopen] = useState(false);

  function onhandleclose() {
    setmodalopen(false);
  }

  return (
    <div className="rounded-xl  p-8 h-full cursor-pointer py-2 text-xl font-medium flex justify-center items-center bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
      <div
        className="p-2 border-2 border-slate-50 rounded-lg shadow-purple-700 bg-purple-500 text-white hover:bg-purple-700 transition duration-300 ease-in-out"
        onClick={() => {
          setmodalopen(true);
        }}
      >
        + Add Widget
      </div>
      {ismodalopen && (
        <WidgetModal category={category} onClose={onhandleclose}></WidgetModal>
      )}
    </div>
  );
};

export default AddWidget;
