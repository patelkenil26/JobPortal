import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { MdAddBusiness } from "react-icons/md";

import { Badge } from "./ui/badge";

const Jobs = (element) => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  // console.log(jobs);

  useEffect(() => {
    try {
      axios
        .get("https://jobportal-66ws.onrender.com/api/v1/job/getall", {
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

    const diffInMs = now - past;

    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

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
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div
                  className="card p-5 rounded-md shadow-xl bg-white border border-gray-100"
                  key={element._id}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {timeAgo(element.jobPostedOn)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 my-2">
                    <span className="left" variant="outline" size="icon">
                      <MdAddBusiness className="w-12 h-12" />
                    </span>
                    <div>
                      <h1 className="font-medium text-lg">
                        {element.companyName}
                      </h1>
                      <p className="text-sm text-gray-500">
                        {element.companyLocation}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h1 className="font-bold text-2xl my-2">{element.title}</h1>
                    <p className="text-sm text-gray-600">
                      {element?.requirement}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <Badge
                      className={"text-blue-700 font-bold p-2"}
                      variant="ghost"
                    >
                      {element?.noOfPositions} Positions
                    </Badge>
                    <Badge
                      className={"text-[#F83002] font-bold p-2"}
                      variant="ghost"
                    >
                      {element?.jobType}
                    </Badge>
                    <Badge
                      className={"text-[#7209b7] font-bold p-2"}
                      variant="ghost"
                    >
                      {element?.salaryFrom}-{element.salaryTo}LPA
                    </Badge>
                  </div>

                  <button className="flex items-center gap-4 mt-4">
                    <Link
                      to={`/job/${element._id}`}
                      className="font-bold"
                      variant="outline"
                    >
                      Job Details
                    </Link>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
