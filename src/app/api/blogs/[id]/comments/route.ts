import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const { id } = params;
  const comments = await Comment.find({ blogId: id }).sort({ createdAt: -1 }).populate("userId", "name");
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const { id } = params;
  const { content } = await req.json();
  if (!content || !content.trim()) {
    return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });
  }
  const comment = await Comment.create({
    blogId: id,
    userId: session.user.id,
    content,
  });
  await comment.populate("userId", "name");
  return NextResponse.json(comment, { status: 201 });
}