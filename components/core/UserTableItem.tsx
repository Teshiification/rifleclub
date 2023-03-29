"use client";
import { FC, useState } from "react";
import NavLink from "../../app/navlink";
import supabase from "../../lib/supabase";
import { CalenderIcon } from "../svg/calenderIcon";
import { PowerOffIcon, PowerOnIcon } from "../svg/powerIcon";

export interface UserTableItemProps {
  user: user;
  className: string;
}
const UserTableItem: FC<any> = ({ user, className }: UserTableItemProps) => {
  const [userId, setUserId] = useState<string>(user.id);

  const checkinUser = async () => {
    try {
      console.log(`try: ${userId} login`);
      const { data, error } = await supabase
        .from("checkin")
        .insert([{ user_id: userId }]);
      if (error) throw error;
      alert("User erfolgreich eingecheckt");
    } catch {
      alert("Failed to login");
    }
  };

  const deaktivateUser = async () => {
    try {
      console.log(`try: ${userId} deaktivating`);
      const { data, error } = await supabase
        .from("users")
        .update({ active: false })
        .eq("id", userId);
      if (error) throw error;
      alert("User erfolgreich deaktiviert");
    } catch {
      alert("Fehler deaktivieren des Users");
    }
  };

  const activateUser = async () => {
    try {
      console.log(`try: ${userId} aktivate`);
      const { data, error } = await supabase
        .from("users")
        .update({ active: true })
        .eq("id", userId);
      if (error) throw error;
      alert("User erfolgreich aktiviert");
    } catch {
      alert("Fehler aktivieren des Users");
    }
  };

  return (
    <div
      title={`Gehe auf Profil von: ${user.name} ${user.lastname}`}
      className={`flex h-10 w-full justify-between text-left text-black rounded ${className}`}>
      <NavLink
        href={`/admin/users/${user.id}`}
        className="flex justify-between p-2 w-full rounded text-left">
        <p className="w-80 overflow-hidden">
          {user.name}, {user.lastname}
        </p>
        <p className="w-20">{new Date(user?.birthday).toLocaleDateString()}</p>
        <p className="w-20">
          {new Date(user?.created_at).toLocaleDateString()}
        </p>
      </NavLink>
      <div id="buttons" className="flex gap-4 w-40 justify-end">
        {user.active ? (
          <>
            <button
              title="Checkin User"
              className="bg-gray-600 w-10 h-10 rounded scale-90 hover:scale-100"
              onClick={checkinUser}>
              <CalenderIcon width={40} height={40} />
            </button>
            <button
              title="User aktiv"
              className="bg-green-800 w-10 h-10 rounded scale-90 hover:scale-100"
              onClick={deaktivateUser}>
              <PowerOnIcon width={40} height={40} />
            </button>
          </>
        ) : (
          <button
            title="User inaktiv"
            className="bg-red-800 w-10 h-10 rounded scale-90 hover:scale-100"
            onClick={activateUser}>
            <PowerOffIcon width={40} height={40} />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserTableItem;
