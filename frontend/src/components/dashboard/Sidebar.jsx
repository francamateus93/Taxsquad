import React from "react";
import { Link } from "react-router-dom";
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
  return (
    <>
      {/* Sidebar DESKTOP*/}
      <aside className="hidden md:flex md:flex-col md:fixed md:top-0 md:left-0 md:h-screen md:w-64 bg-white z-20">
        <div className="flex items-center justify-between p-4 h-22"></div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
              >
                <MdDashboard className="mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/invoices"
                className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
              >
                <MdReceiptLong className="mr-2" />
                Invoices
              </Link>
            </li>
            <li>
              <Link
                to="/taxes"
                className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
              >
                <MdOutlineCalculate className="mr-2" />
                Taxes
              </Link>
            </li>
            <li>
              <Link
                to="/documents"
                className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
              >
                <MdAttachFile className="mr-2" />
                Documents
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
              >
                <MdPerson className="mr-2" />
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
