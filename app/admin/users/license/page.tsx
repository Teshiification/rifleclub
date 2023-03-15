import Link from "next/link";
import supabase from "../../../../lib/supabase";

async function getUsersWithLicence() {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("license", true)
    .order("lastname");
  if (error) return [] as user[];
  else return data as user[];
}

export default async function LicensePage() {
  const users: user[] = await getUsersWithLicence();
  return (
    <div className="grid gap-4 p-4 md:mx-auto w-full lg:w-1/2 h-full overflow-y-auto overflow-x-hidden">
      <h1 className="font-bold justify-self-center">
        Mitglieder mit Waffenlizenz:
      </h1>
      <div className="flex flex-row flex-wrap gap-2 justify-center">
        {users.map((user) => {
          return (
            <Link
              href={`/users/${user.id}`}
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
  );
}
