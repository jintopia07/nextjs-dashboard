import React from 'react'
import Link from 'next/link'
import Logo from '../../../../public/next.svg'
import Image from 'next/image'
import { signOut } from 'next-auth/react'



function AdminNav({ session }) {
  return (
    <nav className='shadow-xl'>
        <div className='container mx-auto'>
            <div className='flex justify-between items-center p-4'>
              <div>
                <Link href="/">
                   <Image src="https://images.unsplash.com/photo-1496200186974-4293800e2c20?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bG9nbyUyMHBuZ3xlbnwwfHwwfHx8MA%3D%3D" width={100} height={100} alt='NextJS Logo' />
                </Link>
              </div>
              <ul className='flex'>
              {!session ? (
                       <>
                             <li className='mx-3'><Link href="/login">Login</Link></li>
                             <li className='mx-3'><Link href="/register">Register</Link></li>
                       </>
                    ) : (
                      <li className='mx-3'>
                      <a onClick={() => signOut()} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Logout</a>
                      </li>
                    )}   
              </ul>
            </div>
        </div>
    </nav>
  )
}

export default AdminNav