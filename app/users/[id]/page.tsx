import React from "react";

async function getUser(userId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/members/records/${userId}`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: any) {
  const user = await getUser(params.id);

  return User(user);
}

export function User(user: any) {
  return (
    <div className="bg-white bg-opacity-10 grid grid-rows gap-4 w-full h-full rounded-[15px] p-2">
      <h1 className="flex text-gray-500 justify-between">
        <div id="id">ID: {user.id}</div>
        <div id="created">Created: {user.created}</div>
      </h1>
      <div className="grid w-full h-full gap-4">
        <div className="flex gap-10 text-xl font-semibold">
          <h3 className="text-primary">Name: </h3>
          <div className="">{user.name}</div>
        </div>
        <div className="flex gap-10 text-xl font-semibold">
          <h3 className="text-primary">Geburtstag: </h3>
          <div className="">{user.birthday}</div>
        </div>
      </div>
    </div>
  );
}
