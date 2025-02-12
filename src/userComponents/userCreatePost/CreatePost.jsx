import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../userLayout/SideBar";
import UseAxiosSecure from "../../customHooks/UseAxiosSecure";
import { useNavigate } from "react-router-dom";
import AuthProviderHook from "../../customHooks/AuthProviderHooks";
import { FaBars } from "react-icons/fa";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [step, setStep] = useState(1);
  const [identity, setIdentity] = useState(null);
  const { user, handleError } = AuthProviderHook();
  const [aiDescription, setAiDescription] = useState("");

  const axiosSecure = UseAxiosSecure();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    phoneNumber: "",
    category: "",
    title: "",
    imageUrl: "",
    videoUrl: "",
    division: "",
    district: "",
    location: "",
    positionDetails: "",
    description: "",
    crimeTime: "", // New field for crime time
  });

  const divisions = [
    "Dhaka",
    "Chattogram",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
  ];
  const districts = {
    Dhaka: ["Dhaka", "Gazipur", "Narayanganj"],
    Chattogram: ["Chattogram", "Cox’s Bazar", "Comilla"],
    Rajshahi: ["Rajshahi", "Pabna", "Natore"],
    Khulna: ["Khulna", "Jessore", "Satkhira"],
    Barishal: ["Barishal", "Bhola", "Patuakhali"],
    Sylhet: ["Sylhet", "Habiganj", "Moulvibazar"],
    Rangpur: ["Rangpur", "Dinajpur", "Thakurgaon"],
    Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona"],
  };

  const handlePrev = () => setStep(step - 1);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, imageUrl: data.data.url }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Error uploading image.");
    }
  };

  const handleNext = () => {
    if (step === 3) {
      console.log("Uploaded Image URL:", formData.imageUrl);
      
      let imgUrl = formData.imageUrl;

      // ai generate description add
      axiosSecure
        .get(`/aiGenerateText?imgUrl=${imgUrl}`)
        .then((res) => {
          console.log(res.data);
          setAiDescription(res.data);
        })
        .catch(handleError);
    }
    if (step === 2 && identity === "yes" && !formData.phoneNumber.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }
    if (
      step === 3 &&
      (!formData.category || !formData.title || !formData.imageUrl)
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }
    if (
      step === 4 &&
      (!formData.division ||
        !formData.district ||
        !formData.location ||
        !formData.positionDetails)
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setStep(step + 1);
  };

  const handleFinish = () => {
    if (!formData.description.trim()) {
      toast.error("Please provide a description.");
      return;
    }

    if (formData.phoneNumber) {
      formData.name = user?.displayName;
      formData.email = user?.email;
      formData.userPhoto = user?.photoURL;
    }

    axiosSecure
      .post(`/createPost?email=${user.email}`, formData)
      .then((res) => {
        console.log(res.data);
        toast.success("Report Submitted Successfully!");
        navigate("/myActivities");
      });
    console.log("Report Submitted:", formData);
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      <div>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className="bg-gray-900">
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
              Create Corruption Report
            </h2>

            {step === 1 && (
              <div className="text-center">
                <p className="text-lg font-semibold mb-4 text-white">
                  Do you want to share your identity?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    className="px-4 py-2 cursor-pointer bg-[#398982] hover:bg-[#2B6661] text-white rounded-lg "
                    onClick={() => {
                      setIdentity("yes");
                      handleNext();
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    onClick={() => {
                      setIdentity("no");
                      handleNext();
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {step === 2 && identity === "yes" && (
              <div>
                <label className="block font-medium mb-2 text-white">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                  placeholder="Enter your phone number"
                />
                <div className="flex justify-between">
                  <button
                    className="w-1/3 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    onClick={handlePrev}
                  >
                    Back
                  </button>
                  <button
                    className="w-1/3 px-4 py-2 bg-[#398982] hover:bg-[#2B6661] text-white rounded-lg"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {((step === 2 && identity === "no") || step === 3) && (
              <div>
                <label className="block font-medium mb-2 text-white">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                >
                  <option value="">Select Category</option>
                  <option value="Bribery">Bribery</option>
                  <option value="Fraud">Fraud</option>
                </select>
                <label className="block font-medium mb-2 text-white">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                  placeholder="Title of corruption report"
                />
                <label className="block font-medium mb-2 text-white">
                  Image URL
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                />
                <label className="block font-medium mb-2 text-white">
                  Video URL (Optional)
                </label>
                <input
                  type="text"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                  placeholder="Video URL"
                />
                <div className="flex justify-between">
                  <button
                    className="w-1/3 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    onClick={handlePrev}
                  >
                    Back
                  </button>
                  <button
                    className="w-1/3 px-4 py-2 bg-[#398982] hover:bg-[#2B6661] text-white rounded-lg"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <label className="block font-medium mb-2 text-white">
                  Division
                </label>
                <select
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                >
                  <option value="">Select Division</option>
                  {divisions.map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
                <label className="block font-medium mb-2 text-white">
                  District
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                >
                  <option value="">Select District</option>
                  {formData.division &&
                    districts[formData.division]?.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                </select>
                <label className="block font-medium mb-2 text-white">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                  placeholder="Where did it happen?"
                />
                <label className="block font-medium mb-2 text-white">
                  Position Details
                </label>
                <input
                  type="text"
                  name="positionDetails"
                  value={formData.positionDetails}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                  placeholder="E.g., Officer, Manager"
                />
                <div className="flex justify-between">
                  <button
                    className="w-1/3 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    onClick={handlePrev}
                  >
                    Back
                  </button>
                  <button
                    className="w-1/3 px-4 py-2 bg-[#398982] hover:bg-[#2B6661] text-white rounded-lg"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <label className="block font-medium mb-2 text-white">
                  Crime Time
                </label>
                <input
                  type="datetime-local"
                  name="crimeTime"
                  value={formData.crimeTime}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                />
                <label className="block font-medium mb-2 text-white">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description || aiDescription} // Use aiDescription if no user input
                  onChange={handleChange}
                  required
                  className="w-full h-[300px] p-2 bg-gray-700 text-white border border-gray-600 rounded-lg mb-4"
                  placeholder="Brief description"
                ></textarea>
                <div className="flex justify-between">
                  <button
                    className="w-1/3 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    onClick={handlePrev}
                  >
                    Back
                  </button>
                  <button
                    className="w-1/3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={handleFinish}
                  >
                    Finish
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default CreatePost;
