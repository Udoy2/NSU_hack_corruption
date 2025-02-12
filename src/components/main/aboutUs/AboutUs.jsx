import React, { useState } from "react";

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <section className="mx-4 sm:mx-20 screen">
      <div className="flex flex-col md: justify-start items-start gap-6 mb-10">
        <h2 className="text-4xl mb-8 mt-20 playfair font-bold text-start text-[#329980] ">
          Impact of Corruption and Ways to Fight it
        </h2>
        <img
          src="https://img.freepik.com/free-photo/hands-passing-money-table-corruption-bribery_53876-139611.jpg?t=st=1739221750~exp=1739225350~hmac=53ba27449c0fccfd2c6cdb388a497f35d26fb89cac6eb50022bae841121c4219&w=1380"
          alt="corruption"
          className="mb-5 lg:h-[600px] md:h-[500px] h-[300px] w-full"
        />

        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Impact of Corruption Section */}
            <div className="bg-[#24303F] text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-center mb-4 text-[#FEF9E1]">
                Impact of Corruption
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl text-[#f87171]">🚨</span>
                  <p className="text-md">
                    <span className="font-bold text-[#e3e1da]">
                      Weakens Trust:
                    </span>{" "}
                    When people see officials engaging in corrupt activities,
                    they lose faith in the system.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl text-[#facc15]">⚠️</span>
                  <p className="text-md">
                    <span className="font-bold text-[#e3e1da]">
                      Hinders Development:
                    </span>{" "}
                    Public resources are misused, slowing down economic and
                    infrastructure growth.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl text-[#38bdf8]">🔴</span>
                  <p className="text-md">
                    <span className="font-bold text-[#e3e1da]">
                      Increases Poverty & Inequality:
                    </span>{" "}
                    Corruption diverts funds from healthcare & education, making
                    life harder for the poor.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl text-[#f43f5e]">❌</span>
                  <p className="text-md">
                    <span className="font-bold text-[#e3e1da]">
                      Encourages Crime & Unfair Practices:
                    </span>{" "}
                    It allows criminals to escape justice and creates an unfair
                    playing field for businesses and individuals.
                  </p>
                </div>
              </div>
            </div>

            {/* How to Fight Corruption Section */}
            <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-center mb-4 text-[#FEF9E1]">
                How to Fight Corruption
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl text-[#34d399]">✅</span>
                  <p className="text-md">
                    <span className="font-bold text-[#e3e1da]">
                      Transparency & Accountability:
                    </span>{" "}
                    Promote open governance and hold officials accountable.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl text-[#fbbf24]">🗳️</span>
                  <p className="text-md">
                    <span className="font-bold text-[#e3e1da]">
                      Strong Legal Actions:
                    </span>{" "}
                    Implement strict laws and ensure legal consequences for
                    corrupt individuals.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl text-[#3b82f6]">📢</span>
                  <p className="text-md">
                    <span className="font-bold text-[#e3e1da]">
                      Encourage Whistleblowers:
                    </span>{" "}
                    Protect those who expose corruption and encourage reporting
                    of illegal activities.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl text-[#ef4444]">📚</span>
                  <p className="text-md">
                    <span className="font-bold text-[#e3e1da]">
                      Educate & Raise Awareness:
                    </span>{" "}
                    Spread awareness about corruption and its impact on society.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-4xl mb-1 mt-20 playfair font-bold text-start text-[#329980]">The Work We Do</h2>
      <h2 className="text-md font-light mb-8 text-[#D69667]  ">
        Innovative Solutions to Combat Corruption
      </h2>

      <div>
        <p className="font-light mb-3 text-[15px] text-[#e3e1da] sm:text-lg">
          A Simple Way to Report Corruption Corruption is a major challenge in
          Bangladesh, affecting everyday lives and trust in institutions. Many
          citizens hesitate to report corruption due to fear, lack of knowledge,
          or uncertainty about whether their reports will lead to action.
        </p>

        <p className="font-light mb-3 text-[15px] text-[#e3e1da] sm:text-lg">
          At Hack-Corruption, we are building a secure, anonymous, and
          transparent web platform that empowers people to report corruption
          safely. Our system allows users to submit reports with evidence, track
          their case status, and contribute to a public dashboard displaying
          trends in corruption. Verified reports will be sent directly to
          government authorities for action.
        </p>

        <p className="font-light mb-3 text-[15px] text-[#e3e1da] sm:text-lg">
          Our goal is to increase transparency, empower citizens, and hold
          institutions accountable through technology. With AI-powered
          verification, user-friendly tracking, and government collaboration, we
          strive to create a fairer Bangladesh where corruption is tackled
          effectively. Join us in making a difference—report corruption, stay
          informed, and drive change.
        </p>
      </div>

      {/* f&q */}

      <div className=" mx-auto p-6 mb-32">
        <h2 className="text-4xl mb-8 mt-20 playfair font-bold text-start text-[#329980]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {/* FAQ 1 */}
          <div className="border-b border-gray-700 pb-4">
            <button
              onClick={() => toggleAnswer(0)}
              className="w-full flex items-center text-left text-lg font-semibold text-[#FEF9E1] focus:outline-none"
            >
              <span className="mr-2">{activeIndex === 0 ? "▼" : "▶"}</span>
              What is corruption, and why is it a problem?
            </button>
            {activeIndex === 0 && (
              <p className="mt-2 text-[#e3e1da] font-light">
                Corruption is the misuse of power for personal gain, often
                through bribery, fraud, and dishonesty. It leads to inequality,
                weakens trust in institutions, and delays development,
                ultimately harming society's progress.
              </p>
            )}
          </div>

          {/* FAQ 2 */}
          <div className="border-b border-gray-700 pb-4">
            <button
              onClick={() => toggleAnswer(1)}
              className="w-full flex items-center text-left text-lg font-semibold text-[#FEF9E1] focus:outline-none"
            >
              <span className="mr-2">{activeIndex === 1 ? "▼" : "▶"}</span>
              How does your project address corruption?
            </button>
            {activeIndex === 1 && (
              <p className="mt-2 text-[#e3e1da] font-light">
                Our project uses transparent tracking, AI-based analysis, and
                digital verification to prevent fraudulent activities. It
                ensures accountability in public services and makes corruption
                harder to hide by using cutting-edge technology to track and
                report suspicious activities.
              </p>
            )}
          </div>

          {/* FAQ 3 */}
          <div className="border-b border-gray-700 pb-4">
            <button
              onClick={() => toggleAnswer(2)}
              className="w-full flex items-center text-left text-lg font-semibold text-[#FEF9E1] focus:outline-none"
            >
              <span className="mr-2">{activeIndex === 2 ? "▼" : "▶"}</span>
              How does the platform ensure transparency?
            </button>
            {activeIndex === 2 && (
              <p className="mt-2 text-[#e3e1da] font-light">
                By utilizing real-time data tracking, our platform allows users
                to monitor transactions, applications, and public resources.
                Every action is digitally recorded, ensuring that all processes
                are open to scrutiny and reducing opportunities for corruption.
              </p>
            )}
          </div>

          {/* FAQ 4 */}
          <div className="border-b border-gray-700 pb-4">
            <button
              onClick={() => toggleAnswer(3)}
              className="w-full flex items-center text-left text-lg font-semibold text-[#FEF9E1] focus:outline-none"
            >
              <span className="mr-2">{activeIndex === 3 ? "▼" : "▶"}</span>
              Can users report corruption anonymously?
            </button>
            {activeIndex === 3 && (
              <p className="mt-2 text-[#e3e1da] font-light">
                Yes! Users can anonymously report any corrupt practices they
                witness using our secure platform. This promotes a safe
                environment where whistleblowers can expose misconduct without
                fear of retaliation.
              </p>
            )}
          </div>

          {/* FAQ 5 */}
          <div className="border-b border-gray-700 pb-4">
            <button
              onClick={() => toggleAnswer(4)}
              className="w-full flex items-center text-left text-lg font-semibold text-[#FEF9E1] focus:outline-none"
            >
              <span className="mr-2">{activeIndex === 4 ? "▼" : "▶"}</span>
              How does AI help in detecting corruption?
            </button>
            {activeIndex === 4 && (
              <p className="mt-2 text-[#e3e1da] font-light">
                Our AI-powered system analyzes patterns of behavior to detect
                anomalies that may indicate corruption, such as unusual
                financial transactions or fraudulent applications. This helps
                identify issues early and ensures a faster response to prevent
                further wrongdoing.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
