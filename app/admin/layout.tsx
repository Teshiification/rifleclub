/* eslint-disable @next/next/no-head-element */
import NavLink from "../navlink";
import "../output.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="grid grid-rows w-screen h-screen overflow-hidden bg-body z-20">
        <header>
          <nav className="flex justify-around w-full mt-2 h-20 z-20">
            <div className="grid grid-rows cursor-default justify-center">
              <h1 className="text-2xl font-semibold text-primary">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex gap-10">
              <NavLink
                href="/admin"
                className="hover:scale-[105%] transition-transform ease-in-out text-highlight hover:text-primary mt-2 cursor-pointer">
                Startseite
              </NavLink>
            </div>
            <NavLink
              href="/"
              className="hover:scale-[105%] transition-transform ease-in-out h-10 text-white bg-primary rounded-[10px] hover:bg-opacity-80 mt-2 justify-self-end uppercase p-2 shadow-3xl cursor-pointer">
              Logout
            </NavLink>
          </nav>
        </header>
        <div className=" h-screen">{children}</div>
      </body>
    </html>
  );
}
