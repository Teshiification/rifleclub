import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import Card from "../core/Card";
import { PeopleIcon } from "../svg/peopleIcon";
import { BowIcon, RifleIcon } from "../svg/weaponIcons";

export interface ActiveUsersCardProps
  extends JSX.IntrinsicAttributes,
    HTMLAttributes<HTMLElement> {
  users: user[];
  className: string;
}

const ActiveUsersCard: FC<ActiveUsersCardProps> = (props: ActiveUsersCardProps) => {
  const { users, className } = props;

  return (
    <Card
      color="orange"
      icon={<PeopleIcon width={40} height={40} />}
      title={`Mitglieder`}
      className={className}
      children={
        <div className="grid select-none text-m">
            <label>Gesamt: {users.length}</label>
          <div className="flex justify-between">
            <label>Aktiv: {users.filter((user) => user.active).length}</label>
            <label>Inaktiv: {users.filter((user) => !user.active).length}</label>
            <label>Lizenziert: {users.filter((user) => !user.license).length}</label>
          </div>
        </div>
      }
    />
  );
};

export default ActiveUsersCard;
