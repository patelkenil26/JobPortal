import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { FcBusinessContact } from "react-icons/fc";
import { Badge } from "../Job/ui/badge";

const LatestJobCards = (element) => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  // console.log(jobs);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })

        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  // calculate day in form of how many day ago.........(2 day ago...3 day ago...etc)
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
    <section className="jobs1 page py-16 bg-white">
  <div className="container mx-auto">
    <h1 className="text-3xl font-bold text-center mb-8">Top Available Jobs</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      { jobs.jobs && jobs.jobs.slice(0, 3).map((job) => (
        <div className="card p-6 bg-gray-50 rounded-lg shadow-lg border border-gray-100" key={job._id}>
          <div className="flex items-center gap-4 mb-4">
            <FcBusinessContact className="text-5xl" />
            <div>
              <h2 className="font-semibold text-xl">{job.companyName}</h2>
              <p className="text-gray-500">{job.companyLocation}</p>
            </div>
          </div>
          <h3 className="font-bold text-2xl mb-2">{job.title}</h3>
          <p className="text-gray-700 mb-4">{job.requirement}</p>
          <div className="flex items-center gap-2 mb-4">
            <Badge className="text-blue-600">Positions: {job.noOfPositions}</Badge>
            <Badge className="bg-blue-100 text-blue-600">Job Type: {job.jobType}</Badge>
            <Badge className="bg-green-100 text-green-600">Salary: {job.salaryFrom}-{job.salaryTo} LPA</Badge>
          </div>
          <div className="flex justify-end mt-4">

          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Apply Now</button>
          </div>
        </div>
      ))}
    </div>
    <div className="text-center mt-8">
      <Link to={"job/getall"} className="text-blue-600 font-semibold">View All Jobs</Link>
    </div>
  </div>
</section>

  );
};

export default LatestJobCards;
