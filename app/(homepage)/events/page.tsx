import React from "react";

export default function EventsPage() {

    return (
        <div className="grid grid-rows font-sora w-full h-full overflow-hidden bg-body">

            <div className="relative flex place-content-center w-screen h-screen z-20">
                Krasses event hier !
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
