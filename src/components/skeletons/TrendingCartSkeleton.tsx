import { Card } from "@/components/ui/card";

function TrendingCardSkeleton() {
  return (
    <Card className="w-full card grid grid-cols-[auto_50px] grid-rows-2 px-5 py-2 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-3/4 self-end"></div>
      <div className="bg-gray-300 w-12 h-12 rounded-md row-span-2 justify-self-end self-center "></div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mt-2"></div>
    </Card>
  );
}

export default TrendingCardSkeleton;
