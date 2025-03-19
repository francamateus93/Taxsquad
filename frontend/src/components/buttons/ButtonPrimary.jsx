import React from "react";

function Button({ children }) {
  return (
    <button className="px-4 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 cursor-pointer transition duration-200 text-base font-semibold">
      {children}
    </button>
  );
}

export default Button;
