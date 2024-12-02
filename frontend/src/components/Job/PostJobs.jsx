import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostJob = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  // const [comapanyLogo, setCompanyLogo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [requirement, setRequirement] = useState("");
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [noOfPositions, setNoOfPositions] = useState("");

  const { isAuthorized, user } = useContext(Context);

  

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    console.log("Before PostsJob Component rendering");
    await axios
      .post(
        "http://localhost:4000/api/v1/job/post",
        fixedSalary.length >= 4
          ? {
              companyName,
              companyDescription,
              companyLocation,
              companyWebsite,
              // comapanyLogo,
              title,
              description,
              location,
              fixedSalary,
              requirement,
              jobType,
              experienceLevel,
              noOfPositions,
            }
          : {
              companyName,
              companyDescription,
              companyLocation,
              companyWebsite,
              // comapanyLogo,
              title,
              description,
              location,
              salaryFrom,
              salaryTo,
              requirement,
              jobType,
              experienceLevel,
              noOfPositions,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        console.log("After PostsJob Component rendering", res);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateToAllJobs = useNavigate()
  const handleToNavigateAllJobs = () =>{
    navigateToAllJobs("/job/getall")
  }

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container flex flex-col justify-center">
          <h3 className="ml-[780px] mb-5 font-semibold">Company Details</h3>
          <form
            onSubmit={handleJobPost}
            className="ml-96 max-w-6xl border-2 border-gray-300 p-10 shadow-md"
          >
            {/* companyName */}
            <div className="mb-5">
              <label
                htmlFor=""
                className=" block mb-2 text-sm font-medium text-gray-900 "
              >
                {" "}
                Company Name
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company Name"
              />
            </div>
            {/* companyDescription */}
            <div className="wrapper mb-5">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900  "
              >
                Company Description{" "}
              </label>
              <input
                type="text"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                placeholder="Company Description"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
            </div>
            {/* companyLocation */}
            <div className="wrapper mb-5">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900  "
              >
                Company Location
              </label>
              <input
                type="text"
                value={companyLocation}
                onChange={(e) => setCompanyLocation(e.target.value)}
                placeholder="Company Location"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 0 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
            </div>
            {/* companyWebsite */}
            <div className="wrapper mb-5">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900  "
              >
                Company Website
              </label>
              <input
                type="text"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                placeholder="Company Website"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
            </div>
            {/* company Logo
              <div className="wrapper">
                <input
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  value={comapanyLogo}
                  onChange={handleFileChange}
                  placeholder="Company Logo"
                />
              </div> */}
          </form>
          <h3 className="ml-[800px] mb-5 mt-6 font-semibold">Job Details</h3>
          <form onSubmit={handleJobPost} className="ml-96 max-w-6xl border-2 border-gray-300 p-10 shadow-md">
            <div className="wrapper mb-5">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                {" "}
                Job Title
              </label>
              <input
              className="shadow-md bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  block w-full p-2.5   "
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Location
              </label>
              <input
              className="shadow-md bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  block w-full p-2.5 "
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
              />
            </div>

            <div className="salary_wrapper mb-5">
              <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900">Select Salary type</label>
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
                className="shadow-md bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  block w-full p-2.5"
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              <div>
                {salaryType === "default" ? (
                  <p></p>
                ) : salaryType === "Fixed Salary" ? (
                  <input
                  className="shadow-md bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  block w-full p-2.5 "
                    type="number"
                    placeholder="Enter Fixed Salary"
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                  />
                ) : (
                  <div className="ranged_salary">
                    <input
                    className="shadow-md bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  block w-full p-2.5 "
                      type="number"
                      placeholder="Salary From"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                    />
                    <input
                    className="shadow-md bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  block w-full p-2.5 "
                      type="number"
                      placeholder="Salary To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Requirement */}
            <div className="mb-5">
              <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900">Requirement</label>
              <input
              className="shadow-md bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  block w-full p-2.5 "
                type="text"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="job Requirement"
              />
            </div>
            {/* jobType */}

            <div className="mb-5">
              <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900">Job Type</label>
              <input
              className="shadow-md bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  block w-full p-2.5 "
                type="text"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                placeholder="Part Time, Full Time, Internship,"
              />
            </div>
            {/* experienceLevel */}

            <div className="mb-5">
              <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900">Experience Level</label>
              <input
              className="shadow-md bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  block w-full p-2.5 "
                type="number"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                placeholder="0,1,2..year"
              />
            </div>
            {/* noOfPositions */}
            <div className="mb-5">
              <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900">No Of Positions</label>
              <input
              className="shadow-md bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  block w-full p-2.5 "
                type="number"
                value={noOfPositions}
                onChange={(e) => setNoOfPositions(e.target.value)}
                placeholder="No Of Positions"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
              <textarea
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Job Description"
                className="shadow-md bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg  block w-full p-2.5 "
              />
            </div>
            <button type="submit">Create Job</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;
