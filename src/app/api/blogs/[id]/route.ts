import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Try to find by ID first, then by slug
    let blog = await Blog.findById(id).populate('author', 'name email');
    
    if (!blog) {
      blog = await Blog.findOne({ slug: id }).populate('author', 'name email');
    }

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Increment view count
    blog.views += 1;
    await blog.save();

    return NextResponse.json(blog);
  } catch (error: any) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
} 