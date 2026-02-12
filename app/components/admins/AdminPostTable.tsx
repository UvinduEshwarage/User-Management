import React from 'react'
import AdminPostRow from './AdminPostRow'

interface Post{
  _id:string;
  title:string;
  content:string;
  userId: {
    email:string;
  };
}

export default function AdminPostTable({posts} : {posts:Post[] }) {
  return (
    <div className='overflow-x-auto'>
        <table className='min-w-full border border-gray-700 text-sm'>
        <thead className='bg-gray-800 text-white'>
            <tr>
                <th className='p-3 text-left'>Tttle</th>
                <th className='p-3 text-left'>Content</th>
                <th className='p-3 text-left'>User Email</th>
            </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <AdminPostRow key={post._id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

 
