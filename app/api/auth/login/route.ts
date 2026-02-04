import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req:Request){
    try {
        await connectDB();
    const{email,password} = await req.json();
    
    const user = await User.findOne({email});
    if(!user){
        return NextResponse.json({message:"Invalid credentials"},{status:401});
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
       return NextResponse.json({message:"Invalid credentials"},{status:401});
    }
    
    const token = jwt.sign(
        {userId:user._id,
        role:user.role},
        process.env.JWT_SECRET_KEY!,
        {expiresIn:'1d'}
    );
    return NextResponse.json({token},{status:200});

    } catch (error) {
        return NextResponse.json({message:"Internal Server Error 500"},{status:500});    
    }
}