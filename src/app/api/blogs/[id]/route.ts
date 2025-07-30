import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

export async function PUT(
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
    const { content } = await req.json();
    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Content cannot be empty" }, { status: 400 });
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    // Only allow the author to update
    if (blog.author.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    blog.content = content;
    await blog.save();
    await blog.populate('author', 'name email');
    return NextResponse.json(blog);
  } catch (error: any) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
} 