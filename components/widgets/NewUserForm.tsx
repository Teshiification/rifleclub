"use client";
import React, { FC, useState } from "react";
import { supabase } from "../../lib/supabase";

const NewUserForm: FC<any> = () => {
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");

  const [departments, setDepartments] = useState<departments[]>();
  const [userDepartments, setUserDepartments] = useState<departments[]>();

  //Adress information
  const [postal, setPostal] = useState<number>( 0);
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [streetAdditionals, setStreetAdditionals] = useState<string>("");
  const [streetNumber, setStreetNumber] = useState<number>(0);

  function DepartmentIsChecked(department:departments){
    if(userDepartments===undefined) return false;
    let returner = false;
    userDepartments?.map((item:departments)=>{
      if(item.id == department?.id) {returner= true;}
    })
    return returner;
  }
  
  function DepartmentID(name:string){
    if(departments===undefined) return false;
    let returner = 0;
    departments?.map((department:departments)=>{
      if(department.name == name) {returner= department.id ;}
    })
    return returner;
  }

  const submit = async (event: any) => {
    try {
      console.log(event);
      event.preventDefault();
      console.log(`Saving: ${name} ${lastname}`);
      const { data, error } = await supabase
        .from("users")
        .insert({ name, lastname, birthday, postal, city,street,street_ad:streetAdditionals, street_nr:streetNumber })
        .select()
        .single();
      if (error) throw error;

      alert("User erfolgreich angelegt");
    } catch (error) {
      alert("Fehler bei Erstellung des Users");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto w-1/2 md:w-screen justify-center bg-white bg-opacity-10 grid grid-rows gap-4 rounded-[15px] p-2">
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

      <div id="adressContainer" className="grid gap-4 w-full">
        <h2>Adresse</h2>
        <div className="flex gap-10 text-xl font-semibold justify-between">
          <h3 className="text-primary">Straße: </h3>
          <input
            type={"text"}
            value={street}
            onChange={(item) => setStreet(item.target.value)}
          />
          <h3 className="text-primary">Nummer: </h3>
          <input
          className="w-12"
            type={"number"}
            value={streetNumber}
            onChange={(item) => setStreetNumber(Number(item.target.value))}
            />
          <h3 className="text-primary">Adresszusatz: </h3>
          <input
          className="w-12"
            type={"text"}
            value={streetAdditionals}
            onChange={(item) => setStreetAdditionals(item.target.value)}
            />
            </div>
            <div className="flex gap-10 text-xl font-semibold justify-start">
            <h3 className="text-primary">PLZ: </h3>
          <input
            type={"number"}
            value={postal}
            onChange={(item) => setPostal(Number(item.target.value))}
          />
          <h3 className="text-primary">Ort: </h3>
          <input
          type={"text"}
            value={city}
            onChange={(item) => setCity(item.target.value)}
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
