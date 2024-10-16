import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By CodeWithKenil.</div>
      <div>
        <Link to={"https://www.facebook.com/kenil.patel.5667901"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://www.youtube.com/@kenilpatel6460"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"https://www.linkedin.com/in/kenilpatel26"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/_kenil_26/"} target="_blank">
        <FaInstagram />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;