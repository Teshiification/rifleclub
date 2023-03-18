"use client";
import React, { FC, useEffect } from "react";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { PeopleIcon } from "../svg/peopleIcon";

const UserForm: FC<any> = ({ user }: { user: user }) => {

  //User information
  const [name, setName] = useState<string>(user.name);
  const [lastname, setLastname] = useState<string>(user.lastname);
  const [birthday, setBirthday] = useState<Date>(
    new Date(user.birthday)
  );

  //Adress information
  const [zip, setZIP] = useState<number | null>(user.zip || null);
  const [cityName, setCityName] = useState<string | null>(
    user.cityName || null
  );
  const [adress, setAdress] = useState<string>(user.adress || "");
  const [adressAdditionals, setAdressAdditionals] = useState<string>(
    user.adressAdditionals || ""
  );

  const [license, setLicense] = useState<boolean>(user.license || false);

  const [departments, setDepartments] = useState<departments[]>();
  const [userDepartments, setUserDepartments] = useState<departments[]>();

  const [checkins, setCheckins] = useState<monthcheckins[]>([]);
  const [checkinsYear, setCheckinsYear] = useState<any>(0);

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

  const setDepartmentsToDB = async (event: any) => {
    const department_id = DepartmentID(event.value)
    let user_id = user.id;
    try {
    if(event.checked){
      await supabase.from("users_departments").insert({"user_id":user_id, "department_id":department_id})
    } 
    else {
      await supabase.from("users_departments").delete().match({user_id, department_id})
    }
    } catch (exception) {
      console.log("error");
    }
  }

  const submit = async (event: any) => {
    user.name = name;
    user.lastname = lastname;
    user.birthday = birthday;

    event.preventDefault();
    const { data, error } = await supabase
      .from("users")
      .update(user)
      .eq("id", user.id)
      .select()
      .single();
    if (error) {
      console.dir(error);
      return;
    }

    setName(data.name);
    setLastname(data.lastname);
    setBirthday(new Date(data.birthday));
  };

  useEffect(() => {
    async function getDepartments() {
      try {
        const { data, error } = await supabase.from("departments").select();
        if (!data || error) throw error;
        setDepartments(data);
      } catch (exception) {
        console.log("error");
      }
    }
    async function getUserDepartments() {
      try {
        const { data, error } = await supabase.from("departments").select('*, users_departments!inner(*)').eq("users_departments.user_id", user.id);
        if (!data || error) throw error;
        setUserDepartments(data);        
      } catch (exception) {
        console.log(exception);
      }
    }
    async function getCheckins() {
      let userid = user.id
      let monthIndex = new Date().getMonth(); // 0-11
      let monthIndexTo = monthIndex+1 == 12 ? 0 : monthIndex+1;
      let yearid = new Date().getFullYear();
      let monthList: monthcheckins[]=[];

      for(let i = 0; i<=monthIndex;i++)
      {
        let monthcheckin:monthcheckins;

        let monthid = i+1;
        try {
          const { data, error } = await supabase.rpc("checkinsofusermonth", {
            userid,
            monthid,
            yearid,
          });
          if (!data || error) {
            throw error;
          }
          monthcheckin = {month:i,year:yearid,amount:Number(data)}
          monthList.push(monthcheckin);
        } catch (error){
          monthList.push({month:i,year:yearid,amount:0});
        }
      }
yearid--;
      for(let i = 11; i>=monthIndexTo; i--)
      {
        let monthcheckin:monthcheckins;

        let monthid = i+1;
        try {
          const { data, error } = await supabase.rpc("checkinsofusermonth", {
            userid,
            monthid,
            yearid,
          });
          if (!data || error) {
            throw error;
          }
          monthcheckin = {month:i,year:yearid,amount:Number(data)}
          monthList.push(monthcheckin);
        } catch (error){
          monthList.push({month:i,year:yearid,amount:0});
        }
      }
      
      setCheckins(monthList);

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

    getDepartments();
    getUserDepartments();
    getCheckinsYear();
    getCheckins();
  }, [setDepartmentsToDB]);

  useEffect(()=>{
    const submitLicense = async () => {
      try{
        const {data,error} = await supabase.from("users").update({"license":license}).match({"id":user.id}).single();
      
      if (!data || error) {
        throw error;
      }
    } catch (error){
      console.log(error);
    }
    }
      submitLicense();
    },[license])

  return (
    <div className="grid gap-10">
      <form
        onSubmit={submit}
        className="mx-auto w-1/2 md:w-screen justify-center bg-white bg-opacity-10 grid grid-rows gap-4 rounded-[15px] p-2">
        <h1 className="flex text-gray-500 justify-between">
          <p id="id">ID: {user.id}</p>
          <PeopleIcon width={40} height={40} />
          <p id="created">Created: {new Date(user.created_at).toUTCString()}</p>
        </h1>

        <div id="personalInfoContainer" className="grid gap-4">
          <div className="flex gap-10 text-xl font-semibold justify-between">
            <h3 className="text-primary">Name: </h3>
            <input
            className="p-1 rounded"
              type={"text"}
              value={name}
              onChange={(item) => setName(item.target.value)}
            />
            <h3 className="text-primary">Nachname: </h3>
            <input
            className="p-1 rounded"
              type={"text"}
              value={lastname}
              onChange={(item) => setLastname(item.target.value)}
            />
          </div>
          <div className="flex gap-10 text-xl font-semibold ">
            <h3 className="text-primary">Geburtstag: </h3>
            <input
              className="p-1 rounded cursor-pointer"
              type={"date"}
              value={birthday.toISOString().split("T")[0]}
              onChange={(item) => setBirthday(new Date(item.target.value))}
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

<button
          type={"submit"}
          className="bg-green-800 rounded cursor-pointer hover:bg-green-600">
          Speichern
        </button>

        <div className="mt-10 grid gap-4 w-full">
          <h2 className="text-xl font-semibold">Abteilung/en</h2>
          <div className="flex gap-2">
            <form className="flex gap-2 justiy-between w-full" onSubmit={(e)=>{console.log(e.target)}}>
            {departments?.map((item:departments, key) => {
              return (
                <div className="flex gap-2 justify-between bg-black bg-opacity-20 rounded p-1">
                  <input className={`w-4 cursor-pointer ${DepartmentIsChecked(item)?'bg-green-500':'bg-gray-200'}`} id={item.name} type="checkbox" value={item.name} defaultChecked={DepartmentIsChecked(item)} onChange={(event)=>{setDepartmentsToDB(event.target)}}/>
                  <p className="w-24 text-left">{item.name}</p>
                  <p>{`${item.price}€`}</p>
                  </div>
                  );
                })}
                </form>
          </div>
        </div>

        <h2 className="text-xl font-semibold">Info</h2>

      <div className="flex w-full justify-around mx-auto p-6 bg-black bg-opacity-20 items-center rounded select-none">
       {license ? 
       <div className="grid gap-2 w-48 h-24 rounded bg-orange-500 text-white text-center pl-4 pr-4 items-center">
        <p className="text-xl font-semibold">{`Lizenziert ${'\u2713'}`}</p>
        <div className="text-red-500 bg-white hover:bg-opacity-80 rounded cursor-pointer" onClick={()=>{setLicense(false)}}>Entnehmen</div>
        </div>
        :<div className="grid gap-2 w-48 h-24 rounded bg-orange-500 text-white text-center pl-4 pr-4 items-center">
        <p className="text-xl font-semibold">{`Lizenziert ${'\u166D'}`}</p>
        <div className="text-green-500 bg-white hover:bg-opacity-80 rounded cursor-pointer" onClick={()=>{setLicense(false)}}>Vergeben</div>
        </div>
        }
        <div className="grid gap-2 w-48 h-24 rounded bg-green-500 text-white text-center pl-4 pr-4 place-items-center select-none">
          <p>Kosten pro Monat:</p>
        {  
          <p className="font-semibold text-xl bg-black bg-opacity-20 rounded-full w-12 h-12 p-2">{ userDepartments!==undefined ? (userDepartments.length>=2?"20€":userDepartments.length==1&&`${userDepartments[0].price}€`):`0€`}</p>
        }
         </div>

      </div>

        

      </form>
      <div className="flex gap-2 self-center justify-center text-center">
        {checkins.map((item)=>{
          let month = new Date();
          month.setMonth(item.month);
         return <div className="grid"><p>{`${item.amount}`}</p><p>{`${month.toLocaleString('default', { month: 'long' })}`}</p><p>{item.year}</p></div>
        })}
        <div className="grid bg-black bg-opacity-10 p-2 border-2 border-white rounded"><p>18x im Jahr: </p><p>{checkinsYear>=18?"OK":"NEIN"}</p></div>
        </div>
    </div>
    
  );
};



export default UserForm;
