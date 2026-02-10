"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';


export default function LoginPage(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();
    
    const handlelogin = async (e:React.FormEvent) => {
        e.preventDefault()

        const res = await fetch('/api/auth/login',{
            method:'POST',
            headers:{"content-type":"application/json"},
            body: JSON.stringify({email,password})
        })

        const data = await res.json();

        if(!res.ok){
            alert(data.message);
            return;
        }

        localStorage.setItem("token",data.token);
        router.push('/dashboard');
        
        if(data.role === "admin"){
          router.push('admin');
        }else{
          router.push('/dashboard');
        }
    }
    return (
  <div className="flex flex-col items-center justify-center min-h-[650px]">
    <form 
      onSubmit={handlelogin} 
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-full max-w-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input 
          type="text" 
          placeholder="Enter Email" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          type="password" 
          placeholder="Enter Password" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 mt-2"
      >
        Login
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Don't have an account? 
        <Link 
        href="/register"
        className="text-indigo-600 cursor-pointer hover:underline" >Sign up</Link>
      </p>
    </form>
  </div>
);
}