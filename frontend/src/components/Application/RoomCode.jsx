import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomCode = () => {
  const [value, setValue] = useState("");

  const navigateTo = useNavigate(); 
  const handleJoinRoom = () => {
    navigateTo(`/room/${value}`);
  };
  return (
    <>
      <section className="mainsection">
        {/* <HeroSection /> */}
        <div className="roomcodediv1">
          <h1 className="roomcodeh1">Join Meeting</h1>
          <div className="roomcodediv2">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="RoomID"
              className="roomcodeinput"
            />
            <button onClick={handleJoinRoom} className="roomcodebutton" /*disabled={!value}*/ >
              Join Meeting
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default RoomCode;