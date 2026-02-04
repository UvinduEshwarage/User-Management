import { requireAdmin } from "@/lib/admin";
import { getUserFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    try {
        const user = getUserFromRequest(req);
        requireAdmin(user);

        await connectDB();
        
        const users = await User.find().select("-password");
        return NextResponse.json(users);
        
    } catch (error:any) {
        return  NextResponse.json({message:error.message},{status:error.message === "forbidden!" ? 403:401});
    }
}