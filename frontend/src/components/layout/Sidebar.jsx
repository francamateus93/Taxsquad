import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdReceiptLong,
  MdOutlineCalculate,
  MdAttachFile,
  MdPerson,
} from "react-icons/md";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/Logo_TaxSquad.png";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
      <nav className="flex-1 flex flex-col justify-between p-4">
        <ul className="flex flex-col gap-2 font-medium">
          <span className="text-gray-400 flex font-normal text-xs mb-1">
            MENU
          </span>
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center  px-4 py-2 rounded-lg transition duration-200 ${
                isActive("/dashboard")
                  ? "font-bold bg-emerald-200"
                  : "hover:bg-emerald-200"
              }`}
            >
              <MdDashboard className="text-xl mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/invoices"
              className={`flex items-center  px-4 py-2 rounded-lg transition duration-200 ${
                isActive("/invoices")
                  ? "font-bold bg-emerald-200"
                  : "hover:bg-emerald-200"
              }`}
            >
              <MdReceiptLong className="text-xl mr-2" />
              Invoices
            </Link>
          </li>
          <li>
            <Link
              to="/taxes"
              className={`flex items-center  px-4 py-2 rounded-lg transition duration-200 ${
                isActive("/taxes")
                  ? "font-bold bg-emerald-200"
                  : "hover:bg-emerald-200"
              }`}
            >
              <MdOutlineCalculate className="text-xl mr-2" />
              Taxes
            </Link>
          </li>
          <li>
            <Link
              to="/documents"
              className={`flex items-center  px-4 py-2 rounded-lg transition duration-200 ${
                isActive("/documents")
                  ? "font-bold bg-emerald-200"
                  : "hover:bg-emerald-200"
              }`}
            >
              <MdAttachFile className="text-xl mr-2" />
              Documents
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`flex items-center px-4 py-2 rounded-lg transition duration-200 ${
                isActive("/profile")
                  ? "font-bold bg-emerald-200"
                  : "hover:bg-emerald-200"
              }`}
            >
              <MdPerson className="text-xl mr-2" />
              Profile
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-1 font-medium mb-2">
          <span className="text-gray-400 flex font-normal text-xs mb-1">
            TOOLS
          </span>
          <li>
            <Link
              to="/help"
              className={`flex items-center px-4 py-2 rounded-lg transition duration-200 ${
                isActive("/help")
                  ? "font-bold bg-emerald-200"
                  : "hover:bg-emerald-200"
              }`}
            >
              <IoMdHelpCircleOutline className="text-xl mr-2" />
              Help
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`flex items-center  px-4 py-2 rounded-lg transition duration-200 ${
                isActive("/settings")
                  ? "font-bold bg-emerald-200"
                  : "hover:bg-emerald-200"
              }`}
            >
              <IoSettingsOutline className="text-xl mr-2" />
              Settings
            </Link>
          </li>
          <li>
            <div className="bg-emerald-50 flex flex-col gap-2 items-start text-start px-4 py-4 justify-center rounded-xl transition duration-200 cursor-pointer hover:bg-emerald-200 mt-3">
              <h4 className="text-lg font-bold tracking-tight">
                Upgrade Pro! <span className="text-sm">👑</span>
              </h4>
              <p className="text-xs text-gray-400 tracking-tight font-normal">
                High productivity and better control of your tax management
              </p>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
