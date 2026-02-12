"use client"
import AdminPostTable from '@/app/components/admins/AdminPostTable';
import  { useEffect, useState } from 'react'


interface post{
  _id:string;
  title:string;
  content:string;
  userId: {
    email:string;
  };
}

export default function postPage() {
  const [posts,setPosts] = useState<post[]>([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");  

        if(!token)
          throw new Error("unauthorized");

        //fetching data from api
        const res = await fetch("/api/admin/posts",{
          method:"GET",
          headers:{
            "content-type":"application/json",
            "Authorization":`Bearer ${token}`
          }
        });

        if(!res.ok){
          throw new Error("Failed to fetch Posts");
        }

        const data = await res.json();
        setPosts(data.posts ||  []);

      } catch (err:any) {
        setError(err.message);
      }finally{
        setLoading(false)
      }
          
    }
    fetchPost();
  },[])
  if (loading) return <p className='p-6'>Loading Posts...</p>
  if(error) return <p className='p-6 text-red-500'>{error}</p>
  if(posts.length === 0) return <p className='p-6'>No Posts Found</p>

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>All Posts Here: </h1>
      <AdminPostTable posts={posts}/>
    </div>
  )
}

