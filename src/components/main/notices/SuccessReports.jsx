import React, { useEffect, useState } from "react";
import SuccessPostCard from "../shared/SuccessPostCard";
import UseAxiosSecure from "../../../customHooks/UseAxiosSecure";
import AuthProviderHook from "../../../customHooks/AuthProviderHooks";
import Loading from "../../../loading/loading";

const SuccessNotices = () => {
  const axiosSecure = UseAxiosSecure();
  let { loading, setLoading, handleError } = AuthProviderHook();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [successReports, setSuccessReports] = useState([])
  const postsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get("/successReport")
      .then((res) => {
        console.log(res.data);
        setSuccessReports(res.data);
        setLoading(false);
      })
      .catch(handleError);
  }, []);

  if (loading) return <Loading />;

  // Filter based on search and date
  const filteredPosts = successReports
    .filter((post) =>
      searchQuery
        ? post.title?.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .filter((post) => (selectedDate ? post.time === selectedDate : true));

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <section className="min-h-screen p-6 screen">
      <div className="max-w-6xl mx-auto mb-32">
        <h2 className="text-4xl mb-10 mt-10 playfair font-bold text-center text-[#329980]">
          Successful Action
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

        {/* Success Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <SuccessPostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-2">
              No success notices available.
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        {filteredPosts.length > postsPerPage && (
          <div className="flex justify-center mt-10">
            <button
              className={`px-4 py-2 mx-1 rounded-md ${
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
              {currentPage}
            </span>
            <button
              className={`px-4 py-2 mx-1 rounded-md ${
                indexOfLastPost >= filteredPosts.length
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#329980] text-white hover:bg-[#26735c]"
              }`}
              onClick={() =>
                setCurrentPage((prev) =>
                  indexOfLastPost < filteredPosts.length ? prev + 1 : prev
                )
              }
              disabled={indexOfLastPost >= filteredPosts.length}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessNotices;
