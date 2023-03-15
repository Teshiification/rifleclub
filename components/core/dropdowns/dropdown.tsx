"use client"
import React, { useState } from 'react'
import classNames from 'classnames'

type DropdownProps = {
    items: string[],
    className?: string
}

export const Dropdown: React.FC<DropdownProps> = ({ items, className }) => {
    const [open, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<string | null>(null)

    const toggleDropdown = () => setOpen(!open)
    const selectItem = (item: string) => {
        setSelectedItem(item)
        setOpen(false)
    }

    return (
        <div className={classNames('relative min-w-[60px] min-h-[24px] w-20 h-8', className)}>
            <div className='flex rounded-full '>
                <button
                    onClick={toggleDropdown}
                    className='min-w-20 min-h-[24px] w-full bg-white text-primary hover:bg-gray-200 rounded'
                >
                    {selectedItem || ""}
                </button>
            </div>
            {open && (
                <ul className='absolute z-60 w-full right-0 mt-2 py-2 bg-white text-primary rounded shadow-lg '>
                    {items.map(item => (
                        <div key={item} onClick={() => selectItem(item)} className="relativ w-full h-full text-center font-semibold cursor-pointer p-2 hover:bg-primary hover:scale-[101%] transition-transform ease-in-out">
                            {item}
                        </div>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Dropdown
