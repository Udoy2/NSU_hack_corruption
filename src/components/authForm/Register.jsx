import Lottie from "lottie-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerAnimation from "../../../public/json/register.json";
import AuthProviderHook from "../../customHooks/AuthProviderHooks";
import axios from "axios";
import { sendEmailVerification, sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../firebase.config";
import UseAxiosSecure from "../../customHooks/UseAxiosSecure";
import { toast } from 'react-toastify';

const Register = () => {
  // context
  // using custom hook..........
  let {setUser ,updateUserProfile, handleError, registerWithEmail,signOutUser } =AuthProviderHook();
  let axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    idType: "",
    idNumber: "",
    idImage: "",
    profileImage: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [termsError, setTermsError] = useState("");

  const handleUser = (e) => {
    console.log(e);
    
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });

    if (name === "confirmPassword" && value !== userData.password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

    // const actionCodeSettings = {
    //   url: "http://localhost:3000/verify-email", // Change this to your actual verification page
    //   handleCodeInApp: true,
    // };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     if (userData.password !== userData.confirmPassword) {
  //       setPasswordError("Passwords do not match");
  //       return;
  //     }

  //     if (!isChecked) {
  //       setTermsError("You must agree to the Terms & Conditions");
  //       return;
  //     }

  //     let email = userData.email;

  //     axios
  //       .get(
  //         `/json/${userData.idType === "nid" ? "nidData" : "passportData"}.json`
  //       )
  //       .then((res) => {
  //         const data = res.data;
  //         console.log(data);

  //         // Check if idNumber exists in the JSON data
  //         const foundEntry = data.find(
  //           (entry) =>
  //             entry.nid_number === userData.idNumber ||
  //             entry.passport_number === userData.idNumber
  //         );

  //         if (foundEntry) {
  //           sendSignInLinkToEmail(auth, email, actionCodeSettings)
  //             .then(() => {
  //               alert("Email OTP (Magic Link) sent! Check your inbox.");
  //               navigate('/verifyEmail')
  //               // Store email in localStorage for later verification
  //             //   window.localStorage.setItem("emailForSignIn", email);
  //             })
  //             .catch((error) => {
  //               console.error("Error sending email OTP:", error);
  //             });
  //         } else {
  //           alert(`Your ${userData.idType} number is not valid`);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    

    if (userData.password !== userData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (!isChecked) {
      setTermsError("You must agree to the Terms & Conditions");
      return;
    }

    let email = userData.email;
    let passport = userData.password;

    console.log(userData);

    axios
      .get(
        `/json/${userData.idType === "nid" ? "nidData" : "passportData"}.json`
      )
      .then((res) => {
        const data = res.data; // Assuming it's an array
        console.log(data);

        // Check if idNumber exists in the JSON data
        const foundEntry = data.find(
          (entry) =>
            entry.nid_number === userData.idNumber ||
            entry.passport_number === userData.idNumber
        );

        if (foundEntry) {
          registerWithEmail(email, passport)
            .then((result) => {
              console.log(result.user);
              // send verification mail
              sendEmailVerification(auth.currentUser).then(() => {
                // alert("email verification mail send");
                toast.info("email verification mail send")

                updateUserProfile({
                  displayName: userData.username,
                  photoURL: userData.profileImage,
                })
                  .then(() => {

                    // send data to backend;
                    axiosSecure.post('/users', userData)
                    .then(res=>{
                      console.log(res.data);
                    })


                    signOutUser()
                      .then(() => {
                        setUser(null);
                        navigate("/login");
                      })
                      .catch(handleError);
                    console.log(result.user);
                  })
                  .catch(handleError);
              });
            })
            .catch(handleError);
        } else {
        //   alert(`Your ${userData.idType} number is not valid`);
        toast.error(`Your ${userData.idType} number is not valid`)
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <div className="screen py-12 sm:py-32">
        <section className="mt-10 flex text-white justify-center items-center">
          <div className="bg-[#192C3C] p-8 rounded-lg shadow-lg max-w-4xl w-full flex flex-col md:flex-row">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Register
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="username" className="font-medium">
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    placeholder="Username"
                    autoComplete="off"
                    value={userData.username}
                    onChange={handleUser}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="font-medium">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Email"
                    autoComplete="off"
                    value={userData.email}
                    onChange={handleUser}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phone" className="font-medium">
                    Phone No:
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    required
                    placeholder="Phone No"
                    autoComplete="off"
                    value={userData.phone}
                    onChange={handleUser}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="profileImage" className="font-medium">
                    Profile Image URL:
                  </label>
                  <input
                    type="text"
                    id="profileImage"
                    placeholder="Photo URL"
                    name="profileImage"
                    required
                    value={userData.profileImage}
                    onChange={handleUser}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="idType" className="font-medium">
                    Select NID/Passport:
                  </label>
                  <select
                    name="idType"
                    id="idType"
                    required
                    onChange={handleUser}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  >
                    <option className="text-black" value="">
                      Choose an option
                    </option>
                    <option className="text-black" value="nid">
                      NID
                    </option>
                    <option className="text-black" value="passport">
                      Passport
                    </option>
                  </select>
                </div>

                {userData.idType && (
                  <>
                    <div className="flex flex-col">
                      <label htmlFor="idNumber" className="font-medium">
                        {userData.idType === "nid"
                          ? "NID Number:"
                          : "Passport Number:"}
                      </label>
                      <input
                        type="text"
                        name="idNumber"
                        id="idNumber"
                        required
                        placeholder={`Enter your ${
                          userData.idType === "nid" ? "NID" : "Passport"
                        } number`}
                        value={userData.idNumber}
                        onChange={handleUser}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="idImage" className="font-medium">
                        Upload NID/Passport Image URL:
                      </label>
                      <input
                        type="text"
                        id="idImage"
                        placeholder="Document Image URL"
                        name="idImage"
                        required
                        value={userData.idImage}
                        onChange={handleUser}
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </>
                )}

                <div className="flex flex-col">
                  <label htmlFor="password" className="font-medium">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleUser}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="confirmPassword" className="font-medium">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    placeholder="Confirm Password"
                    value={userData.confirmPassword}
                    onChange={handleUser}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 ${
                      passwordError
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-blue-400"
                    }`}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isChecked}
                    onChange={() => {
                      setIsChecked(!isChecked);
                      setTermsError("");
                    }}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <a href="#" className="text-blue-500 underline">
                      Terms & Conditions
                    </a>
                  </label>
                </div>
                {termsError && (
                  <p className="text-red-500 text-sm">{termsError}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Sign Up
                </button>

                <p className="text-center text-sm mt-4">
                  Already have an account?{" "}
                  <Link to={"/login"} className="text-blue-500 underline">
                    Login
                  </Link>
                </p>
              </form>
            </div>

            {/* Right Side - Image (Hidden on small screens) */}
            <div className="hidden md:block w-1/2">
              <Lottie
                className="w-full h-[100%] flex justify-center items-center"
                animationData={registerAnimation}
              ></Lottie>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
