import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
    <Card className="w-full">
      <CardContent className="flex justify-between pt-3">
        <span className="font-bold text-2xl">{value}</span>
        <div
          className={cn(
            "p-3 rounded-md",
            destination === "up"
              ? "bg-muted"
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
      </CardContent>
      <CardFooter className="lg:-mt-10">
        <p>
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
      </CardFooter>
    </Card>
  );
}

export default TrendingCard;
