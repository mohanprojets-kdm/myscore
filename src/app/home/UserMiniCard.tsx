import Image from "next/image";

export type UserCardProps = {
  image: string;
  name: string;

  tag: string;
  score: number;
};

export default function UserMiniCard({
  image,
  name,
  tag,
  score,
}: UserCardProps) {
  return (
    <div
      className="flex items-center gap-3 bg-white rounded-xl shadow-sm px-4 py-3 
           hover:shadow-md hover:scale-[1.02] transition-all"
    >
      {/* Left Image */}
      <div className="w-12 h-12 rounded-full overflow-hidden border">
        <Image
          src={image}
          alt={name}
          width={12}
          height={12}
          className="w-full h-full object-fit"
        />
      </div>

      {/* Right Content */}
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900">{name}</p>

        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
          <span className="bg-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
          <span
            className={`font-medium ${
              score >= 80 ? "text-green-600" : "text-orange-500"
            }`}
          >
            Score: {score}
          </span>
        </div>
      </div>
    </div>
  );
}
