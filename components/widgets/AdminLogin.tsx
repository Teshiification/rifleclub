"use client"
import isServer, { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function AdminLogin() {
  const [isExecuting, setExecuting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isExecuting && (CheckAuthentification(username, password)))
      setIsAuthenticated(true);
    else {
      setIsAuthenticated(false);
      setExecuting(false);
    }
  }, [isExecuting]);

  useEffect(() => {
    if (!isServer && isAuthenticated) {
      // let router = useRouter();
      //router.push("/admin");
    }
  }, [isAuthenticated]);

  return (
    <div className="mt-40 bg-white bg-opacity-10 rounded-[10px] h-1/2 w-1/2 p-2">
      <h1 className="font-semibold text-center text-6xl">Admin Login</h1>

      <form className="grid grid-rows content-around p-10 h-full">
        <input
          disabled={isExecuting}
          type={"text"}
          placeholder={"userId"}
          className={
            "h-20 text-xl rounded-[10px] pl-2 bg-opacity-20 bg-body border-2 border-white"
          }
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <input
          disabled={isExecuting}
          type={"password"}
          placeholder={"password"}
          className={
            "h-20 text-xl rounded-[10px] pl-2 bg-opacity-20 bg-body border-2 border-white"
          }
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <button
          disabled={isExecuting}
          type={"submit"}
          onClick={() => {
            setExecuting(true);
          }}
          className={
            isExecuting
              ? "animate-pulse bg-secondary font-semibold text-xl h-20 bg-opacity-80 rounded-[10px] cursor-wait"
              : "hover:scale-[101%] transition-transform ease-in-out font-semibold text-xl h-20 bg-primary bg-opacity-20 hover:bg-opacity-40 rounded-[10px]"
          }>
          Login
          {isAuthenticated ? (
            <svg
              className="animate-spin"
              version="1.1"
              id="L9"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              height="50"
              width="50"
              enable-background="new 0 0 0 0">
              <path
                fill="#fff"
                d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
            </svg>
          ) : <></>}
        </button>
      </form>

    </div>
  );
}

function CheckAuthentification(username: string, password: string) {
  if (username.trimEnd() === '' && password.trimEnd() === '')
    return false;

  //do some authentification things
  return true;
}