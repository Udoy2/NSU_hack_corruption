import React from "react";
import { FaSearch, FaBalanceScale, FaFileAlt, FaClipboardCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "Gather Evidence",
    description: "Collect necessary documents, photos, or videos as proof of corruption.",
    icon: <FaSearch className="text-4xl text-blue-600" />,
  },
  {
    title: "Identify the Right Authority",
    description: "Find the appropriate government agency or anti-corruption body to report to.",
    icon: <FaBalanceScale className="text-4xl text-green-600" />,
  },
  {
    title: "Submit Your Report",
    description: "Use an online form, hotline, or visit an office to file your complaint.",
    icon: <FaFileAlt className="text-4xl text-yellow-600" />,
  },
  {
    title: "Follow Up & Stay Informed",
    description: "Keep track of your report’s progress and stay engaged for updates.",
    icon: <FaClipboardCheck className="text-4xl text-red-600" />,
  },
];

const ReportCorruption = () => {
  return (
    <div className="py-12 mb-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl mb-12 mt-20 playfair font-bold text-start text-[#329980] ">
          How to Report an Incident?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-[#24303F] p-6 rounded-lg shadow-lg text-center">
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-[#FEF9E1] mb-4">{step.title}</h3>
              <p className="text-sm text-[#aeaeae]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportCorruption;