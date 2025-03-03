import React from 'react'
import { FaUsers, FaRegNewspaper } from 'react-icons/fa6'

function Content({ totalUsersData, totalPostsData }) {
  return (
    <div className='p-10 rounded-lg shadow-[0px_4px_10px_rgba(34,197,94,0.5)]'>
       <div className='flex'>
          <div className='shadow-[0px_4px_10px_rgba(34,197,94,0.5)] w-[300px] m-3 p-10 rounded-lg'>
            <h3 className='flex items-center'><FaUsers className='mr-2' />Total Users</h3>
            <p className='text-5xl mt-10'>{totalUsersData?.length}</p>
          </div>
          <div className='shadow-[0px_4px_10px_rgba(34,197,94,0.5)] w-[300px] m-3 p-10 rounded-lg'>
            <h3 className='flex items-center'><FaRegNewspaper className='mr-2' />Total Posts</h3>
            <p className='text-5xl mt-10'>{totalPostsData?.length}</p>
          </div>
       </div>
       <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, doloremque totam, similique molestias accusamus id dicta soluta veritatis dolor quasi vero quidem facere laborum reiciendis porro aspernatur vitae, perspiciatis cupiditate! </p>
    </div>
  )
}

export default Content