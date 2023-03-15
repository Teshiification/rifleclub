"use client";
import React, { FC, useEffect } from "react";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { PeopleIcon } from "../svg/peopleIcon";

const UserForm: FC<any> = ({ user }: { user: user }) => {
  const [name, setName] = useState<string>(user.name);
  const [lastname, setLastname] = useState<string>(user.lastname);
  const [birthday, setBirthday] = useState<string>(
    new Date(user.birthday).toISOString().split("T")[0]
  );
  const [zip, setZIP] = useState<number | null>(user.zip || null);
  const [cityName, setCityName] = useState<string | null>(
    user.cityName || null
  );
  const [adress, setAdress] = useState<string>(user.adress || "");
  const [adressAdditionals, setAdressAdditionals] = useState<string>(
    user.adressAdditionals || ""
  );

  const [departments, setDepartments] = useState<department[]>();
  const [checkins, setCheckins] = useState<any>(0);
  const [checkinsYear, setCheckinsYear] = useState<any>(0);

  useEffect(() => {
    async function getDepartments() {
      try {
        const { data, error } = await supabase.rpc(
          "getUserDepartments",
          user.id
        );
        if (!data || error) throw error;
        console.log(data);
        setDepartments(data);
      } catch (exception) {
        console.log("error");
      }
    }
    async function getCheckins() {
      let userid = user.id;
      try {
        let monthid = new Date().getMonth() + 1;
        const { data, error } = await supabase.rpc("checkinsofusermonth", {
          userid,
          monthid,
        });

        if (!data || error) {
          throw error;
        }

        setCheckins(data);
      } catch {
        setCheckins(0);
      }
    }
    async function getCheckinsYear() {
      let userid = user.id;
      let fromdate = new Date(new Date().getFullYear(), 0, 1);
      let todate = new Date(new Date().getFullYear(), 11, 31);
      try {
        const { data, error } = await supabase.rpc("checkinsofuserrange", [
          { fromdate, todate, userid },
        ]);

        if (!data || error) {
          throw error;
        }

        setCheckinsYear(data);
      } catch {
        setCheckinsYear(0);
      }
    }
    getCheckinsYear();
    getCheckins();
  }, []);

  const submit = async (event: any) => {
    console.log(event);
    event.preventDefault();
    console.log(`Saving: ${name} ${lastname} ${birthday}`);
    const { data, error } = await supabase
      .from("users")
      .update({ name, lastname, birthday })
      .eq("id", user.id)
      .select()
      .single();
    if (error) {
      console.dir(error);
      return;
    }

    setName(data.name);
    setLastname(data.lastname);
    setBirthday(new Date(data.birthday).toISOString().split("T")[0]);
  };

  return (
    <div className="grid">
      <form
        onSubmit={submit}
        className="mx-auto w-1/2 md:w-screen justify-center bg-white bg-opacity-10 grid grid-rows gap-4 rounded-[15px] p-2">
        <h1 className="flex text-gray-500 justify-between">
          <p id="id">ID: {user.id}</p>
          <p id="created">Created: {new Date(user.created_at).toUTCString()}</p>
        </h1>

        <div id="personalInfoContainer" className="grid gap-4">
          <PeopleIcon width={20} height={20} />
          <div className="flex gap-10 text-xl font-semibold justify-between">
            <h3 className="text-primary">Name: </h3>
            <input
              type={"text"}
              value={name}
              onChange={(item) => setName(item.target.value)}
            />
            <h3 className="text-primary">Nachname: </h3>
            <input
              type={"text"}
              value={lastname}
              onChange={(item) => setLastname(item.target.value)}
            />
          </div>
          <div className="flex gap-10 text-xl font-semibold ">
            <h3 className="text-primary">Geburtstag: </h3>
            <input
              type={"date"}
              value={birthday}
              onChange={(item) => setBirthday(item.target.value)}
            />
          </div>
        </div>

        {/*<div id="adressContainer" className="grid gap-4 w-full">
        <h2>Adresse</h2>
        <div className="flex gap-10 text-xl font-semibold justify-between">
          <h3 className="text-primary">Straße: </h3>
          <input
            type={"text"}
            value={adress}
            onChange={(item) => setAdress(item.target.value)}
          />
          <h3 className="text-primary">Adresszusatz: </h3>
          <input
            type={"text"}
            value={adressAdditionals}
            onChange={(item) => setAdressAdditionals(item.target.value)}
            />
            </div>
            <div className="flex gap-10 text-xl font-semibold justify-between">
            <h3 className="text-primary">PLZ: </h3>
          <input
            type={"number"}
            value={zip}
            onChange={(item) => setZIP(item.target.value)}
          />
          <h3 className="text-primary">Ort: </h3>
          <input
          type={"text"}
            value={cityName}
            onChange={(item) => setCityName(item.target.value)}
          />
        </div>
      </div>*/}

        <div id="adressContainer" className="grid gap-4 w-full">
          <h2>Abteilung/en</h2>
          <div className="flex gap-10 text-xl font-semibold">
            {departments?.map((item, key) => {
              return (
                <div key={key}>
                  <input type="checkbox" id={item.name} value={item.name} />
                  <p>{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <button
          type={"submit"}
          className="bg-green-800 rounded cursor-pointer hover:bg-green-600">
          Speichern
        </button>
      </form>

      <div className="flex gap-4">
        <h1>CheckIns:</h1>
        <div className="flex gap-4">Monat: {checkins}</div>
        <div className="flex gap-4">Jahr: {checkinsYear}</div>
      </div>
    </div>
  );
};

export default UserForm;
