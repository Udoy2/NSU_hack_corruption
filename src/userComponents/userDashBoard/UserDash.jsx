import { useState } from "react";

import { FaUsers, FaBox } from "react-icons/fa";
import Sidebar from "../userLayout/SideBar";
import DashboardCard from "../userLayout/DashboardCard";
import ProfileForm from "../userLayout/ProfileForm";

export default function UserDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex bg-gray-900 text-gray-200">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <DashboardCard icon={FaUsers} value="3.4K" label="Total Posts" trend={0.43} />
          <DashboardCard icon={FaBox} value="45.2K" label="Total Comments" trend={4.35} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
