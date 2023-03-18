import { FC, HTMLAttributes } from "react";

export interface CardProps
  extends JSX.IntrinsicAttributes,
    HTMLAttributes<HTMLElement> {
  /** Alert color style **/
  color?:
    | "gray"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "indigo"
    | "purple"
    | "pink";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  childClassName?: string;
  title?: string;
}

const Card: FC<CardProps> = (props: CardProps) => {
  const { color, icon, children, className, childClassName, title } = props;
  return (
    <div
      className={`grid grid-rows bg-${color}-800 border-transparent hover:border-${color}-600 border-[1px] text-white rounded-[15px] p-2 select-none ${className}`}>
      <section id="header" className="flex justify-between">
        <h1 className="font-semibold">{title}</h1>
        <div className="justify-self-end">{icon && icon}</div>
      </section>
      <section
        id="birthdaylist"
        className={`grid grid-rows overflow-y-auto ${childClassName}`}>
        {children}
      </section>
    </div>
  );
};

export default Card;
