"use client"

import { useEffect, useState } from "react";
import { Users, RefreshCcw } from 'lucide-react'

export default function DashboardPage(){
  const [userCount,setUserCount] = useState(0);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  //fetching data from api
  useEffect(()=>{
    const fetchUsers = async() => {
      try {
        const token = localStorage.getItem("token");
        if(!token){
          throw new Error("Unautherized");
        }
        const res = await fetch('/api/admin/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          }
        });
        if(!res.ok){
          throw new Error("Failed to fetch Users");
        }
        const data = await res.json();
        setUserCount(data.length);

;       } catch (err:any) {
        setError(err.message);
      }finally{
        setLoading(false);
      }
    }
    fetchUsers();
  },[])
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Management System</h1>
      <div className="bg-white p-6 rounded-xl border shadow-sm max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Users size={24} />
          </div>
          {loading && <RefreshCcw className="animate-spin text-gray-400" size={16} />}
        </div>

        <div>
          <h3 className="text-gray-500 text-sm font-medium">Total Registered Users</h3>
          {error ? (
            <p className="text-red-500 text-sm mt-1 font-semibold">{error}</p>
          ) : (
            <p className="text-4xl font-bold mt-1">
              {loading ? '.......' : userCount}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}