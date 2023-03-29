"use client"
import Image from 'next/image';
import { FC, HTMLAttributes, useState } from 'react';

export interface AlertProps
    extends JSX.IntrinsicAttributes,
    HTMLAttributes<HTMLElement> {
    /** Alert color style **/
    color?:
    | 'gray'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'pink';
}

export const Alert: FC<AlertProps> = (props: AlertProps) => {
    props = {
        color: 'blue',
        ...props,
    };

    const [shown, setShown] = useState(true);

    return (
        <div
            className={`bg-${props.color}-200 text-${props.color}-800 px-4 py-3 rounded-lg relative ${props.className}`}
        >
            {props.children}
            <span
                className="absolute top-0 bottom-0 ltr:right-0 rtl:left-0 px-4 py-3 cursor-pointer"
                onClick={() => setShown(false)}
            >
                <Image
                    src=""
                    alt="alarmIcon"
                    width={16}
                    height={16}
                />
            </span >
        </div >
    );
};
