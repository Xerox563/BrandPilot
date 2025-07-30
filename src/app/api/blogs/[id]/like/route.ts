import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const userId = session.user.id;
    const isLiked = blog.likedBy.includes(userId);

    if (isLiked) {
      // Unlike
      blog.likedBy = blog.likedBy.filter((id: any) => id.toString() !== userId);
      blog.likes = Math.max(0, blog.likes - 1);
    } else {
      // Like
      blog.likedBy.push(userId);
      blog.likes += 1;
    }

    await blog.save();

    return NextResponse.json({
      likes: blog.likes,
      isLiked: !isLiked,
      message: isLiked ? "Blog unliked" : "Blog liked"
    });
  } catch (error: any) {
    console.error("Error liking/unliking blog:", error);
    return NextResponse.json(
      { error: "Failed to like/unlike blog" },
      { status: 500 }
    );
  }
} 