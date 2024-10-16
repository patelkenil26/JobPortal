import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Vadodara, Gujarat",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Vadodara, Gujarat",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 vadodara, Gujarat",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];
  return (
    <div className="companies py-16 bg-gray-50">
    <div className="container mx-auto">
      <h3 className="text-3xl font-bold text-center mb-12">Top Companies</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {companies.map((company) => (
          <div className="card p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="content flex items-center gap-4 mb-4">
              <div className="icon text-5xl text-blue-600">{company.icon}</div>
              <div className="text">
                <p className="font-bold text-lg">{company.title}</p>
                <p className="text-gray-500">{company.location}</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Open Positions {company.openPositions}</button>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default PopularCompanies;