import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import scoreModel from "@/lib/model/score";
import user from "@/lib/model/user";
import {
  generateObjectId,
  SCORE_TAG,
  SCORE_TAG_FEMALE,
  SCORE_TAG_MALE,
} from "@/lib/shared/static";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password, gender } = await req.json();

    await connectDB();
    // Validate input
    if (!name || !email) {
      return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }

    const newUser = new user({
      name,
      email,
      password,
      image:
        gender === "MALE"
          ? SCORE_TAG_MALE.BASE_BEAST
          : SCORE_TAG_FEMALE.BASE_BEAST,
      gender,
    });
    const savedUser = await newUser.save();
    if (savedUser) {
      const payload = {
        userId: savedUser._id,
        score: 1000,
        tag: SCORE_TAG.BASE_BEAST,
      };
      const saveScore = new scoreModel(payload);
      await saveScore.save();
    }
    return NextResponse.json({ user: savedUser, success: true });
  } catch (error) {
    NextResponse.json(
      { error, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = verifyToken(token);

    const userRecord = await user.findById(decoded.userId);

    if (!userRecord) {
      return NextResponse.json(
        { error: "User record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: userRecord }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
