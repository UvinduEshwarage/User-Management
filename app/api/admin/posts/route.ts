import { requireAdmin } from "@/lib/admin";
import { getUserFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import { NextResponse } from "next/server";
import User from "@/lib/models/User";

export async function GET(req:Request){
    try {
        const user = getUserFromRequest(req);
        requireAdmin(user);

        await connectDB();

        const posts = await Post.find()
            .populate({path:"userId",model:User,select:"email"});

        return NextResponse.json({posts},{status:200});
    } catch (err:any) {
        return NextResponse.json({message:err.message},{status:err.message === "Fobidden" ? 403 :401});
    }
}