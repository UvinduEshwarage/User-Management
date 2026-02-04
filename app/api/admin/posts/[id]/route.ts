import { requireAdmin } from "@/lib/admin";
import { getUserFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
){
    try {
        const { id } = await params;
        const user = getUserFromRequest(req);
        requireAdmin(user);

        await connectDB();
        await Post.findByIdAndDelete(id);

        return NextResponse.json(
          { message: "Post Deleted Successfully!" },
          { status: 200 }
        );
    } catch (err: any) {
        return NextResponse.json(
          { message: err.message },
          { status: err.message === "Forbidden" ? 403 : 401 }
        );
    }
}
