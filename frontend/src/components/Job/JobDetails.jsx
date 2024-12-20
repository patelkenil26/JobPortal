import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { Badge } from "./ui/badge";
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`https://jobportal-66ws.onrender.com/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);

    // Calculate the difference in milliseconds
    const diffInMs = now - past;

    // Convert milliseconds to days, hours, minutes
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    // Determine time ago format
    if (diffInDays >= 1) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInHours >= 1) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInMinutes >= 1) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
    }
  }

  return (
    <section className="jobDetail page bg-gray-50 py-10">
      <div className="container max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold border-b pb-5 mb-8 text-gray-700">
          Job Description
        </h1>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-gray-900">Role:</h1>
            <span className="text-lg text-gray-600">{job?.title}</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-gray-900">Location:</h1>
            <span className="text-lg text-gray-600">{job?.location}</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-gray-900">
              Description:
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {job?.description}
            </p>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-gray-900">
              Requirement:
            </h1>
            <span className="text-lg text-gray-600">{job?.requirement}</span>
          </div>

          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Job Type:</h1>
            <Badge className="text-blue-700 font-bold text-lg bg-blue-100 py-2 px-4 rounded-md">
              {job?.jobType}
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">
              No of Positions:
            </h1>
            <Badge className="text-green-700 font-bold text-lg bg-green-100 py-2 px-4 rounded-md">
              {job?.noOfPositions} Positions
            </Badge>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-gray-900">
              Experience required:
            </h1>
            <span className="text-lg text-gray-600">
              {job?.experienceLevel} yrs
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Salary:</h1>
            <Badge className="text-purple-700 font-bold text-lg bg-purple-100 py-2 px-4 rounded-md">
              {job?.salaryFrom}-{job?.salaryTo} LPA
            </Badge>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-gray-900">
              Posted Date:
            </h1>
            <span className="text-lg text-gray-600">{job?.jobPostedOn}</span>
          </div>

          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <div className="mt-8">
              <Link
                to={`/application/${job._id}`}
                className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-md shadow hover:bg-blue-700"
              >
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
