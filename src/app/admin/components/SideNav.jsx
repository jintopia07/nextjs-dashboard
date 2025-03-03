import React from 'react'
import Link from 'next/link'

function SideNav() {
  return (
    <nav className= 'p-10 rounded-lg shadow-[0px_4px_10px_rgba(34,197,94,0.5)]'>
        <ul>
            <li><Link className='block my-3 p-3 rounded-lg' href="/admin">Dashboard</Link></li>
            <li><Link className='block my-3 p-3 rounded-lg' href="/admin/users">Users</Link></li>
            <li><Link className='block my-3 p-3 rounded-lg' href="/admin/posts">Posts</Link></li>
            <li><Link className='block my-3 p-3 rounded-lg' href="/admin/create">Create</Link></li>
        </ul>
    </nav>
  )
}

export default SideNav