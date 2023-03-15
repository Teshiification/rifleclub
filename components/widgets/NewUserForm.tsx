"use client";
import React, { FC, useState } from "react";
import { supabase } from "../../lib/supabase";

const NewUserForm: FC<any> = () => {
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");

  const submit = async (event: any) => {
    try {
      console.log(event);
      event.preventDefault();
      console.log(`Saving: ${name} ${lastname}`);
      const { data, error } = await supabase
        .from("users")
        .insert({ name, lastname, birthday })
        .select()
        .single();
      if (error) throw error;

      setName(data.name);
      setLastname(data.lastname);
      setBirthday(new Date(data.birthday).toISOString().split("T")[0]);

      alert("User erfolgreich angelegt");
    } catch (error) {
      alert("Fehler bei Erstellung des Users");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white bg-opacity-10 grid grid-rows gap-4 rounded-[15px] p-2">
      <h1 className="flex text-gray-500 justify-between">
        <div>Neues Mitglied</div>
      </h1>
      <div className="grid gap-4">
        <div className="flex gap-10 h-10 text-xl font-semibold">
          <h3 className="text-primary">Name: </h3>
          <input
            required
            type={"text"}
            value={name}
            onChange={(item) => setName(item.target.value)}
          />
          <h3 className="text-primary">Nachname: </h3>
          <input
            required
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
      <button type={"submit"} className="bg-green-800 h-10 rounded items-end">
        Neues Mitglied anlegen
      </button>
    </form>
  );
};

export default NewUserForm;
