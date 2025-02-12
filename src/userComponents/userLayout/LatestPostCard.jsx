import React, { useState } from "react";
import { FaBox, FaTrash, FaPen, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import EditPost from "../editPost/EditPost";

const LatestPostCard = ({ post, onDelete, onEdit }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const handleDelete = () => {
    // Call the onDelete function passed from the parent (UserActivities)
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete(post._id); // Pass the post's _id to the onDelete handler
    }
  };

  const handleEdit = () => {
    setModalOpen(true); // Open the modal when the edit button is clicked
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };

  const handleSavePost = (updatedPost) => {
    onEdit(updatedPost); // Pass the updated post to the parent
  };

  return (
    <div className="bg-gray-800 rounded-sm border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center p-4 gap-4">
        {/* Post Image */}
        <div className="min-w-[60px] h-16 bg-gray-700 rounded-sm border border-gray-600 overflow-hidden">
          {post.image ? (
            <img
              src={post.image}
              alt="Post"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <FaBox className="text-xl" />
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="flex-1">
          <h3 className="font-medium mb-1 text-gray-200">
            {truncateText(post.title, 25)}
          </h3>
          <p className="text-sm text-gray-400 mb-1">
            {truncateText(post.description, 30)}
          </p>
          <span className="bg-blue-500 text-white px-2 text-[11px] rounded-full">
            Protest
          </span>
          <span className="bg-yellow-500 text-gray-900 px-2 text-[11px] rounded-full mx-2">
            Pending
          </span>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(post.posted_time).toLocaleString()}
          </p>
        </div>

        {/* Action Buttons (Delete, Show Details, Edit) */}
        <div className="flex gap-2">
          {/* Show Details Button */}
          <Link
            to={`/posts/${post._id}`}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <FaEye className="text-xl" />
          </Link>

          {/* Edit Button */}
          <button
            onClick={handleEdit}
            className="text-green-500 hover:text-green-700 transition-colors"
          >
            <FaPen className="text-xl" />
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <FaTrash className="text-xl" />
          </button>
        </div>
      </div>

      {/* Modal for Editing Post */}
      {isModalOpen && (
        <EditPost
          post={post}
          onClose={handleCloseModal}
          onSave={handleSavePost}
        />
      )}
    </div>
  );
};

export default LatestPostCard;
