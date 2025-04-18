import React, { useState } from "react";
import SidebarMenu from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="relative min-h-screen">
      <SidebarMenu
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col">
        <main className="mt-20 md:ml-64 transition-all">{children}</main>
      </div>
    </section>
  );
};

export default DashboardLayout;
