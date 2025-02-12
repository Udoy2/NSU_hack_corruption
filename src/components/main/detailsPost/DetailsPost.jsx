import React from "react";
import { useLoaderData } from "react-router-dom";

const DetailsPost = () => {
  let reportData = useLoaderData();

  let badgeColor = {
    'Verified':"bg-green-500",
    'Pending':"bg-yellow-500",
    'Rejected':"bg-red-500",
  }

  return (
    <section className="mx-5 sm:mx-20 lg:mx-60 my-20">
      <h2 className="text-4xl mb-8 mt-20 playfair font-bold text-center text-[#329980] ">
        Report Details
      </h2>
      <div className="max-w-3xl mx-auto p-6 bg-[#24303F]  rounded-lg mt-10">
        <div className="flex">
          <h2 className="text-md font-bold  mb-4 md:text-2xl">
            {reportData.title}
          </h2>
          <p className="text-gray-700">
            <span
              className={`ml-2 px-2 py-1 text-white text-sm rounded ${badgeColor[reportData.verification_status]}`}
            >
              {reportData.verification_status}
            </span>
          </p>
        </div>

        <div className="mb-4">
          <p>
            <span className="font-semibold">Reported By:</span>{" "}
            {reportData.name}
          </p>
          {reportData?.phone_number && (
            <>
              <p>
                <span className="font-semibold">Email:</span> {reportData.email}
              </p>{" "}
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {reportData.phone_number}
              </p>
            </>
          )}
        </div>

        <p>
          <span className="font-semibold">Location:</span> {reportData.location}
        </p>

        <div className="mt-4">
          <p>
            <span className="font-semibold">Category:</span>{" "}
            {reportData.category}
          </p>
          <p className=" mb-3">
            <span className="font-semibold">Position:</span>{" "}
            {reportData.position_details}
          </p>
          <p>
            <span className="font-semibold">Status:</span>
            <span
              className={`ml-2 px-2 py-1 text-white text-sm rounded ${
                reportData.report_status === "Open"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {reportData.report_status}
            </span>
          </p>
        </div>

        {reportData.photo_url && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold ">Evidence (Photo)</h3>
            <img
              src={reportData.photo_url}
              alt="Evidence"
              className="w-full h-60 object-cover rounded-lg mt-2"
            />
          </div>
        )}

        {reportData.video_url && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white">
              Evidence (Video)
            </h3>
            <video controls className="w-full rounded-lg mt-2">
              <source src={reportData.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <p className="text-sm text-yellow-500 mt-6">
          Reported on: {new Date(reportData.posted_time).toLocaleString()}
        </p>

        <div className="mt-6">
          <h3 className="text-xl font-semibold ">Description</h3>
          <p className="">{reportData.description}</p>
        </div>
      </div>
    </section>
  );
};

export default DetailsPost;
