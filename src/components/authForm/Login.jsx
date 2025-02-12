import React, { useEffect, useState } from "react";
import loginAnimation from "../../../public/json/login.json";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import AuthProviderHook from "../../customHooks/AuthProviderHooks";
 import { toast } from 'react-toastify';


const Login = () => {
  let {
    setUser,
    signInUser,
    handleError,
    signOutUser
  } = AuthProviderHook();
  const navigate = useNavigate();

  // login validate captcha
  let [disable, setDisable] = useState(true);

  // useEffect captcha
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  // handle Captcha Validation
  let handleValidateCaptcha = () => {
    let user_input_captcha = document.getElementById("captcha").value;

    if (validateCaptcha(user_input_captcha) === true) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  // login form validation
  let handleLoginForm = (event) => {
    event.preventDefault();

    // form data
    let form = event.target;
    let email = form.email.value;
    let password = form.password.value;

    // Login logic here (if any)
    console.log(email, password);


    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        if(!result.user.emailVerified){
          signOutUser()
          .then(() => {
            setUser(null);
            navigate("/login");
          })
          .catch(handleError);
        //   return alert("Please verify your email address");
        return toast.error("please verify your email address ")
        }
        setUser(result.user);
        navigate("/")
       toast.success("Login successfully")
      })
      .catch(handleError);


  };

  let handleForgotPassword = ()=>{
    navigate('/forgotPassword')
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen md:px-4">
        <div className="flex flex-col md:flex-row bg-gray-500 rounded-lg shadow-lg max-w-4xl overflow-hidden">
          {/* Left: Image */}
          <div className="hidden md:flex items-center justify-center w-1/2 p-8">
            <Lottie className="w-full" animationData={loginAnimation} />
          </div>

          {/* Right: Login Form */}
          <div className="w-full md:w-1/2 p-8 bg-[#192C3C] text-white">
            <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleLoginForm}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-bold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 border-2 border-white rounded-lg focus:outline-none focus:border-yellow-300 bg-transparent text-white placeholder-gray-200"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="password" className="block mb-2 font-bold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2 border-2 border-white rounded-lg focus:outline-none focus:border-yellow-300 bg-transparent text-white placeholder-gray-200"
                />
              </div>

              {/* Forgot Password Link - Placed under password input */}
              <div className="mb-2 text-right">
                <button onClick={handleForgotPassword} type="button" href="#" className="text-[#3AA9F4] hover:underline text-sm cursor-pointer">
                  Forgot Password?
                </button>
              </div>

              <div className="mb-4">
                <label htmlFor="captcha" className="block mb-2">
                  <LoadCanvasTemplate />
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id="captcha"
                    name="captcha"
                    placeholder="Write this here"
                    required
                    className="flex-grow px-4 py-2 border-2 border-white rounded-lg focus:outline-none focus:border-yellow-300 bg-transparent text-white placeholder-gray-200"
                  />
                  <button
                    onClick={handleValidateCaptcha}
                    type="button"
                    className={`px-4 py-2 ${
                      disable
                        ? "bg-[#3396F3]"
                        : "bg-[#398982] hover:bg-[#398982]"
                    } text-black font-medium rounded-lg transition duration-300`}
                  >
                    {disable ? "Validate" : "✔"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-2 font-bold ${
                  disable
                    ? "bg-gray-600"
                    : "bg-[#398982] hover:[#398982] text-white"
                } rounded-lg transition duration-300 mb-4`}
                disabled={disable}
              >
                Login
              </button>

              {/* Register Button - Centered below Login button */}
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Don't have an account? <Link to={'/register'} className="text-[#3AA9F4] hover:underline">Register</Link>
                </p> 
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
