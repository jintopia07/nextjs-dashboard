"use client"

import React, { useState } from 'react'
import Footer from '../components/Footer'
import SideNav from '../components/SideNav'
import Container from '../components/Container'
import Link from 'next/link'
import AdminNav from '../components/AdminNav'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'



function CreatePage() {

 const { data: session } = useSession();
     if (!session) redirect("/login");
     if(!session?.user?.role === "admin") redirect("/welcome");

  const userEmail = session?.user?.email;
  
  const [ title, setTitle ] = useState("");
  const [ img, setImg ] = useState("");
  const [ content, setContent ] = useState("");

  const router = useRouter();

  console.log(title, img, content);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if( !title || !img || !content ) {
        alert("Pleae complete all inputs.");
        return;
    }

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts` , {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({ title, img, content, userEmail })
      })

      if(res.ok) {
        router.push("/admin/posts");
      } else {
        throw new Error("Failed to create a post");
      }

    } catch (error) {
       console.log(error)
    }
  }


  return (
    <Container>
        <AdminNav session={session} />
          <div className='flex-grow'>
            <div className='container mx-auto shadow-xl my-10 p-10 rounded-xl'>
            <Link href="/admin/posts" className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
            <hr className='my-3' />
            <h3 className='text-xl'>Create Post</h3>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={(e) => setTitle(e.target.value)} className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 text-black' placeholder='Post title'></input>
                <input type='text' onChange={(e) => setImg(e.target.value)}  className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 text-black' placeholder='Post Img url'></input>
                <textarea onChange={(e) => setContent(e.target.value)}  className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2 text-black' name='' id='' cols="30" rows="10" placeholder='Enter your post content'></textarea>
                <button name='create'type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2' >Create Post</button>
            </form>
            </div>
          </div>
        <Footer />
    </Container>
  )
}

export default CreatePage