import React from "react";

function Button({ children }) {
  return (
    <button className="px-6 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 cursor-pointer transition duration-200 text-base font-semibold leading-4">
      {children}
    </button>
  );
}

export default Button;
