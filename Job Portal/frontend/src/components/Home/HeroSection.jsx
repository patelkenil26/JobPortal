import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection bg-gradient-to-r from-blue-400 to-indigo-600 text-white py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="title max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find a job that suits your interests and skills
            </h1>
            <p className="text-lg mb-6">
              Explore opportunities that align with your talents and career
              goals. Get started on your journey today.
            </p>
            <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100">
              Get Started
            </button>
          </div>
          <div className="image mt-8 md:mt-0">
            <img
              className="rounded-lg shadow-xl"
              src="/heroS1.jpg"
              alt="hero"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
