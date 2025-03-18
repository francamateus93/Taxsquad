import React from "react";

function Button({ children }) {
  return (
    <button className="bg-emerald-600 text-white px-6 py-2 rounded cursor-pointer hover:bg-emerald-500 font-semibold text-center">
      {children}
    </button>
  );
}

export default Button;
