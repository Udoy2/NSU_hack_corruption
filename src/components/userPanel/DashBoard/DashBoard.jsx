import { useState } from "react";
import { FaBars, FaTachometerAlt, FaShoppingCart, FaCalendarAlt, FaUser, FaFileAlt, FaTable, FaCog, FaChartLine, FaPuzzlePiece, FaLock, FaMoon, FaBell, FaEye, FaBox, FaUsers, FaArrowUp, FaArrowDown } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <div className={`w-64 bg-gray-800 p-4 fixed h-full sidebar ${isOpen ? "" : "-translate-x-full"} transition-transform duration-300`}> 
    <div className="text-2xl font-bold mb-6 flex justify-between items-center">
      TailAdmin
      <button onClick={toggleSidebar} className="bg-gray-800 p-2 rounded-full">
        <FaBars className="text-gray-200" />
      </button>
    </div>
    <nav>
      <ul>
        {[{icon: FaTachometerAlt, text: "Dashboard"}, {icon: FaShoppingCart, text: "eCommerce"}, {icon: FaCalendarAlt, text: "Calendar"}, {icon: FaUser, text: "Profile"}, {icon: FaFileAlt, text: "Forms"}, {icon: FaTable, text: "Tables"}, {icon: FaCog, text: "Settings"}, {icon: FaChartLine, text: "Chart"}, {icon: FaPuzzlePiece, text: "UI Elements"}, {icon: FaLock, text: "Authentication"}].map(({icon: Icon, text}, i) => (
          <li key={i} className="mb-4">
            <a className="flex items-center p-2 text-gray-200 hover:bg-gray-700 rounded" href="#">
              <Icon className="mr-3" /> {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

const DashboardCard = ({ icon: Icon, value, label, trend }) => (
  <div className="bg-gray-800 p-4 rounded-lg">
    <div className="flex items-center">
      <Icon className="text-gray-400 text-2xl mr-4" />
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-400">{label}</div>
      </div>
    </div>
    <div className={`${trend > 0 ? "text-green-500" : "text-red-500"} mt-2`}> 
      {Math.abs(trend)}% <Icon className={trend > 0 ? "fa-arrow-up" : "fa-arrow-down"} />
    </div>
  </div>
);

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className="flex justify-between items-center mb-6">
          <button onClick={toggleSidebar} className="bg-gray-800 p-2 rounded-full">
            <FaBars className="text-gray-200" />
          </button>
          <div className="flex items-center">
            <FaMoon className="text-gray-200 p-2 rounded-full mr-4" />
            <FaBell className="text-gray-200 p-2 rounded-full mr-4" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <DashboardCard icon={FaEye} value="$3.456K" label="Total Views" trend={0.43} />
          <DashboardCard icon={FaShoppingCart} value="$45.2K" label="Total Profit" trend={4.35} />
          <DashboardCard icon={FaBox} value="2.450" label="Total Products" trend={2.59} />
          <DashboardCard icon={FaUsers} value="3.456" label="Total Users" trend={-0.95} />
        </div>
      </div>
    </div>
  );
}
