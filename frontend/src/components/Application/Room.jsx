import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
  const { id } = useParams();

  let myMeeting = async (element) => {
    const appID = 336976230;
    const serverSecret = "07e435b736a6f04e1ff0c44d91e2f1b9+";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      id,
      Date.now().toString(),
      `${id}`
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url: `https://job-portal-flax-sigma.vercel.app/room/${id}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  return <div className="myRoom" ref={myMeeting}></div>;
};

export default Room;
