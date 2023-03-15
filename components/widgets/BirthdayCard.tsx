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

  // if month is smaller than 0 get december(11), if it is bigger than 11 get january(0)
  const month = monthIndex >= 0 ? (monthIndex < 12 ? monthIndex : 0) : 11;

  return (
    <Card
      color="green"
      icon={showIcon && <BirthdayCakeIcon width={40} height={40} />}
      title={`${title ? title : ""} ${monthNames[month]}`}
      className={className}
      children={
        <>
          {users &&
            users?.map((user, key) => {
              const birthday: Date | undefined =
                user.birthday && new Date(user.birthday);
              if (birthday && birthday.getMonth() == month) {
                return (
                  <Link
                    key={key}
                    href={`/admin/users/${user.id}`}
                    className={
                      "pl-2 rounded hover:bg-white hover:bg-opacity-10 hover:border-white hover:border-l-4 w-full h-6 text-left"
                    }>
                    <p className="h-fit">
                      {user.name} {user.lastname} am {birthday.getDate()}.
                    </p>
                  </Link>
                );
              }
            })}
        </>
      }
    />
  );
};

export default BirthdayCard;
