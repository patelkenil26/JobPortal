import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className="myJobs page bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Your Posted Jobs</h1>
          {myJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myJobs.map((element) => (
                <div className="card bg-white shadow-md rounded-lg p-6" key={element._id}>
                  <div className="content">
                    <div className="short_fields space-y-4">
                      <div className="shadow-lg p-4 border-l-4 border-blue-500 rounded">
                        {/* Company Name and Website */}
                        <div>
                          <span className="block font-semibold text-gray-700">Company Name:</span>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
                            disabled={editingMode !== element._id}
                            value={element.companyName}
                            onChange={(e) => handleInputChange(element._id, "companyName", e.target.value)}
                          />
                        </div>
                        <div>
                          <span className="block font-semibold text-gray-700">Company Website:</span>
                          <a href={element.companyWebsite} target="_blank" className="underline text-blue-600">
                            <input
                              type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
                              disabled={editingMode !== element._id}
                              value={element.companyWebsite}
                              onChange={(e) => handleInputChange(element._id, "companyWebsite", e.target.value)}
                            />
                          </a>
                        </div>
                        {/* Company Description and Location */}
                        <div className="mt-4">
                          <span className="block font-semibold text-gray-700">Company Description:</span>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
                            disabled={editingMode !== element._id}
                            value={element.companyDescription}
                            onChange={(e) => handleInputChange(element._id, "companyDescription", e.target.value)}
                          />
                        </div>
                        <div>
                          <span className="block font-semibold text-gray-700">Company Location:</span>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
                            disabled={editingMode !== element._id}
                            value={element.companyLocation}
                            onChange={(e) => handleInputChange(element._id, "companyLocation", e.target.value)}
                          />
                        </div>
                      </div>
                      {/* Job Details */}
                      <div>
                        <span className="block font-semibold text-gray-700">Title:</span>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
                          disabled={editingMode !== element._id}
                          value={element.title}
                          onChange={(e) => handleInputChange(element._id, "title", e.target.value)}
                        />
                      </div>
                      <div>
                        <span className="block font-semibold text-gray-700">No Of Positions:</span>
                        <input
                          type="number"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
                          disabled={editingMode !== element._id}
                          value={element.noOfPositions}
                          onChange={(e) => handleInputChange(element._id, "noOfPosition", e.target.value)}
                        />
                      </div>
                      <div>
                        <span className="block font-semibold text-gray-700">Experience Level:</span>
                        <input
                          type="number"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
                          disabled={editingMode !== element._id}
                          value={element.experienceLevel}
                          onChange={(e) => handleInputChange(element._id, "experienceLevel", e.target.value)}
                        />
                      </div>
                      <div>
                        <span className="block font-semibold text-gray-700">Requirement:</span>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
                          disabled={editingMode !== element._id}
                          value={element.requirement}
                          onChange={(e) => handleInputChange(element._id, "requirement", e.target.value)}
                        />
                      </div>
                      <div>
                        <span className="block font-semibold text-gray-700">Salary:</span>
                        <div className="flex space-x-4">
                          <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
                            disabled={editingMode !== element._id}
                            value={element.salaryFrom}
                            onChange={(e) => handleInputChange(element._id, "salaryFrom", e.target.value)}
                          />
                          <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
                            disabled={editingMode !== element._id}
                            value={element.salaryTo}
                            onChange={(e) => handleInputChange(element._id, "salaryTo", e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <span className="block font-semibold text-gray-700">Expired:</span>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
                            value={element.expired}
                          onChange={(e) => handleInputChange(element._id, "expired", e.target.value)}
                          disabled={editingMode !== element._id}
                        >
                          <option value={true}>TRUE</option>
                          <option value={false}>FALSE</option>
                        </select>
                      </div>
                    </div>
                    {/* Long Fields */}
                    <div className="long_field mt-4 space-y-4">
                      <div>
                        <span className="block font-semibold text-gray-700">Description:</span>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
                          disabled={editingMode !== element._id}
                          value={element.description}
                          onChange={(e) => handleInputChange(element._id, "description", e.target.value)}
                        />
                      </div>
                      <div>
                        <span className="block font-semibold text-gray-700">Location:</span>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 focus:ring-blue-500"
                          disabled={editingMode !== element._id}
                          value={element.location}
                          onChange={(e) => handleInputChange(element._id, "location", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="button_wrapper mt-4 flex justify-between items-center">
                    {editingMode === element._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => handleDisableEdit()}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(element._id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteJob(element._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg font-semibold text-gray-700">
              You've not posted any job or may be you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
  
};

export default MyJobs;
