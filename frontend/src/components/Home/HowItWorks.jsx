import { FaUserPlus } from 'react-icons/fa';
import { MdFindInPage } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';
import { SiGooglemeet } from 'react-icons/si';

const howItWorksData = [
  {
    id: 1,
    icon: <FaUserPlus />,
    title: "Create Account",
    description:
      "Sign up to create your profile and start exploring job opportunities or post job listings for your company.",
  },
  {
    id: 2,
    icon: <MdFindInPage />,
    title: "Find a Job/Post a Job",
    description:
      "Browse job listings or post a job to find the right talent for your company.",
  },
  {
    id: 3,
    icon: <IoMdSend />,
    title: "Apply For Jobs/Recruit Candidates",
    description:
      "Apply for jobs that match your skills or recruit candidates with just a few clicks.",
  },
  {
    id: 4,
    icon: <SiGooglemeet />,
    title: "Take Interviews",
    description:
      "Schedule and conduct interviews with potential candidates through the platform.",
  },
];

const HowItWorks = () => {
  return (
    <div className="howitworks bg-gradient-to-r from-blue-100 to-pink-100 py-16">
      <div className="container mx-auto text-center">
        <h3 className="text-4xl font-bold text-gray-900 mb-12">
          How <span className="text-blue-600">JobZee</span> Works
        </h3>

        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          {howItWorksData.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transform transition duration-300 hover:scale-105"
            >
              <div className="icon text-blue-600 text-5xl mb-4 ml-28">{item.icon}</div>
              <h4 className="text-2xl font-bold mb-2 text-gray-800">
                {item.title}
              </h4>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
