import React, { useEffect, useState } from "react";
import PostCard from "../../shared/PostCard";
import UseAxiosSecure from "../../../../customHooks/UseAxiosSecure";
import { Link } from "react-router-dom";

const RecentPost = () => {
  let axiosSecure = UseAxiosSecure();
  let [posts, setPosts] = useState([]);

  // data came for backend
  useEffect(()=>{
    axiosSecure.get('/home/allReports')
    .then(res=>{
      setPosts(res.data)
    })
  },[axiosSecure])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 mt-20 flex justify-between items-end">
        <h2 className="text-4xl playfair font-bold  text-[#329980] ">
          Recent Posts
        </h2>
        <Link
          to={'/achievements'}
          className="text-[#b8b8b8] font-semibold hover:text-[#1ca288] hover:underline transition duration-300 "
        >
          See More 
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post, index) => (
          <PostCard key={index} post={post}/>
        ))}
      </div>
    </div>
  );
};

export default RecentPost;