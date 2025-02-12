import { useLoaderData } from "react-router-dom";

const UserProfile = () => {
  let userData = useLoaderData();
  console.log(userData);

  // const userData = {
  //     _id: "67a999667cd58f84ca440618",
  //     username: "naeem",
  //     email: "naeemmajumder00@gmail.com",
  //     photoUrl:
  //       "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg",
  //     phone: "111111111111111111111111",
  //     idType: "nid",
  //     idNumber: "1998906789",
  //     identify_method_photoUrl:
  //       "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg",
  //     role: "user",
  //     posts: [],
  //     __v: 0,
  //   }

  return (
    <section className="mx-5 sm:mx-20 lg:mx-60 my-20">
      <h2 className="text-4xl mb-8 mt-20 playfair font-bold text-start text-[#329980] ">
        User Profile
      </h2>

      <div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-7">
          <div className="bg-[#24303F] px-5 py-4 rounded-md flex flex-col justify-start  gap-5 mb-5">
            <img
              src={userData.photoUrl}
              alt=""
              className="w-20 sm:w-30 rounded-[50%]"
            />
            <div>
              <h2 className="font-bold text-md md:text-2xl text-[#7a7afe]">
                {userData.username}
              </h2>
              <p className=" text-sm md:text-md">{userData.email}</p>
              <p className=" text-sm md:text-md">{userData.role}</p>
            </div>
          </div>

          <div>
            <h1 className="text-md font-bold mb-2 md:text-xl">
              Personal Information
            </h1>

            <div className="bg-[#24303F] px-5 py-4 rounded-md w-full">
              <div className=" flex flex-col md:flex-row justify-start  ">
                <p className="font-light text-sm sm:text-lg md:w-[120px] ">
                  Username:{" "}
                </p>
                <p className="font-light text-sm mb-3 md:text-lg">
                  {userData.username}
                </p>
              </div>
              <div className=" flex flex-col md:flex-row justify-start">
                <p className="font-light  text-sm sm:text-lg md:w-[120px] ">
                  Email:{" "}
                </p>
                <p className="font-light text-sm mb-3 md:text-lg">
                  {userData.email}
                </p>
              </div>
              <div className=" flex flex-col md:flex-row justify-start">
                <p className="font-light  text-sm sm:text-lg md:w-[120px] ">
                  Contact No:{" "}
                </p>
                <p className="font-light text-sm mb-3 md:text-lg">
                  {userData.phone}
                </p>
              </div>
              <div className=" flex flex-col md:flex-row justify-start">
                <p className="font-light text-sm sm:text-lg md:w-[120px] ">
                  {" "}
                  {userData.idType} Number:{" "}
                </p>
                <p className="font-light text-sm mb-3 md:text-lg">
                  {userData.idNumber}
                </p>
              </div>
              <div className=" flex flex-col md:flex-row justify-start">
                <p className="font-light  text-sm sm:text-lg md:w-[120px] ">
                  {userData.idType} Image:{" "}
                </p>
                <img
                  src={userData.identify_method_photoUrl}
                  alt=""
                  className="w-30 md:w-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
