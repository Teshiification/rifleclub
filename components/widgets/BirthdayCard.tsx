import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import Card from "../core/Card";
import { BirthdayCakeIcon } from "../svg/birthdaycakeIcon";

export interface BirthdayCardProps
  extends JSX.IntrinsicAttributes,
    HTMLAttributes<HTMLElement> {
  users: user[];
  monthIndex: number;
  className: string;
  showIcon?: boolean;
  title?: string;
}

const monthNames = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

const BirthdayCard: FC<BirthdayCardProps> = (props: BirthdayCardProps) => {
  const { users, monthIndex, className, showIcon, title } = props;

  return (
    <Card
      color="green"
      icon={showIcon && <BirthdayCakeIcon width={40} height={40} />}
      title={`${title ? title : ""} ${monthNames[monthIndex - 1]}`}
      className={`content-start ${className}`}
      children={
        <>
          {users &&
            users?.map((user, key) => {
              const birthday: Date | undefined =
                user.birthday && new Date(user.birthday);
              return (
                <Link
                  key={key}
                  href={`/admin/users/${user.id}`}
                  className={
                    "pl-2 pr-2 rounded hover:bg-white hover:bg-opacity-10 border-transparent hover:border-white border-l-4 w-full h-6 text-left"
                  }>
                  <p className="flex gap-2 h-fit justify-between">
                    <p>
                      {user.name} {user.lastname}
                    </p>
                    <p>{`*${birthday.getDate()}.${
                      birthday.getMonth() + 1
                    }.${birthday.getFullYear()}`}</p>
                  </p>
                </Link>
              );
            })}
        </>
      }
    />
  );
};

export default BirthdayCard;
