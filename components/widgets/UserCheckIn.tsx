"use client";
import React from "react";
import { useState, useEffect } from "react";
import supabase from "../../lib/supabase";

async function createCheckIn(userid: string) {
  try {
    console.log(`try: ${userid} login`);
    const { data, error } = await supabase
      .from("checkin")
      .insert([{ user_id: userid }]);
    if (error) console.dir(error);

    return true;
  } catch {
    alert("Failed to login");
    return false;
  }
}

export default function UserCheckin() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (!isSubmitting) return;

    (async () => {
      setMessage("");

      if (await createCheckIn(userId)) setIsSuccess(true);
      else
        setMessage(
          "Fehler beim einchecken. Bitte achten Sie auf die korrekte Eingabe Ihrer User Id."
        );

      setIsSubmitting(false);
    })();
  }, [isSubmitting]);

  useEffect(() => {
    if (!isSuccess) return;

    setUserId("");
    alert("Erfolgreich eingecheckt");
  }, [isSuccess]);

  const submit = async (event: any) => {
    console.log(event);
    event.preventDefault();
    const { data, error } = await supabase
      .from("users")
      .update({ userId })
      .eq("id", userId)
      .select()
      .single();
    if (error) console.dir(error);
  };

  return (
    <div className="mt-40 grid grid-rows w-1/2 h-1/2 gap-2 bg-white bg-opacity-10 rounded-[10px] p-10">
      <h1 className="font-semibold text-center text-6xl ">Willkommen</h1>
      <form
        onSubmit={submit}
        className="grid grid-rows content-around p-10 h-full">
        <input
          required
          id="inputfield"
          disabled={isSubmitting}
          type={"text"}
          placeholder={"userId"}
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          className={
            "h-20 text-xl rounded-[10px] pl-2 bg-opacity-20 bg-body border-2 border-white"
          }
        />
        {message ? (
          <label className="h-4 text-red-600">{message}</label>
        ) : (
          <></>
        )}
        <button
          disabled={isSubmitting}
          type={"submit"}
          onClick={() => setIsSubmitting(true)}
          className={
            isSubmitting
              ? "flex gap-4 justify-center place-content-center animate-pulse bg-secondary font-semibold text-xl h-20 bg-opacity-80 rounded-[10px] cursor-wait"
              : "hover:scale-[101%] transition-transform ease-in-out font-semibold text-xl h-20 bg-primary bg-opacity-20 hover:bg-opacity-40 rounded-[10px]"
          }>
          Check In
          {isSubmitting ? (
            <svg
              className="animate-spin"
              version="1.1"
              id="L9"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enable-background="new 0 0 0 0">
              <path
                fill="#fff"
                d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
            </svg>
          ) : (
            <></>
          )}
        </button>
      </form>
    </div>
  );
}
