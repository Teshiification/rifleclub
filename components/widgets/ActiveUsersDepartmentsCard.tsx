import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import Card from "../core/Card";
import { PeopleIcon } from "../svg/peopleIcon";
import { BowIcon, RifleIcon } from "../svg/weaponIcons";

export interface ActiveUsersDepartmentsProps
  extends JSX.IntrinsicAttributes,
    HTMLAttributes<HTMLElement> {
  className: string;
  departmentusers: users_departments[];
}

const ActiveUsersDepartmentsCard: FC<ActiveUsersDepartmentsProps> = (props: ActiveUsersDepartmentsProps) => {
  const { className, departmentusers } = props;

  return (
    <Card
      color="orange"
      icon={<PeopleIcon width={40} height={40} />}
      title={`Abteilungen`}
      className={className}
      children={
        <div className="grid select-none">
          <div className="flex justify-between text-m">
            <label className="grid gap-2">
              <p title="Anzahl Mitglieder" className="flex cursor-help">
                <BowIcon width={20} height={20} />{" "}
                {
                  departmentusers.filter((data) => data.department_id == 1)
                    .length
                  }
              </p>
              <p>Bogen</p>
            </label>
            <label className="grid gap-2">
              <p title="Anzahl Mitglieder" className="flex cursor-help">
                <RifleIcon width={20} height={20} />{" "}
                {
                  departmentusers.filter((data) => data.department_id == 2)
                    .length
                }
              </p>
              <p>Luftdruck</p>
            </label>
            <label className="grid gap-2">
              <p title="Anzahl Mitglieder" className="flex cursor-help">
                <RifleIcon width={20} height={20} />{" "}
                {
                  departmentusers.filter((data) => data.department_id == 3)
                    .length
                }
              </p>
              <p>Feuerwaffen</p>
            </label>
          </div>
        </div>
      }
    />
  );
};

export default ActiveUsersDepartmentsCard;
