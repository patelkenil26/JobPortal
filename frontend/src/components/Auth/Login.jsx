import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill, RiEyeLine, RiEyeOffLine } from "react-icons/ri"; // Import icons for eye
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For showing/hiding password

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://jobportal-cqtd.onrender.com/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center p-6 bg-white shadow-lg rounded-lg">
          {/* Left Section - Login Form */}
          <div className="w-full lg:w-1/2 p-6">
            <div className="text-center mb-6">
              <img
                src="/JobZeelogo.png"
                alt="logo"
                className="mx-auto w-24 mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800">
                Login to your account
              </h3>
            </div>
            <form className="space-y-6">
              {/* Role Select */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Login As
                </label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Role</option>
                    <option value="Employer">Employer</option>
                    <option value="Job Seeker">Job Seeker</option>
                  </select>
                </div>
                <FaRegUser className="absolute top-3 right-3 text-gray-500" />
              </div>

              {/* Email Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <MdOutlineMailOutline className="absolute top-3 right-3 text-gray-500" />
              </div>

              {/* Password Input with Show/Hide */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} // Toggle password visibility
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  {/* Button to toggle password visibility */}
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-3 right-3 text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
                <RiLock2Fill className="absolute top-3 right-3 text-gray-500" />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>

              {/* Register Link */}
              <div className="text-center">
                <Link to="/register" className="text-blue-600 hover:underline">
                  Register Now
                </Link>
              </div>
            </form>
          </div>

          {/* Right Section - Banner */}
          <div className="hidden lg:block lg:w-1/2 p-6">
            <img src="/login.png" alt="login" className="w-full h-auto" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
