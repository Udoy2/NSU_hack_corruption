import React, { useState, useEffect } from "react";
import UseAxiosSecure from "../../customHooks/UseAxiosSecure";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const EditSuccessReport = ({ report, onClose }) => {
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  // Initialize state with the report data
  const [formData, setFormData] = useState({
    title: report.title || "",
    reported_by: report.reported_by || "",
    case_url: report.case_url || "",
    case_photo: report.case_photo || "",
    category: report.category || "",
    location: report.location || "",
    date_reported: report.date_reported || "",
    actions_taken: report.actions_taken || "",
    date_resolved: report.date_resolved || "",
    message: report.message || "",
    posted_date: report.posted_date || "",
  });


  console.log(formData.date_reported)

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData)
    axiosSecure.put(`/successReport/${report._id}`, formData)
      .then((res) => {
        // alert("Report updated successfully!");
        toast.success("Report updated successfully")
        navigate("/userDashboard"); // Redirect to the dashboard or reports page
      })
      .catch((err) => {
        console.error("Error updating the report", err);
        // alert("Failed to update the report.");
        toast.error("Failed to update the report")
      });
  };

  // Close the modal when the back button is clicked
  const handleBack = () => {
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 overflow-auto px-2 text-black bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white h-[600px] p-8 rounded-md shadow-lg w-full max-w-lg overflow-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-6 text-center">Edit Report</h2>
          <button
            onClick={handleBack}
            className="text-gray-500 text-xl text-red-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Reported By Input */}
          <div className="flex flex-col">
            <label htmlFor="reported_by" className="text-sm font-medium text-gray-700">Reported By</label>
            <input
              type="text"
              id="reported_by"
              name="reported_by"
              value={formData.reported_by}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Case URL Input */}
          <div className="flex flex-col">
            <label htmlFor="case_url" className="text-sm font-medium text-gray-700">Case URL</label>
            <input
              type="url"
              id="case_url"
              name="case_url"
              value={formData.case_url}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Case Photo Input */}
          <div className="flex flex-col">
            <label htmlFor="case_photo" className="text-sm font-medium text-gray-700">Case Photo</label>
            <input
              type="url"
              id="case_photo"
              name="case_photo"
              value={formData.case_photo}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Input */}
          <div className="flex flex-col">
            <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location Input */}
          <div className="flex flex-col">
            <label htmlFor="location" className="text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date Reported Input */}
          <div className="flex flex-col">
            <label htmlFor="date_reported" className="text-sm font-medium text-gray-700">Date Reported</label>
            <input
              type="datetime-local"
              id="date_reported"
              name="date_reported"
              value={formData.date_reported}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions Taken Input */}
          <div className="flex flex-col">
            <label htmlFor="actions_taken" className="text-sm font-medium text-gray-700">Actions Taken</label>
            <input
              type="text"
              id="actions_taken"
              name="actions_taken"
              value={formData.actions_taken}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date Resolved Input */}
          <div className="flex flex-col">
            <label htmlFor="date_resolved" className="text-sm font-medium text-gray-700">Date Resolved</label>
            <input
              type="datetime-local"
              id="date_resolved"
              name="date_resolved"
              value={formData.date_resolved}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message Input */}
          <div className="flex flex-col">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSuccessReport;
