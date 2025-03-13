import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function SkeletonChartCard({isRounded = false} : {isRounded?: boolean}) {
  return (
    <Card className="w-full card flex flex-col justify-between items-center px-5 py-2 animate-pulse">
      <CardHeader className="items-center pb-0">
        <CardTitle>Költési kategóriák</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn("bg-gray-300 w-full h-32", isRounded ?? "rounded-full w-32 h-32")}></div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="grid grid-cols-2 grid-rows-2 gap-2 font-medium leading-none bg-gray-300 w-full h-12">
        </div>
      </CardFooter>
    </Card>
  );
}

export default SkeletonChartCard;
