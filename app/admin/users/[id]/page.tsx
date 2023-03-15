import React from "react";
import UserForm from "../../../../components/widgets/UserForm";
import supabase from "../../../../lib/supabase";

export default async function User({ params }: any) {
  const user: user = await getUser(params.id);
  if (user) return <UserForm user={user} />;
  else return <>not found</>;
}

async function getUser(id: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
    if (!data || error) throw error;

    return data;
  } catch (exception) {
    return null;
  }
}
