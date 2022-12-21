import Link from "next/link";
import PocketBase from "pocketbase";

// export const dynamic = 'auto',
//   dynamicParams = true,
//   revalidate = 0,
//   fetchCache = 'auto',
//   runtime = 'nodejs',
//   preferredRegion = 'auto'

async function getUsers() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/members/records?page=1&perPage=30",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.items as any[];
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="grid grid-rows gap-10 justify-center">
      <div className="grid grid-rows w-screen pl-10 pr-10">
        {users?.map((user,key) => {
          return (
            <div key={key}>
              <Link
                href={`/users/${user.id}`}
                className="grid grid-cols-4  w-full h-10 bg-gray-400 hover:bg-gray-200 gap-4 text-black rounded p-2"
              >
                <p>{user.id}</p>
                <p>{user.name}</p>
                <p>{user.created}</p>
              </Link>
            </div>
          );
        })}
      </div>

      {/*<CreateNote />*/}
    </div>
  );
}
