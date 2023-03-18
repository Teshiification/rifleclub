import React from "react";
import UserTable from "../../../components/widgets/UserTable";
import supabase from "../../../lib/supabase";

async function getUsers() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .order("active", { ascending: false })
      .order("lastname")
      .order("name")

    if (!data || error) {
      throw error;
    }

    return data as user[];
  } catch {
    return [] as user[];
  }
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="grid grid-rows p-10 h-screen w-full">
      <UserTable users={users} />
    </div>
  );
}
