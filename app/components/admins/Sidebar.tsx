import Link from 'next/link'
import React from 'react'


export default function sidebar() {

    const navItems = [
        {name:"Dashboard",href:"/admin"},
        {name:"Posts page",href:"/admin/posts"}
    ];
  return (
    <aside className='w-64 bg-white border-r'>
      <div className='p-4 font-bold text-lg'>Admin Dashboard</div>
      <nav className='space-y-10 px-2 text-lg'>
        {navItems.map((item) => (
            <Link 
            key={item.href}
            href={item.href}
            className='block rounded px-3 hover:bg-gray-100'
            >
                {item.name}
            </Link>

        ))}
      </nav>
    </aside>
  )
}

