import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import scoreModel from "@/lib/model/score";
import userModel from "@/lib/model/user";
import { generateObjectId } from "@/lib/shared/static";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    await connectDB();

    if (!userId) {
      return NextResponse.json(
        {
          error: "userId is requeired",
        },
        { status: 400 }
      );
    }
    const userRecord = await userModel.findOne({
      _id: generateObjectId(userId),
    });
    const scoreRecord = await scoreModel.findOne({
      userId: userId,
    });
    if (!scoreRecord) {
      return NextResponse.json(
        { error: "Score record not found for the user" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        user: userRecord,
        score: scoreRecord,
        message: "Score retrieved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
