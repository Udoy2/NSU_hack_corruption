import {
    FaBars,
    FaCloudUploadAlt,
    FaTachometerAlt,
    FaShoppingCart,
    FaCalendarAlt,
    FaUser,
    FaFileAlt,
    FaTable,
    FaCog,
    FaChartLine,
    FaPuzzlePiece,
    FaLock,
    FaMoon,
    FaBell,
    FaEye,
    FaBox,
    FaUsers,
    FaArrowUp,
    FaArrowDown,
    FaBalanceScaleRight,
  } from "react-icons/fa";
  import { TbMessageReportFilled } from "react-icons/tb";
  import { LuSquareActivity } from "react-icons/lu";
  import { NavLink } from "react-router-dom";
  import AuthProviderHook from "../../customHooks/AuthProviderHooks";
  import { useEffect, useState } from "react";
  import UseAxiosSecure from "../../customHooks/UseAxiosSecure";
  
  const Sidebar = ({ isOpen, toggleSidebar }) => {
    const {user, handleError} = AuthProviderHook();
    const [userRole, setUserRole] = useState('user');
    const axiosSecure = UseAxiosSecure();
    useEffect(()=>{
      axiosSecure.get(`/userRole?email=${user?.email}`)
      .then(res=>{
        setUserRole(res.data);
      })
    },[user?.email])
  
    const commonLinks = [
    ];
  
    const userLinks = [
      { icon: FaTachometerAlt, text: "Dashboard", route: "userDashboard" },
      { icon: TbMessageReportFilled, text: "Create Post", route: "createPost" },
      { icon: LuSquareActivity, text: "Activities", route: "myActivities" },
    ]
  
    const adminLinks = [
      { icon: FaTachometerAlt, text: "Admin Dashboard", route: "adminDashboard" },
      { icon: FaUser, text: "All Users", route: "admin/allUsers" },
      { icon: FaFileAlt, text: "All Posts", route: "admin/allPosts" },
      { icon: FaTable, text: "Create Success Report", route: "admin/successFrom" },
      { icon: FaBalanceScaleRight, text: "All Success Reports", route: "admin/allSuccessReports" },
    ];
  
    return (
      <div
        className={`w-64 z-10 bg-gray-800 p-4 fixed h-full sidebar ${
          isOpen ? "" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="text-2xl font-bold mb-6 flex justify-between items-center">
        Side Bar
          <button onClick={toggleSidebar} className="bg-gray-800 p-2 rounded-sm">
            {isOpen ? <FaBars className="text-gray-200 cursor-pointer" /> : ""}
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            {[...commonLinks, ...(userRole === "admin" ? adminLinks : userLinks)].map(
              ({ icon: Icon, text, route }, i) => (
                <li key={i}>
                  <NavLink
                    to={`/${route}`}
                    className="flex items-center p-3 text-gray-200 hover:bg-gray-700 rounded-sm transition-colors"
                  >
                    <Icon className="mr-3 text-gray-400" /> {text}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;
  