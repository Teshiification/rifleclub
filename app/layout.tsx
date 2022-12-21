/* eslint-disable @next/next/no-head-element */
import Link from "next/link";
import "./output.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="grid grid-rows w-screen h-screen overflow-hidden bg-body z-20">
        <nav className="flex justify-around w-full mt-2 h-20 z-20">
          <div className="text-xl font-semibold text-primary cursor-default">
            Danny Sinicco
          </div>
          <div className="flex gap-10">
            <Link
              href="/"
              className="text-black dark:text-gray-200 hover:text-primary mt-2 cursor-pointer"
            >
              Home
            </Link>
            <Link
              href="/aboutme"
              className="text-black dark:text-gray-200 hover:text-primary mt-2 cursor-pointer"
            >
              About me
            </Link>
          </div>
          <Link
            href="/contact"
            className="h-10 text-white bg-primary rounded-[10px] hover:bg-opacity-80 mt-2 justify-self-end uppercase p-2 shadow-3xl cursor-pointer"
          >
            Let's Talk
          </Link>
        </nav>
        <div className="h-screen w-screen pb-10 z-20 text-black dark:text-gray-200 p-40">
          {children}
        </div>
        <div className="absolute bg-body dark:bg-black overflow-hidden w-screen h-screen z-0 top-0 left-0">
          <video width="100%" loop autoPlay muted className="opacity-[10%]">
            <source src="video.mp4" type="video/mp4" />
            Sorry, your browser doesn't support videos.
          </video>
        </div>
      </body>
    </html>
  );
}
