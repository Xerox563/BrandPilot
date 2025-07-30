import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;

    // Find published blog by slug
    const blog = await Blog.findOne({ 
      slug: slug,
      published: true 
    }).populate('author', 'name email');

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Increment view count
    blog.views += 1;
    await blog.save();

    return NextResponse.json(blog);
  } catch (error: any) {
    console.error("Error fetching public blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
} 