import { useEffect, useState } from "react";
import {
  FaBars,
  FaCloudUploadAlt,
  FaTachometerAlt,
  FaShoppingCart,
  FaCalendarAlt,
  FaUser,
  FaFileAlt,
  FaTable,
  FaCog,
  FaChartLine,
  FaPuzzlePiece,
  FaLock,
  FaMoon,
  FaBell,
  FaEye,
  FaBox,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaBalanceScaleRight 
} from "react-icons/fa";
import { TbMessageReportFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { LuSquareActivity } from "react-icons/lu";
import UseAxiosSecure from "../../customHooks/UseAxiosSecure";
import AuthProviderHook from "../../customHooks/AuthProviderHooks";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const {user, handleError} = AuthProviderHook();
  const [userRole, setUserRole] = useState('user');
  const axiosSecure = UseAxiosSecure();
  useEffect(()=>{
    axiosSecure.get(`/userRole?email=${user?.email}`)
    .then(res=>{
      setUserRole(res.data);
    })
  },[user?.email])

  const commonLinks = [
  ];

  const userLinks = [
    { icon: FaTachometerAlt, text: "Dashboard", route: "userDashboard" },
    { icon: TbMessageReportFilled, text: "Create Post", route: "createPost" },
    { icon: LuSquareActivity, text: "Activities", route: "myActivities" },
  ]

  const adminLinks = [
    { icon: FaTachometerAlt, text: "Admin Dashboard", route: "adminDashboard" },
    { icon: FaUser, text: "All Users", route: "admin/allUsers" },
    { icon: FaFileAlt, text: "All Posts", route: "admin/allPosts" },
    { icon: FaTable, text: "Create Success Report", route: "admin/successFrom" },
    { icon: FaBalanceScaleRight, text: "All Success Reports", route: "admin/allSuccessReports" },
  ];

  return (
    <div
      className={`w-64 bg-gray-800 p-4 fixed h-full sidebar ${
        isOpen ? "" : "-translate-x-full"
      } transition-transform duration-300`}
    >
      <div className="text-2xl font-bold mb-6 flex justify-between items-center">
        Side Bar
        <button onClick={toggleSidebar} className="bg-gray-800 p-2 rounded-sm">
          {isOpen ? <FaBars className="text-gray-200 cursor-pointer" /> : ""}
        </button>
      </div>
      <nav>
        <ul className="space-y-2">
          {[...commonLinks, ...(userRole === "admin" ? adminLinks : userLinks)].map(
            ({ icon: Icon, text, route }, i) => (
              <li key={i}>
                <NavLink
                  to={`/${route}`}
                  className="flex items-center p-3 text-gray-200 hover:bg-gray-700 rounded-sm transition-colors"
                >
                  <Icon className="mr-3 text-gray-400" /> {text}
                </NavLink>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

const LatestPostCard = ({ post }) => {
  return (
    <div className="bg-gray-800 rounded-sm border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center p-4 gap-4">
        <div className="min-w-[60px] h-16 bg-gray-700 rounded-sm border border-gray-600 overflow-hidden">
          {post?.photo_url ? (
            <img
              src={post.photo_url}
              alt="Post"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <FaBox className="text-xl" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-medium mb-1 text-gray-200">{post?.title}</h3>

          <p className="text-sm text-gray-400 mb-1">{post?.description}</p>
          <span className="bg-blue-500 text-white px-2 text-[11px] rounded-full ">
            {post?.category}
          </span>
          <span className="bg-yellow-500 text-gray-900 px-2 text-[11px] rounded-full mx-2">
            {post?.verification_status}
          </span>

          <p className="text-xs text-gray-500 mt-1">
            {new Date(post?.posted_time).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon: Icon, value, label, trend }) => (
  <div className="bg-gray-800 p-4 rounded-sm border border-gray-700">
    <div className="flex items-center">
      <Icon className="text-gray-400 text-xl mr-4" />
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-400 text-sm">{label}</div>
      </div>
    </div>
    <div
      className={`${
        trend > 0 ? "text-green-400" : "text-red-400"
      } text-sm mt-2 flex items-center gap-1`}
    >
      {trend > 0 ? (
        <span className="text-xs">▲</span>
      ) : (
        <span className="text-xs">▼</span>
      )}
      {Math.abs(trend)}%
    </div>
  </div>
);

const ProfileForm = () => {
  const axiosSecure = UseAxiosSecure();
  const { user, updateUserProfile, handleError } = AuthProviderHook();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    phone_number: "",
    password: "",
    profilePicture: null,
  });
  const [preview, setPreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here, such as sending the updated data to the

    axiosSecure
      .put(`/userData?email=${user?.email}`, formData)
      .then((res) => {
        setFormData({
          name: res.data.username,
          email: res.data.email,
          bio: res.data.bio,
          phone_number: res.data.phone,
          profilePicture: res.data.photoUrl,
        });
        updateUserProfile({
          displayName: res.data.username,
          photoURL: res.data.photoUrl,
        }).then(() => {
          alert("user data updated");
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

  return (
    <div className="bg-gray-800 rounded-sm border border-gray-700">
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
  );
};

export default function UserDash() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const axiosSecure = UseAxiosSecure();
  const [latestPost, setLatestPost] = useState([]);
  const [totalPost, setTotalPost] = useState(0);
  const { user, handleError } = AuthProviderHook();

  useEffect(() => {
    axiosSecure
      .get(`/latestPosts?email=${user?.email}`)
      .then((res) => {
        setLatestPost(res.data.userLatestPost);
        setTotalPost(res.data.totalPosts);
      })
      .catch(handleError);
  }, [user?.email]);

  return (
    <div className="flex bg-gray-900 text-gray-200">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          {!isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="bg-gray-800 p-2 rounded-sm"
            >
              <FaBars className="text-gray-200 cursor-pointer" />
            </button>
          )}
          <div className="flex items-center gap-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <DashboardCard
            icon={FaUsers}
            value={totalPost}
            label="Total Posts"
            trend={0.43}
          />
          <DashboardCard
            icon={FaBox}
            value="$45.2K"
            label="Total Comments"
            trend={4.35}
          />
          <DashboardCard
            icon={FaBox}
            value="$45.2K"
            label="Total Comments"
            trend={4.35}
          />
          <DashboardCard
            icon={FaUsers}
            value="$3.456K"
            label="Total Posts"
            trend={0.43}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* latest posted posts- this portion will contain only 5 latest posts, there will be new card like dashboardCard with a image in the left, a title of the post, and description 30 character */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium mb-4">Latest Posts</h3>
            {latestPost?.length > 0 &&
              latestPost.map((post) => (
                <LatestPostCard key={post._id} post={post} />
              ))}

            <h3 className="text-lg font-medium mb-4">Latest Comments</h3>
            {[
              {
                image: "https://picsum.photos/101",
                title: "Introduction to React Hooks",
                description:
                  "Learn how to use modern React hooks in your applications",
                date: "2024-03-15",
              },
              {
                image: "https://picsum.photos/100",
                title: "State Management Guide",
                description:
                  "Understanding state management in complex applications",
                date: "2024-03-14",
              },
              {
                image: "https://picsum.photos/102",
                title: "UI Design Principles",
                description:
                  "Essential principles for creating beautiful interfaces",
                date: "2024-03-13",
              },
            ].map((post, index) => (
              <LatestPostCard
                key={index}
                image={post.image}
                title={post.title}
                description={post.description}
                date={post.date}
              />
            ))}
          </div>
          {/* post form */}
          <div>
            <h3 className="text-lg font-medium mb-4">Profile Update</h3>
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}
