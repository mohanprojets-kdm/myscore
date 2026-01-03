import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";

import { signToken } from "@/lib/auth";
import user from "@/lib/model/user";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectDB();

  const userDetail = await user.findOne({ email });
  if (!userDetail)
    return NextResponse.json({ error: "Invalid login" }, { status: 401 });

  const match = password === userDetail?.password;
  if (!match)
    return NextResponse.json({ error: "Invalid login" }, { status: 401 });

  const token = signToken({ userId: userDetail._id });
  const res = NextResponse.json({ data: userDetail, success: true });
  res.cookies.set("token", token, { httpOnly: true });
  return res;
}
