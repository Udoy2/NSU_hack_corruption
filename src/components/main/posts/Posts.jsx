import React, { useState, useEffect } from "react";
import PostCard from "../shared/PostCard";
import UseAxiosSecure from "../../../customHooks/UseAxiosSecure";
import AuthProviderHook from "../../../customHooks/AuthProviderHooks";
import Loading from "../../../loading/loading";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDivision, setSelectedDivision] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  const axiosSecure = UseAxiosSecure();
  const { loading, setLoading, handleError } = AuthProviderHook();

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

  // Extract unique categories & divisions from API data
  const categories = ["All", ...new Set(posts.map((post) => post.category))];
  const divisions = ["All", ...new Set(posts.map((post) => post.division))]; // Assuming `division` field exists
  const statuses = ["All", "Validated", "Pending", "Rejected"];

  // Apply filters: Title Search + Category + Division + Validation Status
  const filteredPosts = posts
    .filter((post) =>
      searchQuery
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .filter((post) =>
      selectedCategory === "All" ? true : post.category === selectedCategory
    )
    .filter((post) =>
      selectedDivision === "All" ? true : post.division === selectedDivision
    )
    .filter((post) =>
      selectedStatus === "All"
        ? true
        : post.verification_status === selectedStatus
    );

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container mx-auto p-6 px-0 mt-6 mb-32">
      <h2 className="text-4xl mb-12 mt-20 playfair font-bold text-start text-[#329980] ">
        Recent Posts
      </h2>

      {/* Filter Options */}
      <div className="mb-4 flex flex-wrap gap-4">
        {/* Search by Title */}
        <input
          type="text"
          placeholder="Search by title..."
          className="border border-gray-700 bg-gray-800 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Filter by Category */}
        <select
          className="border border-gray-700 bg-gray-800 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Filter by Division/District */}
        <select
          className="border border-gray-700 bg-gray-800 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSelectedDivision(e.target.value)}
          value={selectedDivision}
        >
          {divisions.map((div, index) => (
            <option key={index} value={div}>
              {div}
            </option>
          ))}
        </select>

        {/* Filter by Validation Status */}
        <select
          className="border border-gray-700 bg-gray-800 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSelectedStatus(e.target.value)}
          value={selectedStatus}
        >
          {statuses.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 py-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="text-gray-400">No posts found matching your filters.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          {/* Previous Page Button */}
          <button
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-300"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Page Button */}
          <button
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;
