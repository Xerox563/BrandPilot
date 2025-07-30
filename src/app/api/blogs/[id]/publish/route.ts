import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const blog = await Blog.findById(id);
    
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    blog.published = true;
    await blog.save();

    return NextResponse.json(blog);
  } catch (error: any) {
    console.error("Error publishing blog:", error);
    return NextResponse.json(
      { error: "Failed to publish blog" },
      { status: 500 }
    );
  }
} 