import React, { useState, useEffect } from "react";
import { FaUser, FaCloudUploadAlt, FaBars } from "react-icons/fa";
import UseAxiosSecure from "../../customHooks/UseAxiosSecure";
import AuthProviderHook from "../../customHooks/AuthProviderHooks";
import Sidebar from "../../userComponents/userLayout/SideBar";

const AdminDash = () => {
  const axiosSecure = UseAxiosSecure();
  const { user, updateUserProfile, handleError } = AuthProviderHook();
  const [userData, setUserData] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    phone_number: "",
    role: "",
    profilePicture: null,
  });
  const [preview, setPreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here, such as sending the updated data to the server

    axiosSecure
      .put(`/userData?email=${user?.email}`, formData)
      .then((res) => {
        setFormData({
          name: res.data.username,
          email: res.data.email,
          bio: res.data.bio,
          phone_number: res.data.phone,
          role: res.data.role,
          profilePicture: res.data.photoUrl,
        });
        updateUserProfile({
          displayName: res.data.username,
          photoURL: res.data.photoUrl,
        }).then(() => {
          alert("Admin data updated");
        });
      })
      .catch(handleError);
  };

  useEffect(() => {
    axiosSecure
      .get(`/userData?email=${user?.email}`)
      .then((res) => {
        setUserData(res.data);
        setFormData({
          name: res.data.username,
          email: res.data.email,
          bio: res.data.bio,
          phone_number: res.data.phone,
          role: res.data.role,
          profilePicture: res.data.photoUrl,
        });
      })
      .catch(handleError);
  }, [user?.email]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const badgeColor = {
    Admin: "bg-blue-500",
    Moderator: "bg-green-500",
    User: "bg-yellow-500",
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

      <section className="screen py-32 flex justify-center items-center px-4">
        <div className="bg-gray-800 w-full lg:w-1/2 rounded-sm border border-gray-700">
          <div className="p-6">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gray-700 border-2 border-gray-600 overflow-hidden">
                  {formData?.profilePicture ? (
                    <img
                      src={formData.profilePicture}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FaUser className="text-3xl" />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="profilePicture"
                  className="absolute -bottom-2 -right-2 bg-gray-800 p-2 rounded-full border border-gray-600 cursor-pointer hover:bg-gray-700 transition-colors"
                >
                  <FaCloudUploadAlt className="text-gray-300 text-sm" />
                </label>
              </div>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleChange}
                className="hidden"
                accept="image/*"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-900 rounded-sm px-4 py-3 text-sm border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-900 rounded-sm px-4 py-3 text-sm border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Enter your email"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full bg-gray-900 rounded-sm px-4 py-3 text-sm border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full bg-gray-900 rounded-sm px-4 py-3 text-sm border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    rows="4"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role
                  </label>
                  <span
                    className={`inline-block bg-green-600 px-4 py-2 text-sm text-white font-semibold rounded-full ${
                      badgeColor[formData.role]
                    } shadow-md`}
                  >
                    {formData.role}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#398982] cursor-pointer text-white font-medium py-3 px-6 rounded-sm transition-colors text-sm"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDash;
