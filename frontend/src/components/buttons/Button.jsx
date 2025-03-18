import React from "react";

function Button({ children }) {
  return (
    <button className="bg-emerald-500 text-white px-6 py-2 rounded cursor-pointer hover:bg-emerald-600 font-semibold text-center transition duration-200">
      {children}
    </button>
  );
}

export default Button;
