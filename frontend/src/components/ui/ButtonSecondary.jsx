import React from "react";
const ButtonSecondary = ({ children }) => {
  return (
    <button className="px-6 py-2 text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-200 transition duration-200 text-base cursor-pointer">
      {children}
    </button>
  );
};

export default ButtonSecondary;
