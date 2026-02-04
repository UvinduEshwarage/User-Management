import { getUserFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import { NextResponse } from "next/server";
import User from "@/lib/models/User";

//Get all Posts related to the user
export async function GET(req:Request){
    try {
        await connectDB();

        const user = getUserFromRequest(req);

        const posts = await Post.find({userId:user.userId});

        if(!user || !user.userId){
            return NextResponse.json({message:"Unauthorized"},{status:401});
        }
         return NextResponse.json({posts},{status:200});

        } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500});
    }
}

//create a post
export async function POST(req:Request){
    try {
        await connectDB();
        const user = getUserFromRequest(req);
        if(!user || !user.userId){
            return NextResponse.json({message:"Unauthorized"},{status:401});
        }
        const {title,content} = await req.json();
        const post = await Post.create({
            title,
            content,
            userId:user.userId,
        });

        return NextResponse.json(post,{status:201});
        
    } catch (err:any) {
        return NextResponse.json({message:err.message},{status:500});
    }
}