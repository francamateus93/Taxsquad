import React, { useState } from "react";
import SidebarMenu from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="relative min-h-screen bg-gray-100">
      <SidebarMenu
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col">
        <main className="pt-16 md:ml-64 transition-all">{children}</main>
      </div>
    </section>
  );
};

export default DashboardLayout;
