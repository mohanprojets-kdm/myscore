import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import user from "@/lib/model/user";
import { generateObjectId } from "@/lib/shared/static";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const userAggregate = await user.aggregate([
      {
        $match: {
          _id: { $ne: generateObjectId(decoded.userId) },
        },
      },
      {
        $lookup: {
          from: "scores",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$userId", { $toObjectId: "$userId" }],
                },
              },
            },
          ],
          as: "scoreDetails",
        },
      },
      { $unwind: "$scoreDetails" },
    ]);

    if (userAggregate.length === 0) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    return NextResponse.json({ users: userAggregate }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
