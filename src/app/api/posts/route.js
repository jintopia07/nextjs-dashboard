import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextResponse } from "next/server";


export async function POST(req) {
    const { title, img, content, userEmail } = await req.json();
    await connectMongoDB();
    await Post.create({ title, img, content, userEmail });
    return NextResponse.json({ message: "Post created" }, { status: 201});
    
}



export async function GET(req) {
    const userEmail = req.nextUrl.searchParams.get("email");
    console.log("Received email:", userEmail); // ✅ Debug input
    await connectMongoDB();

    const posts = await Post.find({});
    console.log("All posts in DB:", posts); // ✅ Debug all data

    return NextResponse.json({ posts });
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
    
}