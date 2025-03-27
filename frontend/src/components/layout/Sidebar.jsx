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
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/Logo_TaxSquad.png";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden md:flex md:flex-col md:fixed md:top-0 md:left-0 md:h-screen md:w-64 bg-white border-r border-r-gray-200 text-gray-00 z-50">
      <div className="flex justify-start p-5">
        <img
          className="w-36 lg:w-48 md:px-0 cursor-pointer"
          src={Logo}
          alt="Logo"
          onClick={() => navigate("/")}
        />
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-3 font-medium">
          <span className=" px-3 flex font-normal text-xs mb-4">MENU</span>
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-6 py-2 rounded-lg transition duration-200 ${
                isActive("/dashboard")
                  ? "font-bold bg-emerald-200"
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
                  ? "font-bold bg-emerald-200"
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
                  ? "font-bold bg-emerald-200"
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
                  ? "font-bold bg-emerald-200"
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
                  ? "font-bold bg-emerald-200"
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
