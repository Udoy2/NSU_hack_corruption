import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseAxiosSecure from "../../customHooks/UseAxiosSecure";
import AuthProviderHook from "../../customHooks/AuthProviderHooks";
import Loading from "../../loading/loading";
import Sidebar from "../../userComponents/userLayout/SideBar";
import { FaBars } from "react-icons/fa";

const AdminAllPosts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false); // For modal visibility
  const [postToUpdate, setPostToUpdate] = useState(null); // Store the post being updated
  const [actionType, setActionType] = useState(""); // Store the action (approve/reject)
  const postsPerPage = 12;
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const axiosSecure = UseAxiosSecure();
  let { loading, setLoading, handleError } = AuthProviderHook();

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/allReports")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(handleError);
  }, []);

  if (loading) return <Loading />;

  const categories = [
    "Corruption",
    "Bribery",
    "Embezzlement",
    "Land Corruption",
  ];

  // Filter posts based on search term, category, and date range
  const filteredPosts = posts.filter((post) => {
    const titleMatches = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatches = selectedCategory
      ? post.category === selectedCategory
      : true;
    const dateMatches =
      (dateRange.startDate &&
        new Date(post.posted_time) >= new Date(dateRange.startDate)) ||
      (dateRange.endDate &&
        new Date(post.posted_time) <= new Date(dateRange.endDate)) ||
      (!dateRange.startDate && !dateRange.endDate);

    return titleMatches && categoryMatches && dateMatches;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleAction = (id, status) => {
    setActionType(status); // Set the action type (approve/reject)
    setPostToUpdate(id); // Store the post ID that needs to be updated
    setShowModal(true); // Show the modal for confirmation
  };

  const confirmAction = () => {
    if (postToUpdate && actionType) {
      axiosSecure
        .put(`/posts/${postToUpdate}`, { verification_status: actionType })
        .then((res) => {
          // Update the post in the UI after success
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post._id === postToUpdate
                ? { ...post, verification_status: actionType }
                : post
            )
          );
          setShowModal(false); // Close the modal after action
        })
        .catch(handleError);
    }
  };
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
      <div className="container mx-auto p-4 screen">
        <h2 className="text-4xl mb-8 mt-20 playfair font-bold text-start text-[#329980] ">
          All Posts
        </h2>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          {/* Title Search */}
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-1/3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option className="text-black" value="">
              Select Category
            </option>
            {categories.map((category) => (
              <option className="text-black" key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Date Range Filter */}
          <div className="w-full md:w-1/3 flex gap-4">
            <input
              type="date"
              className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, startDate: e.target.value })
              }
            />
            <input
              type="date"
              className="w-1/2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, endDate: e.target.value })
              }
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border-collapse text-black bg-[#f8f8f8]">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Posted Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.length > 0 ? (
                currentPosts.map((post, index) => (
                  <tr
                    key={post._id}
                    className="border-b hover:bg-gray-100 transition duration-200"
                  >
                    <td className="p-3">{indexOfFirstPost + index + 1}</td>
                    <td className="p-3">
                      <img
                        className="w-16 h-16 rounded-full border"
                        src={post.photo_url}
                        alt={post.title}
                      />
                    </td>
                    <td className="p-3">{post.title}</td>
                    <td className="p-3">{post.category}</td>
                    <td className="p-3">
                      {new Date(post.posted_time).toLocaleString()}
                    </td>
                    <td className="p-3">{post.verification_status}</td>
                    <td className="p-3 text-center">
                      <Link
                        to={`/posts/${post._id}`}
                        className="mr-4 text-blue-600 hover:underline"
                      >
                        View Details
                      </Link>
                      <span>
                        {post.verification_status !== "Verified" && (
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                            onClick={() => handleAction(post._id, "Verified")}
                          >
                            Approve
                          </button>
                        )}
                        {post.verification_status !== "Rejected" && (
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition ml-2"
                            onClick={() => handleAction(post._id, "Rejected")}
                          >
                            Reject
                          </button>
                        )}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-3 text-center text-gray-700">
                    No posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 mb-32">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2 mx-1 border rounded-md">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        )}
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Confirm Action
              </h3>
              <p className="mb-6 text-center text-lg">
                Are you sure you want to {actionType} this post?
              </p>
              <div className="flex justify-around">
                <button
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition duration-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition duration-300"
                  onClick={confirmAction}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminAllPosts;
