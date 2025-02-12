import { useState } from "react";
import { FaUser, FaCloudUploadAlt } from "react-icons/fa";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    profilePicture: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="bg-gray-800 rounded-sm border border-gray-700 p-6">
      <form className="space-y-6">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full bg-gray-900 rounded-sm px-4 py-3 text-sm border border-gray-700"/>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full bg-gray-900 rounded-sm px-4 py-3 text-sm border border-gray-700"/>
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="w-full bg-gray-900 rounded-sm px-4 py-3 text-sm border border-gray-700"></textarea>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-sm">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
