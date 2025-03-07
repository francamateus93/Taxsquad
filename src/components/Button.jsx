import React from "react";

function Button({ children }) {
  return (
    <button className="flex bg-emerald-400 text-white px-6 py-2 rounded cursor-pointer hover:bg-emerald-500 font-semibold">
      {children}
    </button>
  );
}

export default Button;
