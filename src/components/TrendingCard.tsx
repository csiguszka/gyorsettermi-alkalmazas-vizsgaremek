import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp, MoveRight } from "lucide-react";

interface props {
  value: number | string;
  label: string;
  rating: string;
  destination: "up" | "down" | "same";
}

function TrendingCard({ value, label, rating, destination }: props) {
  return (
    <Card className="w-full card grid grid-cols-[auto_50px] grid-rows-2 px-5 py-2">
      <span className="font-bold text-2xl self-end">{value}</span>
      <div
        className={cn(
          "flex items-center justify-center rounded-md row-span-2 w-12 h-12 justify-self-end self-center",
          destination === "up"
            ? "bg-green-200"
            : destination === "down"
            ? "bg-[#ffafaf]"
            : "bg-gray-200"
        )}
      >
        {destination === "up" ? (
          <TrendingUp className="text-green-400" />
        ) : destination === "down" ? (
          <TrendingDown className="text-red-600" />
        ) : (
          <MoveRight className="text-gray-500" />
        )}
      </div>
      <p className="text-sm">
        {label}{" "}
        <span
          className={cn(
            destination === "up"
              ? "text-green-400"
              : destination === "down"
              ? "text-red-600"
              : "text-gray-500"
          )}
        >
          {rating}
        </span>
      </p>
    </Card>
  );
}

export default TrendingCard;
