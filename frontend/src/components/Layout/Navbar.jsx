import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // Logout ApiCall
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://jobportal-cqtd.onrender.com/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav
      className={`bg-gray-900 text-white ${isAuthorized ? "block" : "hidden"}`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 ">
          <img
            src="/JobZee-logos__white.png"
            alt="JobZee Logo"
            className="h-20 w-20 "
          />
        </div>

        {/* Menu Links */}
        <ul
          className={`md:flex items-center space-x-8 text-lg ${
            show ? "block" : "hidden"
          } md:block`}
        >
          <li>
            <Link
              to="/"
              onClick={() => setShow(false)}
              className="hover:text-blue-400 transition-colors"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/job/getall"
              onClick={() => setShow(false)}
              className="hover:text-blue-400 transition-colors"
            >
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link
              to="/applications/me"
              onClick={() => setShow(false)}
              className="hover:text-blue-400 transition-colors"
            >
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li>
                <Link
                  to="/job/post"
                  onClick={() => setShow(false)}
                  className="hover:text-blue-400 transition-colors"
                >
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link
                  to="/job/me"
                  onClick={() => setShow(false)}
                  className="hover:text-blue-400 transition-colors"
                >
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          )}
          {/* Logout Button */}
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              LOGOUT
            </button>
          </li>
        </ul>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <GiHamburgerMenu
            className="text-3xl cursor-pointer"
            onClick={() => setShow(!show)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
