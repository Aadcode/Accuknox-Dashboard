import { IoSearch } from "react-icons/io5";
import React from "react";
import { searchAtom } from "../recoil";
import { useRecoilState } from "recoil";
import { RxCross2 } from "react-icons/rx";

const Navbar: React.FC = () => {
  const [search, setSearch] = useRecoilState(searchAtom);

  return (
    <nav className="fixed  w-full px-3 grid grid-cols-3 bg-white py-3 ">
      <div className="text-slate-500">Home &gt;&gt; Dashboard</div>
      <div className="w-full flex items-center justify-center">
        <div className="relative w-full max-w-md">
          <input
            className="w-full p-1 pl-10 outline-none border border-slate-400 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <IoSearch className="absolute left-3 top-1/2  -translate-y-1/2 text-xl text-slate-500" />
          {search !== "" && (
            <RxCross2
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-slate-500 cursor-pointer"
              onClick={() => setSearch("")}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
