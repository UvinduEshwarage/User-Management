import { getUserFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import { NextResponse } from "next/server";

//update a post 
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
){
        try {
            await connectDB();
            const { id } = await params; 
            const user = getUserFromRequest(req);

            const body = await req.json();
            const post = await Post.findOneAndUpdate(
                { _id: id, userId: user.userId },
                body,
                { new: true }
            );

            if(!post){
                return NextResponse.json({message:"Post Not Found"},{status:404});
            }
            return NextResponse.json(post,{status:200});
        } catch (error:any) {
            return NextResponse.json({message:error.message},{status:500});
        }
}


//delete a post
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
){
        try {
            await connectDB();
            const { id } = await params;
            const user = getUserFromRequest(req);

            const post = await Post.findOneAndDelete(
                { _id: id, userId: user.userId }
            );

            if(!post){
                return NextResponse.json({message:"Post Not Found"},{status:404});
            }

            return NextResponse.json(
              {message:"Post Deleted Successfully"},
              {status:200}
            );
        } catch (err:any) {
            return NextResponse.json({message:err.message},{status:500});
        }
}
