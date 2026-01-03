"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ScoreAvatar from "./component";
import GamifiedAvatar from "./GamifiedAvatar";
import UserMiniCard, { UserCardProps } from "./UserMiniCard";

type ScoreResponse = {
  tag: string;
  score: number;
  image: string;
  name: string;
};

export type UserCardData = {
  image: string;
  name: string;
  scoreDetails: {
    tag: string;
    score: number;
  };
};
export default function HomePage() {
  const [data, setData] = useState<ScoreResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [userDetailId, setUserDetailId] = useState("");
  const [amount, setAmount] = useState(0);
  const [otherUser, setOtherUser] = useState([]);

  // Fetch initial score + image
  const load = async (userId: string) => {
    try {
      const res = await fetch(`/api/score/get?userId=${userId}`, {
        credentials: "include",
      });
      if (!res.ok) return;
      const json = await res.json();
      const { score, user } = json;
      setData({ ...score, ...user });
    } finally {
      setLoading(false);
    }
  };
  const userData = async () => {
    try {
      const res = await fetch("/api/auth/user", {
        credentials: "include",
      });
      if (!res.ok) return;
      const json = await res.json();
      const { user } = json;
      setUserDetailId(user?._id);
      await load(user?._id);
      return json;
    } finally {
    }
  };

  const otherUserData = async () => {
    try {
      const res = await fetch("/api/auth/other", {
        credentials: "include",
      });
      if (!res.ok) return;
      const json = await res.json();
      const { users } = json;
      console.log(users, "qwwerrr");
      setOtherUser(users);
      return json;
    } finally {
    }
  };
  useEffect(() => {
    otherUserData();
    userData();
  }, []);

  const updateScore = async (score: number, isInc: boolean, isDec: boolean) => {
    if (updating) return;
    setUpdating(true);
    if (score < 0) {
      return;
    }

    try {
      const res = await fetch(
        `/api/score/update?userId=${userDetailId}&score=${score}&isInc=${isInc}&isDec=${isDec}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      if (!res.ok) return;
      const json = await res.json();
      userData();
      setAmount(0);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-sm">Failed to load data</p>
      </div>
    );
  }

  const handleIncrement = () => {
    updateScore(amount, true, false);
  };

  const handleDecrement = () => {
    updateScore(amount, false, true);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 flex items-center justify-center">
  
      <div className="w-full max-w-sm bg-white rounded-2xl shadow p-5 sm:p-6">
        {otherUser &&
          otherUser.map((i: UserCardData) => {
            console.log(i, "qqqqqqqqq");
            return (
              <UserMiniCard
                key={i?.image}
                image={i?.image}
                name={i?.name}
                tag={i?.scoreDetails?.tag}
                score={i?.scoreDetails?.score}
              />
            );
          })}

        <div className="mt-4 text-left">
          <p className="text-2xl font-semibold text-blue-600 mb-2">{`${data?.name}'s`}</p>
        </div>
        {/* Image */}
        <GamifiedAvatar
          image={data?.image}
          triggerKey={`${data?.score}-${data?.tag}`}
          title={data?.tag.replace("_", " ")}
        />

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">Score</p>
          <p className="text-3xl font-semibold text-gray-800">{data?.score}</p>
        </div>
        <div className="mt-4">
          <input
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter value"
          />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={handleDecrement}
            disabled={updating}
            className="flex-1 rounded-xl border border-gray-300 py-3 text-xl font-semibold
               active:scale-95 disabled:opacity-50"
          >
            −
          </button>

          <button
            onClick={handleIncrement}
            disabled={updating}
            className="flex-1 rounded-xl bg-blue-600 py-3 text-xl font-semibold text-white
               hover:bg-blue-700 active:scale-95 disabled:opacity-50"
          >
            +
          </button>
        </div>

        {/* Controls */}
        {/* <div className="mt-6 flex items-center justify-between gap-4">
          <div className="relative">
            <input
              type={"number"}
              placeholder="decrement value"
              value={1}
              className="rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={() => updateScore(-1)}
              disabled={updating}
              className=" absolute inset-y-0  flex-1 rounded-xl border border-gray-300 py-3 text-xl font-semibold
                       active:scale-95 disabled:opacity-50"
            >
              −
            </button>
          </div>
          <button
            onClick={() => updateScore(-1)}
            disabled={updating}
            className="flex-1 rounded-xl border border-gray-300 py-3 text-xl font-semibold
                       active:scale-95 disabled:opacity-50"
          >
            −
          </button>

          <button
            onClick={() => updateScore(1)}
            disabled={updating}
            className="flex-1 rounded-xl bg-blue-600 py-3 text-xl font-semibold text-white
                       hover:bg-blue-700 active:scale-95 disabled:opacity-50"
          >
            +
          </button>
        </div> */}

        {/* Hint */}
        <p className="mt-4 text-center text-xs text-gray-500">
          Tap + or − to update your score
        </p>
      </div>
    </div>
  );
}
