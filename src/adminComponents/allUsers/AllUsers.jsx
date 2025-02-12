import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseAxiosSecure from "../../customHooks/UseAxiosSecure";
import Loading from "../../loading/loading";
import AuthProviderHook from "../../customHooks/AuthProviderHooks";
import Sidebar from "../../userComponents/userLayout/SideBar";
import { FaBars } from "react-icons/fa";

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [usersPerPage] = useState(12); // Show 12 users per page
  const [showModal, setShowModal] = useState(false);
  const [userToBan, setUserToBan] = useState(null);
  const axiosSecure = UseAxiosSecure();
  let { loading, setLoading, handleError } = AuthProviderHook();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
        setLoading(false);
      })
      .catch(handleError);
  }, [axiosSecure, setLoading, handleError]);

  const handleBanAlert = (user) => {
    setUserToBan(user); // Set user to ban/unban
    setShowModal(true); // Show confirmation modal
  };

  const handleBan = () => {
    const { _id, isBan } = userToBan;
    axiosSecure
      .put(`/admin/allUsers/${_id}`, { isBan: !isBan })
      .then((res) => {
        console.log(res.data);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === _id ? { ...user, isBan: !isBan } : user
          )
        );
        setShowModal(false);
        alert(isBan ? "User unbanned" : "User banned");
      })
      .catch(handleError);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user?.username?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  // Get the users for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) return <Loading />;

  return (
    <>
      <div>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex fixed ml-4 mt-4 justify-between items-center mb-6">
          {!isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="bg-gray-800 p-3 rounded-md shadow-md hover:bg-gray-700 transition duration-200"
            >
              <FaBars className="text-gray-200 text-xl cursor-pointer" />
            </button>
          )}
        </div>
      <div className="container mx-auto p-4 screen min-h-screen">

        <h2 className="text-4xl mb-8 mt-20 playfair font-bold text-start text-[#329980] ">
          All Registered Users
        </h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse text-black bg-[#f5f5f5]">
            {/* Table Head */}
            <thead className="bg-blue-600 text-white">
              <tr className="text-sm sm:text-base">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left hidden sm:table-cell">Email</th>
                <th className="p-3 text-left hidden md:table-cell">Phone</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-100 transition duration-200 text-sm sm:text-base"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 flex items-center gap-3">
                      <img
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border"
                        src={user?.photoUrl}
                        alt={user.username}
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {user.username}
                        </p>
                        <p className="text-xs text-gray-600 sm:hidden">
                          {user?.email}
                        </p>
                        <p className="text-xs text-gray-600 md:hidden">
                          {user?.phone}
                        </p>
                      </div>
                    </td>
                    <td className="p-3 hidden sm:table-cell">{user?.email}</td>
                    <td className="p-3 hidden md:table-cell">{user?.phone}</td>
                    <td className="p-3 text-center">
                      <Link
                        to={`/admin/allUsers/${user._id}`}
                        className="mr-4 text-blue-600 hover:underline text-sm"
                      >
                        See Profile
                      </Link>
                      <button
                        className={`${
                          user.isBan
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        } text-white px-3 py-1 rounded-md transition text-sm sm:text-base`}
                        onClick={() => handleBanAlert(user)}
                      >
                        {user.isBan ? "Unban" : "Ban"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-700">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Confirmation */}
        {showModal && (
          <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-md shadow-lg w-1/3">
              <h3 className="text-xl font-bold mb-4">Confirm Action</h3>
              <p className="mb-4">
                Are you sure you want to {userToBan?.isBan ? "unban" : "ban"}{" "}
                this user?
              </p>
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={handleBan}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8 space-x-4 mb-32">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            onClick={() =>
              setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
            }
          >
            Previous
          </button>
          <span className="text-lg text-gray-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            onClick={() =>
              setCurrentPage(
                currentPage < totalPages ? currentPage + 1 : totalPages
              )
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
