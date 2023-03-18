import React from "react";
import "../output.css";
import NavLink from "../navlink";

const wrapperVariants = {
  initial: {
    clipPath: "polygon(0 0, 0 0, 0 20%, 0% 50%)",
    transition: {},
  },
  animate: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: { duration: 1, staggerChildren: 0.1 },
  },
  exit: {
    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    transition: { duration: 0.4 },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="h-screen w-screen overflow-hidden select-none">
        <header>
          <nav className="relative flex justify-around w-full m-8 place-items-center z-20">
            <div className="grid grid-rows cursor-default self-star w-full">
              <h1 className="text-2xl font-semibold text-primary">
                {process.env.COMPANY_NAME}
              </h1>
              <p className="text-primary opacity-[60%]">
                {process.env.COMPANY_SLOGAN}
              </p>
            </div>
           
          </nav>
        </header>
        {children}
        <NavLink
                href="/admin/"
                className="absolute z-20 bottom-10 right-10 hover:scale-[105%] transition-transform ease-in-out h-10 text-white bg-primary rounded-[10px] hover:bg-opacity-80 mt-2 uppercase p-2 shadow-3xl cursor-pointer">
                Admin
              </NavLink>
      </body>
    </html>
  );
}

export const revalidate = 0;
