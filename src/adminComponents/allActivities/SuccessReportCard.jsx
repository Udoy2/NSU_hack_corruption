import React, { useState } from "react";
import EditSuccessReport from "../editSuccessReport/EditSuccessReport";
import { Link } from "react-router-dom";

const SuccessReportCard = ({ report }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition duration-300 bg-gray-800">
      <img
        src={report.case_photo}
        alt={report.title}
        className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-[#00000092] bg-opacity-40 group-hover:bg-opacity-70 transition duration-300 flex flex-col justify-end p-4">
        <h3 className="text-lg font-bold text-[#FEF9E1]">{report.title}</h3>
        <p className="text-sm text-gray-300">
          {report.actions_taken.length > 90
            ? report.actions_taken.slice(0, 90) + "..."
            : report.actions_taken}
        </p>

        <span className="text-xs text-gray-400 mt-2">{report.posted_date}</span>

        {/* Buttons Section */}
        <div className="flex gap-2 mt-4">
          <Link to={`/achievements/${report._id}`}
            // onClick={() => onView(report)}
            className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition duration-200"
          >
            Details
          </Link>
          <button
            onClick={openModal} // Open the modal when clicked
            className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600 transition duration-200"
          >
            Edit
          </button>
          <button
            // onClick={() => onDelete(report)}
            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Open Edit Modal */}
      {isModalOpen && (
        <EditSuccessReport
          report={report} // Pass the current report as prop to the modal
          onClose={closeModal} // Pass the close function to the modal
        />
      )}
    </div>
  );
};

export default SuccessReportCard;
