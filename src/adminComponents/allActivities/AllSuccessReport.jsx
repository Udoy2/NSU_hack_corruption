import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../customHooks/UseAxiosSecure";
import AuthProviderHook from "../../customHooks/AuthProviderHooks";
import Loading from "../../loading/loading";
import SuccessReportCard from "./SuccessReportCard";
import Sidebar from "../../userComponents/userLayout/SideBar";
import { FaBars } from "react-icons/fa";

const AllSuccessReports = () => {
  const axiosSecure = UseAxiosSecure();
  let { loading, setLoading, handleError } = AuthProviderHook();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reports, setReports] = useState([]);
  const postsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/successReport")
      .then((res) => {
        console.log(res.data);
        setReports(res.data);
        setLoading(false);
      })
      .catch(handleError);
  }, []);

  if (loading) return <Loading />;

  // Filter based on search and date
  const filteredReports = reports
    .filter((report) => {
      if (!searchQuery.trim()) return true; // If no search input, return all reports
      return report.title?.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((report) => (!selectedDate ? true : report.time === selectedDate));

  // Pagination Logic
  const totalPages = Math.ceil(filteredReports.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstPost, indexOfLastPost);

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
      <section className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto mb-32">
        <h2 className="text-4xl mb-8 mt-20 playfair font-bold text-center text-[#329980] ">
          All Success Reports
        </h2>

          {/* Search and Filter */}
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <input
              type="text"
              placeholder="Search by title..."
              className="border border-gray-700 bg-gray-800 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <input
              type="date"
              className="border border-gray-700 bg-gray-800 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {currentReports.length > 0 ? (
              currentReports.map((report) => (
                <SuccessReportCard key={report._id} report={report} />
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-2">
                No success reports available.
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2">
              <button
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#329980] text-white hover:bg-[#26735c]"
                }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="px-4 py-2 text-white bg-gray-700 rounded-md">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#329980] text-white hover:bg-[#26735c]"
                }`}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AllSuccessReports;
