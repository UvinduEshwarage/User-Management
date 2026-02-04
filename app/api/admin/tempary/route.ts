import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        await connectDB();
        const hashedPw = await bcrypt.hash("admin123",10);

        const admin = await User.create({
            email:"admin@gmail.com",
            password:hashedPw,
            role:"admin"
        });
        return NextResponse.json({message:"Admin user created",admin},{status:201});
    } catch (err:any) {
        return NextResponse.json({message:err.message},{status:500});
    }
}