"use client";
import React, { useState, useEffect } from "react";
import supabase from "../../lib/supabase";
import Dropdown from "../core/dropdowns/dropdown";

async function GetDepartments() {
  try {
    const { data, error } = await supabase.from("departments").select();
    if (!data || error) throw error;

    return data as department[];
  } catch (exception) {
    return [] as department[];
  }
}

const DepartmentsDropDown = () => {
  const [departments, setDepartments] = useState<department[] | undefined>();
  const [namelist, setNamelist] = useState([""]);

  useEffect(() => {
    const fetchdata = async () => {
      const result = await GetDepartments();
      setDepartments(result);
    };
    fetchdata();
  }, []);

  useEffect(() => {
    setNamelist([""]);
    departments?.map((department) => namelist.push(department.name));
  }, [departments]);

  return (
    <>
      <Dropdown items={namelist} />
    </>
  );
};

export default DepartmentsDropDown;
