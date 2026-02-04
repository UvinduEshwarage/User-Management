import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function  POST(req:Request){
    try {
    await connectDB();
    
    const {email,password} = await req.json();
    const hashPassword = await bcrypt .hash(password,10)

    await User.create({email,password:hashPassword});

    return NextResponse.json({message:"User Created"},{status:201});

    } catch (error) {
        return NextResponse.json({message:"Internal server Error "},{status:500}); 
    }
}