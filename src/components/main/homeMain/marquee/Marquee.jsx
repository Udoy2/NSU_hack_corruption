import React from "react";
import Marquee from "react-fast-marquee";

const Marquees = () => {
  let images = [
    "marquee1",
    "marquee2",
    "marquee3",
    "marquee4",
    "marquee5",
    "marquee6",
  ];

  // console.log(images)

  return (
    <>
      <Marquee
        gradient={true}
        gradientColor={[240, 248, 255]} // Light bluish gradient for a soft effect
        speed={60}
        pauseOnHover={true}
        className="mt-8"
      >
        <div className=" playfair flex items-center justify-center px-8 md:px-16 lg:px-24">
          <p className="text-base overflow-hidden md:text-lg lg:text-xl font-semibold text-[#EAEAEA] leading-relaxed  px-6 py-3 rounded-lg shadow-md border border-[#8080807c]">
            🛑{" "}
            <span className="text-[#D32F2F] font-bold">Report Corruption:</span>{" "}
            If you witness corruption, report it to the
            <span className="font-bold"> Anti-Corruption Commission (ACC)</span>
            , law enforcement, or relevant authorities. Collect evidence, stay
            anonymous if needed, and ensure your safety. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✅{" "}
            <span className="text-[#388E3C] font-bold">
              Ways to Reduce Corruption:
            </span>{" "}
            Promote <span className="font-bold">transparency</span>, encourage{" "}
            <span className="font-bold">whistleblowing</span>, support
            <span className="font-bold"> strict laws & enforcement</span>, and
            practice <span className="font-bold">ethical leadership</span>.
            Together, we can build a corruption-free society!
          </p>
        </div>
      </Marquee>
    </>
  );
};

export default Marquees;
