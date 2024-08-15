import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { datatom } from "../recoil";
import Section from "./Section";
import Drawer from "./Drawer";
import { searchAtom } from "../recoil";

const Dashboard: React.FC = () => {
  const [data] = useRecoilState(datatom);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const search = useRecoilValue(searchAtom);
  const [visibleData, setVisibleData] = useState(data);

  useEffect(() => {
    const filteredData = data.map((section: any) => ({
      ...section,
      widgets: section.widgets.filter(
        (widget: any) =>
          widget.isChecked !== false &&
          widget.name?.toLowerCase().includes(search.toLowerCase())
      ),
    }));

    setVisibleData(filteredData);
  }, [data, search]);

  function onClose() {
    setDrawerOpen(false);
  }

  return (
    <div className="pt-20">
      <div className="bg-customgrey p-2 py-3 overflow-x-hidden h-full flex flex-col">
        <div className="flex justify-between items-center px-4">
          <div className="font-semibold text-2xl mb-2">CNAPP DASHBOARD</div>
          <div className="bg-white p-1.5 rounded-lg border-2 border-gray-300 hover:border-gray-500 transition duration-300 ease-in-out">
            <button
              onClick={() => setDrawerOpen(true)}
              className="text-sm text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out"
            >
              Dynamic Widget
            </button>
          </div>
        </div>
        {visibleData.map((section: any, index: any) => (
          <Section key={index} Eachsection={section} />
        ))}
      </div>
      {drawerOpen && <Drawer onClose={onClose} />}
    </div>
  );
};

export default Dashboard;
