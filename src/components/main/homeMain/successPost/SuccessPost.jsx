import React, { useEffect, useState } from "react";
import SuccessPostCard from "../../shared/SuccessPostCard";
import UseAxiosSecure from "../../../../customHooks/UseAxiosSecure";
import AuthProviderHook from "../../../../customHooks/AuthProviderHooks";
import Loading from "../../../../loading/loading";
import { Link } from "react-router-dom";

const SuccessPost = () => {
  let axiosSecure = UseAxiosSecure();
  let { loading, setLoading, handleError } = AuthProviderHook();
  let [ posts, setPosts] = useState([])

  useEffect(() => {
    axiosSecure
      .get("/home/successReports")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setLoading(false);
      })
      .catch(handleError);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container px-4 py-8 screen ">
      <div className="mb-12 mt-20 flex justify-between items-end">
        <h2 className="text-4xl playfair font-bold  text-[#329980] ">
          Success Stories
        </h2>
        <Link
          to={'/achievements'}
          className="text-[#b8b8b8] font-semibold hover:text-[#1ca288] hover:underline transition duration-300 "
        >
          See More 
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          // <a
          //   key={post.id}
          //   href="#"
          //   className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
          // >
          //   <img
          //     src={post.image}
          //     alt={post.title}
          //     className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
          //   />
          //   <div className="absolute inset-0 bg-[#0000006a] bg-opacity-40 group-hover:bg-opacity-70 transition duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
          //     <h3 className="text-lg font-bold text-white">{post.title}</h3>
          //     <p className="text-sm text-gray-300">{post.description}</p>
          //     <span className="text-xs text-gray-400 mt-2">{post.time}</span>
          //   </div>
          // </a>
          <SuccessPostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default SuccessPost;
