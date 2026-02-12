"use client";
import { set } from 'mongoose';
import React, { useState, useEffect } from 'react';

// Helper function - we mark the return as Promise<any>
async function getUserDashboardData(): Promise<any> {
    const token = localStorage.getItem('token')
  const res = await fetch('/api/posts',
    {
        method:'GET',
        headers:{
            "content-type":"application/json",
            'authorization':`Bearer ${token}`
        }
    }
  );
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to load');
  }

  return res.json(); 
}

export default function Dashboard() {
  // We use <any> here so we can put whatever we want in the state
  const [data, setData] = useState<any>({ posts: [], email: '' });
  const [status, setStatus] = useState<string>('loading'); 

  useEffect(() => {
    getUserDashboardData()
      .then((payload: any) => {
        setData(payload);
        setStatus('success');
      })
      .catch((err: any) => {
        console.error("Fetch error:", err);
        setStatus('error');
      });
  }, []);

  // --- EARLY RETURNS ---
  if (status === 'loading') {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-xl font-bold text-red-500">Error Loading Dashboard</h2>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }
//create post function
  async function handleCreatepost() {
  try {
    const token = localStorage.getItem("token");

    const title = prompt("Enter post title");
    const content = prompt("Enter post content");

    if (!title || !content) {
      alert("Title and Content are required");
      return;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title, content })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // Update UI without reload (cleaner way)
    setData((prev: any) => ({
      ...prev,
      posts: [...prev.posts, data]
    }));

    alert("Post created successfully!");

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
}
//edit post function
async function editPost(post:any){
  try {
    const token = localStorage.getItem("token");

    const newTitle = prompt("Enter New Title",post.title);
    const newContent = prompt("Enter new content",post.content);

    if(!newTitle || !newContent){
      alert("Title and Content are required");
      return;
    }

    const res = await fetch(`/api/posts/${post._id}`,{
      method:"PUT",
      headers:{
          "Content-Type":"application/json",
          "authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        title:newTitle,
        content:newContent
      })
    });
    const data = await res.json();

    if(!res.ok){
      alert(data.message);
      return;
    }

    //ui update
    setData((prev:any) => ({
      ...prev,
      posts: prev.posts.map((p:any) => p._id === post._id ? data : p)
    }));

    alert("Post updated successfully!");
  } catch (error) {
    alert("Something went wrong");
    console.error(error);
  }
}


  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <header className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <h1 className="text-2xl font-bold text-gray-800"> User Dashboard</h1>
        </header>

        {/* Feed */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-500">Your Posts ({data.posts?.length || 0})</h2>
          <button className='border p-2' onClick={handleCreatepost}>📝</button>
          
          {data.posts && data.posts.length > 0 ? (
            data.posts.map((post: any) => (
              <article 
                key={post._id} 
                className="p-5 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <h3 className="font-bold text-gray-900">{post.title}</h3>
                <p className="text-gray-600 mt-2">{post.content}</p>
                <button className='border p-1' onClick={() =>   editPost(post)}>🖋️</button>

              </article>
            ))
          ) : (
            <div className="bg-white p-10 text-center rounded-lg border border-gray-200">
              <p className="text-gray-400">No posts found.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}