import React, { useEffect, useState } from "react";
import Sidebar from "../userLayout/SideBar";
import LatestPostCard from "../userLayout/LatestPostCard";
import UseAxiosSecure from "../../customHooks/UseAxiosSecure";
import AuthProviderHook from "../../customHooks/AuthProviderHooks";
import Loading from "../../loading/loading";
import { FaBars } from "react-icons/fa";

const UserActivities = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  let { user, loading, setLoading, handleError } = AuthProviderHook();
  const axiosSecure = UseAxiosSecure();

  // Initialize state for myPosts and pagination
  const [myPosts, setMyPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      axiosSecure
        .get(`/myPosts?email=${user?.email}`)
        .then((res) => {
          setMyPosts(res.data);
          setLoading(false);
        })
        .catch(handleError);
    }, 1000); // Delay of 2 seconds (2000 milliseconds)

    // Clean up function to clear the timer in case the component unmounts or the effect reruns
    return () => clearTimeout(timer);
  }, [user?.email]);

  const handleDelete = (id) => {
    console.log("delete");
  };

  // Pagination Logic
  const totalPosts = myPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const currentPosts = myPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  if (loading) return <Loading />;

  return (
    <>
      <div>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex">
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
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <h2 className="text-4xl mb-8 mt-20 playfair font-bold text-center text-[#329980] ">
            Your Posts
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => {
                  return (
                    <div className="mb-6" key={post._id}>
                      <LatestPostCard
                        key={post._id}
                        post={post}
                        onDelete={handleDelete}
                      />
                    </div>
                  );
                })
              ) : (
                <p>No posts found.</p>
              )}
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center mt-6">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md mx-2 hover:bg-blue-600 transition-all"
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
              }
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md mx-2 hover:bg-blue-600 transition-all"
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
      </div>
    </>
  );
};

export default UserActivities;
