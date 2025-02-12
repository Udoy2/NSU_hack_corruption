import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');  // Navigate to homepage
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#101828]">
      <div className="text-center">
        {/* Error Image */}
        <img 
          src="https://static.vecteezy.com/system/resources/thumbnails/006/549/647/small/404-landing-page-free-vector.jpg" 
          alt="Error 404" 
          className="w-full h-auto max-w-md mx-auto" 
        />
        
        {/* Error Message */}
        <h1 className="text-4xl font-semibold text-red-600 mt-6">Oops! Page Not Found</h1>
        <p className="text-lg text-gray-600 mt-4">We couldn't find the page you were looking for.</p>

        {/* Button to go to Home */}
        <button 
          onClick={handleHomeClick} 
          className="mt-6 px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
