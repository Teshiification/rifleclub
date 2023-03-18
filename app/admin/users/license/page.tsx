import Link from "next/link";
import supabase from "../../../../lib/supabase";

async function getUsers() {
  const { data, error } = await supabase
    .from("users")
    .select()
    .order("lastname");
  if (error) return [] as user[];
  else return data as user[];
}

export default async function LicensePage() {
  const users: user[] = await getUsers();

  return (
    <div className="relative grid gap-10 p-8 md:mx-auto w-full lg:w-1/2 h-3/4 overflow-y-auto overflow-x-hidden">
      <div className="grid gap-2 bg-black bg-opacity-20 p-6">
      <h1 className="font-bold justify-self-center">
        Aktive Mitglieder mit Waffenlizenz:
      </h1>
      <div className="flex flex-row flex-wrap gap-2 justify-around">
        {users.filter(user => user.license && user.active).map((user) => {
          return (
            <Link
              href={`/admin/users/${user.id}`}
              className="grid gap-2 cursor-pointer rounded bg-orange-500 text-white h-24 w-48 align-middle p-2">
              <p className="text-xs text-gray-200 overflow-x-hidden">
                ID: {user.id}
              </p>
              <div className="flex justify-center gap-2 overflow-hidden rounded bg-black bg-opacity-10">
                <p>{user.name[0]}.</p>
                <p>{user.lastname}</p>
              </div>
            </Link>
          );
        })}
      </div>
      </div>

      <div className="grid gap-2 bg-black bg-opacity-20 p-6">
      <h1 className="font-bold justify-self-center">
        Aktive Mitglieder ohne Waffenlizenz:
      </h1>
      <div className="flex flex-row flex-wrap gap-2 justify-around">
      {users.filter(user => !user.license && user.active).map((user) => {
          return (
            <Link
              href={`/admin/users/${user.id}`}
              className="grid gap-2 cursor-pointer rounded bg-orange-500 text-white h-24 w-48 align-middle p-2">
              <p className="text-xs text-gray-200 overflow-x-hidden">
                ID: {user.id}
              </p>
              <div className="flex justify-center gap-2 overflow-hidden rounded bg-black bg-opacity-10">
                <p>{user.name[0]}.</p>
                <p>{user.lastname}</p>
              </div>
            </Link>
          );
        })}
      </div>
      </div>

      <div className="grid gap-2 bg-black bg-opacity-20 p-6">
      <h1 className="font-bold justify-self-center">
        Inaktive Mitglieder mit Waffenlizenz:
      </h1>
      <div className="flex flex-row flex-wrap gap-2 justify-around">
      {users.filter(user => user.license && !user.active).map((user) => {
          return (
            <Link
              href={`/admin/users/${user.id}`}
              className="grid gap-2 cursor-pointer rounded bg-orange-500 text-white h-24 w-48 align-middle p-2">
              <p className="text-xs text-gray-200 overflow-x-hidden">
                ID: {user.id}
              </p>
              <div className="flex justify-center gap-2 overflow-hidden rounded bg-black bg-opacity-10">
                <p>{user.name[0]}.</p>
                <p>{user.lastname}</p>
              </div>
            </Link>
          );
        })}
      </div>
      </div>

    </div>
  );
}
