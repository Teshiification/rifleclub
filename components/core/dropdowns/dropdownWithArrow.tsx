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
            <div className='flex rounded-full'>
                <label className="w-3/4 bg-white border-primary border-[1px] text-primary text-center" >{selectedItem || ""}</label>
                <button
                    onClick={toggleDropdown}
                    className='min-w-[24px] min-h-[24px] w-1/4 bg-white hover:bg-gray-200'
                >
                    {open ? <svg width="20" height="20" viewBox="0 0 20 20">
                        <path d="M7 14l5-5 5 5z" fill="black" />
                    </svg>
                        : <svg width="20" height="20" viewBox="0 0 20 20">
                            <path d="M7 10l5 5 5-5z" fill="black" />
                        </svg>}
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
