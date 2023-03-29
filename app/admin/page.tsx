import React from "react";
import {
  DashboardItemLicense,
  DashboardItemNewUser,
  DashboardItemUserlist,
} from "../../components/core/DashboardItem";
import ActiveUsersCard from "../../components/widgets/ActiveUsersCard";
import ActiveUsersDepartmentsCard from "../../components/widgets/ActiveUsersDepartmentsCard";
import BirthdayCard from "../../components/widgets/BirthdayCard";
import supabase from "../../lib/supabase";

async function getUsers() {
  try {
    const { data, error } = await supabase.from("users").select();

    if (!data || error) {
      throw error;
    }

    return data as user[];
  } catch {
    return [] as user[];
  }
}

async function getBirthdaysOfMonth(monthindex: number) {
  try {
    const { data, error } = await supabase.rpc("getbirthday", {
      monthindex,
    });

    if (!data || error) {
      throw error;
    }

    return data as user[];
  } catch {
    return [] as user[];
  }
}

async function getDepartments() {
  try {
    const { data, error } = await supabase.from("users_departments").select();

    if (!data || error) {
      throw error;
    }

    return data as [];
  } catch {
    return [];
  }
}

async function DashboardPage() {
  const users: user[] = await getUsers();

  const departmentusers: users_departments[] = await getDepartments();
  const todaysMonth: number = new Date().getMonth() + 1;
  const lastMonth: number = todaysMonth - 1 === 0 ? 12 : todaysMonth - 1;
  const nextMonth: number = todaysMonth + 1 === 13 ? 1 : todaysMonth + 1;

  return (
    <section className="flex md:grid grid-rows gap-4 mx-auto top-0 pl-10 pr-10 pb-10">
      <div className="md:flex grid mt-20 gap-4 items-center md:items-end mx-auto">
        <ActiveUsersCard users={await getUsers()} className="w-80 h-32" />
        <div id="birthdaycards" className="flex items-end">
          <BirthdayCard
            users={await getBirthdaysOfMonth(lastMonth)}
            monthIndex={lastMonth}
            className="w-60 h-32 rounded-r-[0px]"
          />
          <BirthdayCard
            users={await getBirthdaysOfMonth(todaysMonth)}
            monthIndex={todaysMonth}
            className="w-80 h-40 rounded-b-[0px]"
            showIcon
            title="Geburtstage im"
          />
          <BirthdayCard
            users={await getBirthdaysOfMonth(nextMonth)}
            monthIndex={nextMonth}
            className="w-60 h-32 rounded-l-[0px]"
          />
        </div>
        <ActiveUsersDepartmentsCard
          departmentusers={departmentusers}
          className="w-80 h-32"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-4 mx-auto">
        <DashboardItemNewUser />
        <DashboardItemUserlist />
        <DashboardItemLicense />
      </div>
    </section>
  );
}

export default DashboardPage;
