import React from "react";
import UserCheckin from "../../components/widgets/UserCheckIn";

export default function homePage() {

  return (
    <div className="grid grid-rows font-sora w-full h-full overflow-hidden bg-body z-20 ">

      <div className="relative flex place-content-center w-screen h-screen z-20">
        <UserCheckin />
      </div>
      <div className="absolute blur bg-body dark:bg-black overflow-hidden w-screen h-screen z-0 top-0 left-0">
        <video loop autoPlay muted className="opacity-[20%]">
          <source src="forest.mp4" type="video/mp4" />
          Sorry, your browser doesn't support videos.
        </video>
      </div>
    </div>
  );
}
