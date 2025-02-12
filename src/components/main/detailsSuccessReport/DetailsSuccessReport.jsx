import React from "react";
import { useLoaderData } from "react-router-dom";

const DetailsSuccessReport = () => {
  let reportData = useLoaderData();

  let badgeColor = {
    'Resolved': "bg-green-500",
    'Pending': "bg-yellow-500",
  };

  return (
    <section className="mx-5 sm:mx-20 lg:mx-60 my-20">
      <h2 className="text-4xl mb-8 mt-20 playfair font-bold text-center text-[#329980] ">
        Success Report Details
      </h2>
      <div className="max-w-3xl mx-auto p-6 bg-[#24303F] rounded-lg mt-10">
        <div className="flex">
          <h2 className="text-md font-bold mb-4 md:text-2xl">
            {reportData.title}
          </h2>
          <p className="text-gray-700">
            <span
              className={`ml-2 px-2 py-1 text-white text-sm rounded ${badgeColor[reportData.status]}`}
            >
              {reportData.status}
            </span>
          </p>
        </div>

        <div className="mb-4">
          <p>
            <span className="font-semibold">Reported By:</span>{" "}
            {reportData.reported_by}
          </p>
          {reportData?.phone_number && (
            <>
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
          <p className="mb-3">
            <span className="font-semibold">Actions Taken:</span>{" "}
            {reportData.actions_taken}
          </p>
          <p>
            <span className="font-semibold">Date Resolved:</span>{" "}
            {new Date(reportData.date_resolved).toLocaleString()}
          </p>
        </div>

        {reportData.case_photo && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold ">Case Photo</h3>
            <img
              src={reportData.case_photo}
              alt="Case Photo"
              className="w-full h-60 object-cover rounded-lg mt-2"
            />
          </div>
        )}

        <p className="text-sm text-yellow-500 mt-6">
          Reported on: {new Date(reportData.date_reported).toLocaleString()}
        </p>

        <div className="mt-6">
          <h3 className="text-xl font-semibold ">Message</h3>
          <p className="">{reportData.message}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold ">Case URL</h3>
          <a
            href={reportData.case_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {reportData.title}
          </a>
        </div>
      </div>
    </section>
  );
};

export default DetailsSuccessReport;
