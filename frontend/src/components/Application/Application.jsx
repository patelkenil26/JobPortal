import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [linkedInLink, setLinkedInLink] = useState("");
  const [githubLink, setGitHubLink] = useState("");
  const [skillsYouHave, setSkillsYouHave] = useState("");
  const [currentCGPA, setCurrentCGPA] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectSkills, setProjectSkills] = useState("");
  const [projectLink, setProjectLink] = useState("");

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);
    formData.append("linkedInLink", linkedInLink);
    formData.append("githubLink", githubLink);
    formData.append("skillsYouHave", skillsYouHave);
    formData.append("currentCGPA", currentCGPA);
    formData.append("projectTitle", projectTitle);
    formData.append("projectDescription", projectDescription);
    formData.append("projectSkills", projectSkills);
    formData.append("projectLink", projectLink);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      setLinkedInLink("");
      setGitHubLink("");
      setSkillsYouHave("");
      setCurrentCGPA("");
      setProjectTitle("");
      setProjectDescription("");
      setProjectSkills("");
      setProjectLink("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication} className="ml-96 max-w-full border-2 border-gray-300 p-10 shadow-md">
          <label
            htmlFor=""
            className="flex select-none items-center -mb-3 pl-1 text-gray-800 text-2xl sm:text-md "
          >
            Name
          </label>
          <input
            className="block flex-1 border-0 bg-transparent   bg-gray-300 rounded-md text-gray-900 placeholder:text-gray-600 placeholder:pl-3 focus:ring-0 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label
            htmlFor=""
            className="flex select-none items-center -mb-3 pl-1 text-gray-800 text-2xl sm:text-md "
          >
            Email
          </label>

          <input
            className="block flex-1 border-0 bg-transparent   bg-gray-300 rounded-md text-gray-900 placeholder:text-gray-600 placeholder:pl-3 focus:ring-0 sm:text-sm sm:leading-6"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label
            htmlFor=""
            className="flex select-none items-center -mb-3 pl-1 text-gray-800 text-2xl sm:text-md "
          >
            Phone Number
          </label>

          <input
            className="block flex-1 border-0 bg-transparent   bg-gray-300 rounded-md text-gray-900 placeholder:text-gray-600 placeholder:pl-3 focus:ring-0 sm:text-sm sm:leading-6"
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label
            htmlFor=""
            className="flex select-none items-center -mb-3 pl-1 text-gray-800 text-2xl sm:text-md "
          >
            Address
          </label>

          <input
            className="block flex-1 border-0 bg-transparent   bg-gray-300 rounded-md text-gray-900 placeholder:text-gray-600 placeholder:pl-3 focus:ring-0 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* LinkedIn Link */}
          <label
              htmlFor=""
              className="flex select-none  items-center -mb-3 pl-1 text-gray-800 text-2xl sm:text-md"
            >
              LinkedIn Link
            </label>
            <input
              className="block flex-1 border-0  bg-transparent w-[44rem]  bg-gray-300 rounded-lg text-gray-900 placeholder:text-gray-600 placeholder:pl-3 focus:ring-0 sm:text-sm sm:leading-6"
              type="text"
              placeholder="Enter Your LinkedIn Link"
              value={linkedInLink}
              onChange={(e) => setLinkedInLink(e.target.value)}
            />

             {/* Github Link */}
          <div>
            <label
              htmlFor=""
              className="flex select-none items-center mb-3 pl-1 text-gray-800 text-2xl sm:text-md"
            >
              GitHub Link
            </label>
            <input
              className="block flex-1 border-0 w-[44rem]  bg-transparent   bg-gray-300 rounded-md text-gray-900 placeholder:text-gray-600 placeholder:pl-3 focus:ring-0 sm:text-sm sm:leading-6"
              type="text"
              placeholder="Enter Your Github Link"
              value={githubLink}
              onChange={(e) => setGitHubLink(e.target.value)}
            />
          </div>
          {/* Skills You Have */}
          <div>
            <label
              htmlFor=""
              className="flex select-none items-center mb-3 pl-1 text-gray-800 text-2xl sm:text-md"
            >
              Skilla You Have
            </label>
            <input
              className="block flex-1 border-0 w-[44rem] bg-transparent   bg-gray-300 rounded-md text-gray-900 placeholder:text-gray-600 placeholder:pl-3 focus:ring-0 sm:text-sm sm:leading-6"
              type="text"
              placeholder="Enter Your Skilla Link"
              value={skillsYouHave}
              onChange={(e) => setSkillsYouHave(e.target.value)}
            />
          </div>
          {/* Current CGPA*/}
          <div>
            <label
              htmlFor=""
              className="flex select-none items-center mb-3 pl-1 text-gray-800 text-2xl sm:text-md"
            >
              Current CGPA
            </label>
            <input
              className="block flex-1 border-0 w-[44rem] bg-transparent   bg-gray-300 rounded-md text-gray-900 placeholder:text-gray-600 placeholder:pl-3 focus:ring-0 sm:text-sm sm:leading-6"
              type="text"
              placeholder="Enter Your CGPA Link"
              value={currentCGPA}
              onChange={(e) => setCurrentCGPA(e.target.value)}
            />
          </div>
          {/* Project Title */}
          <div>
            <label
              htmlFor=""
              className="flex select-none items-center mb-3 pl-1 text-gray-800 text-2xl sm:text-md"
            >
              Project Title
            </label>
            <input
              className="block flex-1 border-0 w-[44rem] bg-transparent   bg-gray-300 rounded-md text-gray-900 placeholder:text-gray-600 placeholder:pl-3 focus:ring-0 sm:text-sm sm:leading-6"
              type="text"
              placeholder="Enter Your Project Title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
          </div>
          {/* Project Description */}
          <div>
            <label
              htmlFor=""
              className="flex select-none items-center mb-3 pl-1 text-gray-800 text-2xl sm:text-md"
            >
              Project Description
            </label>
            <input
              className="block flex-1 border-0 w-[44rem] bg-transparent  bg-gray-300 rounded-md text-gray-900 placeholder:text-gray-600 placeholder:pl-3 focus:ring-0 sm:text-sm sm:leading-6"
              type="text"
              placeholder="Enter Your Project Description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>
          {/* project Skills */}
          <div>
            <label
              htmlFor=""
              className="flex select-none items-center mb-3 pl-1 text-gray-800 text-2xl sm:text-md"
            >
              project Skills
            </label>
            <input
              className="block flex-1 border-0 w-[44rem] bg-transparent   bg-gray-300 rounded-md text-gray-900 placeholder:text-gray-600 placeholder:pl-3 focus:ring-0 sm:text-sm sm:leading-6"
              type="text"
              placeholder="Enter Your project skills"
              value={projectSkills}
              onChange={(e) => setProjectSkills(e.target.value)}
            />
          </div>
          {/* project Link */}
          <div className="">
            <label
              htmlFor=""
              className="flex select-none items-center mb-3 pl-1 text-gray-800 text-2xl sm:text-md"
            >
              Project Link
            </label>
            <input
              className="block flex-1 border-0 w-[44rem] bg-transparent   bg-gray-300 rounded-md text-gray-900 placeholder:text-gray-600 placeholder:pl-3 focus:ring-0 sm:text-sm sm:leading-6"
              type="text"
              placeholder="Enter Your project Link"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
            />
          </div>

          <label
            htmlFor=""
            className="flex select-none items-center -mb-3 pl-1 text-gray-800 text-2xl sm:text-md "
          >
            CovverLatter
          </label>

          <textarea
            className="block flex-1 border-0 bg-transparent   bg-gray-300 rounded-md text-gray-900 placeholder:text-gray-600 placeholder:pl-3 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="CoverLetter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          {/* Select Resume */}
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Resume
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-300 dark:text-gray-400 focus:outline-none dark:placeholder-gray-400"
              type="file"
              accept=".pdf, .jpg, .png, .jpeg"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
          </div>
          
         
          <button type="submit">Send Application</button>
        </form>
      </div>
    </section>
  );
};

export default Application;
