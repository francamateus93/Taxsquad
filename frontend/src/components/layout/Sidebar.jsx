import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdReceiptLong,
  MdOutlineCalculate,
  MdAttachFile,
  MdPerson,
  MdMenu,
  MdClose,
} from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden md:flex md:flex-col md:fixed md:top-0 md:left-0 md:h-screen md:w-64 bg-emerald-50 text-emerald-800 shadow-md z-20">
      <div className="flex items-center justify-between p-4 h-22"></div>

      <nav className="flex-1 p-4">
        <ul className="space-y-3 font-medium">
          <span className="text-slate-400 px-3 flex font-normal text-xs mb-4">
            MENU
          </span>
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-6 py-2 rounded-lg transition duration-200 ${
                isActive("/dashboard")
                  ? "font-semibold bg-emerald-200"
                  : "hover:bg-emerald-200"
              }`}
            >
              <MdDashboard className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/invoices"
              className={`flex items-center px-6 py-2 rounded-lg transition duration-200 ${
                isActive("/invoices")
                  ? "font-semibold bg-emerald-200"
                  : "hover:bg-emerald-200"
              }`}
            >
              <MdReceiptLong className="mr-2" />
              Invoices
            </Link>
          </li>
          <li>
            <Link
              to="/taxes"
              className={`flex items-center px-6 py-2 rounded-lg transition duration-200 ${
                isActive("/taxes")
                  ? "font-semibold bg-emerald-200"
                  : "hover:bg-emerald-200"
              }`}
            >
              <MdOutlineCalculate className="mr-2" />
              Taxes
            </Link>
          </li>
          <li>
            <Link
              to="/documents"
              className={`flex items-center px-6 py-2 rounded-lg transition duration-200 ${
                isActive("/documents")
                  ? "font-semibold bg-emerald-200"
                  : "hover:bg-emerald-200"
              }`}
            >
              <MdAttachFile className="mr-2" />
              Documents
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`flex items-center px-6 py-2 rounded-lg transition duration-200 ${
                isActive("/profile")
                  ? "font-semibold bg-emerald-200"
                  : "hover:bg-emerald-200"
              }`}
            >
              <MdPerson className="mr-2" />
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
