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

const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Sidebar DESKTOP*/}
      <div className="hidden md:flex md:flex-col md:fixed md:top-0 md:left-0 md:h-screen md:w-64 bg-white shadow z-20">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-xl">TaxSquad</span>
        </div>
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
      </div>

      {/* Menu Hamburguer */}
      <div className="flex items-center justify-between bg-white shadow px-4 py-3 md:hidden fixed top-0 left-0 right-0 z-30">
        <span className="font-bold text-xl">TaxSquad</span>
        <button
          onClick={onToggle}
          className="text-gray-700 hover:text-gray-900"
        >
          <MdMenu size={24} />
        </button>
      </div>

      {/* Sidebar MOBILE*/}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Fundo escuro semitransparente */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onToggle}
          ></div>

          <div className="relative bg-white w-64 h-screen shadow flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-bold text-xl">TaxSquad</span>
              <button
                onClick={onToggle}
                className="text-gray-700 hover:text-gray-900"
              >
                <MdClose size={24} />
              </button>
            </div>
            <nav className="p-4 flex-1 overflow-y-auto">
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
                    onClick={onToggle}
                  >
                    <MdDashboard className="mr-2" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/invoices"
                    className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
                    onClick={onToggle}
                  >
                    <MdReceiptLong className="mr-2" />
                    Invoices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/taxes"
                    className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
                    onClick={onToggle}
                  >
                    <MdOutlineCalculate className="mr-2" />
                    Taxes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/documents"
                    className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
                    onClick={onToggle}
                  >
                    <MdAttachFile className="mr-2" />
                    Documents
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
                    onClick={onToggle}
                  >
                    <MdPerson className="mr-2" />
                    Profile
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
