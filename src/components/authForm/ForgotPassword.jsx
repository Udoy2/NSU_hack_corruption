import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }else{
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert("password reset email send");
            navigate('/login');
        })
    }
    // Simulate sending a password reset request
    setMessage("A password reset link has been sent to your email.");
  };

  return (
    <section className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Forgot Password</h2>
        <p className="text-gray-600 mb-6">Enter your email to reset your password</p>
        
        {message && <p className="text-green-600 mb-4">{message}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col text-left">
            <label htmlFor="email" className="font-medium">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Send Reset Link
          </button>
        </form>
        
        <p className="text-sm mt-4">
          Remember your password? <Link to={'/login'} className="text-blue-500 underline">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;