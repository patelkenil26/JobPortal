import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {

            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1 className="text-center font-bold">My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4 className="text-center font-bold">
                No Applications Found
              </h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1 className="text-center font-bold">
            Applications From Job Seekers
          </h1>
          {applications.length <= 0 ? (
            <>
              <h4 className="text-center font-bold">No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  const interviewHandler = () => {
    navigateTo("/interview");
  };
  return (
    <>
      {/* Job Seeker Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex flex-col space-y-4">
          {/* Basic Info */}
          <div>
            <p className="text-xl font-semibold">
              <span className="font-bold text-gray-800">Name:</span>{" "}
              {element.name}
            </p>
            <p className="text-xl font-semibold">
              <span className="font-bold text-gray-800">Email:</span>{" "}
              {element.email}
            </p>
          </div>

          {/* LinkedIn Link */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800">
              LinkedIn Link:
            </span>
            <a
              href={element.linkedInLink}
              className="text-blue-500 hover:text-blue-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                LinkedIn
              </span>
            </a>
          </div>

          {/* Skills */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800">Skills:</span>
            {element.skillsYouHave && element.skillsYouHave.length > 0 ? (
              element.skillsYouHave.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  {skill.trim()}
                </span>
              ))
            ) : (
              <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                No skills available
              </span>
            )}
          </div>

          {/* CGPA */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800">CGPA:</span>
            <span className="text-xl font-medium text-gray-600">
              {element.currentCGPA}
            </span>
          </div>

          {/* Cover Letter */}
          <div>
            <span className="text-xl font-bold text-gray-800">
              Cover Letter:
            </span>
            <p className="text-lg text-gray-600">{element.coverLetter}</p>
          </div>

          {/* Project Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Project Section
            </h3>
            <p className="text-xl font-semibold">
              <span className="font-bold text-gray-800">Project Title:</span>{" "}
              {element.projectTitle}
            </p>

            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xl font-bold text-gray-800">
                Project Link:
              </span>
              <a
                href={element.projectLink}
                className="text-indigo-500 hover:text-indigo-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  View Project
                </span>
              </a>
            </div>

            {/* Project Skills */}
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xl font-bold text-gray-800">
                Technology Used:
              </span>
              {element.projectSkills && element.projectSkills.length > 0 ? (
                element.projectSkills.split(",").map((skill, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                  >
                    {skill.trim()}
                  </span>
                ))
              ) : (
                <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  No technologies available
                </span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-6">
            <img
              src={element.resume.url}
              alt="resume"
              className="cursor-pointer rounded-md border border-gray-200 hover:shadow-lg transition-shadow"
              onClick={() => openModal(element.resume.url)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => deleteApplication(element._id)}
              className="bg-red-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-red-600 transition-colors"
            >
              Delete Application
            </button>
            <Link to={`/room/${element._id}`}>
              <button
                className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
                onClick={interviewHandler}
              >
                Take Interview
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  const interviewHandler = () => {
    navigateTo("/interview");
  };
  return (
    <>
    <div className="flex flex-col justify-center items-center">

      {/* Employer Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-2/3">
        <div className="flex justify-around">
          <div className="flex flex-col space-y-4">
            {/* Name and Email */}
            <div>
              <p className="text-xl font-semibold">
                <span className="font-bold text-gray-800">Name:</span>{" "}
                {element.name}
              </p>
              <p className="text-xl font-semibold">
                <span className="font-bold text-gray-800">Email:</span>{" "}
                {element.email}
              </p>
            </div>

            {/* LinkedIn Link */}
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-800">
                LinkedIn Link:
              </span>
              <a
                href={element.linkedInLink}
                className="text-blue-500 hover:text-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  LinkedIn
                </span>
              </a>
            </div>

            {/* Skills Section */}
            <div>
              <p className="text-xl font-bold text-gray-800">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {element.skillsYouHave && element.skillsYouHave.length > 0 ? (
                  element.skillsYouHave.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {skill.trim()}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-600">No skills listed</span>
                )}
              </div>
            </div>

            {/* CGPA */}
            <div>
              <p className="text-xl font-bold text-gray-800">
                CGPA:
                <span className="text-gray-700 font-medium">
                  {" "}
                  {element.currentCGPA || "N/A"}
                </span>
              </p>
            </div>

            {/* Project Link */}
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-800">
                Project Link:
              </span>
              <a
                href={element.projectLink}
                className="text-indigo-500 hover:text-indigo-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  View Project
                </span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
              <Link to={`/schedule/${element._id}`}>
                <button
                  className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
                  onClick={interviewHandler}
                >
                  Schedule Meeting
                </button>
              </Link>
              <Link to={`/room/${element._id}`}>
                <button
                  className="bg-green-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-green-600 transition-colors"
                  onClick={interviewHandler}
                >
                  Take Interview
                </button>
              </Link>
            </div>
          </div>
          {/* Resume */}
          <div className="">
            <p className="text-xl font-bold text-gray-800">Resume:</p>
            <img
              src={element.resume?.url}
              alt="Resume"
              className=" h-60 w-48 object-cover rounded-lg shadow-sm cursor-pointer"
              onClick={() => openModal(element.resume.url)}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
