import React, { useState } from "react";
import { motion } from "framer-motion";
import UseAxiosSecure from "../../customHooks/UseAxiosSecure";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../userComponents/userLayout/SideBar";
import { FaBars } from "react-icons/fa";
import { toast } from 'react-toastify';

const SuccessReportForm = () => {
  const [step, setStep] = useState(1);
  const axiosSecure = UseAxiosSecure();
  let navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [formData, setFormData] = useState({
    title: "",
    reported_by: "",
    case_url: "",
    case_photo: "",
    location: "",
    category: "",
    date_reported: "",
    date_resolved: "",
    actions_taken: "",
    message: "",
  });

  const handlePrev = () => setStep(step - 1);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (
      (step === 1 && (!formData.case_url || !formData.case_photo)) ||
      (step === 2 &&
        (!formData.location || !formData.category || !formData.date_reported))
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }
    setStep(step + 1);
  };

  const handleFinish = () => {
    if (!formData.actions_taken.trim() || !formData.message.trim()) {
      // alert("Please complete all fields before submitting.");
      toast.error("Please complete all fields before submit")
      return;
    }

    console.log(formData);

    axiosSecure.post("/successReport", formData).then((res) => {
      console.log(res.data);
      // alert("Success Report Submitted Successfully!");
      toast.success("Success Report submitted sucessfully")
      navigate("/userDashboard");
    });
  };

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
      <section className="min-h-screen flex justify-center items-center p-4 bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full bg-gray-800 p-6 shadow-2xl rounded-md border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-[#7777fb]">
            Create Success Report
          </h2>

          {step === 1 && (
            <div>
              <label className="block font-medium mb-2 text-white">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                placeholder="Enter title"
                required
              />
              <label className="block font-medium mb-2 text-white">
                Reported By
              </label>
              <input
                type="text"
                name="reported_by"
                value={formData.reported_by}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                placeholder="Enter name or Anonymous"
                required
              />
              <label className="block font-medium mb-2 text-white">
                Case URL
              </label>
              <input
                type="text"
                name="case_url"
                value={formData.case_url}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                placeholder="Enter Case URL"
                required
              />
              <label className="block font-medium mb-2 text-white">
                Case Photo URL
              </label>
              <input
                type="text"
                name="case_photo"
                value={formData.case_photo}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                placeholder="Enter Case Photo URL"
                required
              />
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-[#398982] hover:bg-[#2B6661] text-white rounded-lg"
                  onClick={handleNext}
                  disabled={!formData.case_url || !formData.case_photo}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block font-medium mb-2 text-white">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                placeholder="Enter location"
                required
              />
              <label className="block font-medium mb-2 text-white">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                placeholder="Enter category"
                required
              />
              <label className="block font-medium mb-2 text-white">
                Date Reported
              </label>
              <input
                type="date"
                name="date_reported"
                value={formData.date_reported}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                required
              />
              <label className="block font-medium mb-2 text-white">
                Date Resolved
              </label>
              <input
                type="date"
                name="date_resolved"
                value={formData.date_resolved}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
              />
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  onClick={handlePrev}
                >
                  Back
                </button>
                <button
                  className="px-4 py-2 bg-[#398982] hover:bg-[#2B6661] text-white rounded-lg"
                  onClick={handleNext}
                  disabled={
                    !formData.location ||
                    !formData.category ||
                    !formData.date_reported
                  }
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="block font-medium mb-2 text-white">
                Actions Taken
              </label>
              <textarea
                name="actions_taken"
                value={formData.actions_taken}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                placeholder="Describe actions taken"
                required
              ></textarea>
              <label className="block font-medium mb-2 text-white">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                placeholder="Enter message"
                required
              ></textarea>
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  onClick={handlePrev}
                >
                  Back
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={handleFinish}
                  disabled={!formData.actions_taken || !formData.message}
                >
                  Finish
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </section>
    </>
  );
};

export default SuccessReportForm;
