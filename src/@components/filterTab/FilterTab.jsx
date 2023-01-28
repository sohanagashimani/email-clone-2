import React from "react";

const FilterTab = ({ text, onClick, isActive }) => {
  return (
    <button
      className={`px-4 py-1 rounded-full ${
        isActive ? "bg-[#e1e4ea] border border-[#cfd2dc]" : null
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FilterTab;
