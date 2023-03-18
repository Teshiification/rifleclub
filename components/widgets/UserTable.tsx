"use client";
import React from "react";
import { FC, useState } from "react";
import UserTableItem from "../core/UserTableItem";

export interface UsertableProps {
  users: user[];
}

export const UserTable: FC<any> = ({ users }: UsertableProps) => {
  const [filter, setFilter] = useState<string>("");

  return (
    <section className="grid grid-rows gap-4 h-3/4 content-start">
      <form className="flex rounded gap-2 h-10 jutsify-around">
        <input
          placeholder="filter"
          className="rounded bg-opacity-[10%] bg-white p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          type="text"
        />
      </form>
      <div
        className={`flex h-10 w-full justify-between text-left text-black rounded pr-40`}>
        <div className="flex justify-between p-2 w-full rounded text-left text-white">
          <p className="w-80">Name</p>
          <p className="w-20">Geburtstag</p>
          <p className="w-20">Erstellt am</p>
        </div>
      </div>
      <div className="grid grid-rows gap-4 pr-6 scrollbar scrollbar-thumb-primary scrollbar-track-slate-700 overflow-y-auto h-full overflow-x-hidden">
        {users?.map((user: user, key: any) => {
          if (
            user.name?.toLowerCase().includes(filter) ||
            user.lastname?.toLowerCase().includes(filter) ||
            !filter
          ) {
            if (!user.active)
              return (
                <UserTableItem
                  key={key}
                  user={user}
                  className={"bg-gray-800 hover:bg-gray-600"}
                />
              );
            else if (key % 2 == 0)
              return (
                <UserTableItem
                  key={key}
                  user={user}
                  className="bg-gray-400 hover:bg-gray-100"
                />
              );
            else
              return (
                <UserTableItem
                  key={key}
                  user={user}
                  className="bg-gray-300 hover:bg-gray-50"
                />
              );
          }
        })}
      </div>
    </section>
  );
};
export default UserTable;
