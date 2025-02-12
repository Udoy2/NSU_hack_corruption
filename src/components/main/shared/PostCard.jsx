// import React, { useState } from "react";

// const PostCard = ({ title, fullText, imageUrl, category, postedTime, verificationStatus }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const truncatedText =
//     fullText.length > 80 ? fullText.substring(0, 80) + "..." : fullText;

//   const handleDetails = () => {
//     setIsExpanded(!isExpanded);
//   };

//   // Format date
//   const formattedDate = new Date(postedTime).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });

//   // Badge styles based on verification status
//   const statusStyles = {
//     Pending: "bg-yellow-500 text-black",
//     Valid: "bg-green-500 text-white",
//     Rejected: "bg-red-500 text-white",
//   };

//   return (
//     <div className="bg-[#2D3748] text-white shadow-lg p-4 rounded-sm flex flex-col justify-between h-full">
//       <img
//         src={imageUrl}
//         alt={title}
//         className="w-full h-64 object-cover mb-4"
//       />
//       <div className="flex justify-between items-center mb-2">
//         <span className="bg-blue-500 text-white px-3 py-1 text-xs rounded-full">
//           {category}
//         </span>
//         <span className={`px-3 py-1 text-xs rounded-full ${statusStyles[verificationStatus]}`}>
//           {verificationStatus}
//         </span>
//       </div>
//       <h2 className="text-xl font-semibold text-gray-200 mb-2 raleway">{title}</h2>
//       <span className="text-gray-400 text-sm mb-2">📅 {formattedDate}</span>
//       <span className="description text-gray-400 mb-4">{truncatedText}</span>
//       <div className="mt-auto flex justify-end">
//         <button className="bg-[#398982] text-white py-2 px-4 rounded hover:bg-[#2b6661] cursor-pointer">
//           Show More
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostCard;





import React, { useState } from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  console.log(post);
  const { title, description, photo_url, category, posted_time, verification_status, user_image, name } = post;

  console.log(name)

  const truncatedText =
    description.length > 80 ? description.substring(0, 80) + "..." : description;

  // Format date
  const formattedDate = new Date(posted_time).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Badge styles based on verification status
  const statusStyles = {
    Pending: "bg-yellow-500 text-black",
    Verified: "bg-green-600 text-white",
    Rejected: "bg-red-700 text-white",
  };

  // Default image and name for anonymous users
  const defaultImage = "https://thumbs.dreamstime.com/b/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration-eps-335385751.jpg"; // Replace with your default image URL

  const displayUserImage = post.userPhoto || defaultImage;

  return (
    <div className="bg-[#24303f] text-white shadow-lg p-4 border border-[#2e3a47] rounded-sm flex flex-col justify-between h-full">
      <img
        src={photo_url}
        alt={title}
        className="w-full h-64 object-cover mb-4"
      />

      {/* User Info */}
      <div className="flex items-center mb-4">
        <img
          src={displayUserImage}
          alt={name}
          className="w-10 h-10 rounded-full mr-3"
        />
        {/* Only show the username if it's not the default 'Anonymous' */}
        {/* {user_name !== user_name && ( */}
          <span className="text-sm font-semibold">{name}</span>
        {/* )} */}
      </div>

      {/* Post Details */}
      <div className="flex justify-between items-center mb-2">
        <span className="bg-blue-500 text-white px-3 py-1 text-xs rounded-full">
          {category}
        </span>
        <span className={`px-3 py-1 text-xs rounded-full ${statusStyles[verification_status]}`}>

          {verification_status}
        </span>
      </div>
      <h2 className="text-xl font-semibold text-gray-200 mb-2 raleway">{title}</h2>
      <span className="text-gray-400 text-sm mb-2">📅 {formattedDate}</span>
      <span className="description text-gray-400 mb-4">{truncatedText}</span>

      <div className="mt-auto flex justify-end">
        <Link to={`/posts/${post._id}`}
          className="bg-[#398982] text-white py-2 px-4 rounded hover:bg-[#2b6661] cursor-pointer"
        >
          Show Details
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
