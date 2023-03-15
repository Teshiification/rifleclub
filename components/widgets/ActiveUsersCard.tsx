import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import Card from "../core/Card";
import { PeopleIcon } from "../svg/peopleIcon";
import { BowIcon, RifleIcon } from "../svg/weaponIcons";

export interface BirthdayCardProps
  extends JSX.IntrinsicAttributes,
    HTMLAttributes<HTMLElement> {
  users: user[];
  className: string;
  departmentusers: users_departments[];
}

const ActiveUsersCard: FC<BirthdayCardProps> = (props: BirthdayCardProps) => {
  const { users, className, departmentusers } = props;

  return (
    <Card
      color="orange"
      icon={<PeopleIcon width={40} height={40} />}
      title={`Mitglieder`}
      className={className}
      children={
        <div className="grid">
          <div className="flex justify-between text-m">
            <label>Gesamt: {users.length}</label>
            <label>Aktiv: {users.filter((user) => user.active).length}</label>
            <label>
              Inaktiv: {users.filter((user) => !user.active).length}
            </label>
          </div>
          <div className="flex justify-between text-m">
            Abteilungen:
            <label className="flex gap-2">
              <Link href={`/admin/departments/1`} className="flex">
                <BowIcon width={20} height={20} />{" "}
                {
                  departmentusers.filter((data) => data.department_id == 1)
                    .length
                }
              </Link>
            </label>
            <label className="flex gap-2">
              <Link href={`/admin/2`} className="flex">
                <RifleIcon width={20} height={20} />{" "}
                {
                  departmentusers.filter((data) => data.department_id == 2)
                    .length
                }
              </Link>
            </label>
          </div>
        </div>
      }
    />
  );
};

export default ActiveUsersCard;
