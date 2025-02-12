import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineMenu} from "react-icons/md";
import AuthProviderHook from "../../customHooks/AuthProviderHooks";
import { useEffect, useState } from "react";
import UseAxiosSecure from "../../customHooks/UseAxiosSecure";
import { toast } from "react-toastify";

const Nav = () => {
  let { user, setUser, signOutUser, handleError } = AuthProviderHook();
  const [role, setRole] = useState('user');
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();

  useEffect(()=>{
    axiosSecure.get(`/userRole?email=${user?.email}`)
    .then(res=>{
      setRole(res.data);
    })
  },[user?.email])

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/posts"}>Latest Reports</NavLink>
      </li>
      <li>
        <NavLink to={"/achievements"}>Achievements</NavLink>
      </li>
      <li>
        <NavLink to={"/aboutUs"}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={"/contactUs"}>Contact Us</NavLink>
      </li>
    </>
  );

  let handleLogOut = () => {
    signOutUser()
      .then(() => {
        setUser(null);
        navigate("/login");
        // alert("signout successful");
    
        toast.success("logout successfully");

      })
      .catch(handleError);
  };

  return (
    <>
      <section className="">
        <nav className="fixed top-0 w-full z-50 border-b border-gray-600 bg-[#24303f] shadow-md">
          <div className="navbar px-4 screen">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="w-[20px] mr-3 lg:hidden"
                >
                  <MdOutlineMenu />
                </div>
                <ul
                  tabIndex={0}
                  className="menu text-black gap-2 menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  {links}
                </ul>
              </div>
              <Link
                to={"/"}
                className="text-sm lg:text-xl md:text-md flex justify-center items-center gap-3"
              >
                <div className="hidden md:block lg:block sm:block">
                  <img className="w-[50px]" src="/images/bd-logo.png" alt="" />
                </div>
                <p className="font-bold raleway text-[#03A688]">
                  HACK-CORRUPTION
                </p>
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="navbar-end gap-4">
              {user && user?.email ? (
                <>
                  <Link
                    to={"/createPost"}
                    type="submit"
                    className="px-4 gap-1 playfair flex border-gray-500 border justify-center items-center py-2 font-medium bg-[#24303F] hover:bg-[#9d9d9d6e] rounded-lg  transition duration-300 shadow-md"
                  >
                    {/* <MdOutlineReportProblem /> Report */}
                    <img className="w-5 h-5" src="/images/warning.png" alt="" /> Report
                  </Link>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <img
                          alt="User Avatar"
                          src={user?.photoURL ? user.photoURL :"https://thumbs.dreamstime.com/b/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration-eps-335385751.jpg"}
                        />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu text-black menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                      <li>
                        <Link to={`${role === "admin"?'/adminDashboard':'/userDashboard'}`} className="justify-between">DashBoard</Link>
                      </li>
                      <li>
                        <button onClick={handleLogOut}>Logout</button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to={"/login"}
                    type="submit"
                    className="px-4 py-2 font-semibold bg-[#3396F3] hover:bg-[#3376f3] rounded-lg transition duration-300 shadow-md"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="h-[60px]"></div>
      </section>
    </>
  );
};

export default Nav;
