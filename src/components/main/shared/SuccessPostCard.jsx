import React from "react";
import { Link } from "react-router-dom";

const SuccessPostCard = ({ post }) => {
  return (
    <>
      <Link
        key={post._id}
        to={`/achievements/${post._id}`}
        className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
      >
        <img
          src={post.case_photo}
          alt={post.title}
          className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
        />
        <div className="absolute inset-0 bg-[#00000092] bg-opacity-40 group-hover:bg-opacity-70 transition duration-300 flex flex-col justify-end p-4">
          <h3 className="text-lg font-bold text-[#FEF9E1]">{post.title}</h3>
          <h3 className="text-sm text-[#FEF9E1]">
            {post.actions_taken.length > 40
              ? `${post.actions_taken.slice(0, 40)}...`
              : post.actions_taken}
          </h3>
          <span className="text-xs text-gray-400 mt-2">{post.posted_date}</span>
        </div>
      </Link>
    </>
  );
};

export default SuccessPostCard;
