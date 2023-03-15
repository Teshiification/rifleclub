"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import { AddIcon } from "../svg/addIcon";
import { AddOrRemoveIcon } from "../svg/addorremove";
import { PeopleIcon } from "../svg/peopleIcon";
import Card, { CardProps } from "./Card";

export const DashboardItemNewUser: FC<any> = () => {
  return (
    <Link href={"/admin/users/newuser"}>
      <Card
        className={"w-40 h-20"}
        childClassName={"flex justify-center w-full gap-2 font-bold"}
        color="indigo">
        Neues Mitglied
        <div className="flex justify-center w-full">
          <AddIcon width={24} height={24} />
        </div>
      </Card>
    </Link>
  );
};

export const DashboardItemLicense: FC<any> = () => {
  return (
    <Link href={"/admin/users/license"}>
      <Card
        className={"w-40 h-20"}
        childClassName={"flex justify-center w-full gap-2 font-bold"}
        color="orange">
        Lizenzverwaltung
        <div className="flex justify-center w-full">
          <AddOrRemoveIcon width={24} height={24} />
        </div>
      </Card>
    </Link>
  );
};

export const DashboardItemUserlist: FC<any> = () => {
  return (
    <Link href={"/admin/users"}>
      <Card
        className={"w-40 h-20"}
        childClassName={"flex justify-center w-full gap-2 font-bold"}
        color="teal">
        Mitgliederliste
        <div className="flex justify-center w-full">
          <PeopleIcon width={24} height={24} />
        </div>
      </Card>
    </Link>
  );
};
