'use client';

import React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function NavLink({
    href,
    children,
    className,
}: {
    href: string,
    children: React.ReactNode,
    className?: string,
}) {
    const segment = useSelectedLayoutSegment();
    const active = `/${segment}` === href;

    return (
        <Link className={`${active ? 'underline' : ''} ${className} `} href={href}>
            {children}
        </Link>
    )
}