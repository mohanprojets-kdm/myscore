import { generateObjectId, SCORE_TAG_MALE, SCORES } from "@/lib/shared/static";
import { NextResponse } from "next/server";
import scoreModel from "@/lib/model/score";
import user from "@/lib/model/user";
import { connectDB } from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");
    const delta = Number(searchParams.get("score")); // amount
    const isInc = searchParams.get("isInc") === "true";
    const isDec = searchParams.get("isDec") === "true";
    console.log(searchParams, "ppppppppp");
    if (!userId || isNaN(delta)) {
      return NextResponse.json(
        { error: "userId and score are required" },
        { status: 400 }
      );
    }

    // if (!isInc && !isDec) {
    //   return NextResponse.json(
    //     { error: "Either isInc or isDec must be true" },
    //     { status: 400 }
    //   );
    // }

    await connectDB();

    // 1️⃣ Get existing score
    const scoreDoc = await scoreModel.findOne({ userId });

    if (!scoreDoc) {
      return NextResponse.json(
        { error: "Score record not found" },
        { status: 404 }
      );
    }

    let newScore = scoreDoc.score;

    // 2️⃣ Apply increment / decrement
    if (isInc) newScore += delta;
    if (isDec) newScore -= delta;

    // 3️⃣ Clamp score between 0–2000
    newScore = Math.max(0, Math.min(2000, newScore));

    // 4️⃣ Calculate tag
    function getScoreTag(score: number) {
      const thresholds = Object.keys(SCORES)
        .map(Number)
        .sort((a, b) => a - b);

      let result = thresholds[0];

      for (const t of thresholds) {
        if (t <= score) result = t;
      }

      return SCORES[result as keyof typeof SCORES];
    }

    const tag = getScoreTag(newScore);

    // 5️⃣ Update score
    const updatedScore = await scoreModel.findOneAndUpdate(
      { userId },
      { score: newScore, tag },
      { new: true }
    );

    // 6️⃣ Update user avatar
    await user.findOneAndUpdate(
      { _id: generateObjectId(userId) },
      { image: SCORE_TAG_MALE[tag as keyof typeof SCORE_TAG_MALE] }
    );

    return NextResponse.json(
      {
        score: updatedScore,
        message: isInc ? "Score increased" : "Score decreased",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
