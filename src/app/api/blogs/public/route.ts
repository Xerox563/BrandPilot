import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Fetch only published blogs and populate author information
    const blogs = await Blog.find({ published: true })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(blogs);
  } catch (error: any) {
    console.error("Error fetching public blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}