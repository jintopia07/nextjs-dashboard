"use client"


import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer'
import Container from '../../../components/Container'
import Link from 'next/link'
import AdminNav from '../../../components/AdminNav'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'


function EditPage({ params }) {

  const { data: session } = useSession();
    if (!session) redirect("/login");
    if(!session?.user?.role === "admin") redirect("/welcome");
  
  const { id } = params;
  const [userOldData, setUserOldData] = useState([]);


  //New user data
  const [newName, setNewName] = useState([]);
  const [newEmail, setNewEmail] = useState([]);
  const [newPassword, setNewPassword] = useState([]);

  const router = useRouter();


  const getUserById = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers/${id}`, {
            method: "GET",
            cache: "no-store"
        })

        if(!res.ok) {
          throw new Error("Failed to fetch post");
          
          }

        const data = await res.json();
        setUserOldData(data.user);

    } catch(error) {
        console.log(error);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/totalusers/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({ newName, newEmail, newPassword }),
        });

        if(!res.ok) {
          throw new Error("Failed to update user");
          
          }

        router.refresh();
        router.push("/admin/users");

    } catch(error) {
        console.log(error);
    }
  }



  useEffect(() => {
    getUserById(id);
  }, [])

  return (
    <Container>
        <AdminNav  session={session}/>
            <div className='flex-grow'>
            <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
            <Link href="/admin/users" className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
            <hr className='my-3' />
            <h3 className='text-xl'>Admin Edit User Page</h3>
            <form onSubmit={handleSubmit}>
                <input type='text' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 text-black' placeholder={userOldData.name} onChange={(e) => setNewName(e.target.value)} value={newName}></input>
                <input type='email' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 text-black' placeholder={userOldData.email} onChange={(e) => setNewEmail(e.target.value)} value={newEmail}></input> 
                <input type='password' className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 text-black' placeholder={userOldData.password} onChange={(e) => setNewPassword(e.target.value)} value={newPassword}></input> 
                <button name='update'type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2' >Update User</button>
            </form>
            </div>
            </div>
        <Footer />
    </Container>
  )
}

export default EditPage