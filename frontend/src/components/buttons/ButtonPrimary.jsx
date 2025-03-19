import React from "react";

function Button({ children }) {
  return (
    <button className="px-4 lg:px-6 lg:py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 cursor-pointer transition duration-200 md:text-base font-semibold text-sm leading-4">
      {children}
    </button>
  );
}

export default Button;
