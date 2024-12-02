import generateUniqueId from "generate-unique-id";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const ScheduleMeeting = () => {
  const location = useLocation();

  const id1 = generateUniqueId({
    length: 2,
    useLetters: false,
  });

  const applicationId = location.pathname.split("/").at(-1);
  console.log("Application id", applicationId);
  console.log("Meeting id", id1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [jobSeekerEmail, setJobSeekerEmail] = useState("");
  const [applications, setApplications] = useState([]);

  // const [meetingId, setMeetingId] = useState("");

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  const handleScheduleMeeting = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("date", date);
    formData.append("jobSeekerEmail", jobSeekerEmail);

    formData.append("applicationId", applicationId);
    // formData.append("applicationId",applicationId)

    console.log("name", name);
    console.log("email", email);
    console.log("date", date);
    console.log("jobSeekerEmail", jobSeekerEmail);
    // console.log("meetingId",meetingId)

    try {
      console.log("Before APi calling");
      const { data } = await axios.post(
        `https://jobportal-cqtd.onrender.com/api/v1/schedule/meeting/${applicationId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("After APi calling");

      setName("");
      setEmail("");
      setDate("");
      setJobSeekerEmail("");
      // setMeetingId("");
      navigateTo("/applications/me");
      // console.log("Data massage",data.message)
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Job Seeker")) {
    navigateTo("/");
  }

  return (
    <div className="mb-[8.8rem]">
      <h1 className="text-center font-bold">Meeting Schedule</h1>
      <form
        onSubmit={handleScheduleMeeting}
        className="max-w-lg mx-auto shadow-md hover:shadow-xl p-10 m-10"
      >
        <div class="mb-5">
          <label
            htmlFor="email"
            class="block mb-2 text-sm font-medium text-gray-800"
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            class="bg-gray-100 border border-gray-600 text-black text-sm rounded-lg  block w-full p-2.5 "
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div class="mb-5">
          <label
            htmlFor="email"
            class="block mb-2 text-sm font-medium text-gray-800"
          >
            Employer email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            class="bg-gray-100 border border-gray-600 text-black text-sm rounded-lg  block w-full p-2.5 "
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div class="mb-5">
          <label
            htmlFor="jobSeekerEmail"
            class="block mb-2 text-sm font-medium text-gray-800"
          >
            Job Seeker email
          </label>
          <input
            type="jobSeekerEmail"
            id="jobSeekerEmail"
            value={jobSeekerEmail}
            onChange={(e) => setJobSeekerEmail(e.target.value)}
            class="bg-gray-100 border border-gray-600 text-black text-sm rounded-lg  block w-full p-2.5 "
            placeholder="Job Seeker email"
            required
          />
        </div>

        <div class="mb-5">
          <label
            htmlFor="date"
            class="block mb-2 text-sm font-medium text-gray-800"
          >
            Date
          </label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            class="bg-gray-100 border border-gray-600 text-black text-sm rounded-lg  block w-full p-2.5 "
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div class="mb-5">
          <label
            htmlFor="applicationId"
            class="block mb-2 text-sm font-medium text-gray-800"
          >
            Meeting Id
          </label>
          <input
            type="text"
            id="applicationId"
            class="bg-gray-100 border border-gray-600 text-black text-sm rounded-lg  block w-full p-2.5 "
            required
            value={applicationId}
            // onChange={(e)=>setMeetingId(e.target.value)}
          ></input>
        </div>

        <button
          type="submit"
          className="text-white w-32 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ScheduleMeeting;
