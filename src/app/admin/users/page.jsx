"use client"


import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import SideNav from '../components/SideNav'
import Container from '../components/Container'
import Link from 'next/link'
import AdminNav from '../components/AdminNav'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DeleteBtn from './DeleteBtn'



function AdminUserManagePage() {

   const { data: session } = useSession();
   if (!session) redirect("/login");
   if (!session?.user?.role === "admin") redirect("/welcome");

   const [allUsersData, setAllUsersData] = useState([]);

   const getAllUsersData = async () => {
      try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers`, {
            cache: "no-store"
         });

         if(!res.ok) {
            throw new Error("Failed to fetch user");
         }

         const data = await res.json();
         setAllUsersData(data.totalUsers);

      } catch(error) {
         console.log("Error loading posts:", error)
      }
   }

   useEffect(() => {
      getAllUsersData();
   }, [])


  return (
    <Container>
       <AdminNav />
         <div className='flex-grow'>
            <div className='container mx-auto'>
               <div className='flex mt-10'>
                    <SideNav />
                    <div className='p-10'>
                        <h3 className='text-3xl mb-3'>Manage Users</h3>
                        <p>A list of users retrieved from a MongoDB database</p>

                        <div className='shadow-[0px_4px_10px_rgba(34,197,94,0.5)] overflow-x-auto'>
                          <table className='text-left rounded-md mt-3 table-fixed w-full'>
                             <thead>
                               <tr className='bg-green-500'>
                                  <th className='p-5'>ID</th>
                                  <th className='p-5'>Username</th>
                                  <th className='p-5'>Email</th>
                                  <th className='p-5'>Role</th>
                                  <th className='p-5'>Action</th>
                               </tr>
                             </thead>
                             <tbody>
                                {allUsersData.map(val => (
                                 <tr key={val._id}>
                                    <td className='p-5'>{val._id}</td>
                                    <td className='p-5'>{val.name}</td>
                                    <td className='p-5'>{val.email}</td>
                                    <td className='p-5'>{val.role}</td>
                                    <td className='p-5 flex gap-3'>
                                    <Link className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2' href={`/admin/users/edit/${val._id}`}>Edit</Link>
                                    <DeleteBtn id={val._id} />
                                    </td>
                                 </tr>
                              ))}
                             </tbody>
                          </table>
                        </div>

                    </div>
               </div>
            </div>
         </div>
       <Footer />
    </Container>
  )
}

export default AdminUserManagePage