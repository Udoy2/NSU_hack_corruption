import React, { useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { IoCall } from "react-icons/io5";


const ContactUs = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleContact = (e) => {
    console.log(e);
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(contact);
  };

  return (
    <section className="mx-4 sm:mx-20 lg:mx-60 my-20">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-3">
        <div className="flex justify-center items-center gap-4">
          <img
            src="/images/corruption.png"
            alt="corruption"
            className="w-12 sm:w-20"
          />
          <div>
            <p className="text-sm lg:text-md font-light">
              Do you want to report an incident?
            </p>
            <h3 className="text-md font-bold">Report Corruption</h3>
          </div>
          
        </div>
        <button className="flex justify-center items-center bg-red-800 px-5 py-2 rounded-md hover:bg-red-700 cursor-pointer gap-3">
          <SlArrowRight /> Report Corruption
        </button>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <div className="flex justify-center items-center gap-4">
          <img
            src="/images/corruption.png"
            alt="corruption"
            className="w-12 sm:w-20"
          />
          <div>
            <p className="text-sm lg:text-md font-light">
              For an Emergency Call
            </p>
            <h3 className="text-md font-bold">Call Now</h3>
          </div>
          
        </div>
        <button className="flex justify-center items-center bg-red-800 px-5 py-2 rounded-md hover:bg-red-700 cursor-pointer gap-3">
        <IoCall /><a href="tel:88-02-58311026">Click Here</a> 
        </button>
      </div>

      <h3 className="text-4xl mb-8 mt-20 playfair font-bold text-start text-[#329980]">
        <a href="#email">Become Our Part</a>
      </h3>

      <hr className="mt-6" />

      <div className="bg-[#24303F] mt-6 p-4 sm:p-8 text-white rounded-md">
        <h2 className="text-center text-[#FEF9E1] text-xl font-bold py-3 mb-5">
          Anti-Corruption Commission
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mx-4 sm:mx-20">
          <div className="flex flex-col justify-center items-center bg-white px-6 py-4 max-w-sm w-full rounded-md shadow-md">
            <img
              src="/images/dudok.png"
              alt="Anticorruption"
              className="w-[70px] sm:w-20"
            />
            <p className="text-sm font-light text-center mt-2 text-black">
              <span className="text-red-800 font-bold">PLEASE NOTE:</span> These
              numbers are for media queries only. To report corruption, use our
              online form.
            </p>
          </div>

          <div>
            <h5 className="mb-5 text-[#0288D1] text-md font-bold sm:text-2xl">
              Address of ACC Head Office
            </h5>
            <h5 className="text-bold mb-1">Chairman </h5>
            <h5 className="mb-1">
              E-mail:{" "}
              <span className="text-[#0288D1]">chairman@acc.org.bd</span>{" "}
            </h5>
            <h5>Head Office, 1 SegunBagicha, Dhaka - 1000.</h5>
          </div>
        </div>
      </div>

      <div className="bg-[#24303F] mt-6 p-4 sm:p-8 text-white rounded-md">
        <h2 className="text-center text-[#FEF9E1] text-xl font-bold py-3 mb-5">
          Bangladesh Army
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mx-4 sm:mx-20">
          <div>
            <h5 className="mb-5 text-md font-bold text-[#0288D1] sm:text-2xl">
              The Bangladesh Armed Services Board (BASB)
            </h5>
            <h5 className="text-bold mb-1">Chairman</h5>
            <h5 className="mb-1">
              Contact No:{" "}
              <span className="text-[#0288D1]">
              <a href="tel:88-02-58311026">88-02-58311026</a> 
              </span>
            </h5>
            <h5>Head Office, 1 SegunBagicha, Dhaka - 1000.</h5>
          </div>
          <div className="flex flex-col justify-center items-center bg-white px-6 py-4 max-w-sm w-full rounded-md shadow-md">
            <img
              src="/images/army.png"
              alt="Bangladesh Army"
              className="w-[70px] sm:w-20"
            />
            <p className="text-sm font-light text-center mt-2 text-black">
              <span className="text-red-800 font-bold">PLEASE NOTE:</span> These
              numbers are for media queries only. To report corruption, use our
              online form.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#24303F] mt-6 p-4 sm:p-8 text-white rounded-md mb-6">
        <h2 className="text-center text-[#FEF9E1] text-xl font-bold py-3 mb-5">
          Police Headquarter, Bangladesh Police
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mx-4 sm:mx-20">
          <div className="flex flex-col justify-center items-center bg-white px-6 py-4 max-w-sm w-full rounded-md shadow-md">
            <img
              src="/images/pulice.png"
              alt="Anticorruption"
              className="w-[70px] sm:w-20"
            />
            <p className="text-sm font-light text-center mt-2 text-black">
              <span className="text-red-800 font-bold">PLEASE NOTE:</span> These
              numbers are for media queries only. To report corruption, use our
              online form.
            </p>
          </div>

          <div>
            <h5 className="mb-5 text-md font-bold text-[#0288D1] sm:text-2xl">
              Address of ACC Head Office
            </h5>
            <h5 className="text-bold mb-1">Head Office</h5>
            <h5 className="mb-1">
              E-mail:{" "}
              <span className="text-[#0288D1]">oic_opscr@police.gov.bd</span>{" "}
            </h5>
            <h5>Road, Fulbaria Dhaka - 1000.</h5>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex flex-col items-center p-10 bg-[#121826] rounded-xl shadow-2xl mx-auto my-12 text-white">
        <h2 className="font-extrabold text-4xl text-[#FEF9E1] mb-12 text-center">
          Contact Us
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-start gap-10 w-full">
          <div className="flex flex-col justify-center items-start px-8 sm:w-1/2">
            <h3 className="bg-green-600 text-white px-5 py-2 rounded-lg text-lg font-semibold mb-5 shadow-lg">
              Join Our Network
            </h3>
            <p className="text-gray-400 text-md leading-relaxed">
              If you represent an NGO, a community forum, a street committee, a
              ratepayers’ association, a union, or another organization active
              in anti-corruption work, register now to become part of our
              growing network.
            </p>
          </div>

          <form className="flex flex-col gap-5 bg-[#1E293B] p-8 rounded-lg shadow-lg w-full sm:w-1/2">
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="font-semibold text-gray-300 mb-2"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-[#2D3748] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-white"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="font-semibold text-gray-300 mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-[#2D3748] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-white"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="font-semibold text-gray-300 mb-2"
              >
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Write something..."
                className="w-full px-4 py-3 bg-[#2D3748] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-none text-white"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-[#398982] text-white py-3 rounded-lg hover:bg-[#2B6661] transition-all font-semibold text-lg shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
